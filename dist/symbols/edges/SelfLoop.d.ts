import { ThreeEvent } from '@react-three/fiber';
import { FC } from 'react';
import { ColorRepresentation } from 'three';
export interface SelfLoopProps {
    /**
     * The unique identifier of the edge.
     */
    id: string;
    /**
     * The color of the edge.
     */
    curve: any;
    /**
     * The size of the edge.
     */
    size: number;
    /**
     * The color of the edge.
     */
    color?: ColorRepresentation;
    /**
     * The opacity of the edge.
     */
    opacity: number;
    /**
     * Whether the edge is animated.
     */
    animated?: boolean;
    /**
     * A function that is called when the mouse pointer is moved over the line.
     */
    onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
    /**
     * A function that is called when the mouse pointer is moved out of the line.
     */
    onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
    /**
     * A function that is called when the line is clicked.
     */
    onClick?: (event: ThreeEvent<MouseEvent>) => void;
    /**
     * A function that is called when the line is right-clicked.
     */
    onContextMenu?: () => void;
}
export declare const SelfLoop: FC<SelfLoopProps>;
