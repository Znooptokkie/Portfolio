import { SVG } from "./SvgElement.js";

// -- svgHTMLId: The ID of the main <svg> HTML element
// -- svgAttributes: A key:value object containing attributes to apply to the SVG element
// -- svgIsDefaultStyling: Determines whether default responsive styling is applied (default = true)
// --
// -- **This class inherits from the SVG class**
export class CreateSvgElements extends SVG
{
    constructor(
        svgHTMLId: string, 
        svgAttributes: Record<string, string | number>,
        svgIsDefaultStyling: boolean
    )
    {
        super(
            svgHTMLId, 
            svgAttributes,
            svgIsDefaultStyling
        )
    }

    // -- elementName: The name of the SVG tag to be created (e.g. "circle", "rect", "line")
    // --
    // -- **Defines which SVG tag needs to be created**
    // -- **Calls the static function <.getSVG_NS()> to retrieve the SVG namespace**
    // -- **Creates the corresponding SVG element using the correct namespace**
    // --
    // -- return: The created SVG element or null if creation fails
    private static createSVG_NS<K extends keyof SVGElementTagNameMap>(elementName: K): SVGElementTagNameMap[K] | null
    {
        if (!elementName)
        {
            console.error("No element found!");
            return null;
        }

        return document.createElementNS(SVG.getSVG_NS(), elementName) as unknown as SVGElementTagNameMap[K]
    }
    // -- element: The SVG element to append
    // --
    // -- **Finds the main SVG container by ID**
    // -- **Appends the provided <element> as a child of that container**
    // --
    // -- return: The appended SVG element or null if the container does not exist
    public appendSVGToHTMLId(element: SVGElement): SVGElement | null
    {
        if (!element)
        {
            console.error("There is no (SVGElement) available!");
            return null;
        }

        const svgContainer = this.getSvgHTMLIdElement()
        
        if (svgContainer)
        {
            return svgContainer.appendChild(element);
        }

        return null
    }

    // -- elementName: The name of the SVG element to create (e.g. "circle", "rect", "path")
    // -- attributes: Optional key:value pairs applied as attributes to the created element
    // --
    // -- **Creates a single SVG element with optional attributes**
    // -- **Uses the private <createSVG_NS()> method to instantiate the element in the correct namespace**
    // -- **Adds all provided attributes to the element**
    // --
    // -- return: The created SVG element or null if creation fails
    public static createSVGElement<K extends keyof SVGElementTagNameMap>(elementName: K, attributes?: Record<string, string | number>): SVGElementTagNameMap[K] | null
    {
        const element = this.createSVG_NS(elementName);

        if (!element)
        {
            console.error("There is no (elementName) available!");
            return null;
        }

        if (attributes)
        {
            for (const [key, value] of Object.entries(attributes))
            {
                element.setAttribute(key, String(value));
            }
        }

        return element;
    }
} 