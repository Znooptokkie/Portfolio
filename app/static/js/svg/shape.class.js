/**
 * Klasse voor het aanmaken en tekenen van SVG-elementen.
 */
export class Shape {
    /**
     * @constructor
     * @param svgSelector - CSS-selector voor de SVG-container
     * @param type - Het type SVG-element (zoals "rect", "circle", etc.)
     * @param attributes - Attributen voor het SVG-element
     * @param width - De breedte van het element
     * @param height - De hoogte van het element
     * @param name - Optionele naam van het element
     */
    constructor(svgSelector, type, attributes = {}, width = 0, height = 0, name = null) {
        this.svg = document.querySelector(svgSelector);
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
    create() {
        var _a;
        if (this.type === "path" && this.shapeName === "title") {
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
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
            (_a = this.svg) === null || _a === void 0 ? void 0 : _a.appendChild(defs);
            this.attributes.fill = "url(#titleGradient)";
            delete this.attributes.filter;
        }
        else if (this.type === "path" && this.shapeName === "subtitle") {
            this.attributes.fill = "transparent";
        }
        this.element = document.createElementNS("http://www.w3.org/2000/svg", this.type);
        for (const [key, value] of Object.entries(this.attributes)) {
            this.element.setAttribute(key, String(value));
        }
    }
    /**
     * Tekent het SVG-element in de container.
     */
    draw() {
        if (!this.element) {
            this.create();
        }
        if (this.svg && this.element) {
            this.svg.appendChild(this.element);
        }
    }
    /**
     * Berekent het middelpunt van het SVG-element.
     * @returns De X- en Y-coördinaten van het midden
     */
    calcCenter() {
        if (!this.element) {
            this.create();
        }
        const bbox = this.element.getBBox();
        return {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
    }
}
