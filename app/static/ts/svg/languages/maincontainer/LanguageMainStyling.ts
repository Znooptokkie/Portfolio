import { CreateSVG } from "../../components/core/SVGCreate.js";
import { SVGFactory } from "../../components/core/SVGFactory.js";

export class LanguageMainStyling
{
    public static createGradient(container: CreateSVG): void 
    {
        const defs = new SVGFactory(container, "defs").createSvgTag();

        /* =========================
           INNER BORDER GRADIENT
        ========================= */

        const innerGradient = new SVGFactory(defs, "linearGradient", {
            id: "innerBorderGradient",
            x1: "0%",
            y1: "0%",
            x2: "100%",
            y2: "0%"
        }).createSvgTag();
        
        new SVGFactory(innerGradient, "stop", {
            offset: "0%",
            "stop-color": "#101b2b"
        }).createSvgTag();
        
        new SVGFactory(innerGradient, "stop", {
            offset: "100%",
            "stop-color": "#010307"
        }).createSvgTag();

        /* =========================
           LIQUID GLASS FILTER
        ========================= */

        const filter = new SVGFactory(defs, "filter", {
    id: "liquidGlass",
    x: "0",
    y: "0",
    width: "300",      // elementbreedte
    height: "200",     // elementhoogte
    filterUnits: "userSpaceOnUse"
}).createSvgTag();

// Blur van het element zelf (niet BackgroundImage)
new SVGFactory(filter, "feGaussianBlur", {
    in: "SourceGraphic",
    stdDeviation: "6",
    result: "blurred"
}).createSvgTag();

// Displacement map
new SVGFactory(filter, "feImage", {
    href: "/path/to/displacement-map.png",
    x: "0",
    y: "0",
    width: "300",
    height: "200",
    result: "dispMap"
}).createSvgTag();

new SVGFactory(filter, "feDisplacementMap", {
    in: "blurred",
    in2: "dispMap",
    scale: "40",
    xChannelSelector: "R",
    yChannelSelector: "G",
    result: "displaced"
}).createSvgTag();

// Donker melkglas
new SVGFactory(filter, "feColorMatrix", {
    in: "displaced",
    type: "matrix",
    values: `
        0.7 0   0   0 0
        0   0.7 0   0 0
        0   0   0.7 0 0
        0   0   0   0.5 0
    `,
    result: "darkGlass"
}).createSvgTag();

// Optioneel specular
new SVGFactory(filter, "feImage", {
    href: "/path/to/specular.png",
    x: "0",
    y: "0",
    width: "300",
    height: "200",
    result: "specularLayer"
}).createSvgTag();

new SVGFactory(filter, "feGaussianBlur", {
    in: "specularLayer",
    stdDeviation: "2",
    result: "specularBlurred"
}).createSvgTag();

// Mask specular op darkGlass
new SVGFactory(filter, "feComposite", {
    in: "specularBlurred",
    in2: "darkGlass",
    operator: "in",
    result: "glassWithSpecular"
}).createSvgTag();

// Output
new SVGFactory(filter, "feBlend", {
    in: "SourceGraphic",
    in2: "glassWithSpecular",
    mode: "normal"
}).createSvgTag();
// Achtergrond kopiëren via feImage
new SVGFactory(filter, "feImage", {
    href: "/path/to/background-snapshot.png", // statische of dynamische background
    x: "0",
    y: "0",
    width: "300",
    height: "200",
    result: "bgImage"
}).createSvgTag();

new SVGFactory(filter, "feGaussianBlur", {
    in: "bgImage",
    stdDeviation: "14",
    result: "blurredBg"
}).createSvgTag();

new SVGFactory(filter, "feDisplacementMap", {
    in: "blurredBg",
    in2: "dispMap",
    scale: "50",
    xChannelSelector: "R",
    yChannelSelector: "G",
    result: "displaced"
}).createSvgTag();

    }
}
