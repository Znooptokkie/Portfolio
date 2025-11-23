import { CalcPathProperties } from "./CalcPathProperties.js"

export class CalcPathFigures
{
    public static createFigures(innerPath: string, outerPath: string): Array<Array<{ x: number; y:  number }>> | null
    {
            const firgurePositions = new Map();
    
            let counter = 1;
    
            if (!innerPath)
                return null
            
            const outerPathValues = CalcPathProperties.getPathParts(outerPath)
            const innerPathValues = CalcPathProperties.getPathParts(innerPath)
    
            for (let i = 0; i < CalcPathProperties.getPathParts(outerPath).length; i++)
            {
                const figureArray = [];
    
                if (i === outerPathValues.length - 1 || i === innerPathValues.length - 1)
                {
                    figureArray.push(outerPathValues[i], innerPathValues[i], innerPathValues[0],  outerPathValues[0]);
                }
                else
                {
                    figureArray.push(outerPathValues[i], innerPathValues[i], innerPathValues[i + 1], outerPathValues[i + 1]);
                }
    
                firgurePositions.set(counter, figureArray);
                counter++;
            }
            const allValues = [...firgurePositions.values()];
    
            return allValues;
    }

    public static createFigurePathString(innerPath: string, outerPath: string): Array<string> | null
    {
        const createArrayWithPathFigures = [];
        const eachPathPositionArray = this.createFigures(innerPath, outerPath);

        if (!eachPathPositionArray)
            return null

        for (const figures of eachPathPositionArray)
        {
            const getFigureStringPath = CalcPathProperties.createNewSVGPathString(figures)
            createArrayWithPathFigures.push(getFigureStringPath)
        }

        return createArrayWithPathFigures
    }
}