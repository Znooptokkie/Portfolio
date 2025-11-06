export class SVG
{
    // -- SVG_NS: The namespace URL required to create SVG elements in the DOM
    private static readonly SVG_NS: string = "http://www.w3.org/2000/svg";

    // -- svgHTMLId: The ID of the <svg> HTML element to manipulate
    private svgHTMLId: string;

    // -- svgAttributes: Key:value pairs of attributes to apply to the SVG element
    private svgAttributes: Record<string, string | number> = {};

    // -- svgIsDefaultStyling: Determines if default responsive styling is applied to the SVG (width 100%, height auto)
    public svgIsDefaultStyling: boolean = true;

    // -- svgHTMLId: The ID of the <svg> element
    // -- svgAttributes: Optional attributes applied to the SVG element
    // -- svgDefaultStyling: Enables responsive styling by default
    constructor(
        svgHTMLId: string, 
        svgAttributes: Record<string, string | number>,
        svgDefaultStyling: boolean
    )
    {
        this.svgHTMLId = svgHTMLId;
        this.svgAttributes = svgAttributes;
        this.svgIsDefaultStyling = svgDefaultStyling;
    }
    
    // -- **Returns the SVG namespace URL**
    protected static getSVG_NS(): string
    {
        return this.SVG_NS;
    }

    // -- svgHTMLId: The new ID to assign to this SVG instance
    // --
    // -- **Updates the stored ID of the SVG element**
    protected setsvgHTMLId(svgHTMLId: string): void
    { 
        this.svgHTMLId = svgHTMLId;
    }

    // -- **Retrieves the SVG element from the DOM using the stored ID**
    // -- **Applies all attributes stored in svgAttributes**
    // -- **Optionally applies default responsive styling if svgIsDefaultStyling is true**
    // --
    // -- return: The HTML element or null if not found
    protected getSvgHTMLIdElement(): HTMLElement | null
    {
        const htmlElement = document.getElementById(this.svgHTMLId);
        
        if (!htmlElement)
        {
            // console.error("Not found an element with the ID: " + this.svgHTMLId);
            return null;
        }

        if (this.svgAttributes)
        {
            for (const [key, value] of Object.entries(this.svgAttributes))
            {
                htmlElement?.setAttribute(key, String(value));
            }
        }

        if (this.svgIsDefaultStyling && htmlElement)
            this.addDefaultStyling(htmlElement);
            
        return htmlElement;
    }

    // -- htmlElement: The HTMLElement to style
    // --
    // -- **Applies default responsive styling to the SVG element**
    // -- **Sets width: 100%, height: auto, and display: block**
    // --
    // -- return: The styled HTML element
    private addDefaultStyling(htmlElement: HTMLElement): HTMLElement | null
    {   
        htmlElement.style.width = "100%";
        htmlElement.style.height = "auto";
        htmlElement.style.display = "block";

        return htmlElement;
    }
}
