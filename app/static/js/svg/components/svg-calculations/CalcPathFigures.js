import { CalcPathProperties } from "./CalcPathProperties.js";
export class CalcPathFigures {
    static createFigures(innerPath, outerPath) {
        const firgurePositions = new Map();
        if (!innerPath)
            return null;
        const outerPathValues = CalcPathProperties.getPathParts(outerPath);
        const innerPathValues = CalcPathProperties.getPathParts(innerPath);
        let counter = 1;
        for (let i = 0; i < CalcPathProperties.getPathParts(outerPath).length; i++) {
            const figureArray = [];
            if (i === outerPathValues.length - 1 || i === innerPathValues.length - 1) {
                figureArray.push(outerPathValues[i], innerPathValues[i], innerPathValues[0], outerPathValues[0]);
            }
            else {
                figureArray.push(outerPathValues[i], innerPathValues[i], innerPathValues[i + 1], outerPathValues[i + 1]);
            }
            firgurePositions.set(counter, figureArray);
            counter++;
        }
        const allValues = [...firgurePositions.values()];
        return allValues;
    }
    static createFigurePathString(innerPath, outerPath) {
        const createArrayWithPathFigures = [];
        const eachPathPositionArray = this.createFigures(innerPath, outerPath);
        if (!eachPathPositionArray)
            return null;
        for (const figures of eachPathPositionArray) {
            const getFigureStringPath = CalcPathProperties.createNewSVGPathString(figures);
            createArrayWithPathFigures.push(getFigureStringPath);
        }
        return createArrayWithPathFigures;
    }
}
