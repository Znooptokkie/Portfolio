import { SVGPathAttributes } from "../../types/svg/attributes";
import { CreateSVG } from "./core/SVGCreate.js";
import { SVGFactory } from "./core/SVGFactory.js";
import { PathFigures } from "./PathFigures.js";

/**
 * InitPath
 * 
 * Zorgt voor het creëren van de daadwerkelijke border parts binnen een SVG container
 * op basis van outer en inner paths.
 */
export class InitPath
{
    // Bouwt alle zichtbare segmenten voor de rand van een SVG-pad.
    // Ontvangt zowel de buitenste als de binnenste pad-string en genereert:
    // 1) een <g>-element voor de binnenste vorm
    // 2) losse pad-segmenten die de border-vlakken vormen.
    // Als één van de pad-strings ontbreekt stopt de functie direct.
    public static createBorderParts(container: CreateSVG, outer: string, inner: string, category: string): void | null
    {        
        if (!inner || !outer)
            return null
        
        // Berekent de afzonderlijke segmenten tussen inner en outer voor visuele border-opbouw
        const getFiguresPath = PathFigures.createFigurePathString(inner, outer);
            
        if (!getFiguresPath)
            return null

        // Groepeert de binnenste vorm in een eigen <g>-element
        const innerGroup = new SVGFactory(container, "g", {
            class: `${category}-inner`
        }).createSvgTag()

        // Render de binnenrand als één pad met een gedefinieerde fill
        // new SVGFactory(innerGroup, "path", {
        //     class: "glass",
        //     d: inner,
        //     // fill: "rgba(15,20,30,1)",
        //     // fill: "#010310",
        //     fill: "rgba(3, 5, 20, 0.05)",
        //     filter: "url(#ultraDarkFrosted)",
        //     stroke: "none",
        //     // opacity: 0.8,
        // }).createSvgTag();
        new SVGFactory(innerGroup, "path", {
            d: inner,
            // fill: "#000214",
            fill: "url(#ultraDarkGlass)",
            // filter: "url(#ultraDarkFrosted)",
            stroke: "none",
        }).createSvgTag();

        let counter = 0;

        const figureGroup = new SVGFactory(container, "g", {
            class: "figure-group"
        }).createSvgTag()
        
        // Doorloop alle berekende segmenten en genereer voor elk segment een afzonderlijk pad
        // Dit creëert de visuele border-opdeling rondom het figuur
        for (const figure of getFiguresPath)
        {
            // let color = counter < 12 ? "#01030a" : "#000214";
            // let color = counter < 12 ? "#010307" : "#010307"
            let color = counter < (Math.floor(getFiguresPath.length / 2)) ? "rgba(3, 5, 20, 1)" : "rgba(3, 5, 18, 1)"


            const createfigurePath = new SVGFactory<SVGPathAttributes>(figureGroup, "path", {
                class: `figure-${counter}`,
                d: `${figure}Z`, 
                opacity: "1",
                "stroke-width": 1,
                // stroke: "#1a2b46",
                // stroke: "rgba(255,255,255,0.05)",
                // stroke: "rgba(3, 5, 22, 1)",
                // stroke: "green",
                // fill: "url(#innerBorderGradient)",
                fill: color,
                // fill: "none"
            });

            counter++;
            createfigurePath.createSvgTag();
        }
    }
}