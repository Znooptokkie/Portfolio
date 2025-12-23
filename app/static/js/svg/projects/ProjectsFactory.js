import { CreateSVG } from "../components/core/SVGCreate.js";
import { SVGFactory } from "../components/core/SVGFactory.js";
import { DeconstructPath } from "../components/DeconstructPath.js";
import { Project } from "./Project.js";
export class ProjectsFactory {
    static createMany(projectsData) {
        const mapData = projectsData.map(data => new Project(data));
        return mapData;
    }
    static createRootElement(projectNameID) {
        if (!projectNameID)
            return null;
        const projectContainer = new CreateSVG(`${projectNameID}`, {
            viewBox: `-50 -50 3670 1160`,
            preserveAspectRatio: "xMidYMid"
        }, true);
        projectContainer.createRootSVG("projects");
        return projectContainer;
    }
    static createDefs(container) {
        if (!container)
            return null;
        return new SVGFactory(container, "defs", {}).createSvgTag();
    }
    static addClipPathToDefs(defs, projectName, path) {
        // FIRST
        const firstPath = ProjectsFactory.createPaths(1, path);
        const firstClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-1-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(firstClipPath, "path", {
            d: firstPath
        }).createSvgTag();
        // SECOND
        const secondPath = ProjectsFactory.createPaths(2, path);
        const secondClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-2-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(secondClipPath, "path", {
            d: secondPath
        }).createSvgTag();
        // THIRD
        const thirdPath = ProjectsFactory.createPaths(3, path);
        const thirdClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-3-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(thirdClipPath, "path", {
            d: thirdPath
        }).createSvgTag();
        // FOURTH
        const fourthPath = ProjectsFactory.createPaths(4, path);
        const fourthClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-4-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(fourthClipPath, "path", {
            d: fourthPath
        }).createSvgTag();
    }
    static createPaths(positionNumber, path) {
        const hashedPath = DeconstructPath.getPathParts(path);
        const padding = 20;
        if (positionNumber === 1) {
            return path;
        }
        else if (positionNumber === 2) {
            const secondTransformedPath = hashedPath.map(point => (Object.assign(Object.assign({}, point), { x: point.x + 500 + padding, y: point.y })));
            return DeconstructPath.createNewSVGPathString(secondTransformedPath);
        }
        else if (positionNumber === 3) {
            const thirdTransformedPath = hashedPath.map(point => (Object.assign(Object.assign({}, point), { x: point.x + 240 + 20, y: point.y + 433.333 + padding // Waardes kloppen niet!
             })));
            return DeconstructPath.createNewSVGPathString(thirdTransformedPath);
        }
        else {
            // const fourthTransformedPath = hashedPath.map(point => ({
            //     ...point,
            //     x: point.x + 740 + padding, // Waardes kloppen niet!
            //     y: point.y + 433.333 + padding // Waardes kloppen niet!
            // }))
            const HARDCODED_PATH = DeconstructPath.getPathParts("M1030,453.333 L1260,630 L1260,886.666 L1010,1053.333 L780,886.666 L780,620 L1030,453.333"); // Bovenstaande code werkt om een of andere reden niet.
            return DeconstructPath.createNewSVGPathString(HARDCODED_PATH);
        }
    }
    static createLogo(container, logoURL, projectName) {
        new SVGFactory(container, "path", {
            d: "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0",
            fill: "rgba(10, 37, 92, 1)"
        }).createSvgTag();
        new SVGFactory(container, "image", {
            href: `./static/images/${logoURL}`,
            x: 0,
            y: 0,
            width: 500,
            height: 600,
            "clip-path": `url(#hex-1-${projectName})`,
            preserveAspectRatio: "xMidYMid slice"
        }).createSvgTag();
    }
    static createHexImages(container, imageURL, projectName) {
        let counter = 2;
        let xValue = 520;
        let yValue = 0;
        for (const url of imageURL) {
            switch (counter) {
                case 3:
                    xValue = 270;
                    yValue = 450;
                    break;
                case 4:
                    xValue = 770;
                    yValue = 450;
                default:
                    break;
            }
            new SVGFactory(container, "image", {
                href: `./static/images/${url}`,
                x: xValue,
                y: yValue,
                opacity: 0.5,
                width: 500,
                height: 600,
                "clip-path": `url(#hex-${counter}-${projectName})`,
                preserveAspectRatio: "xMidYMid slice"
            }).createSvgTag();
            counter++;
        }
    }
}
export class ProjectsFactoryContent {
    static drawBorder(container, path, options) {
        var _a;
        const projectSecondSection = new SVGFactory(container, "path", {
            d: path,
            stroke: "rgba(10, 37, 92, 1)",
            opacity: (_a = options === null || options === void 0 ? void 0 : options.opacity) !== null && _a !== void 0 ? _a : 1,
            fill: "none",
            "stroke-width": 2
        }).createSvgTag();
        ProjectsFactoryContent.drawCircles(container);
        ProjectsFactoryContent.drawInitials(container);
    }
    static drawCircles(container) {
        const circlesData = [
            { cx: 1910, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
            { cx: 1970, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
            { cx: 2030, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
            { cx: 2090, stroke: "none", fill: "rgba(10, 37, 92, 1)" },
            { cx: 2150, stroke: "none", fill: "rgba(10, 37, 92, 1)" }
        ];
        circlesData.forEach(data => {
            new SVGFactory(container, "circle", {
                cx: data.cx,
                cy: 1025,
                r: 17,
                stroke: data.stroke,
                fill: data.fill,
                opacity: 0.5
            }).createSvgTag();
        });
    }
    static drawInitials(container) {
        const textBorder = new SVGFactory(container, "text", {
            x: 2200,
            y: 1025,
            fill: "white",
            "font-size": "38",
            "font-family": "Courier Prime",
            "dominant-baseline": "middle",
            opacity: 0.25
        }).createSvgTag();
        textBorder.textContent = "PY.2025.003A";
    }
    static drawArrows(container, count = 0) {
        if (!container)
            return null;
        const arrowWidth = 15;
        const arrowHeight = 10;
        const spacing = 2;
        const startX = 2500;
        const startY = 1025;
        for (let i = 0; i < count; i++) {
            const x = startX + i * (arrowWidth + spacing);
            const points = `0,0 ${arrowWidth},${arrowHeight / 2} 0,${arrowHeight}`;
            const polygon = new SVGFactory(container, "polygon", {
                points: points,
                fill: "rgba(10, 37, 92, 1)",
                transform: `translate(${x},${startY})`
            }).createSvgTag();
        }
    }
}
export class ProjectsLanguagesSVG {
    static createLanguagePaths(container, index, path) {
        if (!container)
            return null;
        if (!path) {
            path = "M1450,-20 L1560,-20 L1560,90 L1505,125 L1450,90 L1450,-20";
        }
        const offsetX = index * 175;
        const pathElement = new SVGFactory(container, "path", {
            d: path,
            stroke: "rgb(0, 12, 35)",
            fill: "rgb(10, 20, 35)",
            transform: `translate(${offsetX},0)`
        }).createSvgTag();
        return pathElement;
    }
    static getDevIcons(container, language, pathElement, index) {
        if (!container || !pathElement)
            return null;
        const bbox = pathElement.getBBox();
        const offsetX = bbox.x + bbox.width / 2 - 100 + index * 175;
        const offsetY = bbox.y + bbox.height / 2 - 100;
        const foreign = new SVGFactory(container, "foreignObject", {
            x: offsetX,
            y: offsetY,
            width: 200,
            height: 200
        }).createSvgTag();
        const wrapper = this.createXHTMLWrapper(language);
        foreign === null || foreign === void 0 ? void 0 : foreign.appendChild(wrapper);
    }
    static createXHTMLWrapper(language) {
        var _a;
        const wrapper = document.createElement("div");
        wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        wrapper.style.cssText = `
            width:100%;
            height:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:10px;
        `;
        const icon = document.createElement("div");
        const deviconMap = {
            "react native": "react",
            "c++": "cplusplus",
            "c#": "csharp",
            "f#": "fsharp",
            "node.js": "nodejs",
            "electron": "electron"
        };
        let iconLanguage = (_a = deviconMap[language.toLowerCase()]) !== null && _a !== void 0 ? _a : language.toLowerCase();
        if (iconLanguage === "react native")
            iconLanguage = "react";
        if (iconLanguage === "c++")
            iconLanguage = "cplusplus";
        if (iconLanguage === "electron") {
            icon.className = `devicon-${iconLanguage}-original`;
        }
        else {
            icon.className = `devicon-${iconLanguage}-plain`;
        }
        icon.style.cssText = "font-size:60px; color:rgba(51,81,142,1);";
        wrapper.append(icon);
        return wrapper;
    }
}
