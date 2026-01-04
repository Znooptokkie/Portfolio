import { SVGFactory } from "../../components/core/SVGFactory.js";
export class ProjectsStackBanners {
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
