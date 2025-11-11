import type { EdgeData, LayoutMapping, NodeData } from "@antv/layout";
import type {
  Simulation,
  SimulationLinkDatum,
  SimulationNodeDatum,
} from "d3-force";

export interface D3ForceRectLayoutOptions {
  /**
   * Node size (rectangle). Used for collision detection when nodes overlap.
   *
   * @defaultValue [10, 10]
   */
  nodeSize?:
    | [number, number]
    | ((
        node: NodeDatum,
        index: number,
        nodes: NodeDatum[],
      ) => [number, number]);

  /**
   * Callback executed on each tick.
   *
   * @param data Layout result.
   */
  onTick?: (data: LayoutMapping) => void;

  /**
   * The number of iterations of the force, not the layout.
   */
  iterations?: number;

  /**
   * Custom force method, if not specified, use d3.js method.
   */
  forceSimulation?: Simulation<NodeDatum, EdgeDatum>;

  /**
   * Convergence threshold of the current iteration.
   */
  alpha?: number;

  /**
   * Convergence threshold of the current iteration.
   */
  alphaMin?: number;

  /**
   * Convergence threshold of the current iteration.
   */
  alphaDecay?: number;

  /**
   * Set the target convergence threshold of the current iteration.
   */
  alphaTarget?: number;

  /**
   * Specify the decay factor.
   */
  velocityDecay?: number;

  /**
   * Set the function for generating random numbers.
   *
   * @returns Random number
   */
  randomSource?: () => number;

  /**
   * Center force.
   */
  center?:
    | false
    | {
        x?: number;
        y?: number;
        strength?: number;
      };

  /**
   * Collision force.
   */
  collide?:
    | false
    | {
        size?:
          | [number, number]
          | ((
              node: NodeDatum,
              index: number,
              nodes: NodeDatum[],
            ) => [number, number]);
        strength?: number;
        iterations?: number;
      };

  /**
   * Many body force.
   */
  manyBody?:
    | false
    | {
        strength?:
          | number
          | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number);
        theta?: number;
        distanceMin?: number;
        distanceMax?: number;
      };

  /**
   * Link force.
   */
  link?:
    | false
    | {
        id?: (edge: EdgeDatum, index: number, edges: EdgeDatum[]) => string;
        distance?:
          | number
          | ((edge: EdgeDatum, index: number, edges: EdgeDatum[]) => number);
        strength?:
          | number
          | ((edge: EdgeDatum, index: number, edges: EdgeDatum[]) => number);
        iterations?: number;
      };

  /**
   * Radial force.
   */
  radial?:
    | false
    | {
        strength?:
          | number
          | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number);
        radius?:
          | number
          | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number);
        x?: number;
        y?: number;
      };

  /**
   * X axis force.
   */
  x?:
    | false
    | {
        strength?:
          | number
          | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number);
        x?:
          | number
          | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number);
      };

  /**
   * Y axis force.
   */
  y?:
    | false
    | {
        strength?:
          | number
          | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number);
        y?:
          | number
          | ((node: NodeDatum, index: number, nodes: NodeDatum[]) => number);
      };
}

export interface NodeDatum extends NodeData, SimulationNodeDatum {}

export interface EdgeDatum extends EdgeData, SimulationLinkDatum<NodeDatum> {}
