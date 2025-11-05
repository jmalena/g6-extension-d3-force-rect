# g6-extension-d3-force-rect

A G6 layout extension of the force-directed layout with support for rectangular collisions. The package provides the same options as the [`d3-force`](https://g6.antv.antgroup.com/en/manual/layout/d3-force-layout) layout, with the only difference being that it uses `collide.size` for collisions instead of `collide.radius`.

# Installation

```bash
npm install g6-extension-d3-force-rect
```

# Usage

```typescript
import { register, ExtensionCategory } from '@antv/g6';
import { D3ForceRectLayout } from 'g6-extension-d3-force-rect';

register(ExtensionCategory.LAYOUT, 'd3-force-rect', D3ForceRectLayout);
```

# Example

Prevent nodes from overlapping by specifying a collision rectangle for each node.

```typescript
{
  layout: {
    type: 'd3-force-rect',
    collide: {
      size: (d) => [d.width, d.height],
    },
  },
}
```
