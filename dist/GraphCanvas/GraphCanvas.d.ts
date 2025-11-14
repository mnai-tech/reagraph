import { default as ThreeCameraControls } from 'camera-controls';
import { default as Graph } from 'graphology';
import { ReactNode, default as React } from 'react';
import { CameraControlsRef, CameraMode } from '../CameraControls';
import { GraphSceneProps, GraphSceneRef } from '../GraphScene';
import { LassoType } from '../selection/Lasso';
import { Theme } from '../themes';
export interface GraphCanvasProps extends Omit<GraphSceneProps, 'theme'> {
    /**
     * Theme to use for the graph.
     */
    theme?: Theme;
    /**
     * Type of camera interaction.
     */
    cameraMode?: CameraMode;
    /**
     * The maximum distance for the camera. Default is 50000.
     */
    maxDistance?: number;
    /**
     * The minimum distance for the camera. Default is 1000.
     */
    minDistance?: number;
    /**
     * The minimum zoom level for the camera. Default is 1.
     */
    minZoom?: number;
    /**
     * The maximum zoom level for the camera. Default is 100.
     */
    maxZoom?: number;
    /**
     * The type of lasso selection.
     */
    lassoType?: LassoType;
    /**
     * Children to render in the canvas. Useful for things like lights.
     */
    children?: ReactNode;
    /**
     * Ability to extend Cavas gl options. For example { preserveDrawingBuffer: true }
     */
    glOptions?: object;
    /**
     * When the canvas had a lasso selection.
     */
    onLasso?: (selections: string[]) => void;
    /**
     * When the canvas had a lasso selection end.
     */
    onLassoEnd?: (selections: string[]) => void;
    /**
     * When the canvas was clicked but didn't hit a node/edge.
     */
    onCanvasClick?: (event: MouseEvent) => void;
    /**
     * Whether to aggregate edges with the same source and target.
     */
    aggregateEdges?: boolean;
}
export type GraphCanvasRef = Omit<GraphSceneRef, 'graph' | 'renderScene'> & Omit<CameraControlsRef, 'controls'> & {
    /**
     * Get the graph object.
     */
    getGraph: () => Graph;
    /**
     * Get the camera controls.
     */
    getControls: () => ThreeCameraControls;
    /**
     * Export the canvas as a data URL.
     */
    exportCanvas: () => string;
};
export declare const GraphCanvas: React.ForwardRefExoticComponent<GraphCanvasProps & React.RefAttributes<GraphCanvasRef>>;
