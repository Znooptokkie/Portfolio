/**
 * CalcResizeContainer
 *
 * Meet en bewaart de breedte en hoogte van een HTML-element en past deze aan bij window-resize events.
 */
export class CalcResizeContainer {
    // Initialiseert de container door een element te selecteren via CSS-selector
    // en leest direct de initiële breedte en hoogte uit
    constructor(contentSelector) {
        this.content = null;
        this.contentWidth = null;
        this.contentHeight = null;
        this.contentSelector = contentSelector;
    }
    getDOMContent() {
        const getElement = document.querySelector(`${this.contentSelector}`);
        if (!getElement)
            console.error(`Can't find element: ${getElement}`);
        this.content = getElement;
        this.contentWidth = this.content.getBoundingClientRect().width;
        this.contentHeight = this.content.getBoundingClientRect().height;
    }
    // Luistert naar window resize events en update de breedte en hoogte dynamisch
    getContentSize() {
        window.addEventListener("resize", () => {
            this.contentWidth = this.content.getBoundingClientRect().width;
            this.contentHeight = this.content.getBoundingClientRect().height;
        });
    }
    // Geeft de huidige hoogte van het element terug
    get getContentHeight() {
        return this.contentHeight ? this.contentHeight : null;
    }
}
