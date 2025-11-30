import { CalcPathProperties } from "./CalcPathProperties.js"

export class CalcPathFigures
{
    public static createFigures(innerPath: string, outerPath: string): Array<Array<{ x: number, y:  number }>> | null
    {
            const firgurePositions = new Map()
    
            if (!innerPath)
                return null
            
            const outerPathValues = CalcPathProperties.getPathParts(outerPath)
            const innerPathValues = CalcPathProperties.getPathParts(innerPath)
            
            let counter = 1
            
            for (let i = 0; i < outerPathValues.length; i++) 
            {
                const figureArray = []
            
                const nextOuter = outerPathValues[i + 1] ?? outerPathValues[0]
                const nextInner = innerPathValues[i + 1] ?? innerPathValues[0]
            
                const currentOuter = outerPathValues[i]
                const currentInner = innerPathValues[i]
            
                if (!currentOuter || !currentInner || !nextOuter || !nextInner) 
                    continue
            
                figureArray.push(currentOuter, currentInner, nextInner, nextOuter)
            
                firgurePositions.set(counter, figureArray)
                counter++
            }

            const allValues = [...firgurePositions.values()]
            return allValues
    }

    public static createFigurePathString(innerPath: string, outerPath: string): Array<string> | null
    {
        const createArrayWithPathFigures = []
        const eachPathPositionArray = this.createFigures(innerPath, outerPath)

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