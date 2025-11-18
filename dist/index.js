(function() {
  "use strict";
  try {
    if (typeof document != "undefined") {
      var elementStyle = document.createElement("style");
      elementStyle.appendChild(document.createTextNode("._canvas_116y6_1 {\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n}\r\n._container_5mglj_1 {\r\n  border-radius: 50%;\r\n  z-index: 9;\r\n  position: relative;\r\n  height: 175px;\r\n  width: 175px;\r\n  border: solid 5px var(--radial-menu-border);\r\n  overflow: hidden;\r\n  background: var(--radial-menu-background);\r\n}\r\n\r\n  ._container_5mglj_1:before {\r\n    content: ' ';\r\n    background: var(--radial-menu-border);\r\n    border-radius: 50%;\r\n    height: 25px;\r\n    width: 25px;\r\n    position: absolute;\r\n    z-index: 9;\r\n    top: 50%;\r\n    left: 50%;\r\n    transform: translate(-50%, -50%);\r\n  }\r\n._container_1fe76_1 {\r\n  transform-origin: bottom right;\r\n  overflow: hidden;\r\n  position: absolute;\r\n  border: solid 1px var(--radial-menu-border);\r\n}\r\n\r\n  ._container_1fe76_1._disabled_1fe76_13 {\r\n    opacity: 0.6;\r\n  }\r\n\r\n  ._container_1fe76_1._disabled_1fe76_13 ._contentContainer_1fe76_19 {\r\n      cursor: not-allowed;\r\n    }\r\n\r\n  ._container_1fe76_1:not(._disabled_1fe76_13) ._contentContainer_1fe76_19 {\r\n      cursor: pointer;\r\n    }\r\n\r\n  ._container_1fe76_1:not(._disabled_1fe76_13) ._contentContainer_1fe76_19:hover {\r\n        color: var(--radial-menu-active-color);\r\n        background: var(--radial-menu-active-background);\r\n      }\r\n\r\n  ._container_1fe76_1 ._contentContainer_1fe76_19 {\r\n    width: 200%;\r\n    height: 200%;\r\n    transform-origin: 50% 50%;\r\n    border-radius: 50%;\r\n    outline: none;\r\n    transition: background 150ms ease-in-out;\r\n    color: var(--radial-menu-color);\r\n  }\r\n\r\n  ._container_1fe76_1 ._contentContainer_1fe76_19 ._contentInner_1fe76_69 {\r\n      position: absolute;\r\n      width: 100%;\r\n      text-align: center;\r\n    }\r\n\r\n  ._container_1fe76_1 ._contentContainer_1fe76_19 ._contentInner_1fe76_69 ._content_1fe76_19 {\r\n        display: inline-block;\r\n      }\r\n\r\n  ._container_1fe76_1 svg {\r\n    margin: 0 auto;\r\n    fill: var(--radial-menu-active-color);\r\n    height: 25px;\r\n    width: 25px;\r\n    display: block;\r\n  }"));
      document.head.appendChild(elementStyle);
    }
  } catch (e) {
    console.error("vite-plugin-css-injected-by-js", e);
  }
})();
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { extend, useThree, useFrame, Canvas } from "@react-three/fiber";
import ThreeCameraControls from "camera-controls";
import * as holdEvent from "hold-event";
import React, { createContext, useContext, forwardRef, useRef, useState, useEffect, useCallback, useMemo, useImperativeHandle, useLayoutEffect, Fragment as Fragment$1, Suspense } from "react";
import { BoxGeometry, Float32BufferAttribute, CatmullRomCurve3, TubeGeometry, BufferGeometry, Vector3, QuadraticBezierCurve3, LineCurve3, MathUtils, Raycaster, Sphere as Sphere$1, Box3, Spherical, Matrix4, Quaternion, Vector4, Vector2, MOUSE, Color, DoubleSide, Plane, ShaderMaterial, Euler, BufferAttribute, CylinderGeometry, Mesh, TextureLoader, LinearFilter, Scene } from "three";
import Graph from "graphology";
import { create, useStore as useStore$1 } from "zustand";
import { useShallow } from "zustand/shallow";
import { mergeBufferGeometries, SelectionBox } from "three-stdlib";
import { degreeCentrality } from "graphology-metrics/centrality/degree.js";
import { scaleLinear } from "d3-scale";
import pagerank from "graphology-metrics/centrality/pagerank.js";
import { bidirectional } from "graphology-shortest-path";
import { useSpring, a } from "@react-spring/three";
import { Billboard, RoundedBox, Text, useCursor, Html, Image, Svg as Svg$1 } from "@react-three/drei";
import { useGesture } from "@use-gesture/react";
import ellipsize from "ellipsize";
import circular from "graphology-layout/circular.js";
import random from "graphology-layout/random.js";
import forceAtlas2Layout from "graphology-layout-forceatlas2";
import { forceSimulation, forceX, forceY, forceCollide, forceManyBody, forceLink, forceRadial as forceRadial$1, forceCenter, forceZ } from "d3-force-3d";
import { treemap, hierarchy, stratify, tree } from "d3-hierarchy";
import noverlapLayout from "graphology-layout-noverlap";
import classNames from "classnames";
const animationConfig = {
  mass: 10,
  tension: 1e3,
  friction: 300,
  // Decreasing precision to improve performance from 0.00001
  precision: 0.1
};
function getArrowVectors(placement, curve, arrowLength) {
  const curveLength = curve.getLength();
  const absSize = placement === "end" ? curveLength : curveLength / 2;
  const offset = placement === "end" ? arrowLength / 2 : 0;
  const u = (absSize - offset) / curveLength;
  const position = curve.getPointAt(u);
  const rotation = curve.getTangentAt(u);
  return [position, rotation];
}
function getArrowSize(size) {
  return [size + 6, 2 + size / 1.5];
}
function getLayoutCenter(nodes) {
  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;
  for (const node of nodes) {
    minX = Math.min(minX, node.position.x);
    maxX = Math.max(maxX, node.position.x);
    minY = Math.min(minY, node.position.y);
    maxY = Math.max(maxY, node.position.y);
    minZ = Math.min(minZ, node.position.z);
    maxZ = Math.max(maxZ, node.position.z);
  }
  return {
    height: maxY - minY,
    width: maxX - minX,
    minX,
    maxX,
    minY,
    maxY,
    minZ,
    maxZ,
    x: (maxX + minX) / 2,
    y: (maxY + minY) / 2,
    z: (maxZ + minZ) / 2
  };
}
function buildClusterGroups(nodes, clusterAttribute) {
  if (!clusterAttribute) {
    return /* @__PURE__ */ new Map();
  }
  return nodes.reduce((entryMap, e) => {
    const val = e.data[clusterAttribute];
    if (val) {
      entryMap.set(val, [...entryMap.get(val) || [], e]);
    }
    return entryMap;
  }, /* @__PURE__ */ new Map());
}
function calculateClusters({
  nodes,
  clusterAttribute
}) {
  const result = /* @__PURE__ */ new Map();
  if (clusterAttribute) {
    const groups = buildClusterGroups(nodes, clusterAttribute);
    for (const [key, nodes2] of groups) {
      const position = getLayoutCenter(nodes2);
      result.set(key, {
        label: key,
        nodes: nodes2,
        position
      });
    }
  }
  return result;
}
const isNotEditableElement = (element) => {
  return element.tagName !== "INPUT" && element.tagName !== "SELECT" && element.tagName !== "TEXTAREA" && !element.isContentEditable;
};
const createNullGeometry = () => {
  const nullGeom = new BoxGeometry(0, 0, 0);
  const vertexCount = nullGeom.attributes.position.count;
  const colorArray = new Float32Array(vertexCount * 3);
  for (let i = 0; i < vertexCount; i++) {
    colorArray[i * 3] = 1;
    colorArray[i * 3 + 1] = 1;
    colorArray[i * 3 + 2] = 1;
  }
  nullGeom.setAttribute("color", new Float32BufferAttribute(colorArray, 3));
  return nullGeom;
};
const addColorAttribute = (geometry, color) => {
  const vertexCount = geometry.attributes.position.count;
  const colorArray = new Float32Array(vertexCount * 3);
  for (let i = 0; i < vertexCount; i++) {
    colorArray[i * 3] = color.r;
    colorArray[i * 3 + 1] = color.g;
    colorArray[i * 3 + 2] = color.b;
  }
  geometry.setAttribute("color", new Float32BufferAttribute(colorArray, 3));
};
const createDashedGeometry = (curve, radius, color, dashArray = [3, 1]) => {
  const [dashSize, gapSize] = dashArray;
  const totalSize = dashSize + gapSize;
  const curveLength = curve.getLength();
  const numDashes = Math.max(3, Math.floor(curveLength / totalSize));
  const segments = [];
  for (let i = 0; i < numDashes; i++) {
    const startT = i / numDashes;
    const endT = startT + dashSize / totalSize / numDashes;
    if (endT > startT && startT < 1) {
      const points = [];
      const segmentSteps = Math.max(3, Math.floor(8 * (endT - startT)));
      for (let j = 0; j <= segmentSteps; j++) {
        const t = startT + (endT - startT) * (j / segmentSteps);
        if (t <= 1) {
          points.push(curve.getPointAt(t));
        }
      }
      if (points.length >= 2) {
        const segmentCurve = new CatmullRomCurve3(points);
        const segmentGeometry = new TubeGeometry(
          segmentCurve,
          Math.max(2, points.length - 1),
          radius,
          5,
          false
        );
        addColorAttribute(segmentGeometry, color);
        segments.push(segmentGeometry);
      }
    }
  }
  return segments.length > 0 ? mergeBufferGeometries(segments) : new BufferGeometry();
};
function attributeSizing({
  graph,
  attribute,
  defaultSize
}) {
  const map = /* @__PURE__ */ new Map();
  if (attribute) {
    graph.forEachNode((id, node) => {
      const size = node.data?.[attribute];
      if (isNaN(size)) {
        console.warn(`Attribute ${size} is not a number for node ${node.id}`);
      }
      map.set(id, size || 0);
    });
  } else {
    console.warn("Attribute sizing configured but no attribute provided");
  }
  return {
    getSizeForNode: (nodeId) => {
      if (!attribute || !map) {
        return defaultSize;
      }
      return map.get(nodeId);
    }
  };
}
function centralitySizing({
  graph
}) {
  const ranks = degreeCentrality(graph);
  return {
    ranks,
    getSizeForNode: (nodeID) => ranks[nodeID] * 20
  };
}
function pageRankSizing({
  graph
}) {
  const ranks = pagerank(graph);
  return {
    ranks,
    getSizeForNode: (nodeID) => ranks[nodeID] * 80
  };
}
const providers = {
  pagerank: pageRankSizing,
  centrality: centralitySizing,
  attribute: attributeSizing,
  none: ({ defaultSize }) => ({
    getSizeForNode: (_id) => defaultSize
  })
};
function nodeSizeProvider({ type, ...rest }) {
  const provider = providers[type]?.(rest);
  if (!provider && type !== "default") {
    throw new Error(`Unknown sizing strategy: ${type}`);
  }
  const { graph, minSize, maxSize } = rest;
  const sizes = /* @__PURE__ */ new Map();
  let min;
  let max;
  graph.forEachNode((id, node) => {
    let size;
    if (type === "default") {
      size = node.size || rest.defaultSize;
    } else {
      size = provider.getSizeForNode(id);
    }
    if (min === void 0 || size < min) {
      min = size;
    }
    if (max === void 0 || size > max) {
      max = size;
    }
    sizes.set(id, size);
  });
  if (type !== "none") {
    const scale = scaleLinear().domain([min, max]).rangeRound([minSize, maxSize]);
    for (const [nodeId, size] of sizes) {
      sizes.set(nodeId, scale(size));
    }
  }
  return sizes;
}
function calcLabelVisibility({
  nodePosition,
  labelType,
  camera
}) {
  return (shape, size) => {
    const isAlwaysVisible = labelType === "all" || labelType === "nodes" && shape === "node" || labelType === "edges" && shape === "edge";
    if (!isAlwaysVisible && camera && nodePosition && camera?.position?.z / camera?.zoom - nodePosition?.z > 6e3) {
      return false;
    }
    if (isAlwaysVisible) {
      return true;
    } else if (labelType === "auto" && shape === "node") {
      if (size > 7) {
        return true;
      } else if (camera && nodePosition && camera.position.z / camera.zoom - nodePosition.z < 3e3) {
        return true;
      }
    }
    return false;
  };
}
function getLabelOffsetByType(offset, position) {
  switch (position) {
    case "above":
      return offset;
    case "below":
      return -offset;
    case "inline":
    case "natural":
    default:
      return 0;
  }
}
const isServerRender = typeof window === "undefined";
function buildGraph(graph, nodes, edges) {
  graph.clear();
  const addedNodes = /* @__PURE__ */ new Set();
  for (const node of nodes) {
    try {
      if (!addedNodes.has(node.id)) {
        graph.addNode(node.id, node);
        addedNodes.add(node.id);
      }
    } catch (e) {
      console.error(`[Graph] Error adding node '${node.id}`, e);
    }
  }
  for (const edge of edges) {
    if (!addedNodes.has(edge.source) || !addedNodes.has(edge.target)) {
      continue;
    }
    try {
      graph.addEdge(edge.source, edge.target, edge);
    } catch (e) {
      console.error(
        `[Graph] Error adding edge '${edge.source} -> ${edge.target}`,
        e
      );
    }
  }
  return graph;
}
function transformGraph({
  graph,
  layout,
  sizingType,
  labelType,
  sizingAttribute,
  defaultNodeSize,
  minNodeSize,
  maxNodeSize,
  clusterAttribute
}) {
  const nodes = [];
  const edges = [];
  const map = /* @__PURE__ */ new Map();
  const sizes = nodeSizeProvider({
    graph,
    type: sizingType,
    attribute: sizingAttribute,
    minSize: minNodeSize,
    maxSize: maxNodeSize,
    defaultSize: defaultNodeSize
  });
  graph.nodes().length;
  const checkVisibility = calcLabelVisibility({ labelType });
  graph.forEachNode((id, node) => {
    const position = layout.getNodePosition(id);
    const { data, fill, icon, label, size, ...rest } = node;
    const nodeSize = sizes.get(node.id);
    const labelVisible = checkVisibility("node", nodeSize);
    const nodeLinks = graph.inboundNeighbors(node.id) || [];
    const parents = nodeLinks.map((n2) => graph.getNodeAttributes(n2));
    const n = {
      ...node,
      size: nodeSize,
      labelVisible,
      label,
      icon,
      fill,
      cluster: clusterAttribute ? data[clusterAttribute] : void 0,
      parents,
      data: {
        ...rest,
        ...data ?? {}
      },
      position: {
        ...position,
        x: position.x || 0,
        y: position.y || 0,
        z: position.z || 1
      }
    };
    map.set(node.id, n);
    nodes.push(n);
  });
  graph.forEachEdge((_id, link) => {
    const from = map.get(link.source);
    const to = map.get(link.target);
    if (from && to) {
      const { data, id, label, size, ...rest } = link;
      const labelVisible = checkVisibility("edge", size);
      edges.push({
        ...link,
        id,
        label,
        labelVisible,
        size,
        data: {
          ...rest,
          id,
          ...data || {}
        }
      });
    }
  });
  return {
    nodes,
    edges
  };
}
function findPath(graph, source, target) {
  return bidirectional(graph, source, target);
}
const MULTI_EDGE_OFFSET_FACTOR = 0.7;
function getMidPoint(from, to, offset = 0) {
  const fromVector = new Vector3(from.x, from.y || 0, from.z || 0);
  const toVector = new Vector3(to.x, to.y || 0, to.z || 0);
  const midVector = new Vector3().addVectors(fromVector, toVector).divideScalar(2);
  return midVector.setLength(midVector.length() + offset);
}
function getCurvePoints(from, to, offset = -1) {
  const fromVector = from.clone();
  const toVector = to.clone();
  const v = new Vector3().subVectors(toVector, fromVector);
  const vlen = v.length();
  const vn = v.clone().normalize();
  const vv = new Vector3().subVectors(toVector, fromVector).divideScalar(2);
  const k = Math.abs(vn.x) % 1;
  const b = new Vector3(-vn.y, vn.x - k * vn.z, k * vn.y).normalize();
  const vm = new Vector3().add(fromVector).add(vv).add(b.multiplyScalar(vlen / 4).multiplyScalar(offset));
  return [from, vm, to];
}
function getCurve(from, fromOffset, to, toOffset, curved, curveOffset) {
  const offsetFrom = getPointBetween(from, to, fromOffset);
  const offsetTo = getPointBetween(to, from, toOffset);
  return curved ? new QuadraticBezierCurve3(
    ...getCurvePoints(offsetFrom, offsetTo, curveOffset)
  ) : new LineCurve3(offsetFrom, offsetTo);
}
function getSelfLoopCurve(from) {
  const nodePosition = getVector(from);
  const loopRadius = from.size;
  const angle = Math.PI / 2;
  const loopCenter = nodePosition.clone().add(
    new Vector3(
      loopRadius * Math.cos(angle),
      loopRadius * 1.3 * Math.sin(angle),
      0
    )
  );
  const numPoints = 10;
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const theta = i / numPoints * 2 * Math.PI;
    points.push(
      loopCenter.clone().add(
        new Vector3(
          loopRadius * Math.cos(theta),
          loopRadius * Math.sin(theta),
          0
        )
      )
    );
  }
  const selfLoopCurve = new CatmullRomCurve3(points, true);
  return selfLoopCurve;
}
function getVector(node) {
  return new Vector3(node.position.x, node.position.y, node.position.z || 0);
}
function getPointBetween(from, to, offset) {
  const distance = from.distanceTo(to);
  return from.clone().add(
    to.clone().sub(from).multiplyScalar(offset / distance)
  );
}
function updateNodePosition(node, offset) {
  return {
    ...node,
    position: {
      ...node.position,
      x: node.position.x + offset.x,
      y: node.position.y + offset.y,
      z: node.position.z + offset.z
    }
  };
}
function calculateEdgeCurveOffset({ edge, edges, curved }) {
  let updatedCurved = curved;
  let curveOffset;
  const parallelEdges = edges.filter((e) => e.target === edge.target && e.source === edge.source).map((e) => e.id);
  if (parallelEdges.length > 1) {
    updatedCurved = true;
    const edgeIndex = parallelEdges.indexOf(edge.id);
    const offsetMultiplier = edgeIndex === 0 ? 1 : 1 + edgeIndex * 0.8;
    const side = edgeIndex % 2 === 0 ? 1 : -1;
    const magnitude = MULTI_EDGE_OFFSET_FACTOR * offsetMultiplier;
    curveOffset = side * magnitude;
  }
  if (edge.data?.isAggregated && edges.length > 1) {
    const edgeIndex = parallelEdges.indexOf(edge.id);
    return {
      curved: true,
      curveOffset: edgeIndex === 0 ? MULTI_EDGE_OFFSET_FACTOR : -MULTI_EDGE_OFFSET_FACTOR
    };
  }
  return { curved: updatedCurved, curveOffset };
}
function calculateSubLabelOffset(fromPosition, toPosition, subLabelPlacement) {
  const dx = toPosition.x - fromPosition.x;
  const dy = toPosition.y - fromPosition.y;
  const angle = Math.atan2(dy, dx);
  const perpAngle = subLabelPlacement === "above" ? dx >= 0 ? angle + Math.PI / 2 : angle - Math.PI / 2 : dx >= 0 ? angle - Math.PI / 2 : angle + Math.PI / 2;
  const offsetDistance = 7;
  const offsetX = Math.cos(perpAngle) * offsetDistance;
  const offsetY = Math.sin(perpAngle) * offsetDistance;
  return { x: offsetX, y: offsetY, z: 0 };
}
const measurementCache = /* @__PURE__ */ new Map();
let canvasContext = null;
function getCanvasContext() {
  if (!canvasContext) {
    const canvas2 = document.createElement("canvas");
    canvasContext = canvas2.getContext("2d");
    if (!canvasContext) {
      throw new Error("Failed to create canvas context for text measurement");
    }
  }
  return canvasContext;
}
function getCacheKey(options) {
  const {
    text,
    fontSize,
    fontWeight = 400,
    fontFamily = "sans-serif"
  } = options;
  return `${text}|${fontSize}|${fontWeight}|${fontFamily}`;
}
function measureText(options) {
  const cacheKey = getCacheKey(options);
  const cached = measurementCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const {
    text,
    fontSize,
    fontWeight = 400,
    fontFamily = "sans-serif"
  } = options;
  try {
    const context = getCanvasContext();
    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = context.measureText(text);
    const dimensions = {
      width: metrics.width,
      // Use actual bounding box height if available, otherwise estimate from font size
      height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent || fontSize * 1.2
    };
    measurementCache.set(cacheKey, dimensions);
    return dimensions;
  } catch (error) {
    console.warn("Failed to measure text, falling back to estimation:", error);
    const fallback = {
      width: text.length * fontSize * 0.6,
      height: fontSize * 1.2
    };
    return fallback;
  }
}
function clearMeasurementCache() {
  measurementCache.clear();
}
function getMeasurementCacheSize() {
  return measurementCache.size;
}
const createStore = ({
  actives = [],
  selections = [],
  collapsedNodeIds = [],
  theme,
  canvasRef = null
}) => create((set) => ({
  theme: {
    ...theme,
    edge: {
      ...theme?.edge,
      label: {
        ...theme?.edge?.label,
        fontSize: theme?.edge?.label?.fontSize ?? 6
      }
    }
  },
  edges: [],
  nodes: [],
  collapsedNodeIds,
  clusters: /* @__PURE__ */ new Map(),
  panning: false,
  draggingIds: [],
  actives,
  hoveredEdgeIds: [],
  edgeContextMenus: /* @__PURE__ */ new Set(),
  edgeMeshes: [],
  selections,
  hoveredNodeId: null,
  drags: {},
  graph: new Graph({ multi: true }),
  setTheme: (theme2) => set((state) => ({ ...state, theme: theme2 })),
  setClusters: (clusters) => set((state) => ({ ...state, clusters })),
  setEdgeContextMenus: (edgeContextMenus) => set((state) => ({
    ...state,
    edgeContextMenus
  })),
  setEdgeMeshes: (edgeMeshes) => set((state) => ({ ...state, edgeMeshes })),
  setPanning: (panning) => set((state) => ({ ...state, panning })),
  setDrags: (drags) => set((state) => ({ ...state, drags })),
  addDraggingId: (id) => set((state) => ({ ...state, draggingIds: [...state.draggingIds, id] })),
  removeDraggingId: (id) => set((state) => ({
    ...state,
    draggingIds: state.draggingIds.filter((drag) => drag !== id)
  })),
  setActives: (actives2) => set((state) => ({ ...state, actives: actives2 })),
  setSelections: (selections2) => set((state) => ({ ...state, selections: selections2 })),
  setHoveredNodeId: (hoveredNodeId) => set((state) => ({ ...state, hoveredNodeId })),
  setHoveredEdgeIds: (hoveredEdgeIds) => set((state) => ({ ...state, hoveredEdgeIds })),
  setNodes: (nodes) => set((state) => ({
    ...state,
    nodes,
    centerPosition: getLayoutCenter(nodes)
  })),
  setEdges: (edges) => set((state) => ({ ...state, edges })),
  setNodePosition: (id, position) => set((state) => {
    const node = state.nodes.find((n) => n.id === id);
    const originalVector = getVector(node);
    const newVector = new Vector3(position.x, position.y, position.z);
    const offset = newVector.sub(originalVector);
    const nodes = [...state.nodes];
    if (state.selections?.includes(id)) {
      state.selections?.forEach((id2) => {
        const node2 = state.nodes.find((n) => n.id === id2);
        if (node2) {
          const nodeIndex = state.nodes.indexOf(node2);
          nodes[nodeIndex] = updateNodePosition(node2, offset);
        }
      });
    } else {
      const nodeIndex = state.nodes.indexOf(node);
      nodes[nodeIndex] = updateNodePosition(node, offset);
    }
    return {
      ...state,
      drags: {
        ...state.drags,
        [id]: node
      },
      nodes
    };
  }),
  setCollapsedNodeIds: (nodeIds = []) => set((state) => ({ ...state, collapsedNodeIds: nodeIds })),
  canvasRef,
  // Update the position of a cluster with nodes inside it
  setClusterPosition: (id, position) => set((state) => {
    const clusters = new Map(state.clusters);
    const cluster = clusters.get(id);
    if (cluster) {
      const oldPos = cluster.position;
      const offset = new Vector3(
        position.x - oldPos.x,
        position.y - oldPos.y,
        position.z - (oldPos.z ?? 0)
      );
      const nodes = [...state.nodes];
      const drags = { ...state.drags };
      nodes.forEach((node, index) => {
        if (node.cluster === id) {
          nodes[index] = {
            ...node,
            position: {
              ...node.position,
              x: node.position.x + offset.x,
              y: node.position.y + offset.y,
              z: node.position.z + (offset.z ?? 0)
            }
          };
          drags[node.id] = node;
        }
      });
      const clusterNodes = nodes.filter(
        (node) => node.cluster === id
      );
      const newClusterPosition = getLayoutCenter(clusterNodes);
      clusters.set(id, {
        ...cluster,
        position: newClusterPosition
      });
      return {
        ...state,
        drags: {
          ...drags,
          [id]: cluster
        },
        clusters,
        nodes
      };
    }
    return state;
  })
}));
const defaultStore = createStore({});
const StoreContext = isServerRender ? null : createContext(defaultStore);
const Provider = ({ children, store = defaultStore }) => {
  if (isServerRender) {
    return children;
  }
  return React.createElement(StoreContext.Provider, { value: store }, children);
};
const useStore = (selector) => {
  const store = useContext(StoreContext);
  return useStore$1(store, useShallow(selector));
};
const CameraControlsContext = createContext({
  controls: null,
  resetControls: () => void 0,
  zoomIn: () => void 0,
  zoomOut: () => void 0,
  dollyIn: () => void 0,
  dollyOut: () => void 0,
  panLeft: () => void 0,
  panRight: () => void 0,
  panUp: () => void 0,
  panDown: () => void 0,
  freeze: () => void 0,
  unFreeze: () => void 0
});
const useCameraControls = () => {
  const context = useContext(CameraControlsContext);
  if (context === void 0) {
    throw new Error(
      "`useCameraControls` hook must be used within a `ControlsProvider` component"
    );
  }
  return context;
};
ThreeCameraControls.install({
  THREE: {
    MOUSE,
    Vector2,
    Vector3,
    Vector4,
    Quaternion,
    Matrix4,
    Spherical,
    Box3,
    Sphere: Sphere$1,
    Raycaster,
    MathUtils: {
      DEG2RAD: MathUtils?.DEG2RAD,
      clamp: MathUtils?.clamp
    }
  }
});
extend({ ThreeCameraControls });
const CameraControls = forwardRef(
  ({
    mode = "rotate",
    children,
    animated,
    disabled: disabled2,
    minDistance = 1e3,
    maxDistance = 5e4,
    minZoom = 1,
    maxZoom = 100
  }, ref) => {
    const cameraRef = useRef(null);
    const camera = useThree((state) => state.camera);
    const gl = useThree((state) => state.gl);
    const isOrbiting = mode === "orbit";
    const setPanning = useStore((state) => state.setPanning);
    const isDragging = useStore((state) => state.draggingIds.length > 0);
    const cameraSpeedRef = useRef(0);
    const [controlMounted, setControlMounted] = useState(false);
    useFrame((_state, delta) => {
      if (cameraRef.current?.enabled) {
        cameraRef.current?.update(delta);
      }
      if (isOrbiting) {
        cameraRef.current.azimuthAngle += 20 * delta * MathUtils.DEG2RAD;
      }
    }, -1);
    useEffect(() => () => cameraRef.current?.dispose(), []);
    const zoomIn = useCallback(() => {
      cameraRef.current?.zoom(camera.zoom / 2, animated);
    }, [animated, camera.zoom]);
    const zoomOut = useCallback(() => {
      cameraRef.current?.zoom(-camera.zoom / 2, animated);
    }, [animated, camera.zoom]);
    const dollyIn = useCallback(
      (distance) => {
        cameraRef.current?.dolly(distance, animated);
      },
      [animated]
    );
    const dollyOut = useCallback(
      (distance) => {
        cameraRef.current?.dolly(distance, animated);
      },
      [animated]
    );
    const panRight = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(-0.03 * event.deltaTime, 0, animated);
        }
      },
      [animated, isOrbiting]
    );
    const panLeft = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(0.03 * event.deltaTime, 0, animated);
        }
      },
      [animated, isOrbiting]
    );
    const panUp = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(0, 0.03 * event.deltaTime, animated);
        }
      },
      [animated, isOrbiting]
    );
    const panDown = useCallback(
      (event) => {
        if (!isOrbiting) {
          cameraRef.current?.truck(0, -0.03 * event.deltaTime, animated);
        }
      },
      [animated, isOrbiting]
    );
    const onKeyDown = useCallback(
      (event) => {
        if (event.code === "Space") {
          if (mode === "rotate") {
            cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.TRUCK;
          } else {
            cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.ROTATE;
          }
        }
      },
      [mode]
    );
    const onKeyUp = useCallback(
      (event) => {
        if (event.code === "Space") {
          if (mode === "rotate") {
            cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.ROTATE;
          } else {
            cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.TRUCK;
          }
        }
      },
      [mode]
    );
    const [keyControls, setKeyControls] = useState(null);
    useEffect(() => {
      if (!isServerRender) {
        setKeyControls({
          leftKey: new holdEvent.KeyboardKeyHold("ArrowLeft", 100),
          rightKey: new holdEvent.KeyboardKeyHold("ArrowRight", 100),
          upKey: new holdEvent.KeyboardKeyHold("ArrowUp", 100),
          downKey: new holdEvent.KeyboardKeyHold("ArrowDown", 100)
        });
      }
    }, []);
    useEffect(() => {
      if (!disabled2 && keyControls) {
        keyControls.leftKey.addEventListener("holding", panLeft);
        keyControls.rightKey.addEventListener("holding", panRight);
        keyControls.upKey.addEventListener("holding", panUp);
        keyControls.downKey.addEventListener("holding", panDown);
        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
      }
      return () => {
        if (keyControls) {
          keyControls.leftKey.removeEventListener("holding", panLeft);
          keyControls.rightKey.removeEventListener("holding", panRight);
          keyControls.upKey.removeEventListener("holding", panUp);
          keyControls.downKey.removeEventListener("holding", panDown);
          window.removeEventListener("keydown", onKeyDown);
          window.removeEventListener("keyup", onKeyUp);
        }
      };
    }, [
      disabled2,
      onKeyDown,
      onKeyUp,
      panDown,
      panLeft,
      panRight,
      panUp,
      keyControls
    ]);
    useEffect(() => {
      const isOrthographic = mode === "orthographic";
      if (disabled2) {
        cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.NONE;
        cameraRef.current.mouseButtons.middle = ThreeCameraControls.ACTION.NONE;
        cameraRef.current.mouseButtons.wheel = ThreeCameraControls.ACTION.NONE;
      } else {
        cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.TRUCK;
        cameraRef.current.mouseButtons.middle = ThreeCameraControls.ACTION.TRUCK;
        cameraRef.current.mouseButtons.wheel = isOrthographic ? ThreeCameraControls.ACTION.ZOOM : ThreeCameraControls.ACTION.DOLLY;
      }
      if (isOrthographic && cameraRef.current) {
        cameraRef.current.maxZoom = maxZoom;
        cameraRef.current.minZoom = minZoom;
      }
    }, [disabled2, mode, minZoom, maxZoom]);
    useEffect(() => {
      const onControl = () => setPanning(true);
      const onControlEnd = () => setPanning(false);
      const ref2 = cameraRef.current;
      if (ref2) {
        ref2.addEventListener("control", onControl);
        ref2.addEventListener("controlend", onControlEnd);
      }
      return () => {
        if (ref2) {
          ref2.removeEventListener("control", onControl);
          ref2.removeEventListener("controlend", onControlEnd);
        }
      };
    }, [cameraRef, setPanning]);
    useEffect(() => {
      if (isDragging) {
        cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.NONE;
        cameraRef.current.touches.one = ThreeCameraControls.ACTION.NONE;
      } else {
        if (mode === "rotate") {
          cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.ROTATE;
          cameraRef.current.touches.one = ThreeCameraControls.ACTION.TOUCH_ROTATE;
        } else {
          cameraRef.current.touches.one = ThreeCameraControls.ACTION.TOUCH_TRUCK;
          cameraRef.current.mouseButtons.left = ThreeCameraControls.ACTION.TRUCK;
        }
      }
    }, [isDragging, mode]);
    const values = useMemo(
      () => ({
        controls: cameraRef.current,
        zoomIn: () => zoomIn(),
        zoomOut: () => zoomOut(),
        dollyIn: (distance = 1e3) => dollyIn(distance),
        dollyOut: (distance = -1e3) => dollyOut(distance),
        panLeft: (deltaTime = 100) => panLeft({ deltaTime }),
        panRight: (deltaTime = 100) => panRight({ deltaTime }),
        panDown: (deltaTime = 100) => panDown({ deltaTime }),
        panUp: (deltaTime = 100) => panUp({ deltaTime }),
        resetControls: (animated2) => cameraRef.current?.normalizeRotations().reset(animated2),
        freeze: () => {
          if (cameraRef.current.truckSpeed) {
            cameraSpeedRef.current = cameraRef.current.truckSpeed;
          }
          cameraRef.current.truckSpeed = 0;
        },
        unFreeze: () => cameraRef.current.truckSpeed = cameraSpeedRef.current
      }),
      // eslint-disable-next-line
      [zoomIn, zoomOut, panLeft, panRight, panDown, panUp, cameraRef.current]
    );
    useImperativeHandle(ref, () => values);
    return /* @__PURE__ */ jsxs(CameraControlsContext.Provider, { value: values, children: [
      /* @__PURE__ */ jsx(
        "threeCameraControls",
        {
          ref: (controls) => {
            cameraRef.current = controls;
            if (!controlMounted) {
              setControlMounted(true);
            }
          },
          args: [camera, gl.domElement],
          smoothTime: 0.1,
          minDistance,
          dollyToCursor: true,
          maxDistance
        }
      ),
      children
    ] });
  }
);
function visibleHeightAtZDepth(depth, camera) {
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;
  const vFOV = camera.fov / camera.zoom * Math.PI / 180;
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}
function visibleWidthAtZDepth(depth, camera) {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
}
function isNodeInView(camera, nodePosition) {
  const visibleWidth = visibleWidthAtZDepth(1, camera);
  const visibleHeight = visibleHeightAtZDepth(1, camera);
  const visibleArea = {
    x0: camera?.position?.x - visibleWidth / 2,
    x1: camera?.position?.x + visibleWidth / 2,
    y0: camera?.position?.y - visibleHeight / 2,
    y1: camera?.position?.y + visibleHeight / 2
  };
  return nodePosition?.x > visibleArea.x0 && nodePosition?.x < visibleArea.x1 && nodePosition?.y > visibleArea.y0 && nodePosition?.y < visibleArea.y1;
}
function getClosestAxis(angle, axes) {
  return axes.reduce(
    (prev, curr) => Math.abs(curr - angle % Math.PI) < Math.abs(prev - angle % Math.PI) ? curr : prev
  );
}
function getDegreesToClosest2dAxis(horizontalAngle, verticalAngle) {
  const closestHorizontalAxis = getClosestAxis(horizontalAngle, [0, Math.PI]);
  const closestVerticalAxis = getClosestAxis(verticalAngle, [
    Math.PI / 2,
    3 * Math.PI / 2
  ]);
  return {
    horizontalRotation: closestHorizontalAxis - horizontalAngle % Math.PI,
    verticalRotation: closestVerticalAxis - verticalAngle % Math.PI
  };
}
function getHiddenChildren({
  nodeId,
  nodes,
  edges,
  currentHiddenNodes,
  currentHiddenEdges
}) {
  const hiddenNodes = [];
  const hiddenEdges = [];
  const curHiddenNodeIds = currentHiddenNodes.map((n) => n.id);
  const curHiddenEdgeIds = currentHiddenEdges.map((e) => e.id);
  const outboundEdges = edges.filter((l) => l.source === nodeId);
  const outboundEdgeNodeIds = outboundEdges.map((l) => l.target);
  hiddenEdges.push(...outboundEdges);
  for (const outboundEdgeNodeId of outboundEdgeNodeIds) {
    const incomingEdges = edges.filter(
      (l) => l.target === outboundEdgeNodeId && l.source !== nodeId
    );
    let hideNode = false;
    if (incomingEdges.length === 0) {
      hideNode = true;
    } else if (incomingEdges.length > 0 && !curHiddenNodeIds.includes(outboundEdgeNodeId)) {
      const inboundNodeLinkIds = incomingEdges.map((l) => l.id);
      if (inboundNodeLinkIds.every((i) => curHiddenEdgeIds.includes(i))) {
        hideNode = true;
      }
    }
    if (hideNode) {
      const node = nodes.find((n) => n.id === outboundEdgeNodeId);
      if (node) {
        hiddenNodes.push(node);
      }
      const nested = getHiddenChildren({
        nodeId: outboundEdgeNodeId,
        nodes,
        edges,
        currentHiddenEdges: hiddenEdges,
        currentHiddenNodes: hiddenNodes
      });
      hiddenEdges.push(...nested.hiddenEdges);
      hiddenNodes.push(...nested.hiddenNodes);
    }
  }
  const uniqueEdges = Object.values(
    hiddenEdges.reduce(
      (acc, next) => ({
        ...acc,
        [next.id]: next
      }),
      {}
    )
  );
  const uniqueNodes = Object.values(
    hiddenNodes.reduce(
      (acc, next) => ({
        ...acc,
        [next.id]: next
      }),
      {}
    )
  );
  return {
    hiddenEdges: uniqueEdges,
    hiddenNodes: uniqueNodes
  };
}
const getVisibleEntities = ({
  collapsedIds,
  nodes,
  edges
}) => {
  const curHiddenNodes = [];
  const curHiddenEdges = [];
  for (const collapsedId of collapsedIds) {
    const { hiddenEdges, hiddenNodes } = getHiddenChildren({
      nodeId: collapsedId,
      nodes,
      edges,
      currentHiddenEdges: curHiddenEdges,
      currentHiddenNodes: curHiddenNodes
    });
    curHiddenNodes.push(...hiddenNodes);
    curHiddenEdges.push(...hiddenEdges);
  }
  const hiddenNodeIds = curHiddenNodes.map((n) => n.id);
  const hiddenEdgeIds = curHiddenEdges.map((e) => e.id);
  const visibleNodes = nodes.filter((n) => !hiddenNodeIds.includes(n.id));
  const visibleEdges = edges.filter((e) => !hiddenEdgeIds.includes(e.id));
  return {
    visibleNodes,
    visibleEdges
  };
};
const getExpandPath = ({
  nodeId,
  edges,
  visibleEdgeIds
}) => {
  const parentIds = [];
  const inboundEdges = edges.filter((l) => l.target === nodeId);
  const inboundEdgeIds = inboundEdges.map((e) => e.id);
  const hasVisibleInboundEdge = inboundEdgeIds.some(
    (id) => visibleEdgeIds.includes(id)
  );
  if (hasVisibleInboundEdge) {
    return parentIds;
  }
  const inboundEdgeNodeIds = inboundEdges.map((l) => l.source);
  let addedParent = false;
  for (const inboundNodeId of inboundEdgeNodeIds) {
    if (!addedParent) {
      parentIds.push(
        ...[
          inboundNodeId,
          ...getExpandPath({ nodeId: inboundNodeId, edges, visibleEdgeIds })
        ]
      );
      addedParent = true;
    }
  }
  return parentIds;
};
const useCollapse = ({
  collapsedNodeIds = [],
  nodes = [],
  edges = []
}) => {
  const getIsCollapsed = useCallback(
    (nodeId) => {
      const { visibleNodes } = getVisibleEntities({
        nodes,
        edges,
        collapsedIds: collapsedNodeIds
      });
      const visibleNodeIds = visibleNodes.map((n) => n.id);
      return !visibleNodeIds.includes(nodeId);
    },
    [collapsedNodeIds, edges, nodes]
  );
  const getExpandPathIds = useCallback(
    (nodeId) => {
      const { visibleEdges } = getVisibleEntities({
        nodes,
        edges,
        collapsedIds: collapsedNodeIds
      });
      const visibleEdgeIds = visibleEdges.map((e) => e.id);
      return getExpandPath({ nodeId, edges, visibleEdgeIds });
    },
    [collapsedNodeIds, edges, nodes]
  );
  return {
    getIsCollapsed,
    getExpandPathIds
  };
};
const PADDING = 50;
const useCenterGraph = ({
  animated,
  disabled: disabled2,
  layoutType
}) => {
  const nodes = useStore((state) => state.nodes);
  const [isCentered, setIsCentered] = useState(false);
  const invalidate = useThree((state) => state.invalidate);
  const { controls } = useCameraControls();
  const camera = useThree((state) => state.camera);
  const mounted = useRef(false);
  const centerNodes = useCallback(
    async (nodes2, opts) => {
      const animated2 = opts?.animated !== void 0 ? opts?.animated : true;
      const centerOnlyIfNodesNotInView = opts?.centerOnlyIfNodesNotInView !== void 0 ? opts?.centerOnlyIfNodesNotInView : false;
      if (!mounted.current || !centerOnlyIfNodesNotInView || centerOnlyIfNodesNotInView && nodes2?.some((node) => !isNodeInView(camera, node.position))) {
        const { x, y, z } = getLayoutCenter(nodes2);
        await controls.normalizeRotations().setTarget(x, y, z, animated2);
        if (!isCentered) {
          setIsCentered(true);
        }
        invalidate();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [invalidate, controls, nodes]
  );
  const fitNodesInView = useCallback(
    async (nodes2, opts = { animated: true, fitOnlyIfNodesNotInView: false }) => {
      const { fitOnlyIfNodesNotInView } = opts;
      if (!fitOnlyIfNodesNotInView || fitOnlyIfNodesNotInView && nodes2?.some((node) => !isNodeInView(camera, node.position))) {
        const { minX, maxX, minY, maxY, minZ, maxZ } = getLayoutCenter(nodes2);
        if (!layoutType.includes("3d")) {
          const { horizontalRotation, verticalRotation } = getDegreesToClosest2dAxis(
            controls?.azimuthAngle,
            controls?.polarAngle
          );
          void controls?.rotate(horizontalRotation, verticalRotation, true);
        }
        await controls?.zoomTo(1, opts?.animated);
        await controls?.fitToBox(
          new Box3(
            new Vector3(minX, minY, minZ),
            new Vector3(maxX, maxY, maxZ)
          ),
          opts?.animated,
          {
            cover: false,
            paddingLeft: PADDING,
            paddingRight: PADDING,
            paddingBottom: PADDING,
            paddingTop: PADDING
          }
        );
      }
    },
    [camera, controls, layoutType]
  );
  const getNodesById = useCallback(
    (nodeIds) => {
      let mappedNodes = null;
      if (nodeIds?.length) {
        mappedNodes = nodeIds.reduce((acc, id) => {
          const node = nodes.find((n) => n.id === id);
          if (node) {
            acc.push(node);
          } else {
            throw new Error(
              `Attempted to center ${id} but it was not found in the nodes`
            );
          }
          return acc;
        }, []);
      }
      return mappedNodes;
    },
    [nodes]
  );
  const centerNodesById = useCallback(
    (nodeIds, opts) => {
      const mappedNodes = getNodesById(nodeIds);
      centerNodes(mappedNodes || nodes, {
        animated,
        centerOnlyIfNodesNotInView: opts?.centerOnlyIfNodesNotInView
      });
    },
    [animated, centerNodes, getNodesById, nodes]
  );
  const fitNodesInViewById = useCallback(
    async (nodeIds, opts) => {
      const mappedNodes = getNodesById(nodeIds);
      await fitNodesInView(mappedNodes || nodes, { animated, ...opts });
    },
    [animated, fitNodesInView, getNodesById, nodes]
  );
  useLayoutEffect(() => {
    async function load() {
      if (controls && nodes?.length) {
        if (!mounted.current) {
          await centerNodes(nodes, { animated: false });
          await fitNodesInView(nodes, { animated: false });
          mounted.current = true;
        }
      }
    }
    load();
  }, [controls, centerNodes, nodes, animated, camera, fitNodesInView]);
  return { centerNodes, centerNodesById, fitNodesInViewById, isCentered };
};
const Arrow = ({
  animated,
  color = "#D8E6EA",
  length,
  opacity = 0.5,
  position,
  rotation,
  size = 1,
  onActive,
  onContextMenu
}) => {
  const normalizedColor = useMemo(() => new Color(color), [color]);
  const meshRef = useRef(null);
  const isDragging = useStore((state) => state.draggingIds.length > 0);
  const center = useStore((state) => state.centerPosition);
  const [{ pos, arrowOpacity }] = useSpring(
    () => ({
      from: {
        pos: center ? [center.x, center.y, center.z] : [0, 0, 0],
        arrowOpacity: 0
      },
      to: {
        pos: [position.x, position.y, position.z],
        arrowOpacity: opacity
      },
      config: {
        ...animationConfig,
        duration: animated && !isDragging ? void 0 : 0
      }
    }),
    [animated, isDragging, opacity, position]
  );
  const setQuaternion = useCallback(() => {
    const axis = new Vector3(0, 1, 0);
    meshRef.current?.quaternion.setFromUnitVectors(axis, rotation);
  }, [rotation, meshRef]);
  useEffect(() => setQuaternion(), [setQuaternion]);
  return /* @__PURE__ */ jsxs(
    a.mesh,
    {
      position: pos,
      ref: meshRef,
      scale: [1, 1, 1],
      onPointerOver: () => onActive(true),
      onPointerOut: () => onActive(false),
      onPointerDown: (event) => {
        if (event.nativeEvent.buttons === 2) {
          event.stopPropagation();
        }
      },
      onContextMenu: (event) => {
        event.nativeEvent.preventDefault();
        event.stopPropagation();
        onContextMenu();
      },
      children: [
        /* @__PURE__ */ jsx(
          "cylinderGeometry",
          {
            args: [0, size, length, 20, 1, true],
            attach: "geometry"
          }
        ),
        /* @__PURE__ */ jsx(
          a.meshBasicMaterial,
          {
            attach: "material",
            color: normalizedColor,
            depthTest: false,
            opacity: arrowOpacity,
            transparent: true,
            side: DoubleSide,
            fog: true
          }
        )
      ]
    }
  );
};
const useDrag = ({
  draggable,
  set,
  position,
  bounds,
  onDragStart,
  onDragEnd
}) => {
  const camera = useThree((state) => state.camera);
  const raycaster = useThree((state) => state.raycaster);
  const size = useThree((state) => state.size);
  const gl = useThree((state) => state.gl);
  const { mouse2D, mouse3D, offset, normal, plane } = useMemo(
    () => ({
      // Normalized 2D screen space mouse coords
      mouse2D: new Vector2(),
      // 3D world space mouse coords
      mouse3D: new Vector3(),
      // Drag point offset from object origin
      offset: new Vector3(),
      // Normal of the drag plane
      normal: new Vector3(),
      // Drag plane
      plane: new Plane()
    }),
    []
  );
  const clientRect = useMemo(
    () => gl.domElement.getBoundingClientRect(),
    // Size dependency ensures the clientRect updates when container dimensions change.
    // Without it, drag calculations would use stale positioning data from the previous container size.
    [gl.domElement, size]
  );
  return useGesture(
    {
      onDragStart: ({ event }) => {
        const { eventObject, point } = event;
        offset.setFromMatrixPosition(eventObject.matrixWorld).sub(point);
        mouse3D.copy(point);
        onDragStart();
      },
      onDrag: ({ xy, buttons, cancel }) => {
        if (buttons !== 1) {
          cancel();
          return;
        }
        const nx = (xy[0] - (clientRect?.left ?? 0)) / size.width * 2 - 1;
        const ny = -((xy[1] - (clientRect?.top ?? 0)) / size.height) * 2 + 1;
        mouse2D.set(nx, ny);
        raycaster.setFromCamera(mouse2D, camera);
        camera.getWorldDirection(normal).negate();
        plane.setFromNormalAndCoplanarPoint(normal, mouse3D);
        raycaster.ray.intersectPlane(plane, mouse3D);
        const updated = new Vector3(position.x, position.y, position.z).copy(mouse3D).add(offset);
        if (bounds) {
          const center = new Vector3(
            (bounds.minX + bounds.maxX) / 2,
            (bounds.minY + bounds.maxY) / 2,
            (bounds.minZ + bounds.maxZ) / 2
          );
          const radius = (bounds.maxX - bounds.minX) / 2;
          const direction = updated.clone().sub(center);
          const distance = direction.length();
          if (distance > radius) {
            direction.normalize().multiplyScalar(radius);
            updated.copy(center).add(direction);
          }
        }
        return set(updated);
      },
      onDragEnd
    },
    { drag: { enabled: draggable, threshold: 10 } }
  );
};
const useHoverIntent = ({
  sensitivity = 7,
  interval = 50,
  timeout = 0,
  disabled: disabled2,
  onPointerOver,
  onPointerOut
}) => {
  const mouseOver = useRef(false);
  const timer = useRef(null);
  const state = useRef(0);
  const coords = useRef({
    x: null,
    y: null,
    px: null,
    py: null
  });
  const onMouseMove = useCallback((event) => {
    coords.current.x = event.clientX;
    coords.current.y = event.clientY;
  }, []);
  const comparePosition = useCallback(
    (event) => {
      timer.current = clearTimeout(timer.current);
      const { px, x, py, y } = coords.current;
      if (Math.abs(px - x) + Math.abs(py - y) < sensitivity) {
        state.current = 1;
        onPointerOver(event);
      } else {
        coords.current.px = x;
        coords.current.py = y;
        timer.current = setTimeout(() => comparePosition(event), interval);
      }
    },
    [interval, onPointerOver, sensitivity]
  );
  const cleanup = useCallback(() => {
    clearTimeout(timer.current);
    if (typeof window !== "undefined") {
      document.removeEventListener("mousemove", onMouseMove, false);
    }
  }, [onMouseMove]);
  const pointerOver = useCallback(
    (event) => {
      if (!disabled2) {
        mouseOver.current = true;
        cleanup();
        if (state.current !== 1) {
          coords.current.px = event.pointer.x;
          coords.current.py = event.pointer.y;
          if (typeof window !== "undefined") {
            document.addEventListener("mousemove", onMouseMove, false);
          }
          timer.current = setTimeout(() => comparePosition(event), timeout);
        }
      }
    },
    [cleanup, comparePosition, disabled2, onMouseMove, timeout]
  );
  const delay = useCallback(
    (event) => {
      timer.current = clearTimeout(timer.current);
      state.current = 0;
      onPointerOut(event);
    },
    [onPointerOut]
  );
  const pointerOut = useCallback(
    (event) => {
      mouseOver.current = false;
      cleanup();
      if (state.current === 1) {
        timer.current = setTimeout(() => delay(event), timeout);
      }
    },
    [cleanup, delay, timeout]
  );
  return {
    pointerOver,
    pointerOut
  };
};
const Ring$1 = ({
  outerRadius,
  innerRadius,
  padding,
  normalizedFill,
  normalizedStroke,
  opacity,
  animated,
  theme
}) => {
  const { opacity: springOpacity } = useSpring({
    from: { opacity: 0 },
    to: { opacity },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("mesh", { children: [
      /* @__PURE__ */ jsx("ringGeometry", { attach: "geometry", args: [outerRadius, 0, 128] }),
      /* @__PURE__ */ jsx(
        a.meshBasicMaterial,
        {
          attach: "material",
          color: normalizedFill,
          transparent: true,
          depthTest: false,
          opacity: theme.cluster?.fill ? springOpacity : 0,
          side: DoubleSide,
          fog: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("mesh", { children: [
      /* @__PURE__ */ jsx(
        "ringGeometry",
        {
          attach: "geometry",
          args: [outerRadius, innerRadius + padding, 128]
        }
      ),
      /* @__PURE__ */ jsx(
        a.meshBasicMaterial,
        {
          attach: "material",
          color: normalizedStroke,
          transparent: true,
          depthTest: false,
          opacity: springOpacity,
          side: DoubleSide,
          fog: true
        }
      )
    ] })
  ] });
};
const calculateTextSize = (text, fontSize, maxWidth, ellipsis, active) => {
  const shortText = ellipsis && !active ? ellipsize(text, ellipsis) : text;
  const lines = [];
  let currentLine = "";
  const words = shortText.split(" ");
  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * fontSize * 1;
    if (testWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  });
  if (currentLine) {
    lines.push(currentLine);
  }
  const width = Math.min(
    maxWidth,
    lines.reduce(
      (max, line) => Math.max(max, line.length * fontSize * 0.4),
      0
    )
  ) + 14;
  const height = lines.length * fontSize + 6;
  return { width, height, text: lines.join("\n"), lineCount: lines.length };
};
const Label = ({
  text,
  fontSize = 4,
  fontUrl,
  color = "#2A6475",
  opacity = 1,
  stroke,
  backgroundColor,
  active,
  rotation,
  maxWidth = 100,
  ellipsis = 100,
  borderRadius
}) => {
  const normalizedColor = useMemo(() => new Color(color), [color]);
  const normalizedBackgroundColor = useMemo(
    () => new Color(backgroundColor),
    [backgroundColor]
  );
  const normalizedStroke = useMemo(
    () => stroke ? new Color(stroke) : void 0,
    [stroke]
  );
  const {
    width,
    height,
    text: processedText,
    lineCount
  } = useMemo(
    () => calculateTextSize(text, fontSize, maxWidth, ellipsis, active),
    [text, fontSize, maxWidth, ellipsis, active]
  );
  return /* @__PURE__ */ jsx(Billboard, { children: backgroundColor ? /* @__PURE__ */ jsx("mesh", { children: /* @__PURE__ */ jsxs(
    RoundedBox,
    {
      position: [0, lineCount * -2, 10],
      args: [width, height, 0],
      radius: borderRadius,
      rotation,
      children: [
        /* @__PURE__ */ jsx(
          Text,
          {
            font: fontUrl,
            fontSize,
            color: normalizedColor,
            fillOpacity: opacity,
            textAlign: "center",
            outlineWidth: stroke ? 1 : 0,
            outlineColor: stroke ? normalizedStroke : null,
            depthOffset: 0,
            maxWidth,
            overflowWrap: "break-word",
            children: processedText
          }
        ),
        /* @__PURE__ */ jsx(
          a.meshBasicMaterial,
          {
            attach: "material",
            opacity,
            depthTest: true,
            color: normalizedBackgroundColor
          }
        )
      ]
    }
  ) }) : /* @__PURE__ */ jsx(
    Text,
    {
      font: fontUrl,
      fontSize,
      color: normalizedColor,
      fillOpacity: opacity,
      textAlign: "center",
      outlineWidth: stroke ? 1 : 0,
      outlineColor: normalizedStroke,
      depthOffset: 0,
      maxWidth,
      overflowWrap: "break-word",
      rotation,
      children: processedText
    }
  ) });
};
const Cluster = ({
  animated,
  position,
  padding = 40,
  labelFontUrl,
  disabled: disabled2,
  radius = 2,
  nodes,
  label,
  onClick,
  onPointerOver,
  onPointerOut,
  draggable = false,
  onDragged,
  onRender
}) => {
  const theme = useStore((state) => state.theme);
  const rad = Math.max(position.width, position.height) / 2;
  const offset = rad - radius + padding;
  const [active, setActive] = useState(false);
  const center = useStore((state) => state.centerPosition);
  const nodesState = useStore((state) => state.nodes);
  const cameraControls = useCameraControls();
  const draggingIds = useStore((state) => state.draggingIds);
  const isDraggingCurrent = draggingIds.includes(label);
  const isDragging = draggingIds.length > 0;
  const isActive = useStore(
    (state) => state.actives?.some((id) => nodes.some((n) => n.id === id))
  );
  const hoveredNodeId = useStore((state) => state.hoveredNodeId);
  const isSelected = useStore(
    (state) => state.selections?.some((id) => nodes.some((n) => n.id === id))
  );
  const hasSelections = useStore((state) => state.selections?.length > 0);
  const opacity = hasSelections ? isSelected || active || isActive ? theme.cluster?.selectedOpacity : theme.cluster?.inactiveOpacity : theme.cluster?.opacity;
  const labelPosition = useMemo(() => {
    const defaultPosition = [0, -offset, 2];
    const themeOffset = theme.cluster?.label?.offset;
    if (themeOffset) {
      return [
        defaultPosition[0] - themeOffset[0],
        defaultPosition[1] - themeOffset[1],
        defaultPosition[2] - themeOffset[2]
      ];
    }
    return defaultPosition;
  }, [offset, theme.cluster?.label?.offset]);
  const { circlePosition } = useSpring({
    from: {
      circlePosition: [center.x, center.y, -1]
    },
    to: {
      circlePosition: position ? [position.x, position.y, -1] : [0, 0, -1]
    },
    config: {
      ...animationConfig,
      duration: animated && !isDragging ? void 0 : 0
    }
  });
  const normalizedStroke = useMemo(
    () => new Color(theme.cluster?.stroke),
    [theme.cluster?.stroke]
  );
  const normalizedFill = useMemo(
    () => new Color(theme.cluster?.fill),
    [theme.cluster?.fill]
  );
  const addDraggingId = useStore((state) => state.addDraggingId);
  const removeDraggingId = useStore((state) => state.removeDraggingId);
  const setClusterPosition = useStore((state) => state.setClusterPosition);
  const bind = useDrag({
    draggable: draggable && !hoveredNodeId,
    position: {
      x: position.x,
      y: position.y,
      z: -1
    },
    set: (pos) => setClusterPosition(label, pos),
    onDragStart: () => {
      addDraggingId(label);
      setActive(true);
    },
    onDragEnd: () => {
      removeDraggingId(label);
      setActive(false);
      const updatedClusterNodes = nodesState.filter((n) => n.cluster === label);
      onDragged?.({ nodes: updatedClusterNodes, label });
    }
  });
  useCursor(active && !isDragging && onClick !== void 0, "pointer");
  useCursor(
    active && draggable && !isDraggingCurrent && onClick === void 0,
    "grab"
  );
  useCursor(isDraggingCurrent, "grabbing");
  const { pointerOver, pointerOut } = useHoverIntent({
    disabled: disabled2,
    onPointerOver: (event) => {
      setActive(true);
      cameraControls.freeze();
      onPointerOver?.(
        {
          nodes,
          label
        },
        event
      );
    },
    onPointerOut: (event) => {
      setActive(false);
      cameraControls.unFreeze();
      onPointerOut?.(
        {
          nodes,
          label
        },
        event
      );
    }
  });
  const cluster = useMemo(
    () => theme.cluster && /* @__PURE__ */ jsx(
      a.group,
      {
        userData: { id: label, type: "cluster" },
        position: circlePosition,
        onPointerOver: pointerOver,
        onPointerOut: pointerOut,
        onClick: (event) => {
          if (!disabled2 && !isDraggingCurrent) {
            onClick?.({ nodes, label }, event);
          }
        },
        ...bind(),
        children: onRender ? onRender({
          label: {
            position: labelPosition,
            text: label,
            opacity,
            fontUrl: labelFontUrl
          },
          opacity,
          outerRadius: offset,
          innerRadius: rad,
          padding,
          theme
        }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Ring$1,
            {
              outerRadius: offset,
              innerRadius: rad,
              padding,
              normalizedFill,
              normalizedStroke,
              opacity,
              animated,
              theme
            }
          ),
          theme.cluster?.label && /* @__PURE__ */ jsx(a.group, { position: labelPosition, children: /* @__PURE__ */ jsx(
            Label,
            {
              text: label,
              opacity,
              fontUrl: labelFontUrl,
              stroke: theme.cluster.label.stroke,
              active: false,
              color: theme.cluster?.label.color,
              fontSize: theme.cluster?.label.fontSize ?? 12,
              ellipsis: theme.cluster.label.ellipsis,
              backgroundColor: theme.cluster.label.backgroundColor,
              borderRadius: theme.cluster.label.borderRadius
            }
          ) })
        ] })
      }
    ),
    [
      theme,
      circlePosition,
      pointerOver,
      pointerOut,
      offset,
      normalizedFill,
      rad,
      padding,
      normalizedStroke,
      labelPosition,
      label,
      opacity,
      labelFontUrl,
      disabled2,
      onClick,
      nodes,
      bind,
      isDraggingCurrent,
      onRender,
      animated
    ]
  );
  return cluster;
};
const SelfLoop = ({
  id,
  curve,
  opacity = 1,
  size = 1,
  color = "#000",
  animated,
  onPointerOver,
  onPointerOut,
  onClick,
  onContextMenu
}) => {
  const { scale, loopOpacity } = useSpring({
    from: {
      // Note: This prevents incorrect scaling w/ 0
      scale: [1e-5, 1e-5, 1e-5],
      loopOpacity: 0
    },
    to: {
      scale: [size, size, size],
      loopOpacity: opacity
    },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  const normalizedColor = useMemo(() => new Color(color), [color]);
  return /* @__PURE__ */ jsxs(
    a.mesh,
    {
      userData: { id, type: "edge" },
      renderOrder: -1,
      onPointerOver,
      onPointerOut,
      onClick,
      onPointerDown: (event) => {
        if (event.nativeEvent.buttons === 2) {
          event.nativeEvent.preventDefault();
          event.stopPropagation();
          onContextMenu();
        }
      },
      scale,
      children: [
        /* @__PURE__ */ jsx("tubeGeometry", { attach: "geometry", args: [curve, 128, size / 2, 8, true] }),
        /* @__PURE__ */ jsx(
          a.meshBasicMaterial,
          {
            attach: "material",
            opacity: loopOpacity,
            fog: true,
            transparent: true,
            depthTest: false,
            color: normalizedColor
          }
        )
      ]
    }
  );
};
const dashedVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const dashedFragmentShader = `
  uniform vec3 color;
  uniform float opacity;
  uniform float dashSize;
  uniform float gapSize;
  uniform float lineLength;
  varying vec2 vUv;

  void main() {
    float totalSize = dashSize + gapSize;
    float position = mod(vUv.x * lineLength, totalSize);

    if (position > dashSize) {
      discard;
    }

    gl_FragColor = vec4(color, opacity);
  }
`;
const Line = ({
  curveOffset,
  animated,
  color = "#000",
  curve,
  curved = false,
  dashed = false,
  dashArray = [3, 1],
  id,
  opacity = 1,
  size = 1,
  renderOrder = -1,
  onContextMenu,
  onClick,
  onPointerOver,
  onPointerOut
}) => {
  const tubeRef = useRef(null);
  const isDragging = useStore((state) => state.draggingIds.length > 0);
  const normalizedColor = useMemo(() => new Color(color), [color]);
  const center = useStore((state) => state.centerPosition);
  const mounted = useRef(false);
  const dashedMaterial = useMemo(() => {
    if (!dashed) return null;
    const [dashSize, dashGap] = dashArray;
    return new ShaderMaterial({
      uniforms: {
        color: { value: normalizedColor },
        opacity: { value: opacity },
        dashSize: { value: dashSize },
        gapSize: { value: dashGap },
        lineLength: { value: curve.getLength() }
      },
      vertexShader: dashedVertexShader,
      fragmentShader: dashedFragmentShader,
      transparent: true,
      depthTest: false
    });
  }, [dashed, normalizedColor, opacity, curve, dashArray]);
  const { lineOpacity } = useSpring({
    from: {
      lineOpacity: 0
    },
    to: {
      lineOpacity: opacity
    },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  useSpring(() => {
    const from = curve.getPoint(0);
    const to = curve.getPoint(1);
    return {
      from: {
        // Animate from center first time, then from the actual from point
        fromVertices: !mounted.current ? [center?.x, center?.y, center?.z || 0] : [to?.x, to?.y, to?.z || 0],
        toVertices: [from?.x, from?.y, from?.z || 0]
      },
      to: {
        fromVertices: [from?.x, from?.y, from?.z || 0],
        toVertices: [to?.x, to?.y, to?.z || 0]
      },
      onChange: (event) => {
        const { fromVertices, toVertices } = event.value;
        const fromVector = new Vector3(...fromVertices);
        const toVector = new Vector3(...toVertices);
        const curve2 = getCurve(fromVector, 0, toVector, 0, curved, curveOffset);
        if (tubeRef.current) {
          const radius = dashed ? size * 0.4 : size / 2;
          tubeRef.current.copy(new TubeGeometry(curve2, 20, radius, 5, false));
        }
      },
      config: {
        ...animationConfig,
        duration: animated && !isDragging ? void 0 : 0
      }
    };
  }, [animated, isDragging, curve, size, dashed, curved, curveOffset]);
  useEffect(() => {
    mounted.current = true;
  }, []);
  return /* @__PURE__ */ jsxs(
    "mesh",
    {
      userData: { id, type: "edge" },
      renderOrder,
      onPointerOver,
      onPointerOut,
      onClick,
      onPointerDown: (event) => {
        if (event.nativeEvent.buttons === 2) {
          event.stopPropagation();
        }
      },
      onContextMenu: (event) => {
        event.nativeEvent.preventDefault();
        event.stopPropagation();
        onContextMenu();
      },
      children: [
        /* @__PURE__ */ jsx("tubeGeometry", { attach: "geometry", ref: tubeRef }),
        dashed ? /* @__PURE__ */ jsx("primitive", { attach: "material", object: dashedMaterial }) : /* @__PURE__ */ jsx(
          a.meshBasicMaterial,
          {
            attach: "material",
            opacity: lineOpacity,
            fog: true,
            transparent: true,
            color: normalizedColor
          }
        )
      ]
    }
  );
};
const LABEL_PLACEMENT_OFFSET = 3;
const Edge$1 = ({
  animated,
  arrowPlacement = "end",
  contextMenu,
  disabled: disabled2,
  labelPlacement = "inline",
  id,
  interpolation,
  labelFontUrl,
  onContextMenu,
  onClick,
  onPointerOver,
  onPointerOut,
  subLabelPlacement = "below"
}) => {
  const theme = useStore((state) => state.theme);
  const isDragging = useStore((state) => state.draggingIds.length > 0);
  const [active, setActive] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const edges = useStore((state) => state.edges);
  const edge = edges.find((e) => e.id === id);
  const {
    target,
    source,
    label,
    subLabel,
    labelVisible = false,
    size = 1,
    fill,
    dashed = false,
    dashArray = [3, 1]
  } = edge;
  const effectiveSubLabelPlacement = edge.subLabelPlacement || subLabelPlacement;
  const from = useStore((store) => store.nodes.find((node) => node.id === source));
  const to = useStore((store) => store.nodes.find((node) => node.id === target));
  const isSelfLoop = from.id === to.id;
  const labelOffset = (size + theme.edge.label.fontSize) / 2;
  const [arrowLength, arrowSize] = useMemo(() => getArrowSize(size), [size]);
  const effectiveInterpolation = edge.interpolation || interpolation;
  const effectiveArrowPlacement = edge.arrowPlacement || arrowPlacement;
  const { curveOffset, curved } = useMemo(
    () => calculateEdgeCurveOffset({
      edge,
      edges,
      curved: effectiveInterpolation === "curved"
    }),
    [edge, edges, effectiveInterpolation]
  );
  const [curve, arrowPosition, arrowRotation] = useMemo(() => {
    const fromVector = getVector(from);
    const fromOffset = from.size;
    const toVector = getVector(to);
    const toOffset = to.size;
    let curve2 = getCurve(
      fromVector,
      fromOffset,
      toVector,
      toOffset,
      curved,
      curveOffset
    );
    const [arrowPosition2, arrowRotation2] = getArrowVectors(
      effectiveArrowPlacement,
      curve2,
      arrowLength
    );
    if (effectiveArrowPlacement === "end") {
      curve2 = getCurve(
        fromVector,
        fromOffset,
        arrowPosition2,
        0,
        curved,
        curveOffset
      );
    }
    return [curve2, arrowPosition2, arrowRotation2];
  }, [from, to, curved, curveOffset, effectiveArrowPlacement, arrowLength]);
  const midPoint = useMemo(() => {
    let newMidPoint = getMidPoint(
      from.position,
      to.position,
      getLabelOffsetByType(labelOffset, labelPlacement)
    );
    if (curved) {
      const offset = new Vector3().subVectors(newMidPoint, curve.getPoint(0.5));
      switch (labelPlacement) {
        case "above":
          offset.y = offset.y - LABEL_PLACEMENT_OFFSET;
          break;
        case "below":
          offset.y = offset.y + LABEL_PLACEMENT_OFFSET;
          break;
      }
      newMidPoint = newMidPoint.sub(offset);
    }
    return newMidPoint;
  }, [from.position, to.position, labelOffset, labelPlacement, curved, curve]);
  const center = useStore((state) => state.centerPosition);
  const isSelected = useStore((state) => state.selections?.includes(id));
  const hasSelections = useStore((state) => state.selections?.length);
  const isActive = useStore((state) => state.actives?.includes(id));
  const isActiveState = active || isActive || isSelected;
  const selectionOpacity = hasSelections ? isSelected || isActive ? theme.edge.selectedOpacity : theme.edge.inactiveOpacity : theme.edge.opacity;
  const subLabelOffset = useMemo(() => {
    return calculateSubLabelOffset(
      from.position,
      to.position,
      effectiveSubLabelPlacement
    );
  }, [from.position, to.position, effectiveSubLabelPlacement]);
  const [{ labelPosition }] = useSpring(
    () => ({
      from: {
        labelPosition: center ? [center.x, center.y, center.z] : [0, 0, 0]
      },
      to: {
        labelPosition: [midPoint.x, midPoint.y, midPoint.z]
      },
      config: {
        ...animationConfig,
        duration: animated && !isDragging ? void 0 : 0
      }
    }),
    [midPoint, animated, isDragging]
  );
  const labelRotation = useMemo(
    () => new Euler(
      0,
      0,
      labelPlacement === "natural" ? 0 : Math.atan(
        (to.position.y - from.position.y) / (to.position.x - from.position.x)
      )
    ),
    [
      to.position.x,
      to.position.y,
      from.position.x,
      from.position.y,
      labelPlacement
    ]
  );
  useCursor(active && !isDragging && onClick !== void 0, "pointer");
  const { pointerOver, pointerOut } = useHoverIntent({
    disabled: disabled2,
    onPointerOver: (event) => {
      setActive(true);
      onPointerOver?.(edge, event);
    },
    onPointerOut: (event) => {
      setActive(false);
      onPointerOut?.(edge, event);
    }
  });
  const selfLoopCurve = useMemo(() => getSelfLoopCurve(from), [from]);
  const arrowComponent = useMemo(() => {
    if (effectiveArrowPlacement === "none") return null;
    let position;
    let rotation;
    if (isSelfLoop && selfLoopCurve) {
      const uEnd = 0.58;
      const uMid = 0.25;
      if (effectiveArrowPlacement === "mid") {
        position = selfLoopCurve.getPointAt(uMid);
        rotation = selfLoopCurve.getTangentAt(uMid);
      } else {
        position = selfLoopCurve.getPointAt(uEnd);
        rotation = selfLoopCurve.getTangentAt(uEnd);
      }
    } else {
      position = arrowPosition;
      rotation = arrowRotation;
    }
    return /* @__PURE__ */ jsx(
      Arrow,
      {
        animated,
        color: isActiveState ? theme.arrow.activeFill : fill || theme.arrow.fill,
        length: arrowLength,
        opacity: selectionOpacity,
        position,
        rotation,
        size: arrowSize,
        onActive: setActive,
        onContextMenu: () => {
          if (!disabled2) {
            setMenuVisible(true);
            onContextMenu?.(edge);
          }
        }
      }
    );
  }, [
    fill,
    animated,
    arrowLength,
    effectiveArrowPlacement,
    arrowPosition,
    arrowRotation,
    arrowSize,
    disabled2,
    edge,
    isActiveState,
    onContextMenu,
    selectionOpacity,
    theme.arrow.activeFill,
    theme.arrow.fill,
    isSelfLoop,
    selfLoopCurve
  ]);
  const labelComponent = useMemo(
    () => labelVisible && label && /* @__PURE__ */ jsxs(
      a.group,
      {
        position: labelPosition,
        onContextMenu: () => {
          if (!disabled2) {
            setMenuVisible(true);
            onContextMenu?.(edge);
          }
        },
        onPointerOver: pointerOver,
        onPointerOut: pointerOut,
        children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              text: label,
              ellipsis: 15,
              fontUrl: labelFontUrl,
              stroke: theme.edge.label.stroke,
              color: isActiveState ? theme.edge.label.activeColor : theme.edge.label.color,
              opacity: selectionOpacity,
              fontSize: theme.edge.label.fontSize,
              rotation: labelRotation,
              active: isActiveState
            }
          ),
          subLabel && /* @__PURE__ */ jsx("group", { position: [subLabelOffset.x, subLabelOffset.y, 0], children: /* @__PURE__ */ jsx(
            Label,
            {
              text: subLabel,
              ellipsis: 15,
              fontUrl: labelFontUrl,
              stroke: theme.edge.subLabel?.stroke || theme.edge.label.stroke,
              active: isActiveState,
              color: isActiveState ? theme.edge.subLabel?.activeColor || theme.edge.label.activeColor : theme.edge.subLabel?.color || theme.edge.label.color,
              opacity: selectionOpacity,
              fontSize: theme.edge.subLabel?.fontSize || theme.edge.label.fontSize * 0.8,
              rotation: labelRotation
            }
          ) })
        ]
      }
    ),
    [
      disabled2,
      edge,
      isActiveState,
      label,
      subLabel,
      labelFontUrl,
      labelPosition,
      subLabelOffset,
      labelRotation,
      labelVisible,
      onContextMenu,
      pointerOut,
      pointerOver,
      selectionOpacity,
      theme.edge.label.activeColor,
      theme.edge.label.color,
      theme.edge.label.fontSize,
      theme.edge.label.stroke,
      theme.edge.subLabel?.stroke,
      theme.edge.subLabel?.activeColor,
      theme.edge.subLabel?.color,
      theme.edge.subLabel?.fontSize
    ]
  );
  const menuComponent = useMemo(
    () => menuVisible && contextMenu && /* @__PURE__ */ jsx(Html, { prepend: true, center: true, position: midPoint, children: contextMenu({ data: edge, onClose: () => setMenuVisible(false) }) }),
    [menuVisible, contextMenu, midPoint, edge]
  );
  return /* @__PURE__ */ jsxs("group", { position: [0, 0, isActiveState ? 1 : 0], children: [
    isSelfLoop && selfLoopCurve ? /* @__PURE__ */ jsx(
      SelfLoop,
      {
        id,
        curve: selfLoopCurve,
        size,
        animated,
        color: isActiveState ? theme.edge.activeFill : fill || theme.edge.fill,
        opacity: selectionOpacity,
        onClick: (event) => {
          if (!disabled2) {
            onClick?.(edge, event);
          }
        },
        onContextMenu: () => {
          if (!disabled2) {
            setMenuVisible(true);
            onContextMenu?.(edge);
          }
        },
        onPointerOver: pointerOver,
        onPointerOut: pointerOut
      }
    ) : /* @__PURE__ */ jsx(
      Line,
      {
        curveOffset,
        animated,
        color: isActiveState ? theme.edge.activeFill : fill || theme.edge.fill,
        curve,
        curved,
        dashed,
        dashArray,
        id,
        opacity: selectionOpacity,
        size,
        renderOrder: isActiveState ? 0 : -1,
        onClick: (event) => {
          if (!disabled2) {
            onClick?.(edge, event);
          }
        },
        onPointerOver: pointerOver,
        onPointerOut: pointerOut,
        onContextMenu: () => {
          if (!disabled2) {
            setMenuVisible(true);
            onContextMenu?.(edge);
          }
        }
      }
    ),
    arrowComponent,
    labelComponent,
    menuComponent
  ] });
};
const Edge = ({
  animated,
  color,
  contextMenu,
  edge,
  labelFontUrl,
  labelPlacement = "inline",
  opacity,
  active
}) => {
  const theme = useStore((state) => state.theme);
  const { target, source, label, labelVisible = false, size = 1 } = edge;
  const nodes = useStore((store) => store.nodes);
  const [from, to] = useMemo(
    () => [
      nodes.find((node) => node.id === source),
      nodes.find((node) => node.id === target)
    ],
    [nodes, source, target]
  );
  const isDragging = useStore((state) => state.draggingIds.length > 0);
  const labelOffset = useMemo(
    () => (size + theme.edge.label.fontSize) / 2,
    [size, theme.edge.label.fontSize]
  );
  const midPoint = useMemo(
    () => getMidPoint(
      from.position,
      to.position,
      getLabelOffsetByType(labelOffset, labelPlacement)
    ),
    [from.position, to.position, labelOffset, labelPlacement]
  );
  const edgeContextMenus = useStore((state) => state.edgeContextMenus);
  const setEdgeContextMenus = useStore((state) => state.setEdgeContextMenus);
  const [{ labelPosition }] = useSpring(
    () => ({
      from: {
        labelPosition: [0, 0, 0]
      },
      to: {
        labelPosition: [midPoint.x, midPoint.y, midPoint.z]
      },
      config: {
        ...animationConfig,
        duration: animated && !isDragging ? void 0 : 0
      }
    }),
    [midPoint, animated, isDragging]
  );
  const removeContextMenu = useCallback(
    (edgeId) => {
      const newEdgeContextMenus = new Set(edgeContextMenus);
      newEdgeContextMenus.delete(edgeId);
      setEdgeContextMenus(newEdgeContextMenus);
    },
    [edgeContextMenus, setEdgeContextMenus]
  );
  const labelRotation = useMemo(
    () => new Euler(
      0,
      0,
      labelPlacement === "natural" ? 0 : Math.atan(
        (to.position.y - from.position.y) / (to.position.x - from.position.x)
      )
    ),
    [
      to.position.x,
      to.position.y,
      from.position.x,
      from.position.y,
      labelPlacement
    ]
  );
  const htmlProps = useMemo(
    () => ({
      prepend: true,
      center: true,
      position: midPoint
    }),
    [midPoint]
  );
  useMemo(
    () => ({
      text: label,
      ellipsis: 15,
      fontUrl: labelFontUrl,
      stroke: theme.edge.label.stroke,
      color,
      opacity,
      fontSize: theme.edge.label.fontSize,
      rotation: labelRotation,
      active
    }),
    [
      label,
      labelFontUrl,
      theme.edge.label.stroke,
      color,
      opacity,
      theme.edge.label.fontSize,
      labelRotation,
      active
    ]
  );
  return /* @__PURE__ */ jsxs("group", { children: [
    labelVisible && label && /* @__PURE__ */ jsx(a.group, { position: labelPosition, children: /* @__PURE__ */ jsx(
      Label,
      {
        text: label,
        fontUrl: labelFontUrl,
        stroke: theme.edge.label.stroke,
        color,
        opacity,
        fontSize: theme.edge.label.fontSize,
        maxWidth: theme.edge.label.maxWidth,
        ellipsis: theme.edge.label.ellipsis,
        rotation: labelRotation,
        backgroundColor: theme.edge.label.backgroundColor,
        borderRadius: theme.edge.label.borderRadius
      }
    ) }),
    contextMenu && edgeContextMenus.has(edge.id) && /* @__PURE__ */ jsx(Html, { ...htmlProps, children: contextMenu({
      data: edge,
      onClose: () => removeContextMenu(edge.id)
    }) })
  ] });
};
function useEdgePositionAnimation(geometry, animated) {
  const geometryRef = useRef(geometry);
  const bufferPool = useRef(null);
  useEffect(() => {
    geometryRef.current = geometry;
    const positions = geometry.getAttribute("position");
    bufferPool.current = new Float32Array(positions.array.length);
  }, [geometry]);
  const getAnimationPositions = useCallback(() => {
    const positions = geometryRef.current.getAttribute("position");
    const from = new Float32Array(positions.array.length);
    return {
      from,
      to: positions.array
    };
  }, []);
  const updateGeometryPosition = useCallback((positions) => {
    const buffer = bufferPool.current;
    buffer.set(positions);
    const newPosition = new BufferAttribute(buffer, 3, false);
    geometryRef.current.setAttribute("position", newPosition);
    newPosition.needsUpdate = true;
  }, []);
  useSpring(() => {
    if (!animated) {
      return null;
    }
    const animationPositions = getAnimationPositions();
    return {
      from: {
        positions: animationPositions.from
      },
      to: {
        positions: animationPositions.to
      },
      onChange: (event) => {
        updateGeometryPosition(event.value.positions);
      },
      config: {
        ...animationConfig,
        duration: animated ? void 0 : 0
      }
    };
  }, [animated, getAnimationPositions, updateGeometryPosition]);
}
function useEdgeOpacityAnimation(animated, hasSelections, theme) {
  const [{ activeOpacity, inactiveOpacity }] = useSpring(() => {
    return {
      from: {
        activeOpacity: 0,
        inactiveOpacity: 0
      },
      to: {
        activeOpacity: hasSelections ? theme.edge.selectedOpacity : theme.edge.opacity,
        inactiveOpacity: hasSelections ? theme.edge.inactiveOpacity : theme.edge.opacity
      },
      config: {
        ...animationConfig,
        duration: animated ? void 0 : 0
      }
    };
  }, [animated, hasSelections, theme]);
  return { activeOpacity, inactiveOpacity };
}
function useEdgeEvents(events, contextMenu, disabled2) {
  const memoizedEvents = useRef(events);
  useEffect(() => {
    memoizedEvents.current = events;
  }, [events]);
  const edgeContextMenus = useStore((state) => state.edgeContextMenus);
  const setEdgeContextMenus = useStore(
    useCallback((state) => state.setEdgeContextMenus, [])
  );
  const setHoveredEdgeIds = useStore(
    useCallback((state) => state.setHoveredEdgeIds, [])
  );
  const clickRef = useRef(false);
  const handleClick = useCallback(() => {
    clickRef.current = true;
  }, []);
  const contextMenuEventRef = useRef(false);
  const handleContextMenu = useCallback(() => {
    contextMenuEventRef.current = true;
  }, []);
  const handleIntersections = useCallback(
    (previous, intersected) => {
      const { onClick, onContextMenu, onPointerOver, onPointerOut } = memoizedEvents.current;
      if (onClick && clickRef.current && !disabled2) {
        clickRef.current = false;
        for (const edge of intersected) {
          onClick(edge);
        }
      }
      if ((contextMenu || onContextMenu) && contextMenuEventRef.current && !disabled2) {
        contextMenuEventRef.current = false;
        const newEdges = new Set(edgeContextMenus);
        let hasChanges = false;
        for (const edge of intersected) {
          if (!edgeContextMenus.has(edge.id)) {
            newEdges.add(edge.id);
            hasChanges = true;
            onContextMenu?.(edge);
          }
        }
        if (hasChanges) {
          setEdgeContextMenus(newEdges);
        }
      }
      const hoveredIds = intersected.length > 0 ? intersected.map((edge) => edge.id) : [];
      setHoveredEdgeIds(hoveredIds);
      if (onPointerOver) {
        const over = intersected.filter((index) => !previous.includes(index));
        over.forEach((edge) => {
          onPointerOver(edge);
        });
      }
      if (onPointerOut) {
        const out = previous.filter((index) => !intersected.includes(index));
        out.forEach((edge) => {
          onPointerOut(edge);
        });
      }
    },
    [
      contextMenu,
      disabled2,
      edgeContextMenus,
      setEdgeContextMenus,
      setHoveredEdgeIds
    ]
  );
  return {
    handleClick,
    handleContextMenu,
    handleIntersections
  };
}
const NULL_GEOMETRY = createNullGeometry();
function useEdgeGeometry(arrowPlacement, interpolation) {
  const stateRef = useRef(null);
  const theme = useStore((state) => state.theme);
  useStore((state) => {
    stateRef.current = state;
  });
  const geometryCacheRef = useRef(/* @__PURE__ */ new Map());
  const baseArrowGeometryRef = useRef(null);
  const getGeometries = useCallback(
    (edges) => {
      const geometries = [];
      const cache = geometryCacheRef.current;
      const { nodes } = stateRef.current;
      const nodesMap = new Map(nodes.map((node) => [node.id, node]));
      if (arrowPlacement !== "none" && !baseArrowGeometryRef.current) {
        baseArrowGeometryRef.current = new CylinderGeometry(
          0,
          1,
          1,
          20,
          1,
          true
        );
      }
      edges.forEach((edge) => {
        const { target, source, size = 1 } = edge;
        const from = nodesMap.get(source);
        const to = nodesMap.get(target);
        if (!from || !to) {
          return;
        }
        const hash = `${from.position.x},${from.position.y},${to.position.x},${to.position.y},${size}`;
        const isSelfLoop = from.id === to.id;
        const edgeInterpolation = edge.interpolation || interpolation;
        const curved = edgeInterpolation === "curved";
        const edgeArrowPlacement = edge.arrowPlacement || arrowPlacement;
        if (cache.has(hash)) {
          geometries.push(cache.get(hash));
          return;
        }
        const fromVector = getVector(from);
        const fromOffset = from.size;
        const toVector = getVector(to);
        const toOffset = to.size;
        let curve;
        if (isSelfLoop) {
          curve = getSelfLoopCurve(from);
        } else {
          curve = getCurve(fromVector, fromOffset, toVector, toOffset, curved);
        }
        const isDashedEdge = edge.dashed;
        const radius = isDashedEdge ? size * 0.4 : size / 2;
        let edgeGeometry;
        if (isDashedEdge) {
          edgeGeometry = createDashedGeometry(
            curve,
            radius,
            new Color(edge.fill ?? theme.edge.fill),
            edge.dashArray
          );
        } else {
          edgeGeometry = new TubeGeometry(curve, 20, radius, 5, false);
        }
        if (edgeArrowPlacement === "none") {
          if (!isDashedEdge) {
            const edgeOnlyColor = new Color(edge.fill ?? theme.edge.fill);
            addColorAttribute(edgeGeometry, edgeOnlyColor);
          }
          geometries.push(edgeGeometry);
          cache.set(hash, edgeGeometry);
          return;
        }
        const [arrowLength, arrowSize] = getArrowSize(size);
        const arrowGeometry = baseArrowGeometryRef.current.clone();
        arrowGeometry.scale(arrowSize, arrowLength, arrowSize);
        let arrowPosition;
        let arrowRotation;
        if (isSelfLoop) {
          const uEnd = 0.58;
          const uMid = 0.25;
          if (edgeArrowPlacement === "mid") {
            arrowPosition = curve.getPointAt(uMid);
            arrowRotation = curve.getTangentAt(uMid);
          } else {
            arrowPosition = curve.getPointAt(uEnd);
            arrowRotation = curve.getTangentAt(uEnd);
          }
        } else {
          [arrowPosition, arrowRotation] = getArrowVectors(
            edgeArrowPlacement,
            curve,
            arrowLength
          );
        }
        const quaternion = new Quaternion();
        quaternion.setFromUnitVectors(new Vector3(0, 1, 0), arrowRotation);
        arrowGeometry.applyQuaternion(quaternion);
        arrowGeometry.translate(
          arrowPosition.x,
          arrowPosition.y,
          arrowPosition.z
        );
        if (edgeArrowPlacement && edgeArrowPlacement === "end" && !isSelfLoop) {
          const adjustedCurve = getCurve(
            fromVector,
            fromOffset,
            arrowPosition,
            0,
            curved
          );
          if (isDashedEdge) {
            edgeGeometry = createDashedGeometry(
              adjustedCurve,
              radius,
              new Color(edge.fill ?? theme.edge.fill),
              edge.dashArray
            );
          } else {
            edgeGeometry = new TubeGeometry(
              adjustedCurve,
              20,
              radius,
              5,
              false
            );
          }
        }
        const finalColor = new Color(edge.fill ?? theme.edge.fill);
        if (!isDashedEdge) {
          addColorAttribute(edgeGeometry, finalColor);
        }
        addColorAttribute(arrowGeometry, finalColor);
        const merged = mergeBufferGeometries([edgeGeometry, arrowGeometry]);
        merged.userData = { ...merged.userData, type: "edge" };
        geometries.push(merged);
        cache.set(hash, merged);
      });
      return geometries;
    },
    [arrowPlacement, interpolation, theme.edge.fill]
  );
  const getGeometry = useCallback(
    (active, inactive) => {
      const activeGeometries = getGeometries(active);
      const inactiveGeometries = getGeometries(inactive);
      return mergeBufferGeometries(
        [
          inactiveGeometries.length ? mergeBufferGeometries(inactiveGeometries) : NULL_GEOMETRY,
          activeGeometries.length ? mergeBufferGeometries(activeGeometries) : NULL_GEOMETRY
        ],
        true
      );
    },
    [getGeometries]
  );
  return {
    getGeometries,
    getGeometry
  };
}
const Edges = ({
  interpolation = "linear",
  arrowPlacement = "end",
  labelPlacement = "inline",
  animated,
  contextMenu,
  disabled: disabled2,
  edges,
  labelFontUrl,
  onClick,
  onContextMenu,
  onPointerOut,
  onPointerOver
}) => {
  const theme = useStore((state) => state.theme);
  const { getGeometries, getGeometry } = useEdgeGeometry(
    arrowPlacement,
    interpolation
  );
  const draggingIds = useStore((state) => state.draggingIds);
  const edgeMeshes = useStore((state) => state.edgeMeshes);
  const setEdgeMeshes = useStore((state) => state.setEdgeMeshes);
  const actives = useStore((state) => state.actives || []);
  const selections = useStore((state) => state.selections || []);
  const hoveredEdgeIds = useStore((state) => state.hoveredEdgeIds || []);
  const [active, inactive, draggingActive, draggingInactive] = useMemo(() => {
    const active2 = [];
    const inactive2 = [];
    const draggingActive2 = [];
    const draggingInactive2 = [];
    edges.forEach((edge) => {
      if (draggingIds.includes(edge.source) || draggingIds.includes(edge.target)) {
        if (selections.includes(edge.id) || actives.includes(edge.id) || hoveredEdgeIds.includes(edge.id)) {
          draggingActive2.push(edge);
        } else {
          draggingInactive2.push(edge);
        }
        return;
      }
      if (selections.includes(edge.id) || actives.includes(edge.id) || hoveredEdgeIds.includes(edge.id)) {
        active2.push(edge);
      } else {
        inactive2.push(edge);
      }
    });
    return [active2, inactive2, draggingActive2, draggingInactive2];
  }, [edges, actives, selections, draggingIds, hoveredEdgeIds]);
  const hasSelections = !!selections.length;
  const staticEdgesGeometry = useMemo(
    () => getGeometry(active, inactive),
    [getGeometry, active, inactive]
  );
  const { activeOpacity, inactiveOpacity } = useEdgeOpacityAnimation(
    animated,
    hasSelections,
    theme
  );
  useEdgePositionAnimation(staticEdgesGeometry, animated);
  useEffect(() => {
    if (draggingIds.length === 0) {
      const edgeGeometries = getGeometries(edges);
      const edgeMeshes2 = edgeGeometries.map((edge) => new Mesh(edge));
      setEdgeMeshes(edgeMeshes2);
    }
  }, [getGeometries, setEdgeMeshes, edges, draggingIds.length]);
  const staticEdgesRef = useRef(new Mesh());
  const dynamicEdgesRef = useRef(new Mesh());
  const intersect = useCallback(
    (raycaster) => {
      if (!raycaster.camera) {
        return [];
      }
      const intersections = raycaster.intersectObjects(edgeMeshes);
      if (!intersections.length) {
        return [];
      }
      return intersections.map(
        (intersection) => edges[edgeMeshes.indexOf(intersection.object)]
      );
    },
    [edgeMeshes, edges]
  );
  const { handleClick, handleContextMenu, handleIntersections } = useEdgeEvents(
    {
      onClick,
      onContextMenu,
      onPointerOut,
      onPointerOver
    },
    contextMenu,
    disabled2
  );
  const draggingIdRef = useRef([]);
  const intersectingRef = useRef([]);
  useFrame((state) => {
    staticEdgesRef.current.geometry = staticEdgesGeometry;
    if (disabled2) {
      return;
    }
    const previousDraggingId = draggingIdRef.current;
    if (draggingIds.length || draggingIds.length === 0 && previousDraggingId !== null) {
      dynamicEdgesRef.current.geometry = getGeometry(
        draggingActive,
        draggingInactive
      );
    }
    draggingIdRef.current = draggingIds;
    if (draggingIds.length) {
      return;
    }
    const previousIntersecting = intersectingRef.current;
    const intersecting = intersect(state.raycaster);
    handleIntersections(previousIntersecting, intersecting);
    if (intersecting.join() !== previousIntersecting.join()) {
      dynamicEdgesRef.current.geometry = getGeometry(intersecting, []);
    }
    intersectingRef.current = intersecting;
  });
  return /* @__PURE__ */ jsxs("group", { onClick: handleClick, onContextMenu: handleContextMenu, children: [
    /* @__PURE__ */ jsxs("mesh", { ref: staticEdgesRef, children: [
      /* @__PURE__ */ jsx(
        a.meshBasicMaterial,
        {
          attach: "material-0",
          color: theme.edge.fill,
          depthTest: true,
          fog: true,
          opacity: inactiveOpacity,
          side: DoubleSide,
          transparent: true,
          vertexColors: true
        }
      ),
      /* @__PURE__ */ jsx(
        a.meshBasicMaterial,
        {
          attach: "material-1",
          color: theme.edge.activeFill,
          depthTest: true,
          fog: true,
          opacity: activeOpacity,
          side: DoubleSide,
          transparent: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("mesh", { ref: dynamicEdgesRef, children: [
      /* @__PURE__ */ jsx(
        a.meshBasicMaterial,
        {
          attach: "material-0",
          color: theme.edge.fill,
          depthTest: true,
          fog: true,
          opacity: inactiveOpacity,
          side: DoubleSide,
          transparent: true
        }
      ),
      /* @__PURE__ */ jsx(
        a.meshBasicMaterial,
        {
          attach: "material-1",
          color: theme.edge.activeFill,
          depthTest: true,
          fog: true,
          opacity: activeOpacity,
          side: DoubleSide,
          transparent: true
        }
      )
    ] }),
    edges.map((edge) => {
      const isSelected = selections.includes(edge.id);
      const isActive = actives.includes(edge.id);
      const isHovered = hoveredEdgeIds.includes(edge.id);
      return /* @__PURE__ */ jsx(
        Edge,
        {
          animated,
          contextMenu,
          color: isSelected || isActive || isHovered ? theme.edge.label.activeColor : theme.edge.label.color,
          disabled: disabled2,
          edge,
          labelFontUrl,
          labelPlacement,
          active: isSelected || isActive || isHovered
        },
        edge.id
      );
    })
  ] });
};
const DEFAULT_FONT_SIZE = 0.3;
const Badge = ({
  label,
  size,
  opacity = 1,
  animated,
  backgroundColor = "#ffffff",
  textColor = "#000000",
  strokeColor,
  strokeWidth = 0,
  radius = 0.12,
  badgeSize = 1.5,
  position = "top-right",
  padding = 0.15,
  icon,
  iconSize = 0.35,
  iconPosition = "start",
  fontSize = DEFAULT_FONT_SIZE,
  fontWeight,
  iconTextGap = 0.01
}) => {
  const normalizedBgColor = useMemo(
    () => new Color(backgroundColor),
    [backgroundColor]
  );
  const normalizedTextColor = useMemo(() => new Color(textColor), [textColor]);
  const normalizedStrokeColor = useMemo(
    () => strokeColor ? new Color(strokeColor) : null,
    [strokeColor]
  );
  const normalizedRadius = Math.min(radius, 0.2);
  const normalizedFontWeight = useMemo(() => {
    if (fontWeight === void 0) return void 0;
    return Math.max(100, Math.min(900, Math.round(fontWeight / 100) * 100));
  }, [fontWeight]);
  const badgePosition = useMemo(() => {
    if (Array.isArray(position)) {
      return position;
    }
    const offset = size * 0.65;
    switch (position) {
      case "top-right":
        return [offset, offset, 11];
      case "top-left":
        return [-offset, offset, 11];
      case "bottom-right":
        return [offset, -offset, 11];
      case "bottom-left":
        return [-offset, -offset, 11];
      case "center":
        return [0, 0, 11];
      default:
        return [offset, offset, 11];
    }
  }, [position, size]);
  const textSizeCalculations = useMemo(() => {
    const fontSizeScale = fontSize / DEFAULT_FONT_SIZE;
    const fontWeightMultiplier = (normalizedFontWeight ?? 0) >= 700 ? 1.1 : 1;
    const measured = measureText({
      text: label,
      fontSize,
      fontWeight: normalizedFontWeight
    });
    const estimatedTextWidth = measured.width;
    return {
      fontSizeScale,
      fontWeightMultiplier,
      estimatedTextWidth
    };
  }, [fontSize, normalizedFontWeight, label]);
  const badgeDimensions = useMemo(() => {
    const baseWidth = 0.5;
    const baseHeight = 0.5;
    const minWidth = baseWidth;
    const minHeight = baseHeight;
    const { fontSizeScale, estimatedTextWidth } = textSizeCalculations;
    let contentWidth = estimatedTextWidth;
    if (icon) {
      contentWidth += iconSize + iconTextGap;
    }
    const estimatedWidth = Math.max(minWidth, contentWidth + padding * 2);
    const charCount = label?.length;
    const estimatedHeight = Math.max(
      minHeight,
      Math.min(
        charCount * 0.05 * fontSizeScale + padding * 0.5,
        0.8 * fontSizeScale + padding * 0.5
      )
    );
    return {
      width: estimatedWidth,
      height: estimatedHeight
    };
  }, [
    textSizeCalculations,
    label?.length,
    padding,
    icon,
    iconSize,
    iconTextGap
  ]);
  const { scale } = useSpring({
    from: {
      scale: [1e-5, 1e-5, 1e-5]
    },
    to: {
      scale: [size * badgeSize, size * badgeSize, size * badgeSize]
    },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  const contentLayout = useMemo(() => {
    if (!icon) {
      return {
        textX: 0,
        textY: 0,
        iconX: 0,
        iconY: 0
      };
    }
    if (Array.isArray(iconPosition)) {
      return {
        iconX: iconPosition[0],
        iconY: iconPosition[1],
        textX: 0,
        textY: 0
      };
    }
    const { estimatedTextWidth } = textSizeCalculations;
    const totalContentWidth = iconSize + iconTextGap + estimatedTextWidth;
    const startX = -totalContentWidth / 2;
    if (iconPosition === "start") {
      return {
        iconX: startX + iconSize / 2,
        iconY: 0,
        textX: startX + iconSize + iconTextGap + estimatedTextWidth / 2,
        textY: 0
      };
    } else {
      return {
        textX: startX + estimatedTextWidth / 2,
        textY: 0,
        iconX: startX + estimatedTextWidth + iconTextGap + iconSize / 2,
        iconY: 0
      };
    }
  }, [textSizeCalculations, icon, iconSize, iconPosition, iconTextGap]);
  return /* @__PURE__ */ jsx(Billboard, { position: badgePosition, children: /* @__PURE__ */ jsxs(a.group, { scale, renderOrder: 2, children: [
    strokeWidth > 0 && normalizedStrokeColor && /* @__PURE__ */ jsx(a.mesh, { position: [0, 0, 0.9], children: /* @__PURE__ */ jsx(
      RoundedBox,
      {
        args: [
          badgeDimensions.width + strokeWidth,
          badgeDimensions.height + strokeWidth,
          0.01
        ],
        radius: normalizedRadius,
        smoothness: 8,
        "material-color": normalizedStrokeColor,
        "material-transparent": true,
        "material-opacity": opacity
      }
    ) }),
    /* @__PURE__ */ jsx(a.mesh, { position: [0, 0, 1], children: /* @__PURE__ */ jsx(
      RoundedBox,
      {
        args: [badgeDimensions.width, badgeDimensions.height, 0.01],
        radius: normalizedRadius,
        smoothness: 8,
        "material-color": normalizedBgColor,
        "material-transparent": true,
        "material-opacity": opacity
      }
    ) }),
    icon && /* @__PURE__ */ jsx(
      Image,
      {
        url: icon,
        position: [contentLayout.iconX, contentLayout.iconY, 1.1],
        scale: [iconSize, iconSize],
        transparent: true,
        "material-depthTest": false,
        "material-depthWrite": false
      }
    ),
    /* @__PURE__ */ jsx(
      Text,
      {
        position: [contentLayout.textX, contentLayout.textY, 1.1],
        fontSize,
        fontWeight: normalizedFontWeight,
        color: normalizedTextColor,
        anchorX: "center",
        anchorY: "middle",
        textAlign: "center",
        "material-depthTest": false,
        "material-depthWrite": false,
        children: label
      }
    )
  ] }) });
};
const Icon = ({
  image,
  id,
  size,
  opacity = 1,
  animated
}) => {
  const texture = useMemo(() => new TextureLoader().load(image), [image]);
  const { scale, spriteOpacity } = useSpring({
    from: {
      scale: [1e-5, 1e-5, 1e-5],
      spriteOpacity: 0
    },
    to: {
      scale: [size, size, size],
      spriteOpacity: opacity
    },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  return /* @__PURE__ */ jsx(a.sprite, { userData: { id, type: "node" }, scale, children: /* @__PURE__ */ jsx(
    a.spriteMaterial,
    {
      attach: "material",
      opacity: spriteOpacity,
      fog: true,
      depthTest: false,
      transparent: true,
      side: DoubleSide,
      children: /* @__PURE__ */ jsx("primitive", { attach: "map", object: texture, minFilter: LinearFilter })
    }
  ) });
};
const Ring = ({
  color = "#D8E6EA",
  size = 1,
  opacity = 0.5,
  animated,
  strokeWidth,
  innerRadius = 2,
  segments = 50
}) => {
  const normalizedColor = useMemo(() => new Color(color), [color]);
  const { ringSize, ringOpacity } = useSpring({
    from: {
      ringOpacity: 0,
      ringSize: [1e-5, 1e-5, 1e-5]
    },
    to: {
      ringOpacity: opacity,
      ringSize: [size / 2, size / 2, 1]
    },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  const strokeWidthFraction = strokeWidth / 10;
  const outerRadius = innerRadius + strokeWidthFraction;
  return /* @__PURE__ */ jsx(Billboard, { position: [0, 0, 1], children: /* @__PURE__ */ jsxs(
    a.mesh,
    {
      scale: ringSize,
      raycast: opacity > 0 ? void 0 : () => [],
      children: [
        /* @__PURE__ */ jsx(
          "ringGeometry",
          {
            attach: "geometry",
            args: [innerRadius, outerRadius, segments]
          }
        ),
        /* @__PURE__ */ jsx(
          a.meshBasicMaterial,
          {
            attach: "material",
            color: normalizedColor,
            transparent: true,
            depthTest: true,
            opacity: ringOpacity,
            side: DoubleSide,
            fog: true
          }
        )
      ]
    }
  ) });
};
const Sphere = ({
  color,
  id,
  size,
  selected,
  active,
  opacity,
  animated,
  showRing
}) => {
  const { scale, nodeOpacity } = useSpring({
    from: {
      // Note: This prevents incorrect scaling w/ 0
      scale: [1e-5, 1e-5, 1e-5],
      nodeOpacity: 0
    },
    to: {
      scale: active ? [size * 1.05, size * 1.05, size * 1.05] : [size, size, size],
      nodeOpacity: opacity
    },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  const normalizedColor = useMemo(() => new Color(color), [color]);
  const theme = useStore((state) => state.theme);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(a.mesh, { userData: { id, type: "node" }, scale, children: [
      /* @__PURE__ */ jsx("sphereGeometry", { attach: "geometry", args: [1, 25, 25] }),
      /* @__PURE__ */ jsx(
        a.meshPhongMaterial,
        {
          attach: "material",
          side: DoubleSide,
          transparent: true,
          fog: true,
          opacity: nodeOpacity,
          color: normalizedColor,
          emissive: normalizedColor,
          emissiveIntensity: 0.7
        }
      )
    ] }),
    (showRing || selected || active) && /* @__PURE__ */ jsx(a.mesh, { position: [0, 0, 0], children: /* @__PURE__ */ jsx(
      Ring,
      {
        opacity: 1,
        size: size / 1,
        animated,
        color: theme.ring.activeFill,
        strokeWidth: 5
      }
    ) })
  ] });
};
const SphereWithIcon = ({
  color,
  id,
  size,
  opacity = 1,
  node,
  active = false,
  animated,
  image,
  selected
}) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(
    Sphere,
    {
      id,
      selected,
      size,
      opacity,
      animated,
      color,
      node,
      active,
      showRing: node.showRing
    }
  ),
  /* @__PURE__ */ jsx(
    Icon,
    {
      id,
      image,
      selected,
      size: size + 8,
      opacity,
      animated,
      color,
      node,
      active
    }
  )
] });
const Svg = ({
  id,
  image,
  color,
  size,
  opacity = 1,
  animated,
  ...rest
}) => {
  const normalizedSize = size / 25;
  const { scale } = useSpring({
    from: {
      scale: [1e-5, 1e-5, 1e-5]
    },
    to: {
      scale: [normalizedSize, normalizedSize, normalizedSize]
    },
    config: {
      ...animationConfig,
      duration: animated ? void 0 : 0
    }
  });
  const normalizedColor = useMemo(() => new Color(color), [color]);
  return /* @__PURE__ */ jsx(a.group, { userData: { id, type: "node" }, scale, children: /* @__PURE__ */ jsx(Billboard, { position: [0, 0, 1], children: /* @__PURE__ */ jsx(
    Svg$1,
    {
      ...rest,
      src: image,
      fillMaterial: {
        fog: true,
        depthTest: false,
        transparent: true,
        color: normalizedColor,
        opacity,
        side: DoubleSide,
        ...rest.fillMaterial || {}
      },
      fillMeshProps: {
        // Note: This is a hack to get the svg to
        // render in the correct position.
        position: [-25, -25, 1],
        ...rest.fillMeshProps || {}
      }
    }
  ) }) });
};
const SphereWithSvg = ({
  color,
  id,
  size,
  opacity = 1,
  node,
  svgFill,
  active = false,
  animated,
  image,
  selected,
  ...rest
}) => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(
    Sphere,
    {
      id,
      selected,
      size,
      opacity,
      animated,
      color,
      node,
      active
    }
  ),
  /* @__PURE__ */ jsx(
    Svg,
    {
      ...rest,
      id,
      selected,
      image,
      size,
      opacity,
      animated,
      color: svgFill,
      node,
      active
    }
  )
] });
const Node = ({
  animated,
  disabled: disabled2,
  id,
  draggable = false,
  labelFontUrl,
  contextMenu,
  onClick,
  onDoubleClick,
  onPointerOver,
  onDragged,
  onPointerOut,
  onContextMenu,
  renderNode,
  constrainDragging
}) => {
  const cameraControls = useCameraControls();
  const theme = useStore((state) => state.theme);
  const node = useStore((state) => state.nodes.find((n) => n.id === id));
  const edges = useStore((state) => state.edges);
  const draggingIds = useStore((state) => state.draggingIds);
  const collapsedNodeIds = useStore((state) => state.collapsedNodeIds);
  const addDraggingId = useStore((state) => state.addDraggingId);
  const removeDraggingId = useStore((state) => state.removeDraggingId);
  const setHoveredNodeId = useStore((state) => state.setHoveredNodeId);
  const setNodePosition = useStore((state) => state.setNodePosition);
  const setCollapsedNodeIds = useStore((state) => state.setCollapsedNodeIds);
  const isCollapsed = useStore((state) => state.collapsedNodeIds.includes(id));
  const isActive = useStore((state) => state.actives?.includes(id));
  const isSelected = useStore((state) => state.selections?.includes(id));
  const hasSelections = useStore((state) => state.selections?.length > 0);
  const center = useStore((state) => state.centerPosition);
  const cluster = useStore((state) => state.clusters.get(node.cluster));
  const isDraggingCurrent = draggingIds.includes(id);
  const isDragging = draggingIds.length > 0;
  const {
    position,
    label,
    subLabel,
    size: nodeSize = 7,
    labelVisible = true
  } = node;
  const group = useRef(null);
  const [active, setActive] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const shouldHighlight = active || isSelected || isActive;
  const selectionOpacity = hasSelections ? shouldHighlight ? theme.node.selectedOpacity : theme.node.inactiveOpacity : theme.node.opacity;
  const canCollapse = useMemo(() => {
    const outboundLinks = edges.filter((l) => l.source === id);
    return outboundLinks.length > 0 || isCollapsed;
  }, [edges, id, isCollapsed]);
  const onCollapse = useCallback(() => {
    if (canCollapse) {
      if (isCollapsed) {
        setCollapsedNodeIds(collapsedNodeIds.filter((p) => p !== id));
      } else {
        setCollapsedNodeIds([...collapsedNodeIds, id]);
      }
    }
  }, [canCollapse, collapsedNodeIds, id, isCollapsed, setCollapsedNodeIds]);
  const [{ nodePosition, labelPosition }] = useSpring(
    () => ({
      from: {
        nodePosition: center ? [center.x, center.y, 0] : [0, 0, 0],
        labelPosition: [0, -(nodeSize + 4), 2],
        subLabelPosition: [0, -(nodeSize + 14), 2]
      },
      to: {
        nodePosition: position ? [
          position.x,
          position.y,
          shouldHighlight ? position.z + 50 : position.z
        ] : [0, 0, 0],
        labelPosition: [0, -(nodeSize + 4), 2],
        subLabelPosition: [0, -(nodeSize + 14), 2]
      },
      config: {
        ...animationConfig,
        duration: animated && !isDragging ? void 0 : 0
      }
    }),
    [isDraggingCurrent, position, animated, nodeSize, shouldHighlight]
  );
  const bind = useDrag({
    draggable,
    position,
    // If dragging is constrained to the cluster, use the cluster's position as the bounds
    bounds: constrainDragging ? cluster?.position : void 0,
    // @ts-ignore
    set: (pos) => setNodePosition(id, pos),
    onDragStart: () => {
      addDraggingId(id);
      setActive(true);
    },
    onDragEnd: () => {
      removeDraggingId(id);
      onDragged?.(node);
    }
  });
  useCursor(active && !isDragging && onClick !== void 0, "pointer");
  useCursor(
    active && draggable && !isDraggingCurrent && onClick === void 0,
    "grab"
  );
  useCursor(isDraggingCurrent, "grabbing");
  const combinedActiveState = shouldHighlight || isDraggingCurrent;
  const color = combinedActiveState ? node.activeFill || theme.node.activeFill : node.fill || theme.node.fill;
  const actualShowRing = node.showRing;
  const { pointerOver, pointerOut } = useHoverIntent({
    disabled: disabled2 || isDraggingCurrent,
    onPointerOver: (event) => {
      cameraControls.freeze();
      setActive(true);
      onPointerOver?.(node, event);
      setHoveredNodeId(id);
    },
    onPointerOut: (event) => {
      cameraControls.unFreeze();
      setActive(false);
      onPointerOut?.(node, event);
      setHoveredNodeId(null);
    }
  });
  const nodeComponent = useMemo(
    () => renderNode ? renderNode({
      id,
      color,
      size: nodeSize,
      active: combinedActiveState,
      opacity: selectionOpacity,
      animated,
      selected: isSelected,
      node
    }) : /* @__PURE__ */ jsx(Fragment, { children: node.icon ? /* @__PURE__ */ jsx(
      Icon,
      {
        id,
        image: node.icon || "",
        size: nodeSize + 8,
        opacity: selectionOpacity,
        animated,
        color,
        node,
        active: combinedActiveState,
        selected: isSelected
      }
    ) : /* @__PURE__ */ jsx(
      Sphere,
      {
        id,
        size: nodeSize,
        opacity: selectionOpacity,
        animated,
        color,
        node,
        active: combinedActiveState,
        selected: isSelected,
        showRing: actualShowRing
      }
    ) }),
    [
      renderNode,
      id,
      color,
      nodeSize,
      combinedActiveState,
      selectionOpacity,
      animated,
      isSelected,
      node,
      actualShowRing
    ]
  );
  const labelComponent = useMemo(
    () => label && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(a.group, { position: labelPosition, children: /* @__PURE__ */ jsx(
        Label,
        {
          text: label,
          fontUrl: labelFontUrl,
          opacity: selectionOpacity,
          stroke: theme.node.label.stroke,
          maxWidth: theme.node.label.maxWidth,
          ellipsis: theme.node.label.ellipsis,
          backgroundColor: theme.node.label.backgroundColor,
          borderRadius: theme.node.label.borderRadius,
          active: isSelected || active || isDragging || isActive,
          color: isSelected || active || isDragging || isActive ? theme.node.label.activeColor : theme.node.label.color,
          type: "node",
          labelVisible
        }
      ) }),
      subLabel && /* @__PURE__ */ jsx("group", { position: [0, -(nodeSize - 3), 0], children: /* @__PURE__ */ jsx(
        Label,
        {
          text: subLabel,
          fontUrl: labelFontUrl,
          fontSize: theme.node.label.fontSize,
          maxWidth: theme.node.label.maxWidth,
          ellipsis: theme.node.label.ellipsis,
          backgroundColor: theme.node.label.backgroundColor,
          borderRadius: theme.node.label.borderRadius,
          opacity: selectionOpacity,
          stroke: theme.node.subLabel?.stroke,
          active: isSelected || active || isDraggingCurrent || isActive,
          color: isSelected || active || isDraggingCurrent || isActive ? theme.node.subLabel?.activeColor : theme.node.subLabel?.color,
          labelVisible
        }
      ) })
    ] }),
    [
      active,
      isActive,
      isDraggingCurrent,
      isSelected,
      label,
      labelFontUrl,
      labelPosition,
      labelVisible,
      nodeSize,
      selectionOpacity,
      subLabel,
      theme.node.label.activeColor,
      theme.node.label.color,
      theme.node.label.stroke,
      theme.node.label.backgroundColor,
      theme.node.label.backgroundOpacity,
      theme.node.label.padding,
      theme.node.label.strokeColor,
      theme.node.label.strokeWidth,
      theme.node.label.radius,
      theme.node.subLabel?.activeColor,
      theme.node.subLabel?.color,
      theme.node.subLabel?.stroke,
      theme.node.label.fontSize,
      theme.node.label.maxWidth,
      theme.node.label.ellipsis,
      theme.node.label.backgroundColor,
      theme.node.label.borderRadius
    ]
  );
  const menuComponent = useMemo(
    () => menuVisible && contextMenu && /* @__PURE__ */ jsx(Html, { prepend: true, center: true, children: contextMenu({
      data: node,
      canCollapse,
      isCollapsed,
      onCollapse,
      onClose: () => setMenuVisible(false)
    }) }),
    [menuVisible, contextMenu, node, canCollapse, isCollapsed, onCollapse]
  );
  return /* @__PURE__ */ jsxs(
    a.group,
    {
      renderOrder: 1,
      userData: { id, type: "node" },
      ref: group,
      position: nodePosition,
      onPointerOver: pointerOver,
      onPointerOut: pointerOut,
      onClick: (event) => {
        if (!disabled2 && !isDraggingCurrent) {
          onClick?.(
            node,
            {
              canCollapse,
              isCollapsed
            },
            event
          );
        }
      },
      onDoubleClick: (event) => {
        event.stopPropagation();
        if (!disabled2 && !isDraggingCurrent) {
          onDoubleClick?.(node, event);
        }
      },
      onContextMenu: () => {
        if (!disabled2) {
          setMenuVisible(true);
          onContextMenu?.(node, {
            canCollapse,
            isCollapsed,
            onCollapse
          });
        }
      },
      ...bind(),
      children: [
        nodeComponent,
        menuComponent,
        labelComponent
      ]
    }
  );
};
function tick(layout) {
  return new Promise((resolve, _reject) => {
    let stable;
    function run() {
      if (!stable) {
        stable = layout.step();
        run();
      } else {
        resolve(stable);
      }
    }
    run();
  });
}
function buildNodeEdges(graph) {
  const nodes = [];
  const edges = [];
  graph.forEachNode((id, n) => {
    nodes.push({
      ...n,
      id,
      // This is for the clustering
      radius: n.size || 1
    });
  });
  graph.forEachEdge((id, l) => {
    edges.push({ ...l, id });
  });
  return { nodes, edges };
}
function circular2d({
  graph,
  radius,
  drags,
  getNodePosition
}) {
  const layout = circular(graph, {
    scale: radius
  });
  const { nodes, edges } = buildNodeEdges(graph);
  return {
    step() {
      return true;
    },
    getNodePosition(id) {
      if (getNodePosition) {
        const pos = getNodePosition(id, { graph, drags, nodes, edges });
        if (pos) {
          return pos;
        }
      }
      if (drags?.[id]?.position) {
        return drags?.[id]?.position;
      }
      return layout?.[id];
    }
  };
}
function concentric2d({
  graph,
  radius = 40,
  drags,
  getNodePosition,
  concentricSpacing = 100
}) {
  const { nodes, edges } = buildNodeEdges(graph);
  const layout = {};
  const getNodesInLevel = (level) => {
    const circumference = 2 * Math.PI * (radius + level * concentricSpacing);
    const minNodeSpacing = 40;
    return Math.floor(circumference / minNodeSpacing);
  };
  const fixedLevelMap = /* @__PURE__ */ new Map();
  const dynamicNodes = [];
  for (const node of nodes) {
    const data = graph.getNodeAttribute(node.id, "data");
    const level = data?.level;
    if (typeof level === "number" && level >= 0) {
      if (!fixedLevelMap.has(level)) {
        fixedLevelMap.set(level, []);
      }
      fixedLevelMap.get(level).push(node.id);
    } else {
      dynamicNodes.push({ id: node.id, metric: graph.degree(node.id) });
    }
  }
  dynamicNodes.sort((a2, b) => b.metric - a2.metric);
  for (const [level, nodeIds] of fixedLevelMap.entries()) {
    const count = nodeIds.length;
    const r = radius + level * concentricSpacing;
    for (let i2 = 0; i2 < count; i2++) {
      const angle = 2 * Math.PI * i2 / count;
      layout[nodeIds[i2]] = {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
      };
    }
  }
  const occupiedLevels = new Set(fixedLevelMap.keys());
  let dynamicLevel = 0;
  let i = 0;
  while (i < dynamicNodes.length) {
    while (occupiedLevels.has(dynamicLevel)) {
      dynamicLevel++;
    }
    const nodesInLevel = getNodesInLevel(dynamicLevel);
    const r = radius + dynamicLevel * concentricSpacing;
    for (let j = 0; j < nodesInLevel && i < dynamicNodes.length; j++) {
      const angle = 2 * Math.PI * j / nodesInLevel;
      layout[dynamicNodes[i].id] = {
        x: r * Math.cos(angle),
        y: r * Math.sin(angle)
      };
      i++;
    }
    dynamicLevel++;
  }
  return {
    step() {
      return true;
    },
    getNodePosition(id) {
      if (getNodePosition) {
        const pos = getNodePosition(id, { graph, drags, nodes, edges });
        if (pos) return pos;
      }
      if (drags?.[id]?.position) {
        return drags[id].position;
      }
      return layout[id];
    }
  };
}
function custom({ graph, drags, getNodePosition }) {
  const { nodes, edges } = buildNodeEdges(graph);
  return {
    step() {
      return true;
    },
    getNodePosition(id) {
      return getNodePosition(id, { graph, drags, nodes, edges });
    }
  };
}
function traverseGraph(nodes, nodeStack = []) {
  const currentDepth = nodeStack.length;
  for (const node of nodes) {
    const idx = nodeStack.indexOf(node);
    if (idx > -1) {
      const loop = [...nodeStack.slice(idx), node].map((d) => d.data.id);
      throw new Error(
        `Invalid Graph: Circular node path detected: ${loop.join(" -> ")}.`
      );
    }
    if (currentDepth > node.depth) {
      node.depth = currentDepth;
      traverseGraph(node.out, [...nodeStack, node]);
    }
  }
}
function getNodeDepth(nodes, links) {
  let invalid = false;
  const graph = nodes.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: {
        data: cur,
        out: [],
        depth: -1,
        ins: []
      }
    }),
    {}
  );
  try {
    for (const link of links) {
      const from = link.source;
      const to = link.target;
      if (!graph.hasOwnProperty(from)) {
        throw new Error(`Missing source Node ${from}`);
      }
      if (!graph.hasOwnProperty(to)) {
        throw new Error(`Missing target Node ${to}`);
      }
      const sourceNode = graph[from];
      const targetNode = graph[to];
      targetNode.ins.push(sourceNode);
      sourceNode.out.push(targetNode);
    }
    traverseGraph(Object.values(graph));
  } catch (e) {
    invalid = true;
  }
  const allDepths = Object.keys(graph).map((id) => graph[id].depth);
  const maxDepth = Math.max(...allDepths);
  return {
    invalid,
    depths: graph,
    maxDepth: maxDepth || 1
  };
}
function forceAtlas2({
  graph,
  drags,
  iterations,
  ...rest
}) {
  random.assign(graph);
  const layout = forceAtlas2Layout(graph, {
    iterations,
    settings: rest
  });
  return {
    step() {
      return true;
    },
    getNodePosition(id) {
      return drags?.[id]?.position || layout?.[id];
    }
  };
}
function forceInABox() {
  const constant = (_) => () => _;
  const index = (d) => d.index;
  let id = index;
  let nodes = [];
  let links = [];
  let clusters;
  let tree2;
  let size = [100, 100];
  let forceNodeSize = constant(1);
  let forceCharge = constant(-1);
  let forceLinkDistance = constant(100);
  let forceLinkStrength = constant(0.1);
  const foci = {};
  let linkStrengthIntraCluster = 0.1;
  let linkStrengthInterCluster = 1e-3;
  let templateNodes = [];
  let offset = [0, 0];
  let templateForce;
  let groupBy = (d) => d.cluster;
  let template = "treemap";
  let enableGrouping = true;
  let strength = 0.1;
  function force(alpha) {
    if (!enableGrouping) {
      return force;
    }
    if (template === "force") {
      templateForce.tick();
      getFocisFromTemplate();
    }
    for (let i = 0, n = nodes.length, node, k = alpha * strength; i < n; ++i) {
      node = nodes[i];
      node.vx += (foci[groupBy(node)].x - node.x) * k;
      node.vy += (foci[groupBy(node)].y - node.y) * k;
    }
  }
  function initialize() {
    if (!nodes) {
      return;
    }
    if (template === "treemap") {
      initializeWithTreemap();
    } else {
      initializeWithForce();
    }
  }
  force.initialize = function(_) {
    nodes = _;
    initialize();
  };
  function getLinkKey(l) {
    const sourceID = groupBy(l.source), targetID = groupBy(l.target);
    return sourceID <= targetID ? sourceID + "~" + targetID : targetID + "~" + sourceID;
  }
  function computeClustersNodeCounts(nodes2) {
    let clustersCounts = /* @__PURE__ */ new Map(), tmpCount = {};
    nodes2.forEach(function(d) {
      if (!clustersCounts.has(groupBy(d))) {
        clustersCounts.set(groupBy(d), { count: 0, sumforceNodeSize: 0 });
      }
    });
    nodes2.forEach(function(d) {
      tmpCount = clustersCounts.get(groupBy(d));
      tmpCount.count = tmpCount.count + 1;
      tmpCount.sumforceNodeSize = tmpCount.sumforceNodeSize + // @ts-ignore
      Math.PI * (forceNodeSize(d) * forceNodeSize(d)) * 1.3;
      clustersCounts.set(groupBy(d), tmpCount);
    });
    return clustersCounts;
  }
  function computeClustersLinkCounts(links2) {
    const dClusterLinks = /* @__PURE__ */ new Map(), clusterLinks = [];
    links2.forEach(function(l) {
      let key = getLinkKey(l), count;
      if (dClusterLinks.has(key)) {
        count = dClusterLinks.get(key);
      } else {
        count = 0;
      }
      count += 1;
      dClusterLinks.set(key, count);
    });
    dClusterLinks.forEach(function(value, key) {
      let source, target;
      source = key.split("~")[0];
      target = key.split("~")[1];
      if (source !== void 0 && target !== void 0) {
        clusterLinks.push({
          source,
          target,
          count: value
        });
      }
    });
    return clusterLinks;
  }
  function getGroupsGraph() {
    const gnodes = [];
    const glinks = [];
    const dNodes = /* @__PURE__ */ new Map();
    let c;
    let i;
    let cc;
    let clustersCounts;
    let clustersLinks;
    clustersCounts = computeClustersNodeCounts(nodes);
    clustersLinks = computeClustersLinkCounts(links);
    for (c of clustersCounts.keys()) {
      cc = clustersCounts.get(c);
      gnodes.push({
        id: c,
        size: cc.count,
        r: Math.sqrt(cc.sumforceNodeSize / Math.PI)
      });
      dNodes.set(c, i);
    }
    clustersLinks.forEach(function(l) {
      const source = dNodes.get(l.source), target = dNodes.get(l.target);
      if (source !== void 0 && target !== void 0) {
        glinks.push({
          source,
          target,
          count: l.count
        });
      }
    });
    return { nodes: gnodes, links: glinks };
  }
  function getGroupsTree() {
    const children = [];
    let c;
    let cc;
    let clustersCounts;
    clustersCounts = computeClustersNodeCounts(force.nodes());
    for (c of clustersCounts.keys()) {
      cc = clustersCounts.get(c);
      children.push({ id: c, size: cc.count });
    }
    return { id: "clustersTree", children };
  }
  function getFocisFromTemplate() {
    foci.none = { x: 0, y: 0 };
    templateNodes.forEach(function(d) {
      if (template === "treemap") {
        foci[d.data.id] = {
          x: d.x0 + (d.x1 - d.x0) / 2 - offset[0],
          y: d.y0 + (d.y1 - d.y0) / 2 - offset[1]
        };
      } else {
        foci[d.id] = {
          x: d.x - offset[0],
          y: d.y - offset[1]
        };
      }
    });
    return foci;
  }
  function initializeWithTreemap() {
    const sim = treemap().size(force.size());
    tree2 = hierarchy(getGroupsTree()).sum((d) => d.radius).sort(function(a2, b) {
      return b.height - a2.height || b.value - a2.value;
    });
    templateNodes = sim(tree2).leaves();
    getFocisFromTemplate();
  }
  function checkLinksAsObjects() {
    let linkCount = 0;
    if (nodes.length === 0) return;
    links.forEach(function(link) {
      let source, target;
      if (!nodes) {
        return;
      }
      source = link.source;
      target = link.target;
      if (typeof link.source !== "object") {
        source = nodes.find((n) => n.id === link.source);
      }
      if (typeof link.target !== "object") {
        target = nodes.find((n) => n.id === link.target);
      }
      if (source === void 0 || target === void 0) {
        throw Error(
          "Error setting links, couldnt find nodes for a link (see it on the console)"
        );
      }
      link.source = source;
      link.target = target;
      link.index = linkCount++;
    });
  }
  function initializeWithForce() {
    let net;
    if (!nodes || !nodes.length) {
      return;
    }
    checkLinksAsObjects();
    net = getGroupsGraph();
    if (clusters.size > 0) {
      net.nodes.forEach((n) => {
        n.fx = clusters.get(n.id)?.position?.x;
        n.fy = clusters.get(n.id)?.position?.y;
      });
    }
    templateForce = forceSimulation(net.nodes).force("x", forceX(size[0] / 2).strength(0.1)).force("y", forceY(size[1] / 2).strength(0.1)).force("collide", forceCollide((d) => d.r).iterations(4)).force("charge", forceManyBody().strength(forceCharge)).force(
      "links",
      forceLink(net.nodes.length ? net.links : []).distance(forceLinkDistance).strength(forceLinkStrength)
    );
    templateNodes = templateForce.nodes();
    getFocisFromTemplate();
  }
  force.template = function(x) {
    if (!arguments.length) {
      return template;
    }
    template = x;
    initialize();
    return force;
  };
  force.groupBy = function(x) {
    if (!arguments.length) {
      return groupBy;
    }
    if (typeof x === "string") {
      groupBy = function(d) {
        return d[x];
      };
      return force;
    }
    groupBy = x;
    return force;
  };
  force.enableGrouping = function(x) {
    if (!arguments.length) {
      return enableGrouping;
    }
    enableGrouping = x;
    return force;
  };
  force.strength = function(x) {
    if (!arguments.length) {
      return strength;
    }
    strength = x;
    return force;
  };
  force.getLinkStrength = function(e) {
    if (enableGrouping) {
      if (groupBy(e.source) === groupBy(e.target)) {
        if (typeof linkStrengthIntraCluster === "function") {
          return linkStrengthIntraCluster(e);
        } else {
          return linkStrengthIntraCluster;
        }
      } else {
        if (typeof linkStrengthInterCluster === "function") {
          return linkStrengthInterCluster(e);
        } else {
          return linkStrengthInterCluster;
        }
      }
    } else {
      if (typeof linkStrengthIntraCluster === "function") {
        return linkStrengthIntraCluster(e);
      } else {
        return linkStrengthIntraCluster;
      }
    }
  };
  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };
  force.size = function(_) {
    return arguments.length ? (size = _, force) : size;
  };
  force.linkStrengthInterCluster = function(_) {
    return arguments.length ? (linkStrengthInterCluster = _, force) : linkStrengthInterCluster;
  };
  force.linkStrengthIntraCluster = function(_) {
    return arguments.length ? (linkStrengthIntraCluster = _, force) : linkStrengthIntraCluster;
  };
  force.nodes = function(_) {
    return arguments.length ? (nodes = _, force) : nodes;
  };
  force.links = function(_) {
    if (!arguments.length) {
      return links;
    }
    if (_ === null) {
      links = [];
    } else {
      links = _;
    }
    initialize();
    return force;
  };
  force.template = function(x) {
    if (!arguments.length) {
      return template;
    }
    template = x;
    initialize();
    return force;
  };
  force.forceNodeSize = function(_) {
    return arguments.length ? (forceNodeSize = typeof _ === "function" ? _ : constant(+_), initialize(), force) : forceNodeSize;
  };
  force.nodeSize = force.forceNodeSize;
  force.forceCharge = function(_) {
    return arguments.length ? (forceCharge = typeof _ === "function" ? _ : constant(+_), initialize(), force) : forceCharge;
  };
  force.forceLinkDistance = function(_) {
    return arguments.length ? (forceLinkDistance = typeof _ === "function" ? _ : constant(+_), initialize(), force) : forceLinkDistance;
  };
  force.forceLinkStrength = function(_) {
    return arguments.length ? (forceLinkStrength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : forceLinkStrength;
  };
  force.offset = function(_) {
    return arguments.length ? (offset = typeof _ === "function" ? _ : constant(+_), force) : offset;
  };
  force.getFocis = getFocisFromTemplate;
  force.setClusters = function(value) {
    clusters = value;
    return force;
  };
  return force;
}
const RADIALS = ["radialin", "radialout"];
function forceRadial({
  nodes,
  edges,
  mode = "lr",
  nodeLevelRatio = 2
}) {
  const { depths, maxDepth, invalid } = getNodeDepth(nodes, edges);
  if (invalid) {
    return null;
  }
  const modeDistance = RADIALS.includes(mode) ? 1 : 5;
  const dagLevelDistance = nodes.length / maxDepth * nodeLevelRatio * modeDistance;
  if (mode) {
    const getFFn = (fix, invert) => (node) => !fix ? void 0 : (depths[node.id].depth - maxDepth / 2) * dagLevelDistance * (invert ? -1 : 1);
    const fxFn = getFFn(["lr", "rl"].includes(mode), mode === "rl");
    const fyFn = getFFn(["td", "bu"].includes(mode), mode === "td");
    const fzFn = getFFn(["zin", "zout"].includes(mode), mode === "zout");
    nodes.forEach((node) => {
      node.fx = fxFn(node);
      node.fy = fyFn(node);
      node.fz = fzFn(node);
    });
  }
  return RADIALS.includes(mode) ? forceRadial$1((node) => {
    const nodeDepth = depths[node.id];
    const depth = mode === "radialin" ? maxDepth - nodeDepth.depth : nodeDepth.depth;
    return depth * dagLevelDistance;
  }).strength(1) : null;
}
function forceDirected({
  graph,
  nodeLevelRatio = 2,
  mode = null,
  dimensions = 2,
  nodeStrength = -250,
  linkDistance = 100,
  clusterStrength = 0.5,
  linkStrengthInterCluster = 0.01,
  linkStrengthIntraCluster = 0.5,
  forceLinkDistance = 100,
  forceLinkStrength = 0.1,
  clusterType = "force",
  forceCharge = -700,
  getNodePosition,
  drags,
  clusters,
  clusterAttribute,
  forceLayout
}) {
  const { nodes, edges } = buildNodeEdges(graph);
  const is2d = dimensions === 2;
  const nodeStrengthAdjustment = is2d && edges.length > 25 ? nodeStrength * 2 : nodeStrength;
  let forceX$1;
  let forceY$1;
  if (forceLayout === "forceDirected2d") {
    forceX$1 = forceX();
    forceY$1 = forceY();
  } else {
    forceX$1 = forceX(600).strength(0.05);
    forceY$1 = forceY(600).strength(0.05);
  }
  const sim = forceSimulation().force("center", forceCenter(0, 0)).force("link", forceLink()).force("charge", forceManyBody().strength(nodeStrengthAdjustment)).force("x", forceX$1).force("y", forceY$1).force("z", forceZ()).force(
    "collide",
    forceCollide((d) => d.radius + 10)
  ).force(
    "dagRadial",
    forceRadial({
      nodes,
      edges,
      mode,
      nodeLevelRatio
    })
  ).stop();
  let groupingForce;
  if (clusterAttribute) {
    let forceChargeAdjustment = forceCharge;
    if (nodes?.length) {
      const adjustmentFactor = Math.ceil(nodes.length / 200);
      forceChargeAdjustment = forceCharge * adjustmentFactor;
    }
    groupingForce = forceInABox().setClusters(clusters).strength(clusterStrength).template(clusterType).groupBy((d) => d.data[clusterAttribute]).links(edges).size([100, 100]).linkStrengthInterCluster(linkStrengthInterCluster).linkStrengthIntraCluster(linkStrengthIntraCluster).forceLinkDistance(forceLinkDistance).forceLinkStrength(forceLinkStrength).forceCharge(forceChargeAdjustment).forceNodeSize((d) => d.radius);
  }
  let layout = sim.numDimensions(dimensions).nodes(nodes);
  if (groupingForce) {
    layout = layout.force("group", groupingForce);
  }
  if (linkDistance) {
    let linkForce = layout.force("link");
    if (linkForce) {
      linkForce.id((d) => d.id).links(edges).distance(linkDistance);
      if (groupingForce) {
        linkForce = linkForce.strength(groupingForce?.getLinkStrength ?? 0.1);
      }
    }
  }
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  return {
    step() {
      while (sim.alpha() > 0.01) {
        sim.tick();
      }
      return true;
    },
    getNodePosition(id) {
      if (getNodePosition) {
        const pos = getNodePosition(id, { graph, drags, nodes, edges });
        if (pos) {
          return pos;
        }
      }
      if (drags?.[id]?.position) {
        return drags?.[id]?.position;
      }
      return nodeMap.get(id);
    }
  };
}
const DIRECTION_MAP = {
  td: {
    x: "x",
    y: "y",
    factor: -1
  },
  lr: {
    x: "y",
    y: "x",
    factor: 1
  }
};
function hierarchical({
  graph,
  drags,
  mode = "td",
  nodeSeparation = 2,
  nodeSize = [60, 60],
  getNodePosition
}) {
  const { nodes, edges } = buildNodeEdges(graph);
  const parentNodes = nodes.filter((n) => !edges.find((e) => e.target === n.id));
  console.log("parentNodes", parentNodes);
  if (parentNodes.length > 1) {
    const fakeRootNode = {
      id: "fakeRoot",
      label: "",
      fill: "#fff",
      activeFill: "#fff",
      icon: "",
      data: {
        id: "fakeRoot",
        loaded: true,
        extra: {
          id: "fakeRoot",
          properties: {},
          labels: []
        },
        className: "",
        style: {
          label: ""
        }
      },
      position: {
        id: "",
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
    nodes.push(fakeRootNode);
    parentNodes.forEach((n) => {
      edges.push({
        id: `fakeRoot-${n.id}`,
        source: "fakeRoot",
        target: n.id,
        label: "",
        backgroundColor: "#fff"
      });
    });
  }
  const { depths } = getNodeDepth(nodes, edges);
  const rootNodes = Object.keys(depths).map((d) => depths[d]);
  const root = stratify().id((d) => d.data.id).parentId((d) => d.ins?.[0]?.data?.id)(rootNodes);
  const treeRoot = tree().separation(() => nodeSeparation).nodeSize(nodeSize)(hierarchy(root));
  const treeNodes = treeRoot.descendants();
  const path = DIRECTION_MAP[mode];
  const mappedNodes = new Map(
    nodes.map((n) => {
      const { x, y } = treeNodes.find((t) => t.data.id === n.id);
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
    getNodePosition(id) {
      if (getNodePosition) {
        const pos = getNodePosition(id, { graph, drags, nodes, edges });
        if (pos) {
          return pos;
        }
      }
      if (drags?.[id]?.position) {
        return drags?.[id]?.position;
      }
      return mappedNodes.get(id);
    }
  };
}
function fibonacciSpherePoint(i, n, r) {
  const phi = Math.acos(1 - 2 * (i + 0.5) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
  const x = r * Math.sin(phi) * Math.cos(theta);
  const y = r * Math.sin(phi) * Math.sin(theta);
  const z = r * Math.cos(phi);
  return new Vector3(x, y, z);
}
function concentric3d({
  graph,
  radius = 40,
  drags,
  getNodePosition,
  concentricSpacing = 100
}) {
  const { nodes, edges } = buildNodeEdges(graph);
  const layout = {};
  const getNodesInLevel = (level) => {
    const circumference = 2 * Math.PI * (radius + level * concentricSpacing);
    const minNodeSpacing = 40;
    return Math.floor(circumference / minNodeSpacing);
  };
  const fixedLevelMap = /* @__PURE__ */ new Map();
  const dynamicNodes = [];
  for (const node of nodes) {
    const data = graph.getNodeAttribute(node.id, "data");
    const level = data?.level;
    if (typeof level === "number" && level >= 0) {
      if (!fixedLevelMap.has(level)) {
        fixedLevelMap.set(level, []);
      }
      fixedLevelMap.get(level).push(node.id);
    } else {
      dynamicNodes.push({ id: node.id, metric: graph.degree(node.id) });
    }
  }
  dynamicNodes.sort((a2, b) => b.metric - a2.metric);
  for (const [level, nodeIds] of fixedLevelMap.entries()) {
    const count = nodeIds.length;
    const r = radius + level * concentricSpacing;
    for (const [i2, id] of nodeIds.entries()) {
      const pos = fibonacciSpherePoint(i2, count, r);
      layout[id] = { x: pos.x, y: pos.y, z: pos.z };
    }
  }
  const occupiedLevels = new Set(fixedLevelMap.keys());
  let dynamicLevel = 0;
  let i = 0;
  while (i < dynamicNodes.length) {
    while (occupiedLevels.has(dynamicLevel)) {
      dynamicLevel++;
    }
    const nodesInLevel = getNodesInLevel(dynamicLevel);
    const r = radius + dynamicLevel * concentricSpacing;
    for (let j = 0; j < nodesInLevel && i < dynamicNodes.length; j++) {
      const pos = fibonacciSpherePoint(j, nodesInLevel, r);
      layout[dynamicNodes[i].id] = { x: pos.x, y: pos.y, z: pos.z };
      i++;
    }
    dynamicLevel++;
  }
  return {
    step() {
      return true;
    },
    getNodePosition(id) {
      if (getNodePosition) {
        const pos = getNodePosition(id, { graph, drags, nodes, edges });
        if (pos) {
          return pos;
        }
      }
      if (drags?.[id]?.position) {
        return drags[id].position;
      }
      return layout[id];
    }
  };
}
function nooverlap({
  graph,
  margin,
  drags,
  getNodePosition,
  ratio,
  gridSize,
  maxIterations
}) {
  const { nodes, edges } = buildNodeEdges(graph);
  const layout = noverlapLayout(graph, {
    maxIterations,
    inputReducer: (_key, attr) => ({
      ...attr,
      // Have to specify defaults for the engine
      x: attr.x || 0,
      y: attr.y || 0
    }),
    settings: {
      ratio,
      margin,
      gridSize
    }
  });
  return {
    step() {
      return true;
    },
    getNodePosition(id) {
      if (getNodePosition) {
        const pos = getNodePosition(id, { graph, drags, nodes, edges });
        if (pos) {
          return pos;
        }
      }
      if (drags?.[id]?.position) {
        return drags?.[id]?.position;
      }
      return layout?.[id];
    }
  };
}
const FORCE_LAYOUTS = [
  "forceDirected2d",
  "treeTd2d",
  "treeLr2d",
  "radialOut2d",
  "treeTd3d",
  "treeLr3d",
  "radialOut3d",
  "forceDirected3d"
];
function layoutProvider({
  type,
  ...rest
}) {
  if (FORCE_LAYOUTS.includes(type)) {
    const { nodeStrength, linkDistance, nodeLevelRatio } = rest;
    if (type === "forceDirected2d") {
      return forceDirected({
        ...rest,
        dimensions: 2,
        nodeLevelRatio: nodeLevelRatio || 2,
        nodeStrength: nodeStrength || -250,
        linkDistance,
        forceLayout: type
      });
    } else if (type === "treeTd2d") {
      return forceDirected({
        ...rest,
        mode: "td",
        dimensions: 2,
        nodeLevelRatio: nodeLevelRatio || 5,
        nodeStrength: nodeStrength || -250,
        linkDistance: linkDistance || 50,
        forceLayout: type
      });
    } else if (type === "treeLr2d") {
      return forceDirected({
        ...rest,
        mode: "lr",
        dimensions: 2,
        nodeLevelRatio: nodeLevelRatio || 5,
        nodeStrength: nodeStrength || -250,
        linkDistance: linkDistance || 50,
        forceLayout: type
      });
    } else if (type === "radialOut2d") {
      return forceDirected({
        ...rest,
        mode: "radialout",
        dimensions: 2,
        nodeLevelRatio: nodeLevelRatio || 5,
        nodeStrength: nodeStrength || -500,
        linkDistance: linkDistance || 100,
        forceLayout: type
      });
    } else if (type === "treeTd3d") {
      return forceDirected({
        ...rest,
        mode: "td",
        dimensions: 3,
        nodeLevelRatio: nodeLevelRatio || 2,
        nodeStrength: nodeStrength || -500,
        linkDistance: linkDistance || 50
      });
    } else if (type === "treeLr3d") {
      return forceDirected({
        ...rest,
        mode: "lr",
        dimensions: 3,
        nodeLevelRatio: nodeLevelRatio || 2,
        nodeStrength: nodeStrength || -500,
        linkDistance: linkDistance || 50,
        forceLayout: type
      });
    } else if (type === "radialOut3d") {
      return forceDirected({
        ...rest,
        mode: "radialout",
        dimensions: 3,
        nodeLevelRatio: nodeLevelRatio || 2,
        nodeStrength: nodeStrength || -500,
        linkDistance: linkDistance || 100,
        forceLayout: type
      });
    } else if (type === "forceDirected3d") {
      return forceDirected({
        ...rest,
        dimensions: 3,
        nodeLevelRatio: nodeLevelRatio || 2,
        nodeStrength: nodeStrength || -250,
        linkDistance,
        forceLayout: type
      });
    }
  } else if (type === "circular2d") {
    const { radius } = rest;
    return circular2d({
      ...rest,
      radius: radius || 300
    });
  } else if (type === "concentric2d") {
    return concentric2d(rest);
  } else if (type === "concentric3d") {
    return concentric3d(rest);
  } else if (type === "hierarchicalTd") {
    return hierarchical({ ...rest, mode: "td" });
  } else if (type === "hierarchicalLr") {
    return hierarchical({ ...rest, mode: "lr" });
  } else if (type === "nooverlap") {
    const { graph, maxIterations, ratio, margin, gridSize, ...settings } = rest;
    return nooverlap({
      graph,
      margin: margin || 10,
      maxIterations: maxIterations || 50,
      ratio: ratio || 10,
      gridSize: gridSize || 20,
      ...settings
    });
  } else if (type === "forceatlas2") {
    const { graph, iterations, gravity, scalingRatio, ...settings } = rest;
    return forceAtlas2({
      type: "forceatlas2",
      graph,
      ...settings,
      scalingRatio: scalingRatio || 100,
      gravity: gravity || 10,
      iterations: iterations || 50
    });
  } else if (type === "custom") {
    return custom({
      ...rest
    });
  }
  throw new Error(`Layout ${type} not found.`);
}
function recommendLayout(nodes, edges) {
  const { invalid } = getNodeDepth(nodes, edges);
  const nodeCount = nodes.length;
  if (!invalid) {
    if (nodeCount > 100) {
      return "radialOut2d";
    } else {
      return "treeTd2d";
    }
  }
  return "forceDirected2d";
}
const useGraph = ({
  layoutType,
  sizingType,
  labelType,
  sizingAttribute,
  clusterAttribute,
  selections,
  nodes,
  edges,
  actives,
  collapsedNodeIds,
  defaultNodeSize,
  maxNodeSize,
  minNodeSize,
  layoutOverrides,
  constrainDragging
}) => {
  const graph = useStore((state) => state.graph);
  const clusters = useStore((state) => state.clusters);
  const storedNodes = useStore((state) => state.nodes);
  const setClusters = useStore((state) => state.setClusters);
  const stateCollapsedNodeIds = useStore((state) => state.collapsedNodeIds);
  const setEdges = useStore((state) => state.setEdges);
  const stateNodes = useStore((state) => state.nodes);
  const setNodes = useStore((state) => state.setNodes);
  const setSelections = useStore((state) => state.setSelections);
  const setActives = useStore((state) => state.setActives);
  const drags = useStore((state) => state.drags);
  const setDrags = useStore((state) => state.setDrags);
  const setCollapsedNodeIds = useStore((state) => state.setCollapsedNodeIds);
  const layoutMounted = useRef(false);
  const layout = useRef(null);
  const camera = useThree((state) => state.camera);
  const dragRef = useRef(drags);
  const clustersRef = useRef([]);
  useEffect(() => {
    if (!clusterAttribute) {
      return;
    }
    const existedNodesIds = storedNodes.map((n) => n.id);
    const newNode = nodes.find((n) => !existedNodesIds.includes(n.id));
    if (newNode) {
      const clusterName = newNode.data[clusterAttribute];
      const cluster = clusters.get(clusterName);
      const drags2 = { ...dragRef.current };
      cluster?.nodes?.forEach((node) => drags2[node.id] = void 0);
      dragRef.current = drags2;
      setDrags(drags2);
    }
  }, [storedNodes, nodes, clusterAttribute, clusters, setDrags]);
  const { visibleEdges, visibleNodes } = useMemo(
    () => getVisibleEntities({
      collapsedIds: stateCollapsedNodeIds,
      nodes,
      edges
    }),
    [stateCollapsedNodeIds, nodes, edges]
  );
  const updateDrags = useCallback(
    (nodes2) => {
      const drags2 = { ...dragRef.current };
      nodes2.forEach((node) => drags2[node.id] = node);
      dragRef.current = drags2;
      setDrags(drags2);
    },
    [setDrags]
  );
  const updateLayout = useCallback(
    async (curLayout) => {
      layout.current = curLayout || layoutProvider({
        ...layoutOverrides,
        type: layoutType,
        graph,
        drags: dragRef.current,
        clusters: clustersRef?.current,
        clusterAttribute
      });
      await tick(layout.current);
      const result = transformGraph({
        graph,
        layout: layout.current,
        sizingType,
        labelType,
        sizingAttribute,
        maxNodeSize,
        minNodeSize,
        defaultNodeSize,
        clusterAttribute
      });
      const newClusters = calculateClusters({
        nodes: result.nodes,
        clusterAttribute
      });
      if (constrainDragging) {
        newClusters.forEach((cluster) => {
          const prevCluster = clustersRef.current.get(cluster.label);
          if (prevCluster?.nodes.length === cluster.nodes.length) {
            cluster.position = clustersRef.current?.get(cluster.label)?.position ?? cluster.position;
          }
        });
      }
      setEdges(result.edges);
      setNodes(result.nodes);
      setClusters(newClusters);
      if (clusterAttribute) {
        updateDrags(result.nodes);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      layoutOverrides,
      layoutType,
      clusterAttribute,
      sizingType,
      labelType,
      sizingAttribute,
      maxNodeSize,
      minNodeSize,
      defaultNodeSize,
      setEdges,
      setNodes,
      setClusters
    ]
  );
  useEffect(() => {
    dragRef.current = drags;
  }, [drags, clusterAttribute, updateLayout]);
  useEffect(() => {
    clustersRef.current = clusters;
  }, [clusters]);
  useEffect(() => {
    const nodes2 = stateNodes.map((node) => ({
      ...node,
      labelVisible: calcLabelVisibility({
        nodeCount: stateNodes?.length,
        labelType,
        camera,
        nodePosition: node?.position
      })("node", node?.size)
    }));
    const isVisibilityUpdated = nodes2.some(
      (node, i) => node.labelVisible !== stateNodes[i].labelVisible
    );
    if (isVisibilityUpdated) {
      setNodes(nodes2);
    }
  }, [camera, camera.zoom, camera.position.z, setNodes, stateNodes, labelType]);
  useEffect(() => {
    if (layoutMounted.current) {
      setSelections(selections);
    }
  }, [selections, setSelections]);
  useEffect(() => {
    if (layoutMounted.current) {
      setActives(actives);
    }
  }, [actives, setActives]);
  useEffect(() => {
    async function update() {
      layoutMounted.current = false;
      buildGraph(graph, visibleNodes, visibleEdges);
      await updateLayout();
      requestAnimationFrame(() => layoutMounted.current = true);
    }
    update();
  }, [visibleNodes, visibleEdges]);
  useEffect(() => {
    if (layoutMounted.current) {
      setCollapsedNodeIds(collapsedNodeIds);
    }
  }, [collapsedNodeIds, setCollapsedNodeIds]);
  useEffect(() => {
    if (layoutMounted.current) {
      dragRef.current = {};
      setDrags({});
      updateLayout();
    }
  }, [layoutType, updateLayout, setDrags]);
  useEffect(() => {
    if (layoutMounted.current) {
      updateLayout(layout.current);
    }
  }, [sizingType, sizingAttribute, labelType, updateLayout]);
  return {
    updateLayout
  };
};
const groupEdgesBySourceTarget = (graph) => {
  return graph.reduceEdges(
    (edgeGroups, edgeKey, attributes, source, target) => {
      const key = `${source}-${target}`;
      const edge = {
        id: edgeKey,
        source,
        target,
        ...attributes
      };
      const group = edgeGroups.get(key);
      if (group) {
        group.push(edge);
      } else {
        edgeGroups.set(key, [edge]);
      }
      return edgeGroups;
    },
    /* @__PURE__ */ new Map()
  );
};
const aggregateEdges = (graph, labelType) => {
  if (!graph || graph.size === 0) {
    return [];
  }
  const edgeGroups = groupEdgesBySourceTarget(graph);
  const aggregatedEdges = [];
  const shouldShowEdgeLabels = labelType === "all" || labelType === "edges";
  for (const [key, group] of edgeGroups) {
    const [source, target] = key.split("-");
    const firstEdge = group[0];
    if (!source || !target || !firstEdge) {
      continue;
    }
    const baseSize = firstEdge.size || 1;
    const aggregatedSize = baseSize + group.length * baseSize * 0.5;
    const aggregated = group.length > 1;
    const label = aggregated ? `${group.length} edges` : firstEdge.label;
    const aggregatedEdge = {
      ...firstEdge,
      source,
      target,
      label,
      labelVisible: shouldShowEdgeLabels,
      size: aggregatedSize,
      // Store the original edges in the data property
      data: {
        ...firstEdge.data || {},
        originalEdges: group,
        count: group.length,
        isAggregated: aggregated,
        originalSize: baseSize
      }
    };
    aggregatedEdges.push(aggregatedEdge);
  }
  return aggregatedEdges;
};
const GraphScene = forwardRef(
  ({
    onNodeClick,
    onNodeDoubleClick,
    onNodeContextMenu,
    onEdgeContextMenu,
    onEdgeClick,
    onEdgePointerOver,
    onEdgePointerOut,
    onNodePointerOver,
    onNodePointerOut,
    onClusterClick,
    onNodeDragged,
    onClusterDragged,
    onClusterPointerOver,
    onClusterPointerOut,
    contextMenu,
    animated,
    disabled: disabled2,
    draggable,
    constrainDragging = false,
    edgeLabelPosition,
    edgeArrowPosition,
    edgeInterpolation = "linear",
    labelFontUrl,
    renderNode,
    onRenderCluster,
    aggregateEdges: aggregateEdges$1,
    ...rest
  }, ref) => {
    const { layoutType, clusterAttribute, labelType } = rest;
    const gl = useThree((state) => state.gl);
    const scene = useThree((state) => state.scene);
    const camera = useThree((state) => state.camera);
    const { updateLayout } = useGraph({ ...rest, constrainDragging });
    if (clusterAttribute && !(layoutType === "forceDirected2d" || layoutType === "forceDirected3d")) {
      throw new Error(
        "Clustering is only supported for the force directed layouts."
      );
    }
    const graph = useStore((state) => state.graph);
    const nodes = useStore((state) => state.nodes);
    const edgesStore = useStore((state) => state.edges);
    const setEdges = useStore((state) => state.setEdges);
    const clusters = useStore((state) => [...state.clusters.values()]);
    const edges = useMemo(() => {
      if (aggregateEdges$1) {
        const aggregatedEdges = aggregateEdges(graph, labelType);
        return aggregatedEdges;
      } else {
        return edgesStore;
      }
    }, [edgesStore, aggregateEdges$1, graph, labelType]);
    useEffect(() => {
      if (aggregateEdges$1 && edgesStore.length !== edges.length) {
        setEdges(edges);
      }
    }, [edges, edgesStore.length, setEdges, aggregateEdges$1]);
    const { centerNodesById, fitNodesInViewById, isCentered } = useCenterGraph({
      animated,
      disabled: disabled2,
      layoutType
    });
    useImperativeHandle(
      ref,
      () => ({
        centerGraph: centerNodesById,
        fitNodesInView: fitNodesInViewById,
        graph,
        renderScene: () => gl.render(scene, camera)
      }),
      [centerNodesById, fitNodesInViewById, graph, gl, scene, camera]
    );
    const onNodeDraggedHandler = useCallback(
      (node) => {
        onNodeDragged?.(node);
        if (clusterAttribute) {
          updateLayout();
        }
      },
      [clusterAttribute, onNodeDragged, updateLayout]
    );
    const nodeComponents = useMemo(
      () => nodes.map((n) => /* @__PURE__ */ jsx(
        Node,
        {
          id: n?.id,
          labelFontUrl,
          draggable,
          constrainDragging,
          disabled: disabled2,
          animated,
          contextMenu,
          renderNode,
          onClick: onNodeClick,
          onDoubleClick: onNodeDoubleClick,
          onContextMenu: onNodeContextMenu,
          onPointerOver: onNodePointerOver,
          onPointerOut: onNodePointerOut,
          onDragged: onNodeDraggedHandler
        },
        n?.id
      )),
      [
        constrainDragging,
        animated,
        contextMenu,
        disabled2,
        draggable,
        labelFontUrl,
        nodes,
        onNodeClick,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeDraggedHandler,
        onNodePointerOut,
        onNodePointerOver,
        renderNode
      ]
    );
    const edgeComponents = useMemo(
      () => animated ? edges.map((e) => /* @__PURE__ */ jsx(
        Edge$1,
        {
          id: e.id,
          disabled: disabled2,
          animated,
          labelFontUrl,
          labelPlacement: edgeLabelPosition,
          arrowPlacement: edgeArrowPosition,
          interpolation: edgeInterpolation,
          contextMenu,
          onClick: onEdgeClick,
          onContextMenu: onEdgeContextMenu,
          onPointerOver: onEdgePointerOver,
          onPointerOut: onEdgePointerOut
        },
        e.id
      )) : /* @__PURE__ */ jsx(
        Edges,
        {
          edges,
          disabled: disabled2,
          animated,
          labelFontUrl,
          labelPlacement: edgeLabelPosition,
          arrowPlacement: edgeArrowPosition,
          interpolation: edgeInterpolation,
          contextMenu,
          onClick: onEdgeClick,
          onContextMenu: onEdgeContextMenu,
          onPointerOver: onEdgePointerOver,
          onPointerOut: onEdgePointerOut
        }
      ),
      [
        animated,
        contextMenu,
        disabled2,
        edgeArrowPosition,
        edgeInterpolation,
        edgeLabelPosition,
        edges,
        labelFontUrl,
        onEdgeClick,
        onEdgeContextMenu,
        onEdgePointerOut,
        onEdgePointerOver
      ]
    );
    const clusterComponents = useMemo(
      () => clusters.map((c) => /* @__PURE__ */ jsx(
        Cluster,
        {
          animated,
          disabled: disabled2,
          draggable,
          labelFontUrl,
          onClick: onClusterClick,
          onPointerOver: onClusterPointerOver,
          onPointerOut: onClusterPointerOut,
          onDragged: onClusterDragged,
          onRender: onRenderCluster,
          ...c
        },
        c.label
      )),
      [
        animated,
        clusters,
        disabled2,
        draggable,
        labelFontUrl,
        onClusterClick,
        onClusterPointerOut,
        onClusterPointerOver,
        onClusterDragged,
        onRenderCluster
      ]
    );
    return isCentered && /* @__PURE__ */ jsxs(Fragment$1, { children: [
      edgeComponents,
      nodeComponents,
      clusterComponents
    ] });
  }
);
function getAdjacents(graph, nodeIds, type) {
  nodeIds = Array.isArray(nodeIds) ? nodeIds : [nodeIds];
  const nodes = [];
  const edges = [];
  for (const nodeId of nodeIds) {
    const graphLinks = [
      ...graph.inEdgeEntries(nodeId) ?? [],
      ...graph.outEdgeEntries(nodeId) ?? []
    ];
    if (!graphLinks) {
      continue;
    }
    for (const link of graphLinks) {
      const linkId = link.attributes.id;
      if (type === "in") {
        if (link.target === nodeId && !edges.includes(linkId)) {
          edges.push(linkId);
        }
      } else if (type === "out") {
        if (link.source === nodeId && !edges.includes(linkId)) {
          edges.push(linkId);
        }
      } else {
        if (!edges.includes(linkId)) {
          edges.push(linkId);
        }
      }
      if (type === "out" || type === "all") {
        const toId = link.target;
        if (!nodes.includes(toId)) {
          nodes.push(toId);
        }
      }
      if (type === "in" || type === "all") {
        if (!nodes.includes(link.source)) {
          nodes.push(link.source);
        }
      }
    }
  }
  return {
    nodes,
    edges
  };
}
function prepareRay(event, vec, size) {
  const { offsetX, offsetY } = event;
  const { width, height } = size;
  vec.set(offsetX / width * 2 - 1, -(offsetY / height) * 2 + 1);
}
function createElement(theme) {
  const element = document.createElement("div");
  element.style.pointerEvents = "none";
  element.style.border = theme.lasso.border;
  element.style.backgroundColor = theme.lasso.background;
  element.style.position = "fixed";
  return element;
}
const Lasso = ({
  children,
  type = "none",
  onLasso,
  onLassoEnd,
  disabled: disabled2
}) => {
  const theme = useStore((state) => state.theme);
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const setEvents = useThree((state) => state.setEvents);
  const size = useThree((state) => state.size);
  const get = useThree((state) => state.get);
  const scene = useThree((state) => state.scene);
  const cameraControls = useCameraControls();
  const actives = useStore((state) => state.actives);
  const setActives = useStore((state) => state.setActives);
  const edges = useStore((state) => state.edges);
  const edgeMeshes = useStore((state) => state.edgeMeshes);
  const selectionBoxRef = useRef(null);
  const edgeMeshSelectionBoxRef = useRef(null);
  const elementRef = useRef(createElement(theme));
  const vectorsRef = useRef(null);
  const isDownRef = useRef(false);
  const oldRaycasterEnabledRef = useRef(get().events.enabled);
  const oldControlsEnabledRef = useRef(
    cameraControls.controls?.enabled
  );
  const onPointerMove = useCallback(
    (event) => {
      if (isDownRef.current) {
        const [startPoint, pointTopLeft, pointBottomRight] = vectorsRef.current;
        pointBottomRight.x = Math.max(startPoint.x, event.clientX);
        pointBottomRight.y = Math.max(startPoint.y, event.clientY);
        pointTopLeft.x = Math.min(startPoint.x, event.clientX);
        pointTopLeft.y = Math.min(startPoint.y, event.clientY);
        elementRef.current.style.left = `${pointTopLeft.x}px`;
        elementRef.current.style.top = `${pointTopLeft.y}px`;
        elementRef.current.style.width = `${pointBottomRight.x - pointTopLeft.x}px`;
        elementRef.current.style.height = `${pointBottomRight.y - pointTopLeft.y}px`;
        prepareRay(event, selectionBoxRef.current.endPoint, size);
        prepareRay(event, edgeMeshSelectionBoxRef.current.endPoint, size);
        const allSelected = [];
        const edgesSelected = edgeMeshSelectionBoxRef.current.select().sort((o) => o.uuid).filter((o) => o.geometry?.userData?.type === type || type === "all").map(
          (edge) => edges[edgeMeshes.indexOf(edge)].id
        );
        allSelected.push(...edgesSelected);
        const selected = selectionBoxRef.current.select().sort((o) => o.uuid).filter(
          (o) => o.isMesh && o.userData?.id && (o.userData?.type === type || type === "all")
        ).map((o) => o.userData.id);
        allSelected.push(...selected);
        requestAnimationFrame(() => {
          setActives(allSelected);
          onLasso?.(allSelected);
        });
        document.addEventListener("pointermove", onPointerMove, {
          passive: true,
          capture: true,
          once: true
        });
      }
    },
    [size, edges, edgeMeshes, type, setActives, onLasso]
  );
  const onPointerUp = useCallback(() => {
    if (isDownRef.current) {
      setEvents({ enabled: oldRaycasterEnabledRef.current });
      isDownRef.current = false;
      elementRef.current.parentElement?.removeChild(elementRef.current);
      cameraControls.controls.enabled = oldControlsEnabledRef.current;
      onLassoEnd?.(actives);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    }
  }, [setEvents, cameraControls.controls, onLassoEnd, actives, onPointerMove]);
  const onPointerDown = useCallback(
    (event) => {
      if (event.shiftKey) {
        oldRaycasterEnabledRef.current = get().events.enabled;
        oldControlsEnabledRef.current = cameraControls.controls?.enabled;
        selectionBoxRef.current = new SelectionBox(camera, scene);
        const edgeScene = new Scene();
        if (edgeMeshes.length) {
          edgeScene.add(...edgeMeshes);
        }
        edgeMeshSelectionBoxRef.current = new SelectionBox(camera, edgeScene);
        vectorsRef.current = [
          // start point
          new Vector2(),
          // point top left
          new Vector2(),
          // point bottom right
          new Vector2()
        ];
        const [startPoint] = vectorsRef.current;
        cameraControls.controls.enabled = false;
        setEvents({ enabled: false });
        isDownRef.current = true;
        gl.domElement.parentElement?.appendChild(elementRef.current);
        elementRef.current.style.left = `${event.clientX}px`;
        elementRef.current.style.top = `${event.clientY}px`;
        elementRef.current.style.width = "0px";
        elementRef.current.style.height = "0px";
        startPoint.x = event.clientX;
        startPoint.y = event.clientY;
        prepareRay(event, selectionBoxRef.current.startPoint, size);
        prepareRay(event, edgeMeshSelectionBoxRef.current.startPoint, size);
        document.addEventListener("pointermove", onPointerMove, {
          passive: true,
          capture: true,
          once: true
        });
        document.addEventListener("pointerup", onPointerUp, { passive: true });
      }
    },
    [
      camera,
      cameraControls.controls,
      edgeMeshes,
      get,
      gl.domElement.parentElement,
      onPointerMove,
      onPointerUp,
      scene,
      setEvents,
      size
    ]
  );
  useEffect(() => {
    if (disabled2 || type === "none") {
      return;
    }
    if (typeof window !== "undefined") {
      document.addEventListener("pointerdown", onPointerDown, {
        passive: true
      });
      document.addEventListener("pointermove", onPointerMove, {
        passive: true
      });
      document.addEventListener("pointerup", onPointerUp, { passive: true });
    }
    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      }
    };
  }, [type, disabled2, onPointerDown, onPointerMove, onPointerUp]);
  return /* @__PURE__ */ jsx("group", { children });
};
const darkTheme = {
  canvas: {
    background: "#1E2026"
  },
  node: {
    fill: "#7A8C9E",
    activeFill: "#1DE9AC",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      color: "#202020",
      activeColor: "#000000",
      fontSize: 6,
      maxWidth: 100,
      ellipsis: 100,
      backgroundColor: "#fafafa",
      borderRadius: 2
    },
    subLabel: {
      stroke: "#1E2026",
      color: "#ACBAC7",
      activeColor: "#1DE9AC"
    }
  },
  lasso: {
    border: "1px solid #55aaff",
    background: "rgba(75, 160, 255, 0.1)"
  },
  ring: {
    fill: "#54616D",
    activeFill: "#1DE9AC"
  },
  edge: {
    fill: "#ffffff",
    activeFill: "#1DE9AC",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      color: "#202020",
      activeColor: "#000000",
      fontSize: 4,
      maxWidth: 100,
      ellipsis: 100,
      backgroundColor: "#fafafa",
      borderRadius: 2
    }
  },
  arrow: {
    fill: "#474B56",
    activeFill: "#1DE9AC"
  },
  cluster: {
    stroke: "#474B56",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      color: "#202020",
      activeColor: "#000000",
      fontSize: 4,
      maxWidth: 100,
      ellipsis: 100,
      backgroundColor: "#fafafa",
      borderRadius: 2
    }
  }
};
const lightTheme = {
  canvas: {
    background: "#fff"
  },
  node: {
    fill: "#7CA0AB",
    activeFill: "#1DE9AC",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.2,
    label: {
      color: "#2A6475",
      // stroke: '#fff',
      activeColor: "#1DE9AC",
      fontSize: 6,
      maxWidth: 100,
      ellipsis: 100,
      backgroundColor: "#1E2026",
      borderRadius: 2
    },
    subLabel: {
      color: "#ddd",
      stroke: "transparent",
      activeColor: "#1DE9AC"
    }
  },
  lasso: {
    border: "1px solid #55aaff",
    background: "rgba(75, 160, 255, 0.1)"
  },
  ring: {
    fill: "#D8E6EA",
    activeFill: "#1DE9AC"
  },
  edge: {
    fill: "#474B56",
    activeFill: "#1DE9AC",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      // stroke: '#fff',
      color: "#2A6475",
      activeColor: "#1DE9AC",
      fontSize: 6,
      maxWidth: 100,
      ellipsis: 100,
      backgroundColor: "#1E2026",
      borderRadius: 2
    }
  },
  arrow: {
    fill: "#D8E6EA",
    activeFill: "#1DE9AC"
  },
  cluster: {
    stroke: "#D8E6EA",
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: "#1E2026",
      color: "#ACBAC7",
      activeColor: "#1DE9AC",
      fontSize: 6,
      maxWidth: 100,
      ellipsis: 100,
      backgroundColor: "#1E2026",
      borderRadius: 2
    }
  }
};
const canvas = "_canvas_116y6_1";
const css$2 = {
  canvas
};
const GL_DEFAULTS = {
  alpha: true,
  antialias: true
};
const CAMERA_DEFAULTS = {
  position: [0, 0, 1e3],
  near: 5,
  far: 5e4,
  fov: 10
};
const GraphCanvas = forwardRef(
  ({
    cameraMode = "pan",
    layoutType = "forceDirected2d",
    sizingType = "default",
    labelType = "auto",
    theme = lightTheme,
    animated = true,
    defaultNodeSize = 7,
    minNodeSize = 5,
    maxNodeSize = 15,
    lassoType = "none",
    glOptions = {},
    edges,
    children,
    nodes,
    minDistance,
    maxDistance,
    minZoom,
    maxZoom,
    onCanvasClick,
    disabled: disabled2,
    onLasso,
    onLassoEnd,
    aggregateEdges: aggregateEdges2,
    ...rest
  }, ref) => {
    const rendererRef = useRef(null);
    const controlsRef = useRef(null);
    const canvasRef = useRef(null);
    useImperativeHandle(ref, () => ({
      centerGraph: (nodeIds, opts) => rendererRef.current?.centerGraph(nodeIds, opts),
      fitNodesInView: (nodeIds, opts) => rendererRef.current?.fitNodesInView(nodeIds, opts),
      zoomIn: () => {
        const controls = controlsRef.current?.controls;
        if (!controls) return;
        const currentDistance = controls.distance;
        const currentZoom = controls.camera.zoom;
        const newZoom = currentZoom + currentZoom / 2;
        const newEffectiveDistance = currentDistance / newZoom;
        if (!minDistance || newEffectiveDistance >= minDistance) {
          controlsRef.current?.zoomIn();
        }
      },
      zoomOut: () => {
        const controls = controlsRef.current?.controls;
        if (!controls) return;
        const currentDistance = controls.distance;
        const currentZoom = controls.camera.zoom;
        const newZoom = currentZoom - currentZoom / 2;
        const newEffectiveDistance = currentDistance / newZoom;
        if (!maxDistance || newEffectiveDistance <= maxDistance) {
          controlsRef.current?.zoomOut();
        }
      },
      dollyIn: (distance) => controlsRef.current?.dollyIn(distance),
      dollyOut: (distance) => controlsRef.current?.dollyOut(distance),
      panLeft: () => controlsRef.current?.panLeft(),
      panRight: () => controlsRef.current?.panRight(),
      panDown: () => controlsRef.current?.panDown(),
      panUp: () => controlsRef.current?.panUp(),
      resetControls: (animated2) => controlsRef.current?.resetControls(animated2),
      getControls: () => controlsRef.current?.controls,
      getGraph: () => rendererRef.current?.graph,
      exportCanvas: () => {
        rendererRef.current.renderScene();
        return canvasRef.current.toDataURL();
      },
      freeze: () => controlsRef.current?.freeze(),
      unFreeze: () => controlsRef.current?.unFreeze()
    }));
    const { selections, actives, collapsedNodeIds } = rest;
    const finalAnimated = edges.length + nodes.length > 400 ? false : animated;
    const gl = useMemo(() => ({ ...glOptions, ...GL_DEFAULTS }), [glOptions]);
    const store = useRef(
      createStore({
        selections,
        actives,
        theme,
        collapsedNodeIds
      })
    ).current;
    useEffect(() => {
      store.getState().setTheme(theme);
    }, [theme, store]);
    return /* @__PURE__ */ jsx("div", { className: css$2.canvas, children: /* @__PURE__ */ jsx(
      Canvas,
      {
        orthographic: cameraMode === "orthographic",
        legacy: true,
        linear: true,
        ref: canvasRef,
        flat: true,
        gl,
        camera: CAMERA_DEFAULTS,
        onPointerMissed: onCanvasClick,
        children: /* @__PURE__ */ jsxs(Provider, { store, children: [
          theme.canvas?.background && /* @__PURE__ */ jsx("color", { attach: "background", args: [theme.canvas.background] }),
          /* @__PURE__ */ jsx("ambientLight", { intensity: 1 }),
          children,
          theme.canvas?.fog && /* @__PURE__ */ jsx("fog", { attach: "fog", args: [theme.canvas.fog, 4e3, 9e3] }),
          /* @__PURE__ */ jsx(
            CameraControls,
            {
              mode: cameraMode,
              ref: controlsRef,
              disabled: disabled2,
              minDistance,
              maxDistance,
              minZoom,
              maxZoom,
              animated,
              children: /* @__PURE__ */ jsx(
                Lasso,
                {
                  disabled: disabled2,
                  type: lassoType,
                  onLasso,
                  onLassoEnd,
                  children: /* @__PURE__ */ jsx(Suspense, { children: /* @__PURE__ */ jsx(
                    GraphScene,
                    {
                      ref: rendererRef,
                      disabled: disabled2,
                      animated: finalAnimated,
                      edges,
                      nodes,
                      layoutType,
                      sizingType,
                      labelType,
                      defaultNodeSize,
                      minNodeSize,
                      maxNodeSize,
                      aggregateEdges: aggregateEdges2,
                      ...rest
                    }
                  ) })
                }
              )
            }
          )
        ] })
      }
    ) });
  }
);
const container$1 = "_container_5mglj_1";
const css$1 = {
  container: container$1
};
const container = "_container_1fe76_1";
const disabled = "_disabled_1fe76_13";
const contentContainer = "_contentContainer_1fe76_19";
const contentInner = "_contentInner_1fe76_69";
const content = "_content_1fe76_19";
const css = {
  container,
  disabled,
  contentContainer,
  contentInner,
  content
};
const RadialSlice = ({
  label,
  centralAngle,
  startAngle,
  endAngle,
  polar,
  radius,
  className,
  icon,
  innerRadius,
  skew,
  disabled: disabled2,
  onClick
}) => /* @__PURE__ */ jsx(
  "div",
  {
    role: "menuitem",
    className: classNames(css.container, className, {
      [css.disabled]: disabled2
    }),
    style: {
      width: centralAngle > 90 ? "100%" : "50%",
      height: centralAngle > 90 ? "100%" : "50%",
      bottom: centralAngle > 90 ? "50%" : "initial",
      right: centralAngle > 90 ? "50%" : "initial",
      transform: `rotate(${startAngle + endAngle}deg) skew(${skew}deg)`
    },
    onClick: (event) => {
      if (!disabled2) {
        onClick(event);
      }
    },
    children: /* @__PURE__ */ jsx(
      "div",
      {
        className: css.contentContainer,
        style: {
          transform: `skew(${-skew}deg) rotate(${(polar ? 90 : centralAngle) / 2 - 90}deg)`
        },
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: css.contentInner,
            style: {
              top: `calc((((${centralAngle > 90 ? "50% + " : ""}${radius}px) - ${innerRadius}px) / 2) - 4em)`
            },
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: css.content,
                style: {
                  transform: `rotate(${-endAngle}deg)`
                },
                title: label,
                children: [
                  icon,
                  label
                ]
              }
            )
          }
        )
      }
    )
  }
);
function calculateRadius(items, startOffsetAngle) {
  const centralAngle = 360 / items.length || 360;
  const polar = centralAngle % 180 === 0;
  const deltaAngle = 90 - centralAngle;
  const startAngle = polar ? 45 : startOffsetAngle + deltaAngle + centralAngle / 2;
  return { centralAngle, polar, startAngle, deltaAngle };
}
const RadialMenu = ({
  items,
  radius = 175,
  className,
  innerRadius = 25,
  startOffsetAngle = 0,
  onClose
}) => {
  const { centralAngle, polar, startAngle, deltaAngle } = useMemo(
    () => calculateRadius(items, startOffsetAngle),
    [items, startOffsetAngle]
  );
  const timeout = useRef(null);
  useLayoutEffect(() => {
    const timer = timeout.current;
    return () => clearTimeout(timer);
  }, []);
  if (items.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "menu",
      className: classNames(css$1.container, className),
      onPointerEnter: () => clearTimeout(timeout.current),
      onPointerLeave: (event) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => onClose?.(event), 500);
      },
      children: items.map((slice, index) => /* @__PURE__ */ jsx(
        RadialSlice,
        {
          ...slice,
          radius,
          innerRadius,
          startAngle,
          endAngle: centralAngle * index,
          skew: polar ? 0 : deltaAngle,
          polar,
          centralAngle,
          onClick: (event) => {
            slice?.onClick(event);
            onClose?.(event);
          }
        },
        index
      ))
    }
  );
};
const useSelection = ({
  selections = [],
  nodes = [],
  actives = [],
  focusOnSelect = true,
  type = "single",
  pathHoverType = "out",
  pathSelectionType = "direct",
  ref,
  disabled: disabled2,
  onSelection
}) => {
  const [internalHovers, setInternalHovers] = useState([]);
  const [internalActives, setInternalActives] = useState(actives);
  const [internalSelections, setInternalSelections] = useState(selections);
  const [metaKeyDown, setMetaKeyDown] = useState(false);
  const isMulti = type === "multi" || type === "multiModifier";
  const addSelection = useCallback(
    (items) => {
      if (!disabled2 && items) {
        items = Array.isArray(items) ? items : [items];
        const filtered = items.filter(
          (item) => !internalSelections.includes(item)
        );
        if (filtered.length) {
          const next = [...internalSelections, ...filtered];
          onSelection?.(next);
          setInternalSelections(next);
        }
      }
    },
    [disabled2, internalSelections, onSelection]
  );
  const removeSelection = useCallback(
    (items) => {
      if (!disabled2 && items) {
        items = Array.isArray(items) ? items : [items];
        const next = internalSelections.filter((i) => !items.includes(i));
        onSelection?.(next);
        setInternalSelections(next);
      }
    },
    [disabled2, internalSelections, onSelection]
  );
  const clearSelections = useCallback(
    (next = []) => {
      if (!disabled2) {
        next = Array.isArray(next) ? next : [next];
        setInternalActives([]);
        setInternalSelections(next);
        onSelection?.(next);
      }
    },
    [disabled2, onSelection]
  );
  const toggleSelection = useCallback(
    (item) => {
      const has = internalSelections.includes(item);
      if (has) {
        removeSelection(item);
      } else {
        if (!isMulti) {
          clearSelections(item);
        } else {
          addSelection(item);
        }
      }
    },
    [
      addSelection,
      clearSelections,
      internalSelections,
      isMulti,
      removeSelection
    ]
  );
  const onNodeClick = useCallback(
    (data) => {
      if (isMulti) {
        if (type === "multiModifier") {
          if (metaKeyDown) {
            addSelection(data.id);
          } else {
            clearSelections(data.id);
          }
        } else {
          addSelection(data.id);
        }
      } else {
        clearSelections(data.id);
      }
      if (focusOnSelect === true || focusOnSelect === "singleOnly" && !metaKeyDown) {
        if (!ref.current) {
          throw new Error("No ref found for the graph canvas.");
        }
        const graph = ref.current.getGraph();
        const { nodes: adjacents } = getAdjacents(
          graph,
          [data.id],
          pathSelectionType
        );
        ref.current.fitNodesInView([data.id, ...adjacents], {
          fitOnlyIfNodesNotInView: true
        });
      }
    },
    [
      addSelection,
      clearSelections,
      focusOnSelect,
      isMulti,
      metaKeyDown,
      pathSelectionType,
      ref,
      type
    ]
  );
  const selectNodePaths = useCallback(
    (source, target) => {
      const graph = ref.current.getGraph();
      if (!graph) {
        throw new Error("Graph is not initialized");
      }
      const path = findPath(graph, source, target);
      clearSelections([source, target]);
      const result = [];
      for (let i = 0; i < path.length - 1; i++) {
        const from = path[i];
        const to = path[i + 1];
        const edge = graph.getEdgeAttributes(from, to);
        if (edge) {
          result.push(edge.id);
        }
      }
      setInternalActives([...path.map((p) => p), ...result]);
    },
    [clearSelections, ref]
  );
  const onKeyDown = useCallback((event) => {
    const element = event.target;
    const isSafe = isNotEditableElement(element);
    const isMeta = event.metaKey || event.ctrlKey;
    if (isSafe && isMeta) {
      setMetaKeyDown(true);
    }
  }, []);
  const onKeyUp = useCallback((event) => {
    const element = event.target;
    const isSafe = isNotEditableElement(element);
    const isMeta = ["Meta", "Control"].includes(event.key);
    if (isSafe && isMeta) {
      setMetaKeyDown(false);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      }
    };
  }, [onKeyDown, onKeyUp]);
  const onCanvasClick = useCallback(
    (event) => {
      if (event.button !== 2 && (internalSelections.length || internalActives.length)) {
        clearSelections();
        setMetaKeyDown(false);
        if (focusOnSelect && internalSelections.length === 1) {
          if (!ref.current) {
            throw new Error("No ref found for the graph canvas.");
          }
          ref.current.fitNodesInView([], { fitOnlyIfNodesNotInView: true });
        }
      }
    },
    [
      clearSelections,
      focusOnSelect,
      internalActives.length,
      internalSelections.length,
      ref
    ]
  );
  const onLasso = useCallback((selections2) => {
    setInternalActives(selections2);
  }, []);
  const onLassoEnd = useCallback(
    (selections2) => {
      clearSelections(selections2);
    },
    [clearSelections]
  );
  const onNodePointerOver = useCallback(
    (data) => {
      if (pathHoverType) {
        const graph = ref.current.getGraph();
        if (!graph) {
          throw new Error("No ref found for the graph canvas.");
        }
        const { nodes: nodes2, edges } = getAdjacents(graph, [data.id], pathHoverType);
        setInternalHovers([...nodes2, ...edges]);
      }
    },
    [pathHoverType, ref]
  );
  const onNodePointerOut = useCallback(() => {
    if (pathHoverType) {
      setInternalHovers([]);
    }
  }, [pathHoverType]);
  useEffect(() => {
    if (pathSelectionType !== "direct" && internalSelections.length > 0) {
      const graph = ref.current?.getGraph();
      if (graph) {
        const { nodes: nodes2, edges } = getAdjacents(
          graph,
          internalSelections,
          pathSelectionType
        );
        setInternalActives([...nodes2, ...edges]);
      }
    }
  }, [internalSelections, pathSelectionType, ref]);
  const joinedActives = useMemo(
    () => [...internalActives, ...internalHovers],
    [internalActives, internalHovers]
  );
  return {
    actives: joinedActives,
    onNodeClick,
    onNodePointerOver,
    onNodePointerOut,
    onLasso,
    onLassoEnd,
    selectNodePaths,
    onCanvasClick,
    selections: internalSelections,
    clearSelections,
    addSelection,
    removeSelection,
    toggleSelection,
    setSelections: setInternalSelections
  };
};
export {
  Arrow,
  Badge,
  CameraControls,
  Cluster,
  Edge$1 as Edge,
  Edges,
  FORCE_LAYOUTS,
  GraphCanvas,
  GraphScene,
  Icon,
  Label,
  Lasso,
  Line,
  Node,
  RadialMenu,
  RadialSlice,
  Ring,
  Sphere,
  SphereWithIcon,
  SphereWithSvg,
  Svg,
  addColorAttribute,
  animationConfig,
  attributeSizing,
  buildClusterGroups,
  buildGraph,
  buildNodeEdges,
  calcLabelVisibility,
  calculateClusters,
  calculateEdgeCurveOffset,
  calculateSubLabelOffset,
  centralitySizing,
  circular2d,
  clearMeasurementCache,
  concentric2d,
  createDashedGeometry,
  createElement,
  createNullGeometry,
  custom,
  darkTheme,
  findPath,
  forceAtlas2,
  forceDirected,
  forceInABox,
  forceRadial,
  getAdjacents,
  getArrowSize,
  getArrowVectors,
  getClosestAxis,
  getCurve,
  getCurvePoints,
  getDegreesToClosest2dAxis,
  getExpandPath,
  getLabelOffsetByType,
  getLayoutCenter,
  getMeasurementCacheSize,
  getMidPoint,
  getNodeDepth,
  getSelfLoopCurve,
  getVector,
  getVisibleEntities,
  hierarchical,
  isNodeInView,
  isNotEditableElement,
  isServerRender,
  layoutProvider,
  lightTheme,
  measureText,
  nodeSizeProvider,
  nooverlap,
  pageRankSizing,
  prepareRay,
  recommendLayout,
  tick,
  transformGraph,
  updateNodePosition,
  useCollapse,
  useGraph,
  useSelection
};
//# sourceMappingURL=index.js.map
