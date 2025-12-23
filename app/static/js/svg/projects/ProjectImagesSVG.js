import { SVGFactory } from "../components/core/SVGFactory.js";
export class ProjectImagesSVG {
    constructor(optional = {}, parentSVG) {
        var _a, _b;
        this.parentSVG = null;
        this.MAIN_PATH = (_a = optional.MAIN_PATH) !== null && _a !== void 0 ? _a : "";
        this.BORDER_PADDING = (_b = optional.BORDER_PADDING) !== null && _b !== void 0 ? _b : 0;
        this.parentSVG = parentSVG !== null && parentSVG !== void 0 ? parentSVG : null;
    }
    createProjectLogoSVG() {
        const logoSVG = new SVGFactory(this.parentSVG, "path", {
            d: this.MAIN_PATH,
            stroke: "red"
        }).createSvgTag();
        return logoSVG;
    }
}
