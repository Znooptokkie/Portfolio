import { SVGFactory } from "../../components/svg-core/SVGFactory.js";
export class LanguageAddedFeatures {
    static createSideBars(container) {
        const sidebarGroupFactory = new SVGFactory(container, "g", {
            class: "big-main-border-group",
        });
        const sidebarGroup = sidebarGroupFactory.createSvgTag();
        const barLeftPath = "M10,515 L25,500 L25,175 L10,160 Z";
        const barRightPath = "M990,160 L975,175 L975,500 L990,515 Z";
        const leftBar = new SVGFactory(sidebarGroup, "path", {
            id: "big-sidebar-left",
            d: barLeftPath,
            // fill: kleur,
            fill: "#2ecc71",
            stroke: "rgba(6, 10, 18, 0.7)",
            "stroke-opacity": "1",
            "stroke-width": 8
        });
        leftBar.createSvgTag();
        const rightBar = new SVGFactory(sidebarGroup, "path", {
            id: "big-sidebar-right",
            d: barRightPath,
            fill: "#2ecc71",
            stroke: "rgba(6, 10, 18, 0.7)",
            "stroke-opacity": "1",
            "stroke-width": 8
        });
        rightBar.createSvgTag();
    }
    static createTextInSVG(container) {
        const textGroupFactory = new SVGFactory(container, "g", {
            class: "main-border-text-group"
        });
        const textGroup = textGroupFactory.createSvgTag();
        const foreignObject = new SVGFactory(textGroup, "foreignObject", {
            x: 50,
            y: 50,
            width: 900,
            height: 580
        });
        foreignObject.createSvgTag();
        if (foreignObject.getSVGElement) {
            const div = document.createElement("div");
            div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            div.style.width = "100%";
            div.style.height = "100%";
            div.style.padding = "2.5rem";
            div.style.display = "flex";
            div.style.lineHeight = "1.5";
            div.style.justifyContent = "center";
            div.style.alignItems = "center";
            div.style.fontStyle = "italic";
            // div.style.fontWeight = "bold";
            // div.style.opacity = "0.25";
            div.style.fontSize = "54px";
            div.style.fontFamily = "Courier Prime", "monospace";
            div.style.color = "rgba(51, 81, 142, 1)";
            div.innerText = '"Ik beschik over een goede basis in meerdere programmeertalen, vooral in Python en JavaScript. En ik blijf mijn kennis verder uitbreiden."';
            foreignObject.getSVGElement.appendChild(div);
        }
    }
}
