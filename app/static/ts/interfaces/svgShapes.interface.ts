import { VectorShapes } from '../svg/VectorShape';

export interface VectorShapeConfig extends Partial<typeof VectorShapes.defaultConfig> 
{
    fill?: string;
}