export class SVG {
    // -- svgHTMLId: The ID of the <svg> element
    // -- svgAttributes: Optional attributes applied to the SVG element
    // -- svgDefaultStyling: Enables responsive styling by default
    constructor(svgHTMLId, svgAttributes, svgDefaultStyling) {
        // -- svgAttributes: Key:value pairs of attributes to apply to the SVG element
        this.svgAttributes = {};
        // -- svgIsDefaultStyling: Determines if default responsive styling is applied to the SVG (width 100%, height auto)
        this.svgIsDefaultStyling = true;
        this.svgHTMLId = svgHTMLId;
        this.svgAttributes = svgAttributes;
        this.svgIsDefaultStyling = svgDefaultStyling;
    }
    // -- **Returns the SVG namespace URL**
    static getSVG_NS() {
        return this.SVG_NS;
    }
    // -- svgHTMLId: The new ID to assign to this SVG instance
    // --
    // -- **Updates the stored ID of the SVG element**
    setsvgHTMLId(svgHTMLId) {
        this.svgHTMLId = svgHTMLId;
    }
    // -- **Retrieves the SVG element from the DOM using the stored ID**
    // -- **Applies all attributes stored in svgAttributes**
    // -- **Optionally applies default responsive styling if svgIsDefaultStyling is true**
    // --
    // -- return: The HTML element or null if not found
    getSvgHTMLIdElement() {
        const htmlElement = document.getElementById(this.svgHTMLId);
        if (!htmlElement) {
            console.error("Not found an element with the ID: " + this.svgHTMLId);
            return null;
        }
        if (this.svgAttributes) {
            for (const [key, value] of Object.entries(this.svgAttributes)) {
                htmlElement === null || htmlElement === void 0 ? void 0 : htmlElement.setAttribute(key, String(value));
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
    addDefaultStyling(htmlElement) {
        htmlElement.style.width = "100%";
        htmlElement.style.height = "auto";
        htmlElement.style.display = "block";
        return htmlElement;
    }
}
// -- SVG_NS: The namespace URL required to create SVG elements in the DOM
SVG.SVG_NS = "http://www.w3.org/2000/svg";
