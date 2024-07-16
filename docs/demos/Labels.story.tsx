import React from 'react';
import { GraphCanvas } from '../../src';
import { simpleEdges, simpleNodes } from '../assets/demo';

export default {
  title: 'Demos/Labels',
  component: GraphCanvas
};

export const All = () => (
  <GraphCanvas labelType="all" nodes={simpleNodes} edges={simpleEdges} />
);

export const LongLabels = () => (
  <GraphCanvas labelType="all" nodes={[
    {
      id: '1',
      label: 'Department of Defense Logistics and Operations',
    },
    {
      id: '2',
      label: 'The Security Operations of the Cyber Defense System for the United States of America',
    }
  ]} edges={[
    {
      id: '1-2',
      source: '1',
      target: '2',
      label: 'The Security Operations of the Cyber Defense System for the United States of America'
    }
  ]} />
);

export const NodesOnly = () => (
  <GraphCanvas labelType="nodes" nodes={simpleNodes} edges={simpleEdges} />
);

export const EdgesOnly = () => (
  <GraphCanvas labelType="edges" nodes={simpleNodes} edges={simpleEdges} />
);

export const Automatic = () => (
  <GraphCanvas labelType="auto" nodes={simpleNodes} edges={simpleEdges} />
);

export const SubLabels = () => (
  <GraphCanvas
    nodes={[{
      id: '1',
      label: 'Node 1',
      subLabel: 'SubLabel 1'
    },
    {
      id: '2',
      label: 'Node 2'
    },
    {
      id: '3',
      label: 'Node 3',
      subLabel: 'SubLabel 3'
    }]}
    edges={[{
      source: '1',
      target: '2',
      id: '1-2',
    },
    {
      source: '3',
      target: '1',
      id: '3-1',
    }]}
  />
);

export const CustomBackgroundLabels = () => (
  <GraphCanvas
    labelType='all'
    nodes={[
      {
        "id": "n-0",
        "label": "Node 0",
        "data": {
          "priority": 6
        }
      },
      {
        "id": "n-1",
        "label": "FRANCIS FAMILY OFFICE LIMITED",
        "data": {
          "priority": 0
        }
      },
      {
        "id": "n-2",
        "label": "Node 2",
        "data": {
          "priority": 3
        }
      },
      {
        "id": "n-3",
        "label": "Node 3",
        "data": {
          "priority": 1
        }
      },
      {
        "id": "n-4",
        "label": "Node 4",
        "data": {
          "priority": 2
        }
      }
    ]}
    edges={[{
      id: '0->1',
      source: 'n-0',
      target: 'n-1',
      label: 'Edge 0-1',
      backgroundColor: "red"
    },
    {
      id: '0->2',
      source: 'n-0',
      target: 'n-2',
      label: 'Edge 0-2',
      backgroundColor: "blue"
    },
    {
      id: '0->3',
      source: 'n-0',
      target: 'n-3',
      label: 'Edge 0-3'
    },
    {
      id: '0->4',
      source: 'n-0',
      target: 'n-4',
      label: 'Edge 0-4'
    }]}
  />
);
