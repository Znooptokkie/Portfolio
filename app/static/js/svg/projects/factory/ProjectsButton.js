import { SVGFactory } from "../../components/core/SVGFactory.js";
export class ProjectsButton {
    static createWrapper(projectName) {
        const wrapper = document.createElement("a");
        wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        wrapper.className = "projects-button-link";
        wrapper.style.cssText = `
            width:100%;
            height:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            text-decoration: none;
        `;
        wrapper.href = `http://127.0.0.1:5000/projecten/${projectName.toLowerCase()}`;
        const text = document.createElement("p");
        text.textContent = "GO";
        text.style.cssText = `
            margin:0;
            font-size:64px;
            color: rgba(10, 37, 92, 1);
        `;
        wrapper.append(text);
        return wrapper;
    }
    static linkInstance(container, projectName) {
        var _a;
        const foreign = new SVGFactory(container, "foreignObject", {
            x: this.startContainer,
            y: 925,
            width: 520,
            height: 135
        }).createSvgTag();
        ProjectsButton.createButtonPath(container);
        const wrapper = ProjectsButton.createWrapper(projectName);
        foreign === null || foreign === void 0 ? void 0 : foreign.appendChild(wrapper);
        // HOVER EFFECT!!@$^#$@ --- Moet eigen file rkijge => events/
        const pathEl = (_a = container === null || container === void 0 ? void 0 : container.getSVGElementRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".projects-button-path");
        wrapper.addEventListener("mouseenter", () => {
            pathEl === null || pathEl === void 0 ? void 0 : pathEl.setAttribute("stroke", "red");
        });
        wrapper.addEventListener("mouseleave", () => {
            pathEl === null || pathEl === void 0 ? void 0 : pathEl.setAttribute("stroke", "rgba(10, 37, 92, 1)");
        });
    }
    static createButtonPath(container) {
        const path = `M3140,925 L3570,925 L3570,1060 L${this.startContainer},1060 Z`;
        new SVGFactory(container, "path", {
            d: path,
            stroke: "rgba(10, 37, 92, 1)",
            "stroke-width": 2,
            fill: "none",
            class: "projects-button-path"
        }).createSvgTag();
    }
}
ProjectsButton.startContainer = 3050;
