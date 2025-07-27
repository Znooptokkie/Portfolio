class Shape 
{
    constructor(svgSelector, type, attributes = {}, width = 0, height = 0, name = null) 
    {
        this.svg = document.querySelector(svgSelector);
        this.type = type;
        this.attributes = attributes;
        this.shapeWidth = width;
        this.shapeHeight = height;
        this.shapeName = name;
        this.element = null;
    }

    create() 
    {
        this.element = document.createElementNS("http://www.w3.org/2000/svg", this.type);
        for (const [key, value] of Object.entries(this.attributes)) 
        {
            this.element.setAttribute(key, value);
        }
    }

    draw() 
    {
        if (!this.element) 
        {
            this.create();
        }

        if (this.svg) 
        {
            this.svg.appendChild(this.element);
        }
    }

    calcCenter() 
    {
        return {
            x: this.shapeWidth / 2,
            y: this.shapeHeight / 2
        };
    }
}

function makeSectionVector(config)
{
    // if (config.name == "title")
    // {
    //     width = 250;
    //     height = 50
    // }

    const { svgSelector, width, height, name, pathData, shapeStyles, text, textStyles } = config;

    const vectorShape = new Shape(
        svgSelector,
        "path",
        {
            d: pathData,
            fill: shapeStyles.fill,
            stroke: shapeStyles.stroke,
            "stroke-width": shapeStyles.strokeWidth,
            transform: shapeStyles.transform || null
        },
        width,
        height,
        name
    );
    vectorShape.draw();

    const center = vectorShape.calcCenter();

    const vectorText = new Shape(
        svgSelector,
        "text",
        {
            x: center.x,
            y: center.y,
            "text-anchor": "middle",
            "dominant-baseline": "middle",
            "font-size": textStyles.fontSize,
            "font-family": textStyles.fontFamily,
            fill: textStyles.fill
        },
        width,
        height,
        `${name}-text`
    );
    vectorText.create();
    vectorText.element.textContent = text;
    vectorText.draw();
}

document.addEventListener("DOMContentLoaded", () => 
{
    makeSectionVector({
        svgSelector: ".cv-intro-section-title svg",
        width: 250,
        height: 50,
        name: "title",
        pathData: "M 0 0 L 250 0 L 250 50 L 0 50 Z",
        shapeStyles: { fill: "yellow", stroke: "green", strokeWidth: "5" },
        text: "CV - Introduction",
        textStyles: { fontSize: "20", fontFamily: "Goldman, sans-serif", fill: "black" }
    });

    makeSectionVector({
        svgSelector: ".cv-intro-section-subtitle svg",
        width: 500,
        height: 100,
        name: "subtitle",
        pathData: "M 0 50 L 50 0 L 450 0 L 500 50 L 450 100 L 50 100 Z",
        shapeStyles: { fill: "cyan", stroke: "red", strokeWidth: "3" },
        text: "Who am I?",
        textStyles: { fontSize: "20", fontFamily: "Goldman, sans-serif", fill: "black" }
    });

    makeSectionVector({
        svgSelector: ".cv-exp-section-title svg",
        width: 250,
        height: 50,
        name: "title",
        pathData: "M 0 0 L 250 0 L 250 50 L 0 50 Z",
        shapeStyles: { fill: "yellow", stroke: "green", strokeWidth: "5" },
        text: "CV - Motivation",
        textStyles: { fontSize: "20", fontFamily: "Goldman, sans-serif", fill: "black" }
    });

    makeSectionVector({
        svgSelector: ".cv-exp-section-subtitle svg",
        width: 500,
        height: 100,
        name: "subtitle",
        pathData: "M 0 50 L 50 0 L 450 0 L 500 50 L 450 100 L 50 100 Z",
        shapeStyles: { fill: "cyan", stroke: "red", strokeWidth: "3" },
        text: "Why Programming?",
        textStyles: { fontSize: "20", fontFamily: "Goldman, sans-serif", fill: "black" }
    });
});
