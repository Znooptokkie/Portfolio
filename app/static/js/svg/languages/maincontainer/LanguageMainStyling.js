import { SVGFactory } from "../../components/core/SVGFactory.js";
export class LanguageMainStyling {
    static createGradient(container) {
        const defs = new SVGFactory(container, "defs").createSvgTag();
        const glassGradient = new SVGFactory(defs, "linearGradient", {
            id: "ultraDarkGlass",
            x1: "100%", y1: "0%",
            x2: "0%", y2: "100%"
        }).createSvgTag();
        new SVGFactory(glassGradient, "stop", {
            offset: "0%",
            // "stop-color": "#03080f",
            "stop-color": "rgba(3, 5, 22, 1)",
            "stop-opacity": "1"
        }).createSvgTag();
        // new SVGFactory(glassGradient, "stop", {
        // offset: "45%",
        // "stop-color": "rgba(3, 5, 22, 1)",
        // "stop-color": "#03080f",
        // "stop-opacity": "1"
        // }).createSvgTag();
        new SVGFactory(glassGradient, "stop", {
            offset: "50%",
            // "stop-color": "rgba(3, 5, 22, 1)",
            "stop-color": "rgba(0, 0, 15, 1)",
            "stop-opacity": "1"
        }).createSvgTag();
        new SVGFactory(glassGradient, "stop", {
            offset: "65%",
            // "stop-color": "rgba(3, 5, 22, 1)",
            "stop-color": "#03080f",
            "stop-opacity": "1"
        }).createSvgTag();
        new SVGFactory(glassGradient, "stop", {
            offset: "100%",
            "stop-color": "rgba(3, 5, 22, 1)",
            // "stop-color": "rgba(3, 5, 22, 1)",
            "stop-opacity": "1"
        }).createSvgTag();
        // const filter = new SVGFactory(defs, "filter", {
        // id: "ultraDarkFrosted",
        // x: "-50%", y: "-50%",
        // width: "200%", height: "200%",
        // filterUnits: "objectBoundingBox"
        // }).createSvgTag();
        // new SVGFactory(filter, "feGaussianBlur", {
        //     in: "SourceGraphic",
        //     stdDeviation: "6",
        //     result: "blur"
        // }).createSvgTag();
        // new SVGFactory(filter, "feColorMatrix", {
        //     in: "blur",
        //     type: "matrix",
        //     values: `
        //         1 0 0 0 0
        //         0 1 0 0 0
        //         0 0 1 0 0
        //         0 0 0 0.35 0
        //     `,
        //     result: "softened"
        // }).createSvgTag();
        // new SVGFactory(filter, "feBlend", {
        // in: "SourceGraphic",
        // in2: "softened",
        // mode: "normal"
        // }).createSvgTag();
        const innerGradient = new SVGFactory(defs, "linearGradient", {
            id: "innerBorderGradient",
            x1: "0%",
            y1: "0%",
            x2: "100%", // horizontaal in plaats van verticaal
            y2: "0%"
        }).createSvgTag();
        new SVGFactory(innerGradient, "stop", {
            offset: "0%",
            // "stop-color": "#1a2b46"
            // "stop-color": "#142137"
            // "stop-color": "#101b2b",
            "stop-color": "rgba(3, 5, 22, 1)"
        }).createSvgTag();
        new SVGFactory(innerGradient, "stop", {
            offset: "100%",
            "stop-color": "#010307"
        }).createSvgTag();
    }
}
// export class LanguageMainStyling
// {
//     public static createGradient(container: CreateSVG): void 
//     {
//         const defs = new SVGFactory(container, "defs").createSvgTag();
//         /* =========================
//            INNER BORDER GRADIENT
//         ========================= */
//         const innerGradient = new SVGFactory(defs, "linearGradient", {
//             id: "innerBorderGradient",
//             x1: "0%",
//             y1: "0%",
//             x2: "100%",
//             y2: "0%"
//         }).createSvgTag();
//         new SVGFactory(innerGradient, "stop", {
//             offset: "0%",
//             "stop-color": "#101b2b"
//         }).createSvgTag();
//         new SVGFactory(innerGradient, "stop", {
//             offset: "100%",
//             "stop-color": "#010307"
//         }).createSvgTag();
//         /* =========================
//            LIQUID GLASS FILTER
//         ========================= */
//         const filter = new SVGFactory(defs, "filter", {
//     id: "liquidGlass",
//     x: "0",
//     y: "0",
//     width: "300",      // elementbreedte
//     height: "200",     // elementhoogte
//     filterUnits: "userSpaceOnUse"
// }).createSvgTag();
// // Blur van het element zelf (niet BackgroundImage)
// new SVGFactory(filter, "feGaussianBlur", {
//     in: "SourceGraphic",
//     stdDeviation: "6",
//     result: "blurred"
// }).createSvgTag();
// // Displacement map
// new SVGFactory(filter, "feImage", {
//     href: "/path/to/displacement-map.png",
//     x: "0",
//     y: "0",
//     width: "300",
//     height: "200",
//     result: "dispMap"
// }).createSvgTag();
// new SVGFactory(filter, "feDisplacementMap", {
//     in: "blurred",
//     in2: "dispMap",
//     scale: "40",
//     xChannelSelector: "R",
//     yChannelSelector: "G",
//     result: "displaced"
// }).createSvgTag();
// // Donker melkglas
// new SVGFactory(filter, "feColorMatrix", {
//     in: "displaced",
//     type: "matrix",
//     values: `
//         0.7 0   0   0 0
//         0   0.7 0   0 0
//         0   0   0.7 0 0
//         0   0   0   0.5 0
//     `,
//     result: "darkGlass"
// }).createSvgTag();
// // Optioneel specular
// new SVGFactory(filter, "feImage", {
//     href: "/path/to/specular.png",
//     x: "0",
//     y: "0",
//     width: "300",
//     height: "200",
//     result: "specularLayer"
// }).createSvgTag();
// new SVGFactory(filter, "feGaussianBlur", {
//     in: "specularLayer",
//     stdDeviation: "2",
//     result: "specularBlurred"
// }).createSvgTag();
// // Mask specular op darkGlass
// new SVGFactory(filter, "feComposite", {
//     in: "specularBlurred",
//     in2: "darkGlass",
//     operator: "in",
//     result: "glassWithSpecular"
// }).createSvgTag();
// // Output
// new SVGFactory(filter, "feBlend", {
//     in: "SourceGraphic",
//     in2: "glassWithSpecular",
//     mode: "normal"
// }).createSvgTag();
// // Achtergrond kopiëren via feImage
// new SVGFactory(filter, "feImage", {
//     href: "/path/to/background-snapshot.png", // statische of dynamische background
//     x: "0",
//     y: "0",
//     width: "300",
//     height: "200",
//     result: "bgImage"
// }).createSvgTag();
// new SVGFactory(filter, "feGaussianBlur", {
//     in: "bgImage",
//     stdDeviation: "14",
//     result: "blurredBg"
// }).createSvgTag();
// new SVGFactory(filter, "feDisplacementMap", {
//     in: "blurredBg",
//     in2: "dispMap",
//     scale: "50",
//     xChannelSelector: "R",
//     yChannelSelector: "G",
//     result: "displaced"
// }).createSvgTag();
//     }
// }
// import { CreateSVG } from "../../components/core/SVGCreate.js";
// import { SVGFactory } from "../../components/core/SVGFactory.js"
// export class LanguageMainStyling
// {
//     public static createGradient(container: CreateSVG): void 
//     {
//         const defs = new SVGFactory(container, "defs").createSvgTag();
//         const glassGradient = new SVGFactory(defs, "linearGradient", {
//             id: "ultraDarkGlass",
//             x1: "0%", y1: "0%",
//             x2: "100%", y2: "100%"
//         }).createSvgTag();
//         new SVGFactory(glassGradient, "stop", {
//             offset: "0%",
//             "stop-color": "#01030a"
//         }).createSvgTag();
//         new SVGFactory(glassGradient, "stop", {
//             offset: "30%",
//             "stop-color": "#000214"
//         }).createSvgTag();
//         new SVGFactory(glassGradient, "stop", {
//             offset: "70%",
//             "stop-color": "#03050e"
//         }).createSvgTag();
//         const filter = new SVGFactory(defs, "filter", {
//             id: "ultraDarkFrosted",
//             x: "-50%", y: "-50%",
//             width: "200%", height: "200%",
//             filterUnits: "objectBoundingBox"
//         }).createSvgTag();
//         new SVGFactory(filter, "feGaussianBlur", {
//             in: "SourceGraphic",
//             stdDeviation: "2", 
//             result: "blur"
//         }).createSvgTag();
//         // Extra donkere tint over de blur heen
//         // new SVGFactory(filter, "feFlood", {
//         //     "flood-color": "#03080f",
//         //     "flood-opacity": "0.88"
//         // }).createSvgTag();
//         new SVGFactory(filter, "feComposite", {
//             in: "flood",
//             in2: "blur",
//             operator: "in"
//         }).createSvgTag();
//         new SVGFactory(filter, "feComposite", {
//             in: "SourceGraphic",
//             operator: "over"
//         }).createSvgTag();
//     }
// }
// export class LanguageMainStyling
// {
//     public static createGradient(container: CreateSVG): void 
//     {
//         const defs = new SVGFactory(container, "defs").createSvgTag();
//         // const glassGradient = new SVGFactory(defs, "linearGradient", {
//         //     id: "ultraDarkGlass",
//         //     x1: "0%", y1: "0%",
//         //     x2: "100%", y2: "100%"
//         // }).createSvgTag();
//         // new SVGFactory(glassGradient, "stop", {
//         //     offset: "0%",
//         //     "stop-color": "#03080f",
//         //     "stop-opacity": "1"
//         // }).createSvgTag();
//         // new SVGFactory(glassGradient, "stop", {
//         //     offset: "50%",
//         //     "stop-color": "#03080f",
//         //     "stop-opacity": "1"
//         // }).createSvgTag();
//         // new SVGFactory(glassGradient, "stop", {
//         //     offset: "100%",
//         //     "stop-color": "#03080f",
//         //     "stop-opacity": "1"
//         // }).createSvgTag();
//         // const filter = new SVGFactory(defs, "filter", {
//         //     id: "ultraDarkFrosted",
//         //     x: "-50%", y: "-50%",
//         //     width: "200%", height: "200%",
//         //     filterUnits: "objectBoundingBox"
//         // }).createSvgTag();
//         // new SVGFactory(filter, "feGaussianBlur", {
//         //     in: "SourceGraphic",
//         //     stdDeviation: "6",
//         //     result: "blur"
//         // }).createSvgTag();
//         // new SVGFactory(filter, "feColorMatrix", {
//         //     in: "blur",
//         //     type: "matrix",
//         //     values: `
//         //         1 0 0 0 0
//         //         0 1 0 0 0
//         //         0 0 1 0 0
//         //         0 0 0 0.35 0
//         //     `,
//         //     result: "softened"
//         // }).createSvgTag();
//         // new SVGFactory(filter, "feBlend", {
//         //     in: "SourceGraphic",
//         //     in2: "softened",
//         //     mode: "normal"
//         // }).createSvgTag();
//         const innerGradient = new SVGFactory(defs, "linearGradient", {
//             id: "innerBorderGradient",
//             x1: "0%",
//             y1: "0%",
//             x2: "100%", 
//             y2: "0%"
//         }).createSvgTag();
//         new SVGFactory(innerGradient, "stop", {
//             offset: "0%",
//             // "stop-color": "#1a2b46"
//             // "stop-color": "#142137"
//             // "stop-color": "#101b2b",
//             // "stop-color": "#0a121c",
//             "stop-color": "rgba(3, 5, 20, 1)"
//         }).createSvgTag();
//         new SVGFactory(innerGradient, "stop", 
//         {
//             offset: "50%",
//             "stop-color": "rgba(3, 5, 24, 1)"
//         }).createSvgTag()
//         new SVGFactory(innerGradient, "stop", {
//             offset: "100%",
//             // "stop-color": "#010310"
//             "stop-color": "rgba(3, 5, 15, 1)"
//         }).createSvgTag();
//     }
// }
