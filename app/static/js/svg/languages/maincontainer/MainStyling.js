import { SVGFactory } from "../../components/svg-core/SVGFactory.js";
export class LanguageMainStyling {
    static createGradient(container) {
        const defs = new SVGFactory(container, "defs").createSvgTag();
        const glassGradient = new SVGFactory(defs, "linearGradient", {
            id: "ultraDarkGlass",
            x1: "0%", y1: "0%",
            x2: "100%", y2: "100%"
        }).createSvgTag();
        new SVGFactory(glassGradient, "stop", {
            offset: "0%",
            "stop-color": "#01030a"
        }).createSvgTag();
        new SVGFactory(glassGradient, "stop", {
            offset: "30%",
            "stop-color": "#000214"
        }).createSvgTag();
        new SVGFactory(glassGradient, "stop", {
            offset: "70%",
            "stop-color": "#03050e"
        }).createSvgTag();
        const filter = new SVGFactory(defs, "filter", {
            id: "ultraDarkFrosted",
            x: "-50%", y: "-50%",
            width: "200%", height: "200%",
            filterUnits: "objectBoundingBox"
        }).createSvgTag();
        new SVGFactory(filter, "feGaussianBlur", {
            in: "SourceGraphic",
            stdDeviation: "2",
            result: "blur"
        }).createSvgTag();
        // Extra donkere tint over de blur heen
        // new SVGFactory(filter, "feFlood", {
        //     "flood-color": "#03080f",
        //     "flood-opacity": "0.88"
        // }).createSvgTag();
        new SVGFactory(filter, "feComposite", {
            in: "flood",
            in2: "blur",
            operator: "in"
        }).createSvgTag();
        new SVGFactory(filter, "feComposite", {
            in: "SourceGraphic",
            operator: "over"
        }).createSvgTag();
    }
}
