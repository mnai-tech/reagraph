import { hierarchy, tree } from 'd3-hierarchy';

import type { InternalGraphNode } from '../types';
import { buildNodeEdges } from './layoutUtils';
import type { LayoutFactoryProps, LayoutStrategy } from './types';

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

  // const { depths } = getNodeDepth(nodes, edges);
  // Find the root node (or fake root if present)
  const rootNode =
    nodes.find(n => !edges.find(e => e.target === n.id)) || nodes[0];
  // Build a map from node id to node for quick lookup
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Build a tree structure for d3.hierarchy
  function buildTree(node: InternalGraphNode): InternalGraphNode & {
    children?: (InternalGraphNode & { children?: any })[];
  } {
    const children = edges
      .filter(e => e.source === node.id)
      .map(e => nodeMap.get(e.target))
      .filter((c): c is InternalGraphNode => Boolean(c));
    return {
      ...node,
      children: children.length > 0 ? children.map(buildTree) : undefined
    };
  }

  const d3Root = hierarchy(buildTree(rootNode));
  const treeLayout = tree()
    .separation(() => nodeSeparation)
    .nodeSize(nodeSize);
  const treeRoot = treeLayout(d3Root);
  const treeNodes = treeRoot.descendants();
  const path = DIRECTION_MAP[mode];

  // Map node id to position
  const mappedNodes = new Map<string, InternalGraphNode>();
  treeNodes.forEach(t => {
    const data = t.data as InternalGraphNode;
    if (!data || !data.id) return;
    const n = nodeMap.get(data.id);
    if (!n) return;
    mappedNodes.set(data.id, {
      ...n,
      [path.x]: t.x * path.factor,
      [path.y]: t.y * path.factor
    });
  });

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
