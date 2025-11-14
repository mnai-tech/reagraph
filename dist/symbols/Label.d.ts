import { FC } from 'react';
import { ColorRepresentation, Euler } from 'three';
export interface LabelProps {
    /**
     * Text to render.
     */
    text: string;
    /**
     * Font URL.
     * Reference: https://github.com/reaviz/reagraph/issues/23
     */
    fontUrl?: string;
    /**
     * Size of the font.
     */
    fontSize?: number;
    /**
     * Color of the text.
     */
    color?: ColorRepresentation;
    /**
     * Stroke of the text.
     */
    stroke?: ColorRepresentation;
    /**
     * Background color of the label.
     */
    backgroundColor?: ColorRepresentation;
    /**
     * Opacity of the background.
     */
    backgroundOpacity?: number;
    /**
     * Padding around the text for background sizing.
     */
    padding?: number;
    /**
     * Color of the background stroke/border.
     */
    strokeColor?: ColorRepresentation;
    /**
     * Size of the background stroke/border.
     */
    strokeWidth?: number;
    /**
     * Corner radius of the background.
     */
    radius?: number;
    /**
     * Opacity for the label.
     */
    opacity?: number;
    /**
     * The lenth of which to start the ellipsis.
     */
    ellipsis?: number;
    /**
     * Whether the label is active ( dragging, hover, focus ).
     */
    active?: boolean;
    /**
     * Rotation of the label.
     */
    rotation?: Euler | [number, number, number];
    /**
     * Maximum width of the label.
     */
    maxWidth?: number;
    /**
     * Border radius of the label.
     */
    borderRadius?: number;
    /**
     * Type of the label.
     */
    type?: 'node' | 'edge';
    /**
     * label visible or not
     */
    labelVisible?: boolean;
}
export declare const Label: FC<LabelProps>;
