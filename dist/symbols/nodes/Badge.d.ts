import { FC } from 'react';
import { NodeRendererProps } from '../../types';
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
export type IconPosition = 'start' | 'end';
export interface BadgeProps extends Omit<NodeRendererProps, 'opacity'> {
    /**
     * The text to display in the badge.
     */
    label: string;
    /**
     * Background color of the badge.
     */
    backgroundColor?: string;
    /**
     * Opacity of the badge background and stroke (0-1).
     * Default: 1
     */
    opacity?: number;
    /**
     * Text color of the badge.
     */
    textColor?: string;
    /**
     * Stroke color of the badge border.
     */
    strokeColor?: string;
    /**
     * Size of the badge border stroke.
     */
    strokeWidth?: number;
    /**
     * Corner radius of the badge.
     */
    radius?: number;
    /**
     * Size multiplier for the badge relative to the node size.
     */
    badgeSize?: number;
    /**
     * Position offset from the node center or preset position.
     */
    position?: [number, number, number] | BadgePosition;
    /**
     * Padding around the badge text.
     * Default: 0.15
     */
    padding?: number;
    /**
     * SVG icon path or URL to display in the badge.
     */
    icon?: string;
    /**
     * Size of the icon in the badge.
     */
    iconSize?: number;
    /**
     * Position of the icon relative to the text or custom coordinates [x, y].
     * - 'start': Icon appears before the text (left side)
     * - 'end': Icon appears after the text (right side)
     * - [x, y]: Custom coordinates within the badge. When using custom coordinates,
     *   the text remains centered and only the icon moves to the specified position.
     */
    iconPosition?: IconPosition | [number, number];
    /**
     * Font size for the badge text.
     */
    fontSize?: number;
    /**
     * Font weight for the badge text (100-900).
     * Values outside this range will be clamped to the nearest valid value.
     * Common values: 400 (normal), 700 (bold), 900 (extra bold).
     */
    fontWeight?: number;
    /**
     * Gap between icon and text.
     * Default: 0.01
     */
    iconTextGap?: number;
}
export declare const Badge: FC<BadgeProps>;
