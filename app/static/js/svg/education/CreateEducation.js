import { MainBorder } from "../components/MainBorder.js";
import { DeconstructPath } from "../components/DeconstructPath.js";
import { CalcPathProperties } from "../components/calculations/CalcPathProperties.js";
import { CreateSides } from "../components/CreateSides.js";
/**
 * CreateEducation
 *
 * Beheert het opbouwen van een educatie-SVG container.
 * Verwerkt zowel outer als inner paths, offsets en viewbox berekeningen.
 * Ook verantwoordelijk voor het toevoegen van teksten binnen de SVG.
 */
export class CreateEducation {
    // Initialiseert de class met HTML-referenties en optionele parameters
    constructor(HTMLID, HTMLContentClass, optional = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // Berekende viewBox hoogte na aanpassingen
        this.newTotalViewboxHeight = null;
        // Output paden en offsets
        this.newOuterPath = null;
        this.newOuterOffsetPath = null;
        this.newInnerPath = null;
        this.newInnerOffsetPath = null;
        this.container = null;
        this.HTMLID = HTMLID;
        this.HTMLContentClass = HTMLContentClass;
        // Standaardwaarden worden gebruikt wanneer optionele waarden ontbreken
        this.MAIN_PATH = (_a = optional.MAIN_PATH) !== null && _a !== void 0 ? _a : "M25,0 L975,0 L1000,25 L1000,575 L975,600 L25,600 L0,575 L0,25 L25,0";
        this.INNER_PATH = (_b = optional.INNER_PATH) !== null && _b !== void 0 ? _b : "M27,100 L973,100 L973,565 L963,575 L37,575 L27,565 L27,100";
        this.VIEWBOX_HEIGHT = (_c = optional.VIEWBOX_HEIGHT) !== null && _c !== void 0 ? _c : 600;
        this.VIEWBOX_WIDTH = (_d = optional.VIEWBOX_WIDTH) !== null && _d !== void 0 ? _d : 1000;
        this.VIEWBOX_TO_PX_RATIO = (_e = optional.VIEWBOX_TO_PX_RATIO) !== null && _e !== void 0 ? _e : 1.2;
        this.ALL_BUT_INNER_HEIGHT_VIEWBOX = (_f = optional.ALL_BUT_INNER_HEIGHT_VIEWBOX) !== null && _f !== void 0 ? _f : 133;
        this.BORDER_OUTER_PADDING = (_g = optional.BORDER_OUTER_PADDING) !== null && _g !== void 0 ? _g : 3;
        this.BORDER_INNER_PADDING = (_h = optional.BORDER_INNER_PADDING) !== null && _h !== void 0 ? _h : 2;
        this.CONTENT_MARGIN = (_j = optional.CONTENT_MARGIN) !== null && _j !== void 0 ? _j : 30;
    }
    // Bouwt een offset pad voor een gegeven path en padding
    buildOffsetPath(path, padding) {
        const newPath = CreateSides.getEachSide(path);
        const createInnerPath = CreateSides.mutateOffsetPath(newPath, padding);
        const mergedArray = CreateSides.mergePathArray(createInnerPath);
        const pathToString = DeconstructPath.createNewSVGPathString(mergedArray);
        return pathToString;
    }
    // Bereken de benodigde viewBox-subtractie op basis van innerHeight en ratio
    calcViewboxSubstraction() {
        const SWDInnerHeight = CalcPathProperties.getInnerHeight(`.${this.HTMLContentClass}`);
        const SWDViewboxHeightChanged = CalcPathProperties.changeInnerHeigtToViewbox(SWDInnerHeight, this.VIEWBOX_TO_PX_RATIO);
        const SWDcalcViewboxSubstraction = CalcPathProperties.calcSubstractionViewbox(this.VIEWBOX_HEIGHT, SWDViewboxHeightChanged, this.ALL_BUT_INNER_HEIGHT_VIEWBOX) - this.CONTENT_MARGIN;
        return SWDcalcViewboxSubstraction;
    }
    // Bereken de nieuwe totale viewBox hoogte na aftrek van substracties
    calcNewTotalViewboxHeight() {
        const SWDNewViewboxHeight = this.VIEWBOX_HEIGHT - this.calcViewboxSubstraction();
        this.newTotalViewboxHeight = SWDNewViewboxHeight;
        return this.newTotalViewboxHeight;
    }
    // Creëert de MainBorder container met de nieuwe viewBox hoogte
    createContainer() {
        let painterContainer = null;
        if (this.getHTMLTagElement()) {
            painterContainer = new MainBorder(`${this.HTMLID}`, {
                viewBox: `0 0 ${this.VIEWBOX_WIDTH} ${this.newTotalViewboxHeight}`,
                preserveAspectRatio: "xMidYMid"
            }, true, "education", this.newOuterPath);
            return painterContainer;
        }
        return null;
    }
    // Haalt het HTML-element op basis van de ID
    getHTMLTagElement() {
        const painterSVGElement = document.getElementById(this.HTMLID);
        return painterSVGElement;
    }
    // Verandert de Y-waarden van een pad op basis van de berekende viewBox-subtractie
    changeValueY(path) {
        const getPAthParts = DeconstructPath.getPathParts(path);
        const painterSVGInitChangedY = DeconstructPath.changeY(getPAthParts, this.calcViewboxSubstraction());
        return painterSVGInitChangedY;
    }
    // Pas een hardcoded offset toe op het inner path (tijdelijke fix)
    hardcodedOffset() {
        const painterNewPath = CreateSides.getEachSide(this.newInnerPath);
        const painterCreateInnerPath = CreateSides.mutateOffsetPath(painterNewPath, this.BORDER_INNER_PADDING);
        painterCreateInnerPath.innerTop[0].x = painterCreateInnerPath.innerTop[0].x + this.BORDER_INNER_PADDING; // FIX!: Niet correcte manier
        painterCreateInnerPath.innerTop[1].x = painterCreateInnerPath.innerTop[1].x - this.BORDER_INNER_PADDING; // FIX!: Niet correcte manier
        const painterMergedArray = CreateSides.mergePathArray(painterCreateInnerPath);
        const painterPathToString = DeconstructPath.createNewSVGPathString(painterMergedArray);
        return painterPathToString;
    }
}
