import { Shape } from './shape.class';
import {VectorShapeConfig } from "../interfaces/svgShapes.interface";

/**
 * Klasse voor het aanmaken van samengestelde SVG-shapes en bijhorende tekst.
 */
export class VectorShapes 
{
    private svgSelector: string;
    private svgText: string;
    private name: string;
    private pathData?: string;
    private shapeStyles?: { stroke: string; strokeWidth: string };
    private width?: number;
    private height?: number;
    private textStyles?: 
    {
        fontSize: string;
        fontFamily: string;
        fill: string;
        fontStyle?: string;
        fontWeight?: string;
    };

    /** 
     * Standard values the title/subtitle part - CV Homepage
     */
    static defaultConfig: 
    {
        shapeStroke: string;
        shapeStrokeWidth: string;
        fontSize: string;
        fontFamily: string;
        fontFill: string;
        svgPointsTitle: { x: string; y: string }[];
        svgPointsSubtitle: { x: string; y: string }[];
    } = {
        shapeStroke: "grey",
        shapeStrokeWidth: "3",
        fontSize: "20",
        fontFamily: "Unlock, serif",
        fontFill: "black",
        svgPointsTitle: 
        [
            { x: "2.5", y: "35" },
            { x: "27.5", y: "12.5" },
            { x: "292.5", y: "12.5" },
            { x: "252.5", y: "52.5" },
            { x: "257.5", y: "57.7" },
            { x: "27.5", y: "57.5" },
            { x: "2.5", y: "35" }
        ],
        svgPointsSubtitle: 
        [
            { x: "252.5", y: "52.5" },
            { x: "302.5", y: "2.5" },
            { x: "921.5", y: "2.5" },
            { x: "971.5", y: "52.5" },
            { x: "921.5", y: "97.5" },
            { x: "302.5", y: "97.5" }
        ]
    };

    /**
     * @constructor
     * @param svgSelector - CSS-selector voor de SVG-container
     * @param svgText - De tekstinhoud die getoond moet worden
     * @param name - Naam van het shape-type (bijv. "title", "subtitle")
     */
    constructor(
        svgSelector: string, 
        svgText: string, 
        name: string) 
    {
        this.svgSelector = svgSelector;
        this.svgText = svgText;
        this.name = name;
    }

    /**
     * Rendert het SVG-shape en bijhorende tekst.
     * @param config - Optionele configuratie (overschrijft defaults)
     */
    render(config: VectorShapeConfig = {}): void 
    {
        const shape = this.defineWhichShape(config);
        if (shape) 
        {
            shape.draw();
            const text = this.createTextShape(shape);
            text.draw();
        }
    }

    /**
     * Bepaalt welk shape-type gemaakt moet worden.
     * @param config - Configuratieobject
     * @returns Shape of null
     */
    defineWhichShape(config: VectorShapeConfig = {}): Shape | null 
    {
        const cfg = { ...VectorShapes.defaultConfig, ...config };

        switch (this.name) 
        {
            case "title":
                return this.titlePropertiesArticle(cfg);
            case "subtitle":
                return this.subtitlePropertiesArticle(cfg);
            default:
                return null;
        }
    }

    /**
     * Genereert de path-string voor het SVG-path.
     * @param cfg - Configuratie met puntencoördinaten
     * @returns Path-string in SVG-notatie
     */
    makePathForSvg(cfg: typeof VectorShapes.defaultConfig): string 
    {
        let pathStructure = "";
        const whichSvg = this.name === "title" ? cfg.svgPointsTitle : cfg.svgPointsSubtitle;

        for (let i = 0; i < whichSvg.length; i++) 
        {
            if (i !== whichSvg.length - 1) 
            {
                pathStructure += `${whichSvg[i].x} ${whichSvg[i].y} L `;
            } 
            else 
            {
                pathStructure += `${whichSvg[i].x} ${whichSvg[i].y}`;
            }
        }

        return `M ${pathStructure} Z`;
    }

    /**
     * Stelt de eigenschappen in voor een titel-shape.
     * @param cfg - Configuratieobject
     * @returns Shape
     */
    titlePropertiesArticle(cfg: typeof VectorShapes.defaultConfig): Shape 
    {
        this.pathData = this.makePathForSvg(cfg);
        console.log(this.pathData);

        this.shapeStyles = {
            stroke: cfg.shapeStroke,
            strokeWidth: cfg.shapeStrokeWidth
        };
        this.width = 350;
        this.height = 50;
        this.textStyles = {
            fontSize: cfg.fontSize,
            fontFamily: cfg.fontFamily,
            fill: cfg.fontFill,
            fontStyle: "italic",
            fontWeight: "normal"
        };

        return new Shape(
            this.svgSelector,
            "path",
            {
                d: this.pathData,
                stroke: cfg.shapeStroke,
                "stroke-width": cfg.shapeStrokeWidth
            },
            this.width,
            this.height,
            this.name
        );
    }

    /**
     * Stelt de eigenschappen in voor een subtitle-shape.
     * @param cfg - Configuratieobject
     * @returns Shape
     */
    subtitlePropertiesArticle(cfg: typeof VectorShapes.defaultConfig): Shape 
    {
        this.pathData = this.makePathForSvg(cfg);
        this.shapeStyles = {
            stroke: cfg.shapeStroke,
            strokeWidth: cfg.shapeStrokeWidth
        };
        this.width = 774;
        this.height = 100;
        this.textStyles = {
            fontSize: cfg.fontSize,
            fontFamily: cfg.fontFamily,
            fill: cfg.fontFill,
            fontWeight: "bold",
            fontStyle: "normal"
        };

        return new Shape(
            this.svgSelector,
            "path",
            {
                d: this.pathData,
                stroke: cfg.shapeStroke,
                "stroke-width": cfg.shapeStrokeWidth
            },
            this.width,
            this.height,
            this.name
        );
    }

    /**
     * Maakt een tekstvorm die gepositioneerd wordt bij het middelpunt van een shape.
     * @param shape - De bijbehorende shape waar tekst bij hoort
     * @returns Tekstvorm als SVG-element
     */
    createTextShape(shape: Shape): Shape 
    {
        const center = shape.calcCenter();

        const textShape = new Shape(
            this.svgSelector,
            "text",
            {
                x: shape.shapeName === "title" ? (shape.calcCenter().x - shape.shapeWidth / 2 + 30) : shape.calcCenter().x,
                y: shape.calcCenter().y,
                "text-anchor": shape.shapeName === "title" ? "start" : "middle",
                "dominant-baseline": "middle",
                "font-size": this.textStyles!.fontSize,
                "font-family": this.textStyles!.fontFamily,
                "font-style": this.textStyles!.fontStyle || "normal",
                "font-weight": this.textStyles!.fontWeight || "normal",
                fill: this.textStyles!.fill
            },
            this.width!,
            this.height!,
            `${this.name}-text`
        );

        textShape.create();
        if (textShape.element) {
            textShape.element.textContent = this.svgText;
        }

        return textShape;
    }
}