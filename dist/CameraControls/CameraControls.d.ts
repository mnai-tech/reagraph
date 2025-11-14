import { ReactNode, default as React } from 'react';
import { CameraControlsContextProps } from './useCameraControls';
export type CameraMode = 'pan' | 'rotate' | 'orbit' | 'orthographic';
export interface CameraControlsProps {
    /**
     * Mode of the camera.
     */
    mode?: CameraMode;
    /**
     * Children symbols.
     */
    children?: ReactNode;
    /**
     * Animate transitions to centering.
     */
    animated?: boolean;
    /**
     * Whether the controls are enabled.
     */
    disabled?: boolean;
    /**
     * The maximum distance for the camera (perspective mode).
     */
    maxDistance?: number;
    /**
     * The minimum distance for the camera (perspective mode).
     */
    minDistance?: number;
    /**
     * The maximum zoom level for orthographic cameras.
     */
    maxZoom?: number;
    /**
     * The minimum zoom level for orthographic cameras.
     */
    minZoom?: number;
}
export type CameraControlsRef = CameraControlsContextProps;
export declare const CameraControls: React.ForwardRefExoticComponent<CameraControlsProps & React.RefAttributes<CameraControlsContextProps>>;
