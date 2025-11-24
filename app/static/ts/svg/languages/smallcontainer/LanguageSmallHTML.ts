import { LanguageJSON } from "../../../interfaces/api/language.interface.js";
import { FetchData } from "../../../services/FetchData.js"

import { SVGFactory } from "../../components/svg-core/SVGFactory.js";
import { SVGPathAttributes } from "../../../types/svg/attributes.js";
import { InnerBorder, LanguageMainBorder } from "../maincontainer/LanguageMainBorder.js";
import { CalcPathProperties } from "../../components/svg-calculations/CalcPathProperties.js";
import { LanguageInnerBorder } from "../maincontainer/LanguageInnerBorder.js";

// import { LanguageMainBorder } from "../maincontainer/LanguageMainBorder.js"    

const cornerPoint = 50

export const outerPath = `M60,0 L200,0 L250,50 L750,50 L800,0 L940,0 L1000,${cornerPoint} L1000,150 L950,175 L950,500 L1000,525 L1000,625 L940,675 L800,675 L775,650 L225,650 L200,675 L60,675 L0,625 L0,525 L${cornerPoint},500 L${cornerPoint},175 L0,150 L0,${cornerPoint} L60,0`


export class LanguageSmallContainerHTML
{
    private languageName: LanguageJSON[] = [];

    constructor() {}

    public async createSmallSVGContainers(): Promise<SVGElement[] | null> 
    {
        const smallLanguagesContainer = document.querySelector(".languages-small");

        if (smallLanguagesContainer)
        {
            const APIData = await this.getAPIData();
            const svgElements: SVGElement[] = [];

            for (const language of APIData) {
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.id = `${language.language.toLowerCase()}-svg`;
                svg.setAttribute("class", "small-svg")
                smallLanguagesContainer?.appendChild(svg);
                svgElements.push(svg);

                this.createDivContainer(language.language, svg)
            }

            return svgElements;
        }
        else
        {
            return null
        }
    }

private createDivContainer(language: string, svg: SVGElement)
{
    const foreign = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreign.setAttribute("width", "100%");
    foreign.setAttribute("height", "100%");

    const wrapper = document.createElement("div");
    wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.style.display = "flex";
    wrapper.style.flexDirection = "column";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "10px";

    const icon = document.createElement("div");
    icon.className = `devicon-${language.toLowerCase()}-plain`;
    icon.style.fontSize = "60px";
    icon.style.color = "rgba(51, 81, 142, 1)";

    const label = document.createElement("p");
    label.style.margin = "0";
    label.style.fontSize = "28px";
    label.style.color = "rgba(51, 81, 142, 1)";

    if (language.toLowerCase() === "azuresqldatabase")
        language = "SQL";

    label.textContent = language;

    wrapper.appendChild(icon);
    wrapper.appendChild(label);
    foreign.appendChild(wrapper);

    (svg as any)._foreignObject = foreign;
}



    public async getAPIData(): Promise<LanguageJSON[]>
    {
        const getLanguagesData = new FetchData("api/languages");
        const call = await getLanguagesData.fetchJsonData();
        this.languageName = call;
        // console.log(this.languageName);
        return call;
    }
}

export class LanguageSmallBorder
{
    public async getHTMLElement(): Promise<SVGElement[] | null> 
    {
        const smallContainer = new LanguageSmallContainerHTML();
        const svgElements = await smallContainer.createSmallSVGContainers();

        if (!svgElements)
            return null

        return svgElements.length > 0 ? svgElements : null;
    }

    public async createInnerPath(): Promise<void | null>
    {
        const svgElements = (await this.getHTMLElement())?.filter(
            (el): el is SVGElement => el instanceof SVGElement
        );

        if (!svgElements) return null;

        for (const child of svgElements) 
        {
            const viewboxWidth = 1006;
            const viewboxHeight = 682;

            const newW = 300;
            const newH = 225;

            const scaledPath = this.dynamicPathScale(outerPath, viewboxWidth, viewboxHeight, newW, newH);

            // console.log(scaledPath);

            const main = new LanguageMainBorder(
                child.id,
                {
                    viewBox: `0 0 ${newW} ${newH}`,
                    preserveAspectRatio: "xMidYMid meet"
                },
                true,
                "language",
                scaledPath
            )

            const inner = new InnerBorder(main)
            const path = CalcPathProperties.getEachSide(main.getPathPoints)
            // console.log(path);
            const innerString = inner.getInnerPathValues(5)

            const figure = new LanguageInnerBorder(main)

            main.init()
            figure.init(main)
                    
            const foreign = (child as any)._foreignObject
            child.appendChild(foreign)
        }
    }

    private dynamicPathScale(
        path: string,
        originalWidth: number,
        originalHeight: number,
        newWidth: number,
        newHeight: number
    ): string
    {
        const scaleX = newWidth / originalWidth;
        const scaleY = newHeight / originalHeight;

        return path.replace(/([ML])\s*([\d.]+),([\d.]+)/g, (_, cmd, x, y) => {
            const newX = parseFloat(x) * scaleX;
            const newY = parseFloat(y) * scaleY;
            return `${cmd}${newX},${newY}`;
        });
    }
}
