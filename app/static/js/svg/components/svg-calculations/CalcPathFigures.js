import { CalcPathProperties } from "./CalcPathProperties.js";
export class CalcPathFigures {
    static createFigures(innerPath, outerPath) {
        var _a, _b;
        const firgurePositions = new Map();
        if (!innerPath)
            return null;
        const outerPathValues = CalcPathProperties.getPathParts(outerPath);
        const innerPathValues = CalcPathProperties.getPathParts(innerPath);
        let counter = 1;
        for (let i = 0; i < outerPathValues.length; i++) {
            const figureArray = [];
            const nextOuter = (_a = outerPathValues[i + 1]) !== null && _a !== void 0 ? _a : outerPathValues[0];
            const nextInner = (_b = innerPathValues[i + 1]) !== null && _b !== void 0 ? _b : innerPathValues[0];
            const currentOuter = outerPathValues[i];
            const currentInner = innerPathValues[i];
            if (!currentOuter || !currentInner || !nextOuter || !nextInner)
                continue;
            figureArray.push(currentOuter, currentInner, nextInner, nextOuter);
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
