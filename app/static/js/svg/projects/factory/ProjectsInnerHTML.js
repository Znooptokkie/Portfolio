import { SVGFactory } from "../../components/core/SVGFactory.js";
export class ProjectsInnerHTMLContent {
    static createWrapper(projectTitle, projectText) {
        const wrapper = document.createElement("div");
        wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        wrapper.style.cssText = `
            width:100%;
            height:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            gap:10px;
        `;
        const title = document.createElement("h2");
        title.style.fontSize = "100px";
        title.style.fontStyle = "italic";
        title.style.fontFamily = "Goldman", "sans-serif";
        title.style.color = "rgb(51, 81, 142)";
        // title.textContent = "JAAAAAAAAA!!!!!"
        title.textContent = projectTitle;
        const content = document.createElement("p");
        content.style.fontSize = "54px";
        content.style.lineHeight = "2.5";
        // content.textContent = "Battlebot was een project dat ik samen met een klasgenoot op school heb uitgevoerd. We hebben een technische robot geüpgraded zodat deze kan worden aangestuurd via een Raspberry Pi 5 en een tweede Pico-microcontroller."
        content.style.color = "rgb(51, 81, 142)";
        content.style.textAlign = "center";
        content.textContent = projectText;
        wrapper.append(title);
        wrapper.append(content);
        return wrapper;
    }
    static createLanguagePaths(container, path) {
        if (!container)
            return null;
        // if (!path)
        // {
        //     path = "M1450,-20 L1560,-20 L1560,90 L1505,125 L1450,90 L1450,-20" 
        // }
        // const offsetX = 175
        const pathElement = new SVGFactory(container, "path", {
            d: path,
            stroke: "rgb(0, 12, 35)",
            fill: "rgba(10, 20, 35, 0.15)",
            // transform: `translate(${offsetX},0)`
        }).createSvgTag();
        return pathElement;
    }
    static initContent(container, pathElement, projectTitle, projectText) {
        if (!container || !pathElement)
            return null;
        const bbox = pathElement.getBBox();
        const offsetX = bbox.x + bbox.width / 2;
        const offsetY = bbox.y + bbox.height / 2;
        const foreign = new SVGFactory(container, "foreignObject", {
            x: 1750,
            y: 100,
            width: 1500,
            height: 775
        }).createSvgTag();
        // const wrapper = this.createXHTMLWrapper(language)
        const wrapper = ProjectsInnerHTMLContent.createWrapper(projectTitle, projectText);
        foreign === null || foreign === void 0 ? void 0 : foreign.appendChild(wrapper);
    }
}
