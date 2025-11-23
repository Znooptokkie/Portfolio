import { CreateSVG } from "../components/svg-core/SVGCreate.js";
import { SVGFactory } from "../components/svg-core/SVGFactory.js";
import { CalcPathProperties } from "../components/svg-calculations/CalcPathProperties.js";
export class LanguageMainContainer extends CreateSVG {
    constructor(HTMLId, svgAttributes, defaultStyling) {
        super(HTMLId, svgAttributes, defaultStyling);
        this.bigBorderTop = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0";
        this.bigBorderRight = "L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650";
        this.bigBorderBottom = "L975,675 L800,675 L775,650 L225,650 L200,675 L25,675";
        this.bigBorderLeft = "L0,650 L0,525 L25,500 L25,175 L0,150 L0,25";
        this.innerTop = "M30,10 L195,10 L245,60 L755,60 L805,10 L970,10";
        this.innerRight = "L990,30 L990,145 L965,170 L965,505 L990,530  L990,645";
        this.innerBottom = "L970,665 L805,665 L780,640 L220,640 L195,665 L30,665";
        this.innerLeft = "L10,645 L10,530 L35,505 L35,170 L10,145 L10,30";
        this.newStringPath = "";
        this.newInnerTop = this.getResponsiveBetweenSpace(this.bigBorderTop, this.innerTop, 5);
        this.newInnerRight = this.getResponsiveBetweenSpace(this.bigBorderRight, this.innerRight, 5);
        this.newInnerBottom = this.getResponsiveBetweenSpace(this.bigBorderBottom, this.innerBottom, 5);
        this.newInnerLeft = this.getResponsiveBetweenSpace(this.bigBorderLeft, this.innerLeft, 5);
        this.outerTopArray = CalcPathProperties.getPathParts(this.bigBorderTop);
        this.outerRightArray = CalcPathProperties.getPathParts(this.bigBorderRight);
        this.outerBottomArray = CalcPathProperties.getPathParts(this.bigBorderBottom);
        this.outerLeftArray = CalcPathProperties.getPathParts(this.bigBorderLeft);
        this.outerPathMergedArray = this.mergePathArray(this.outerTopArray, this.outerRightArray, this.outerBottomArray, this.outerLeftArray);
        this.newInnerPathMergedArray = this.mergePathArray(this.newInnerTop, this.newInnerRight, this.newInnerBottom, this.newInnerLeft);
    }
    createGradient() {
        const defs = new SVGFactory(this, "defs").createSvgTag();
        const glassGradient = new SVGFactory(defs, "linearGradient", {
            id: "ultraDarkGlass",
            x1: "0%", y1: "0%",
            x2: "100%", y2: "100%"
        }).createSvgTag();
        new SVGFactory(glassGradient, "stop", { offset: "0%", "stop-color": "#03080f", "stop-opacity": "0.7" }).createSvgTag();
        new SVGFactory(glassGradient, "stop", { offset: "30%", "stop-color": "#040a14", "stop-opacity": "0.6" }).createSvgTag();
        new SVGFactory(glassGradient, "stop", { offset: "70%", "stop-color": "#020610", "stop-opacity": "0.85" }).createSvgTag();
        // new SVGFactory(glassGradient, "stop", { offset: "100%", "stop-color": "#050c18", "stop-opacity": "0.75" }).createSvgTag();
        const highlight = new SVGFactory(defs, "linearGradient", {
            id: "darkReflection",
            x1: "0%", y1: "100%",
            x2: "100%", y2: "0%"
        }).createSvgTag();
        new SVGFactory(highlight, "stop", { offset: "0%", "stop-color": "#0d1a2e", "stop-opacity": "0" }).createSvgTag();
        // new SVGFactory(highlight, "stop", { offset: "20%",  "stop-color": "#0f223b", "stop-opacity": "0.18" }).createSvgTag();
        new SVGFactory(highlight, "stop", { offset: "45%", "stop-color": "#0e1f38", "stop-opacity": "0.92" }).createSvgTag();
        new SVGFactory(highlight, "stop", { offset: "80%", "stop-color": "#0b182c", "stop-opacity": "0.85" }).createSvgTag();
        new SVGFactory(highlight, "stop", { offset: "100%", "stop-color": "#0a1527", "stop-opacity": "0" }).createSvgTag();
        // Frosted-glass filter die de achtergrond echt dempt
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
        // // 4. Zachte, donkere outer shadow voor de border-figuren
        const shadowFilter = new SVGFactory(defs, "filter", {
            id: "borderSegmentShadow",
            x: "-50%", y: "-50%",
            width: "200%", height: "200%",
            filterUnits: "objectBoundingBox"
        }).createSvgTag();
        new SVGFactory(shadowFilter, "feGaussianBlur", {
            in: "SourceAlpha", // blur alleen de alpha (vorm) van het element
            stdDeviation: "8", // hoe groter → zachter en verder de schaduw
            result: "blur"
        }).createSvgTag();
        new SVGFactory(shadowFilter, "feOffset", {
            in: "blur",
            dx: "3", // naar rechts
            dy: "5", // naar beneden → geeft diepte
            result: "offsetBlur"
        }).createSvgTag();
        new SVGFactory(shadowFilter, "feFlood", {
            "flood-color": "#000000",
            "flood-opacity": "0.6"
        }).createSvgTag();
        new SVGFactory(shadowFilter, "feComposite", {
            in2: "offsetBlur",
            operator: "in"
        }).createSvgTag();
        new SVGFactory(shadowFilter, "feMerge", {}).createSvgTag();
        new SVGFactory((shadowFilter === null || shadowFilter === void 0 ? void 0 : shadowFilter.querySelector('feMerge')) || shadowFilter, "feMergeNode", {
            in: "offsetBlur"
        }).createSvgTag();
        new SVGFactory((shadowFilter === null || shadowFilter === void 0 ? void 0 : shadowFilter.querySelector('feMerge')) || shadowFilter, "feMergeNode", {
            in: "SourceGraphic" // originele figuur bovenop de schaduw
        }).createSvgTag();
    }
    createBigMainBorder() {
        const borderGroupFactory = new SVGFactory(this, "g", {
            class: "big-main-border-group",
            style: "overflow: hidden;"
        });
        const borderGroup = borderGroupFactory.createSvgTag();
        const borderD = `${this.bigBorderTop} ${this.bigBorderRight} ${this.bigBorderBottom} ${this.bigBorderLeft} Z`;
        const mainPath = new SVGFactory(borderGroup, "path", {
            id: "big-main-border",
            d: borderD,
            fill: "none",
            stroke: "none",
            "stroke-opacity": "1",
            "stroke-width": strokeWidth
        });
        mainPath.createSvgTag();
    }
    createInnerBorder() {
        const innerBorderGroup = new SVGFactory(this, "g", { class: "main-inner-border-group" }).createSvgTag();
        this.newStringPath = this.createNewSVGPathString(this.newInnerPathMergedArray);
        // Basis: bijna zwarte glaslaag
        new SVGFactory(innerBorderGroup, "path", {
            d: `${this.newStringPath} Z`,
            fill: "url(#ultraDarkGlass)",
            filter: "url(#ultraDarkFrosted)",
            stroke: "none",
            "stroke-width": strokeWidth
        }).createSvgTag();
        // Subtiele donkere reflectie erbovenop
        new SVGFactory(innerBorderGroup, "path", {
            d: `${this.newStringPath} Z`,
            fill: "url(#darkReflection)",
            opacity: "1",
            style: "mix-blend-mode: screen;"
        }).createSvgTag();
    }
    createSideBars() {
        const sidebarGroupFactory = new SVGFactory(this, "g", {
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
    createTopBar() {
        const topBarGroupFactory = new SVGFactory(this, "g", {
            class: "main-border-top-bar-group"
        });
        const topBarGroup = topBarGroupFactory.createSvgTag();
        const topBarObject = new SVGFactory(topBarGroup, "path", {
            id: "big-top-bar",
            d: "M220,20 L250,50 L750,50 L780,20 Z",
            // fill: "#2ecc71",
            fill: kleur,
            stroke: "#2ecc71",
            "stroke-opacity": "0.3",
            "stroke-width": strokeWidth
        });
        topBarObject.createSvgTag();
    }
    getResponsiveBetweenSpace(outerPath, innerPath, spacing) {
        const outerPathArray = CalcPathProperties.getPathParts(outerPath);
        const innerPathArray = CalcPathProperties.getPathParts(innerPath);
        const newInnerPathArray = [];
        for (let i = 0; i < outerPathArray.length; i++) {
            const outerPath = outerPathArray[i];
            const innerPath = innerPathArray[i];
            const spaceBetweenX = outerPath.x - innerPath.x;
            const spaceBetweenY = outerPath.y - innerPath.y;
            const isDominantX = Math.abs(spaceBetweenX) > Math.abs(spaceBetweenY);
            const factorX = isDominantX ? 2 : 1;
            const factorY = isDominantX ? 1 : 2;
            const newX = spaceBetweenX < 0 ? innerPath.x + spacing * factorX : innerPath.x - spacing * factorX;
            const newY = spaceBetweenY < 0 ? innerPath.y + spacing * factorY : innerPath.y - spacing * factorY;
            newInnerPathArray.push({ x: newX, y: newY });
        }
        return newInnerPathArray;
    }
    createNewSVGPathString(points) {
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
    mergePathArray(topPath, rigthPath, bottomPath, leftPath) {
        const newPath = [
            ...topPath,
            ...rigthPath,
            ...bottomPath,
            ...leftPath
        ];
        return newPath;
    }
    createTextInSVG() {
        const textGroupFactory = new SVGFactory(this, "g", {
            class: "main-border-text-group"
        });
        const textGroup = textGroupFactory.createSvgTag();
        const foreignObject = new SVGFactory(textGroup, "foreignObject", {
            x: 50,
            y: 50,
            width: 900,
            height: 580 // was 680
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
            div.style.color = kleur;
            div.innerText = '"Ik beschik over een goede basis in meerdere programmeertalen, vooral in Python en JavaScript. En ik blijf mijn kennis verder uitbreiden."';
            foreignObject.getSVGElement.appendChild(div);
        }
    }
    createCorners() {
        const cornerPoints = [];
        const cornerGroupSVGFactory = new SVGFactory(this, "g", {
            class: "corner-group-svg"
        });
        const cornerGroupSVG = cornerGroupSVGFactory.createSvgTag();
        for (let i = 0; i < this.outerPathMergedArray.length; i++) {
            const outerCornerCoord = {
                x: (this.outerPathMergedArray[i].x),
                y: (this.outerPathMergedArray[i].y)
            };
            const innerCornerCoord = {
                x: (this.newInnerPathMergedArray[i].x),
                y: (this.newInnerPathMergedArray[i].y)
            };
            cornerPoints.push({ outerPoints: outerCornerCoord, innerPoints: innerCornerCoord });
            const createPath = `M${outerCornerCoord.x},${outerCornerCoord.y} L${innerCornerCoord.x},${innerCornerCoord.y}`;
            const cornerPathSVG = new SVGFactory(cornerGroupSVG, "path", {
                d: createPath,
                stroke: "none",
                "stroke-width": strokeWidth,
                opacity: "1"
            });
            cornerPathSVG.createSvgTag();
        }
    }
    createFigures() {
        const firgurePositions = new Map();
        let counter = 1;
        // Grap all values of the whole path coordinates
        // Connect last points with the first points in the array
        // Creates figures that are the position between the 2 borders
        for (let i = 0; i < this.outerPathMergedArray.length; i++) {
            const figureArray = [];
            if (i === this.outerPathMergedArray.length - 1 || i === this.newInnerPathMergedArray.length - 1) {
                figureArray.push(this.outerPathMergedArray[i], this.newInnerPathMergedArray[i], this.newInnerPathMergedArray[0], this.outerPathMergedArray[0]);
            }
            else {
                figureArray.push(this.outerPathMergedArray[i], this.newInnerPathMergedArray[i], this.newInnerPathMergedArray[i + 1], this.outerPathMergedArray[i + 1]);
            }
            firgurePositions.set(counter, figureArray);
            counter++;
        }
        const allValues = [...firgurePositions.values()];
        return allValues;
    }
    createFigurePathString() {
        const createArrayWithPathFigures = [];
        const eachPathPositionArray = this.createFigures();
        for (const figures of eachPathPositionArray) {
            const getFigureStringPath = this.createNewSVGPathString(figures);
            createArrayWithPathFigures.push(getFigureStringPath);
        }
        console.log(createArrayWithPathFigures);
        return createArrayWithPathFigures;
    }
    fillFigures() {
        const getFiguresPath = this.createFigurePathString();
        let counter = 0;
        for (const figure of getFiguresPath) {
            const createfigurePath = new SVGFactory(mainContainer, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`,
                stroke: "rgba(20, 30, 55, 0.5)",
                "stroke-width": strokeWidth,
                opacity: "1", // geen opacity meer hieronder, want schaduw regelt diepte
                fill: "url(#ultraDarkGlass)",
                filter: "url(#ultraDarkFrosted) url(#borderSegmentShadow)", // beide filters!
            });
            counter++;
            createfigurePath.createSvgTag();
        }
    }
    init() {
        this.createGradient();
        this.createSideBars();
        // this.createBigMainBorder();
        // this.createTopBar();
        this.createInnerBorder();
        // this.createCorners();
        // this.createCorners();
        // this.createFigures();
        // this.createFigurePathString()
        this.fillFigures();
        this.createTextInSVG();
    }
}
const mainContainer = new LanguageMainContainer("proto-1", {
    viewBox: "-3 -3 1006 682",
    preserveAspectRatio: "xMidYMid meet"
}, true);
// console.log(mainContainer);
export function exportInstances() {
    mainContainer.init();
}
const strokeWidth = 2;
// const kleur = "rgba(20, 36, 54, 1)";
const kleur = "rgba(51, 81, 142, 1)";
// const kleur = "rgba(28, 49, 73, 1)"
// const kleur = "rgba(36, 62, 92, 1)"
// const kleur = "rgba(44, 75, 111, 1)"
// const kleur = "rgba(52, 88, 130, 1)"
// const kleur = "rgba(60, 101, 149, 1)"
// const kleur = "rgba(75, 117, 160, 1)"
// const kleur = "rgba(90, 133, 171, 1)"
// const kleur = "rgba(110, 152, 182, 1)"
// const kleur = "rgba(135, 175, 195, 1)"
// const kleur = "rgba(5, 15, 25, 1)"
// const kleur = "rgba(10, 20, 35, 1)"
// const kleur = "rgba(15, 25, 45, 1)"
// const kleur = "rgba(20, 30, 55, 1)"
// const kleur = "rgba(25, 35, 65, 1)"
// const kleur = "rgba(30, 40, 75, 1)"
// const kleur = "rgba(40, 50, 90, 1)"
// const kleur = "rgba(50, 60, 105, 1)"
// const kleur = "rgba(65, 75, 125, 1)"
// const kleur = "rgba(80, 90, 145, 1)"
