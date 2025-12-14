import { CalcPathProperties } from "./CalcPathProperties.js";
export class DeconstructPath {
    static getPathParts(path) {
        const pathValues = ["M", "L"];
        const pathParts = [];
        let currentValues = "";
        for (const char of path) {
            if (pathValues.includes(char)) {
                if (currentValues.trim() !== "") {
                    const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
                    pathParts.push({ x: px, y: py });
                }
                currentValues = "";
                continue;
            }
            currentValues += char;
        }
        if (currentValues.trim() !== "") {
            const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
            pathParts.push({ x: px, y: py });
        }
        return pathParts;
    }
    static createNewSVGPathString(points) {
        if (points.length === 0)
            return "";
        const parts = [];
        const first = points[0];
        parts.push(`M${first.x},${first.y}`);
        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            parts.push(`L${p.x},${p.y}`);
        }
        return parts.join(" ");
    }
    static changeY(pathParts, substraction) {
        const newPathParts = [];
        // console.log(pathParts);
        const getMaxValueY = CalcPathProperties.getHalfwayYPointValues(pathParts);
        if (!getMaxValueY)
            return null;
        for (let i = 0; i < pathParts.length; i++) {
            const current = Object.assign({}, pathParts[i]);
            if (i < pathParts.length && current.y > getMaxValueY) {
                current.y -= substraction;
                newPathParts.push(current);
                continue;
            }
            newPathParts.push(current);
        }
        // console.log(newPathParts);
        const newStringPath = DeconstructPath.createNewSVGPathString(newPathParts);
        return newStringPath;
    }
}
