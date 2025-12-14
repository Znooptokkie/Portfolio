import { DeconstructPath } from "./DeconstructPath.js";
export class DefineSides {
    static getEachSide(path) {
        const basePath = path;
        if (!basePath)
            return null;
        const outerPathArray = DeconstructPath.getPathParts(basePath);
        const filteredLastItem = [...outerPathArray];
        // Zorgt ervoor dat de SVG mooi aansluit op het begin
        if (filteredLastItem.length > 1 &&
            filteredLastItem[0].x === filteredLastItem[filteredLastItem.length - 1].x &&
            filteredLastItem[0].y === filteredLastItem[filteredLastItem.length - 1].y) {
            filteredLastItem.pop();
        }
        const borderTop = [];
        const borderRight = [];
        const borderBottom = [];
        const borderLeft = [];
        const xPoints = outerPathArray.map(p => p.x);
        const yPoints = outerPathArray.map(p => p.y);
        const minX = Math.min(...xPoints);
        const maxX = Math.max(...xPoints);
        const minY = Math.min(...yPoints);
        const maxY = Math.max(...yPoints);
        // Pak alle punten (x, y) en zet ze in een Array
        // Check voor eventueele uitsparingen 
        for (let i = 0; i < filteredLastItem.length; i++) {
            const point = filteredLastItem[i];
            const distanceTop = Math.abs(point.y - minY);
            const distanceBottom = Math.abs(point.y - maxY);
            const dLeft = Math.abs(point.x - minX);
            const distanceRight = Math.abs(point.x - maxX);
            const smallest = Math.min(distanceTop, distanceBottom, dLeft, distanceRight);
            switch (smallest) {
                case distanceTop:
                    borderTop.push(point);
                    continue;
                case distanceRight:
                    borderRight.push(point);
                    continue;
                case distanceBottom:
                    borderBottom.push(point);
                    continue;
                default:
                    borderLeft.push(point);
            }
        }
        return {
            top: borderTop,
            right: borderRight,
            bottom: borderBottom,
            left: borderLeft
        };
    }
}
