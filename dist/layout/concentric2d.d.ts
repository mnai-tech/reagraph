import { LayoutFactoryProps } from './types';
export interface ConcentricLayoutInputs extends LayoutFactoryProps {
    /**
     * Base radius of the innermost circle.
     */
    radius: number;
    /**
     * Distance between circles.
     */
    concentricSpacing?: number;
}
/**
 * Concentric layout algorithm for 2D graphs.
 * @param graph
 * @param radius
 * @param drags
 * @param getNodePosition
 * @param concentricSpacing
 */
export declare function concentric2d({ graph, radius, drags, getNodePosition, concentricSpacing }: ConcentricLayoutInputs): {
    step(): boolean;
    getNodePosition(id: string): any;
};
