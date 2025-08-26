import { Shape } from './shape.class.js';
import { VectorShapeConfig } from "../interfaces/svgShapes.interface.js";

type defaultConfig = {
        shapeStroke: string;
        shapeStrokeWidth: string;
        fontSize: number;
        fontFamily: string;
        fontFill: string;
        svgPointsTitle: { x: string; y: string }[];
        svgPointsSubtitle: { x: string; y: string }[];
}

/**
 * Klasse voor het aanmaken van samengestelde SVG-shapes en bijhorende tekst.
 */
export class VectorShapes 
{
    private static instancesBySelector: Map<string, VectorShapes[]> = new Map();
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
    static defaultConfig: defaultConfig = {
        shapeStroke: "grey",
        shapeStrokeWidth: "3",
        fontSize: 20,
        fontFamily: "Ubuntu, sans-serif",
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
        ],
    };

    private currentConfig: VectorShapeConfig = {}


    /**
     * @constructor
     * @param svgSelector - CSS-selector voor de SVG-container
     * @param svgText - De tekstinhoud die getoond moet worden
     * @param name - Naam van het shape-type (bijv. "title", "subtitle")
     */
    constructor(svgSelector: string, svgText: string, name: string)
    {
        this.svgSelector = svgSelector;
        this.svgText = svgText;
        this.name = name;

        if (!VectorShapes.instancesBySelector.has(svgSelector))
        {
            VectorShapes.instancesBySelector.set(svgSelector, []);
        }
        VectorShapes.instancesBySelector.get(svgSelector)!.push(this);

        this.initializeResizeListener();
    }

    // Methode om de resize listener te initialiseren
private initializeResizeListener(): void 
{
    let timeout: number
    window.addEventListener("resize", () => 
    {
        clearTimeout(timeout)
        timeout = setTimeout(() => 
        {
            const instances = VectorShapes.instancesBySelector.get(this.svgSelector)
            if (instances) 
            {
                VectorShapes.clearAllPaths(this.svgSelector)
                instances.forEach(instance => 
                {
                    instance.render() // hergebruik currentConfig
                })
            }
        }, 100)
    })
}


    /**
     * Verwijdert alle path- en text-elementen uit de opgegeven SVG-container.
     * @param svgSelector - De CSS-selector van de SVG-container
     */
    private static clearAllPaths(svgSelector: string): void
    {
        const svgContainer = document.querySelector(svgSelector);
        if (svgContainer)
        {
            svgContainer.querySelectorAll("path, text").forEach(el => el.remove());
        }
    }

    /**
     * Rendert het SVG-shape en bijhorende tekst.
     * @param config - Optionele configuratie (overschrijft defaults)
     */
public render(config: VectorShapeConfig = {}): void
{
    this.currentConfig = { ...this.currentConfig, ...config }

    if (this.name === "title")
    {
        this.titleGradient()
    }

    const shape = this.defineWhichShape(this.currentConfig)
    if (shape)
    {
        shape.draw()
        const text = this.createTextShape(shape)
        text.draw()
    }
}


    /**
     * Bepaalt welk shape-type gemaakt moet worden.
     * @param config - Configuratieobject
     * @returns Shape of null
     */
    private defineWhichShape(config: VectorShapeConfig = {}): Shape | null 
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
     * Stelt de eigenschappen in voor een titel-shape.
     * @param cfg - Configuratieobject
     * @returns Shape
     */
    private titlePropertiesArticle(cfg: typeof VectorShapes.defaultConfig): Shape 
    {
        const scaledPoints = this.responsiveSvgPoints(cfg.svgPointsTitle);

        // Werk de pathData bij met de schaalbare punten
        this.pathData = this.makePathForSvg({ ...cfg, svgPointsTitle: scaledPoints });
            this.shapeStyles = {
                stroke: cfg.shapeStroke,
                strokeWidth: cfg.shapeStrokeWidth
            };
            this.width = 350;
            this.height = 50;
            this.textStyles = {
                fontSize: this.responsiveSvgText(cfg)[0],
                fontFamily: cfg.fontFamily,
                fill: this.textStyles?.fill || cfg.fontFill,
                fontStyle: "italic",
                fontWeight: "regular"
            };

            return new Shape(
                this.svgSelector,
                "path",
                {
                    d: this.pathData,
                    stroke: cfg.shapeStroke,
                    "stroke-width": 0,
                },
                this.width, // X_AS
                this.height,
                this.name
            );
    }

    /**
     * Stelt de eigenschappen in voor een subtitle-shape.
     * @param cfg - Configuratieobject
     * @returns Shape
     */
    private subtitlePropertiesArticle(cfg: typeof VectorShapes.defaultConfig): Shape 
    {
        const scaledPoints = this.responsiveSvgPoints(cfg.svgPointsSubtitle);

        // Werk de pathData bij met de schaalbare punten
        this.pathData = this.makePathForSvg({ ...cfg, svgPointsSubtitle: scaledPoints });
        this.shapeStyles = {
            stroke: cfg.shapeStroke,
            strokeWidth: cfg.shapeStrokeWidth
        };
        this.width = 774;
        this.height = 100;
        this.textStyles = {
            // fontSize: cfg.fontSize,
            fontSize: this.responsiveSvgText( cfg)[1],
            fontFamily: cfg.fontFamily,
            fill: this.textStyles?.fill || cfg.fontFill,
            fontWeight: "bold",
            fontStyle: "normal"
        };

        // console.log(scaledPoints);

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
     * Genereert de path-string voor het SVG-path.
     * @param cfg - Configuratie met puntencoördinaten
     * @returns Path-string in SVG-notatie
     */
    private makePathForSvg(cfg: typeof VectorShapes.defaultConfig): string 
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
     * Maakt een tekstvorm die gepositioneerd wordt bij het middelpunt van een shape.
     * @param shape - De bijbehorende shape waar tekst bij hoort
     * @returns Tekstvorm als SVG-element
     */
    private createTextShape(shape: Shape): Shape 
    {
        const textShape = new Shape(
            this.svgSelector,
            "text",
            {
                x: shape.calcCenter().x,
                "text-anchor": "middle",
                y: shape.calcCenter().y,
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
        if (textShape.element) 
        {
            textShape.element.textContent = this.svgText;
        }

        return textShape;
    }

    private responsiveSvgPoints(array: { x: string; y: string }[]): { x: string; y: string }[] 
    {
        // 1040px = Width of the (svg + margin) 1024 + 16
        if (window.innerWidth <= 1040) 
        {
            const scaledPoints = []

            for (let i = 0; i < array.length; i++) 
            {
                const xPoint: number = parseInt(array[i].x, 10)
                const newXPoint: number = Math.round((xPoint * (window.innerWidth / 1024)))

                const yPoint: number = parseInt(array[i].y, 10)
                let newYPoint: number | string = 0

                if (window.innerWidth <= 625)
                {
                    newYPoint = Math.round((yPoint * (window.innerWidth / 600)))
                }

                if (newYPoint === 0)
                {
                    newYPoint = array[i].y
                }

                // console.log(yPoint);
                // console.log(newYPoint);

                scaledPoints.push({
                    x: newXPoint.toString(),
                    y: newYPoint.toString(),
                });
            }
            return scaledPoints;
        }
        return array;
    }

private responsiveSvgText(config: VectorShapeConfig = {}): string[]
{
    const cfg = { ...VectorShapes.defaultConfig, ...config }

    let basicFontSizeTitle = cfg.fontSize
    let basicFontSizeSubtitle = cfg.fontSize

    if (window.innerWidth < 800)
    {
        basicFontSizeSubtitle = basicFontSizeSubtitle * (window.innerWidth / 900)
        if (basicFontSizeSubtitle > 30)
        {
            basicFontSizeSubtitle = 30
        }
    }

    if (window.innerWidth < 700)
    {
        basicFontSizeTitle = basicFontSizeTitle * (window.innerWidth / 600)
    }

    return [basicFontSizeTitle.toString(), basicFontSizeSubtitle.toString()]
}



    private titleGradient(): void
    {
        const svgContainer = document.querySelector(this.svgSelector) as SVGElement | null;
        if (!svgContainer) return;

        let defs = svgContainer.querySelector("defs");
        if (!defs)
        {
            defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            svgContainer.insertBefore(defs, svgContainer.firstChild);
        }

        let gradient = defs.querySelector("#titleGradient");
        if (!gradient)
        {
            gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
            gradient.setAttribute("id", "titleGradient");
            gradient.setAttribute("x1", "0%");
            gradient.setAttribute("y1", "0%");
            gradient.setAttribute("x2", "100%");
            gradient.setAttribute("y2", "100%");

            const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop1.setAttribute("offset", "0%");
            stop1.setAttribute("stop-color", "#222");

            const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop2.setAttribute("offset", "100%");
            stop2.setAttribute("stop-color", "#666");

            gradient.appendChild(stop1);
            gradient.appendChild(stop2);
            defs.appendChild(gradient);
        }
    }
}

