// import { MainBorder } from "../components/MainBorder.js"   
import { SVGFactory } from "../components/core/SVGFactory.js";
import { InnerPath } from "../components/InnerPath.js";
import { DeconstructPath } from "../components/DeconstructPath.js";

import { CalcPathProperties } from "../components/calculations/CalcPathProperties.js"
import { CreateSides } from "../components/CreateSides.js";
import { CreateSVG } from "../components/core/SVGCreate.js";

/**
 * CreateEducation
 * 
 * Beheert het opbouwen van een educatie-SVG container. 
 * Verwerkt zowel outer als inner paths, offsets en viewbox berekeningen.
 * Ook verantwoordelijk voor het toevoegen van teksten binnen de SVG.
 */
export class CreateEducation {
    // Interne paden en viewBox-parameters voor de container en content
    private MAIN_PATH: string
    private INNER_PATH: string
    private VIEWBOX_HEIGHT: number
    private VIEWBOX_WIDTH: number
    private VIEWBOX_TO_PX_RATIO: number
    private ALL_BUT_INNER_HEIGHT_VIEWBOX: number
    private BORDER_OUTER_PADDING: number
    private BORDER_INNER_PADDING: number
    private CONTENT_MARGIN: number

    // HTML-referenties
    private HTMLID: string
    private HTMLContentClass: string

    // Berekende viewBox hoogte na aanpassingen
    private newTotalViewboxHeight: number | null = null

    // Output paden en offsets
    public newOuterPath: string | null = null
    public newOuterOffsetPath: string | null = null
    public newInnerPath: string | null = null
    public newInnerOffsetPath: string | null = null

    private container: CreateSVG | null = null

    // Initialiseert de class met HTML-referenties en optionele parameters
    constructor(
        HTMLID: string,
        HTMLContentClass: string,
        optional: 
        {
            MAIN_PATH?: string
            INNER_PATH?: string
            VIEWBOX_HEIGHT?: number
            VIEWBOX_WIDTH?: number
            VIEWBOX_TO_PX_RATIO?: number
            ALL_BUT_INNER_HEIGHT_VIEWBOX?: number
            BORDER_OUTER_PADDING?: number
            BORDER_INNER_PADDING?: number
            CONTENT_MARGIN?: number
        } = {}
    ) {
        this.HTMLID = HTMLID
        this.HTMLContentClass = HTMLContentClass

        // Standaardwaarden worden gebruikt wanneer optionele waarden ontbreken
        this.MAIN_PATH = optional.MAIN_PATH ?? "M25,0 L975,0 L1000,25 L1000,575 L975,600 L25,600 L0,575 L0,25 L25,0"
        this.INNER_PATH = optional.INNER_PATH ?? "M27,100 L973,100 L973,565 L963,575 L37,575 L27,565 L27,100"
        this.VIEWBOX_HEIGHT = optional.VIEWBOX_HEIGHT ?? 600
        this.VIEWBOX_WIDTH = optional.VIEWBOX_WIDTH ?? 1000
        this.VIEWBOX_TO_PX_RATIO = optional.VIEWBOX_TO_PX_RATIO ?? 1.2
        this.ALL_BUT_INNER_HEIGHT_VIEWBOX = optional.ALL_BUT_INNER_HEIGHT_VIEWBOX ?? 133
        this.BORDER_OUTER_PADDING = optional.BORDER_OUTER_PADDING ?? 3
        this.BORDER_INNER_PADDING = optional.BORDER_INNER_PADDING ?? 2
        this.CONTENT_MARGIN = optional.CONTENT_MARGIN ?? 30
    }

    // Bouwt een offset pad voor een gegeven path en padding
    public buildOffsetPath(path: string, padding: number): string
    {
        const newPath = CreateSides.getEachSide(path)
        const createInnerPath =  CreateSides.mutateOffsetPath(newPath!, padding)
        const mergedArray = CreateSides.mergePathArray(createInnerPath)
        const pathToString = DeconstructPath.createNewSVGPathString(mergedArray)

        return pathToString
    }

    // Bereken de benodigde viewBox-subtractie op basis van innerHeight en ratio
    public calcViewboxSubstraction(): number
    {
        const SWDInnerHeight = CalcPathProperties.getInnerHeight(`.${this.HTMLContentClass}`)
        const SWDViewboxHeightChanged = CalcPathProperties.changeInnerHeigtToViewbox(SWDInnerHeight!, this.VIEWBOX_TO_PX_RATIO)
        const SWDcalcViewboxSubstraction = CalcPathProperties.calcSubstractionViewbox(this.VIEWBOX_HEIGHT, SWDViewboxHeightChanged, this.ALL_BUT_INNER_HEIGHT_VIEWBOX) - this.CONTENT_MARGIN

        return SWDcalcViewboxSubstraction
    }

    // Bereken de nieuwe totale viewBox hoogte na aftrek van substracties
    public calcNewTotalViewboxHeight(): number
    {
        const SWDNewViewboxHeight = this.VIEWBOX_HEIGHT - this.calcViewboxSubstraction()
        this.newTotalViewboxHeight = SWDNewViewboxHeight

        return this.newTotalViewboxHeight
    }

    // Creëert de MainBorder container met de nieuwe viewBox hoogte
    public createContainer(): CreateSVG | null
    {
        let painterContainer: CreateSVG | null = null

        if (this.getHTMLTagElement())
        {
            painterContainer = new CreateSVG(
                `${this.HTMLID}`,
                {
                    viewBox: `0 0 ${this.VIEWBOX_WIDTH} ${this.newTotalViewboxHeight}`,
                    preserveAspectRatio: "xMidYMid"
                },
                true
            )
            
            return painterContainer
        }

        return null
    }

    // Haalt het HTML-element op basis van de ID
    public getHTMLTagElement(): HTMLElement | null
    {
        const painterSVGElement = document.getElementById(this.HTMLID)
        return painterSVGElement
    }

    // Verandert de Y-waarden van een pad op basis van de berekende viewBox-subtractie
    public changeValueY(path: string): string | null
    {
        const getPAthParts = DeconstructPath.getPathParts(path)
        const painterSVGInitChangedY = DeconstructPath.changeY(getPAthParts, this.calcViewboxSubstraction())

        return painterSVGInitChangedY
    }

    // Pas een hardcoded offset toe op het inner path (tijdelijke fix)
    public hardcodedOffset(): string
    {
        const painterNewPath = CreateSides.getEachSide(this.newInnerPath!)
        const painterCreateInnerPath = CreateSides.mutateOffsetPath(painterNewPath!, this.BORDER_INNER_PADDING)
        painterCreateInnerPath.innerTop[0].x = painterCreateInnerPath.innerTop[0].x + this.BORDER_INNER_PADDING // FIX!: Niet correcte manier
        painterCreateInnerPath.innerTop[1].x = painterCreateInnerPath.innerTop[1].x - this.BORDER_INNER_PADDING // FIX!: Niet correcte manier
        const painterMergedArray = CreateSides.mergePathArray(painterCreateInnerPath)
        const painterPathToString = DeconstructPath.createNewSVGPathString(painterMergedArray)

        return painterPathToString
    }
}
