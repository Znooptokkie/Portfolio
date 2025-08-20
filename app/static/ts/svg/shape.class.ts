/**
 * Klasse voor het aanmaken en tekenen van SVG-elementen.
 */
export class Shape 
{
    private svg: SVGElement | null;
    private type: string;
    private attributes: { [key: string]: string | number };
    public shapeWidth: number;
    private shapeHeight: number;
    public shapeName: string | null;
    public element: SVGGraphicsElement | null;

    /**
     * @constructor
     * @param svgSelector - CSS-selector voor de SVG-container
     * @param type - Het type SVG-element (zoals "rect", "circle", etc.)
     * @param attributes - Attributen voor het SVG-element
     * @param width - De breedte van het element
     * @param height - De hoogte van het element
     * @param name - Optionele naam van het element
     */
    constructor
    (
        svgSelector: string, 
        type: string, 
        attributes: { [key: string]: string | number } = {}, 
        width: number = 0, 
        height: number = 0, 
        name: string | null = null
    ) 
    {
        this.svg = document.querySelector(svgSelector) as SVGElement | null;
        this.type = type;
        this.attributes = attributes;
        this.shapeWidth = width;
        this.shapeHeight = height;
        this.shapeName = name;
        this.element = null;
    }

    /**
     * Maakt het SVG-element aan, inclusief gradient indien nodig.
     */
    public create(): void 
    {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", this.type) as SVGGraphicsElement;

        if (this.type === "path" && this.shapeName === "title") 
        {
            this.attributes.fill = "url(#titleGradient)";
        } 
        else if (this.type === "path" && this.shapeName === "subtitle") 
        {
            this.attributes.fill = "transparent";
        }

        for (const [key, value] of Object.entries(this.attributes)) 
        {
            this.element.setAttribute(key, String(value));
        }
    }

    /**
     * Tekent het SVG-element in de container.
     */
    public draw(): void 
    {
        if (!this.element) 
        {
            this.create();
        }

        if (this.svg && this.element) 
        {
            this.svg.appendChild(this.element);
        }
    }

    /**
     * Berekent het middelpunt van het SVG-element.
     * @returns De X- en Y-coördinaten van het midden
     */
    public calcCenter(): { x: number; y: number } 
    {
        if (!this.element) 
        {
            this.create();
        }

        const bbox = this.element!.getBBox();

        return {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
    }
}