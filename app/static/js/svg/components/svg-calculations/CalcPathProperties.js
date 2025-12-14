import { CalcResizeContainer } from "../../education/CalcResizeContainer.js";
export class CalcPathProperties {
    static getInnerHeight(innerContent) {
        const svgHTMLInnerContainer = new CalcResizeContainer(`${innerContent}`);
        // console.log(svgHTMLInnerContainer);
        const svgHTMLInnerContainerHeight = svgHTMLInnerContainer.getContentHeight;
        return svgHTMLInnerContainerHeight;
    }
    static changeInnerHeigtToViewbox(innerHeight, viewboxToPXRatio) {
        return innerHeight / viewboxToPXRatio;
    }
    static calcSubstractionViewbox(viewboxHeight, changedViewboxHeight, allButInnerHeight) {
        return Math.round(viewboxHeight - (changedViewboxHeight + allButInnerHeight));
    }
    static getHalfwayYPointValues(pathParts) {
        if (!pathParts)
            return null;
        const maxValue = Math.max(...pathParts.map(obj => obj.y));
        return maxValue / 2;
    }
}
