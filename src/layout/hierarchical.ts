import { InternalGraphEdge, InternalGraphNode } from 'types';
import { DepthNode, getNodeDepth } from './depthUtils';
import { LayoutFactoryProps, LayoutStrategy } from './types';
import { hierarchy, stratify, tree } from 'd3-hierarchy';
import { buildNodeEdges } from './layoutUtils';

export interface HierarchicalLayoutInputs extends LayoutFactoryProps {
  /**
   * Direction of the layout. Default 'td'.
   */
  mode?: 'td' | 'lr';
  /**
   * Factor of distance between nodes. Default 1.
   */
  nodeSeparation?: number;
  /**
   * Size of each node. Default [50,50]
   */
  nodeSize?: [number, number];
}

const DIRECTION_MAP = {
  td: {
    x: 'x',
    y: 'y',
    factor: -1
  },
  lr: {
    x: 'y',
    y: 'x',
    factor: 1
  }
};

export function hierarchical({
  graph,
  drags,
  mode = 'td',
  nodeSeparation = 2,
  nodeSize = [60, 60],
  getNodePosition
}: HierarchicalLayoutInputs): LayoutStrategy {
  const { nodes, edges } = buildNodeEdges(graph);

  // find root node by finding the nodes which have no incoming edges
  const parentNodes = nodes.filter(n => !edges.find(e => e.target === n.id));
  console.log('parentNodes', parentNodes);

  // if more than 1 root node, then we have multiple trees
  // insert a fake root node to connect all root nodes
  if (parentNodes.length > 1) {
    const fakeRootNode: InternalGraphNode = {
      id: 'fakeRoot',
      label: '',
      fill: '#fff',
      activeFill: '#fff',
      icon: '',
      data: {
        id: 'fakeRoot',
        loaded: true,
        extra: {
          id: 'fakeRoot',
          properties: {},
          labels: []
        },
        className: '',
        style: {
          label: ''
        }
      },
      position: {
        id: '',
        data: {},
        links: [],
        index: 0,
        x: 0,
        y: 0,
        z: 0,
        vx: 0,
        vy: 0
      }
    };

    // add fake root node to nodes
    nodes.push(fakeRootNode);

    // add edges from fake root to root nodes
    parentNodes.forEach(n => {
      edges.push({
        id: `fakeRoot-${n.id}`,
        source: 'fakeRoot',
        target: n.id,
        label: '',
        backgroundColor: '#fff'
      });
    });
  }

  const { depths } = getNodeDepth(nodes, edges);
  const rootNodes = Object.keys(depths).map(d => depths[d]);

  const root = stratify<DepthNode>()
    .id(d => d.data.id)
    .parentId(d => d.ins?.[0]?.data?.id)(rootNodes);

  const treeRoot = tree()
    .separation(() => nodeSeparation)
    .nodeSize(nodeSize)(hierarchy(root));

  const treeNodes = treeRoot.descendants();
  const path = DIRECTION_MAP[mode];

  const mappedNodes = new Map<string, InternalGraphNode>(
    nodes.map(n => {
      const { x, y } = treeNodes.find((t: any) => t.data.id === n.id);
      return [
        n.id,
        {
          ...n,
          [path.x]: x * path.factor,
          [path.y]: y * path.factor,
          z: 0
        }
      ];
    })
  );

  return {
    step() {
      return true;
    },
    getNodePosition(id: string) {
      if (getNodePosition) {
        const pos = getNodePosition(id, { graph, drags, nodes, edges });
        if (pos) {
          return pos;
        }
      }

      if (drags?.[id]?.position) {
        // If we dragged, we need to use that position
        return drags?.[id]?.position as any;
      }

      return mappedNodes.get(id);
    }
  };
}
