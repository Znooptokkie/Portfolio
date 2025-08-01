import { VectorShapes } from '../svg/vectorShape.class';

export interface VectorShapeConfig extends Partial<typeof VectorShapes.defaultConfig> 
{
    fill?: string;
}