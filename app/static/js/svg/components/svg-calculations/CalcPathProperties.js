import { SVGFactory } from "../svg-core/SVGFactory.js";
import { CalcPathFigures } from "./CalcPathFigures.js";
export class CalcPathProperties {
    static createBorderParts(container, outer, inner, category) {
        if (!inner || !outer)
            return null;
        const getFiguresPath = CalcPathFigures.createFigurePathString(inner, outer);
        if (!getFiguresPath)
            return null;
        const innerGroup = new SVGFactory(container, "g", {
            class: `${category}-inner`
        }).createSvgTag();
        new SVGFactory(innerGroup, "path", {
            d: inner,
            // fill: "#000214",
            fill: "url(#ultraDarkGlass)",
            // filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)",
            stroke: "none",
        }).createSvgTag();
        let counter = 0;
        for (const figure of getFiguresPath) {
            // let color = counter < 12 ? "#01030a" : "#000214";
            // let color = counter < 12 ? "#010307" : "#010307"
            let color = counter < 12 ? "#0a121c" : "#010307";
            const createfigurePath = new SVGFactory(container, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`,
                stroke: "rgba(51, 81, 142, 0.5)",
                // stroke: "#010307",
                "stroke-width": 1,
                opacity: "1",
                // fill: "url(#innerBorderGradient)",
                // fill: "none",
                fill: "#000214",
                // filter: "url(#ultraDark)",
            });
            counter++;
            createfigurePath.createSvgTag();
        }
    }
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
    static getEachSide(path) {
        const basePath = path;
        if (!basePath)
            return null;
        const outerPathArray = CalcPathProperties.getPathParts(basePath);
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
    static buildInnerPath(sides, offset) {
        const minYTop = Math.min(...sides.top.map(p => p.y));
        const maxXRight = Math.max(...sides.right.map(p => p.x));
        const maxYBottom = Math.max(...sides.bottom.map(p => p.y));
        const minXLeft = Math.min(...sides.left.map(p => p.x));
        const innerTop = [];
        const innerRight = [];
        const innerBottom = [];
        const innerLeft = [];
        // Gehele code moet efficienter/dynamischer, maar voor nu werkt het
        if (sides.top) {
            // Als er maar 1 item in de Array staat
            if (sides.top.length <= 1) {
                const newPoints = {
                    x: sides.top[0].x - offset * 2,
                    y: sides.top[0].y + offset
                };
                innerTop.push(newPoints);
            }
            for (let i = 0; i < sides.top.length - 1; i++) {
                if (sides.top[i].y === sides.top[i + 1].y) {
                    if (sides.top[i].y === minYTop &&
                        sides.top[i + 1].y === minYTop) {
                        const newFirstPoints = {
                            x: sides.top[i].x + offset,
                            y: sides.top[i].y + offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.top[i + 1].x - offset,
                            y: sides.top[i + 1].y + offset * 2
                        };
                        innerTop.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.top[i].x - offset,
                            y: sides.top[i].y + offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.top[i + 1].x + offset,
                            y: sides.top[i + 1].y + offset * 2
                        };
                        innerTop.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
        }
        if (sides.right) {
            if (sides.right.length <= 1) {
                const newPoints = {
                    x: sides.right[0].x - offset * 2,
                    y: sides.right[0].y - offset
                };
                innerRight.push(newPoints);
            }
            for (let i = 0; i < sides.right.length - 1; i++) {
                if (sides.right[i].x === sides.right[i + 1].x) {
                    if (sides.right[i].x === maxXRight &&
                        sides.right[i + 1].x === maxXRight) {
                        const newFirstPoints = {
                            x: sides.right[i].x - offset * 2,
                            y: sides.right[i].y + offset
                        };
                        const newSecondPoints = {
                            x: sides.right[i + 1].x - offset * 2,
                            y: sides.right[i + 1].y - offset
                        };
                        innerRight.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.right[i].x - offset * 2,
                            y: sides.right[i].y - offset
                        };
                        const newSecondPoints = {
                            x: sides.right[i + 1].x - offset * 2,
                            y: sides.right[i + 1].y + offset
                        };
                        innerRight.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
        }
        if (sides.bottom) {
            if (sides.bottom.length <= 1) {
                const newPoints = {
                    x: sides.bottom[0].x + offset,
                    y: sides.bottom[0].y - offset * 2
                };
                innerBottom.push(newPoints);
            }
            for (let i = 0; i < sides.bottom.length - 1; i++) {
                if (sides.bottom[i].y === sides.bottom[i + 1].y) {
                    if (sides.bottom[i].y === maxYBottom &&
                        sides.bottom[i + 1].y === maxYBottom) {
                        const newFirstPoints = {
                            x: sides.bottom[i].x - offset,
                            y: sides.bottom[i].y - offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.bottom[i + 1].x + offset,
                            y: sides.bottom[i + 1].y - offset * 2
                        };
                        innerBottom.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.bottom[i].x + offset,
                            y: sides.bottom[i].y - offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.bottom[i + 1].x - offset,
                            y: sides.bottom[i + 1].y - offset * 2
                        };
                        innerBottom.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
        }
        if (sides.left) {
            if (sides.left.length <= 1) {
                const newPoints = {
                    x: sides.left[0].x + offset * 2,
                    y: sides.left[0].y - offset
                };
                innerLeft.push(newPoints);
            }
            for (let i = 0; i < sides.left.length - 1; i++) {
                if (sides.left[i].x === sides.left[i + 1].x) {
                    if (sides.left[i].x === minXLeft &&
                        sides.left[i + 1].x === minXLeft) {
                        const newFirstPoints = {
                            x: sides.left[i].x + offset * 2,
                            y: sides.left[i].y - offset
                        };
                        const newSecondPoints = {
                            x: sides.left[i + 1].x + offset * 2,
                            y: sides.left[i + 1].y + offset
                        };
                        innerLeft.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.left[i].x + offset * 2,
                            y: sides.left[i].y + offset
                        };
                        const newSecondPoints = {
                            x: sides.left[i + 1].x + offset * 2,
                            y: sides.left[i + 1].y - offset
                        };
                        innerLeft.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
            innerLeft.push(innerTop[0]);
        }
        return { innerTop, innerRight, innerBottom, innerLeft };
    }
    static mergePathArray(sides) {
        const newPath = [
            ...sides.innerTop,
            ...sides.innerRight,
            ...sides.innerBottom,
            ...sides.innerLeft
        ];
        return newPath;
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
    static init(path, padding) {
        const newPath = CalcPathProperties.getEachSide(path);
        const createInnerPath = CalcPathProperties.buildInnerPath(newPath, padding); // Uitroepteken moet weg!!@!!@$!#@$
        const mergedArray = CalcPathProperties.mergePathArray(createInnerPath);
        const pathToString = CalcPathProperties.createNewSVGPathString(mergedArray);
        return pathToString;
    }
}
