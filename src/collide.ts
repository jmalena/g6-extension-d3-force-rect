import { type QuadtreeLeaf, quadtree } from "d3-quadtree";
import constant from "/~/utils/constant";
import jiggle from "/~/utils/jiggle";
import type { NodeDatum } from "/~/types";

type QuadNode = QuadtreeLeaf<NodeDatum> & {
  size: [number, number];
};

export function rectCollide() {
  let nodes: NodeDatum[];
  let sizes: [number, number][];
  let masses: number[];
  let size = constant<[number, number]>([0, 0]);
  let strength = 1;
  let iterations = 1;

  function force() {
    let node: NodeDatum;
    let size: [number, number];
    let mass: number;
    let xi: number;
    let yi: number;
    let i = -1;

    while (++i < iterations) {
      iterate();
    }

    function iterate() {
      let j = -1;
      const tree = quadtree(nodes, xCenter, yCenter).visitAfter(prepare);

      while (++j < nodes.length) {
        node = nodes[j];
        size = sizes[j];
        mass = masses[j];
        xi = xCenter(node);
        yi = yCenter(node);
        tree.visit(apply);
      }
    }

    function apply(
      quad: QuadNode,
      x0: number,
      y0: number,
      x1: number,
      y1: number,
    ) {
      const data = quad.data;
      const xSize = (size[0] + quad.size[0]) / 2;
      const ySize = (size[1] + quad.size[1]) / 2;

      if (data && data.index > node.index) {
        // Compute delta with jiggle to avoid zero distance
        let x = xi - xCenter(data);
        let y = yi - yCenter(data);

        if (x === 0) x = jiggle(Math.random);
        if (y === 0) y = jiggle(Math.random);

        const xd = Math.abs(x) - xSize;
        const yd = Math.abs(y) - ySize;

        // If they overlap on both axes
        if (xd < 0 && yd < 0) {
          // Compute overlap magnitude — how deeply they overlap
          const overlapX = -xd;
          const overlapY = -yd;
          const overlap = Math.sqrt(overlapX * overlapX + overlapY * overlapY);

          // Normalize direction vector
          const l = Math.sqrt(x * x + y * y);
          const nx = x / l;
          const ny = y / l;

          const m1 = mass;
          const m2 = masses[data.index];
          const m = m1 + m2;
          const mRatio1 = m1 / m;
          const mRatio2 = m2 / m;

          // Apply equal and opposite pushes along the direction vector
          const push = overlap * strength;

          node.vx += nx * push * mRatio2;
          node.vy += ny * push * mRatio2;

          data.vx -= nx * push * mRatio1;
          data.vy -= ny * push * mRatio1;
        }
      }

      // Skip traversal if this quadrant is too far away
      return (
        x0 > xi + xSize || y0 > yi + ySize || x1 < xi - xSize || y1 < yi - ySize
      );
    }

    function prepare(quad: QuadNode) {
      if (quad.data) {
        quad.size = sizes[quad.data.index];
      } else {
        quad.size = [0, 0];
        let i = -1;

        while (++i < 4) {
          if (quad[i] && quad[i].size) {
            quad.size[0] = Math.max(quad.size[0], quad[i].size[0]);
            quad.size[1] = Math.max(quad.size[1], quad[i].size[1]);
          }
        }
      }
    }
  }

  function xCenter(node: NodeDatum) {
    return node.x + node.vx + sizes[node.index][0] / 2;
  }

  function yCenter(node: NodeDatum) {
    return node.y + node.vy + sizes[node.index][1] / 2;
  }

  force.initialize = function (_: NodeDatum[]) {
    nodes = _;
    sizes = nodes.map(size);
    masses = sizes.map(function (d) {
      return d[0] * d[1];
    });
  };

  force.size = function (_: [number, number] | (() => [number, number])) {
    if (!arguments.length) return size;
    size = typeof _ === "function" ? _ : constant(_);
    return force;
  };

  force.strength = function (_: number) {
    if (!arguments.length) return strength;
    strength = +_;
    return force;
  };

  force.iterations = function (_: number) {
    if (!arguments.length) return iterations;
    iterations = +_;
    return force;
  };

  return force;
}
