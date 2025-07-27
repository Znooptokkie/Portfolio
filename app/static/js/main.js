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

class VectorShapes
    {
        static defaultConfig = {
        shapeFill: "green",
        shapeStroke: "red",
        shapeStrokeWidth: "5",
        fontSize: "20",
        fontFamily: "Goldman, sans-serif",
        fontFill: "black"
    };

    constructor(svgSelector, svgText, name)
    {
        this.svgSelector = svgSelector;
        this.svgText = svgText;
        this.name = name;
        this.pathData;
        this.shapeStyles;
        this.width;
        this.height;
        this.textStyles;
    }

    difineWhichShape(config = {})
    {
        const cfg = { ...VectorShapes.defaultConfig, ...config };

        switch (this.name)
        {
            case "title":
                return this.titlePropertiesArticle(cfg);

            case "subtitle":
                return this.subtitlePropertiesArticle(cfg)
            
                default:
                return null;
        }
    }

    titlePropertiesArticle(cfg)
    {
        this.pathData = "M 0 0 L 250 0 L 250 50 L 0 50 Z";
        this.shapeStyles = {
            fill: cfg.shapeFill,
            stroke: cfg.shapeStroke,
            strokeWidth: cfg.shapeStrokeWidth
        };
        this.width = 250;
        this.height = 50;
        this.textStyles = {
            fontSize: cfg.fontSize,
            fontFamily: cfg.fontFamily,
            fill: cfg.fontFill
        };

        return new Shape(
            this.svgSelector,
            "path",
            {
                d: this.pathData,
                fill: cfg.shapeFill,
                stroke: cfg.shapeStroke,
                "stroke-width": cfg.shapeStrokeWidth
            },
            this.width,
            this.height,
            this.name
        );
    }

    subtitlePropertiesArticle(cfg)
    {
        this.pathData = "M 0 50 L 50 0 L 450 0 L 500 50 L 450 100 L 50 100 Z";
        this.shapeStyles = {
            fill: cfg.shapeFill,
            stroke: cfg.shapeStroke,
            strokeWidth: cfg.shapeStrokeWidth
        };
        this.width = 500;
        this.height = 100;
        this.textStyles = {
            fontSize: cfg.fontSize,
            fontFamily: cfg.fontFamily,
            fill: cfg.fontFill
        };

        return new Shape(
            this.svgSelector,
            "path",
            {
                d: this.pathData,
                fill: cfg.shapeFill,
                stroke: cfg.shapeStroke,
                "stroke-width": cfg.shapeStrokeWidth
            },
            this.width,
            this.height,
            this.name
        );
    }

    render(config = {})
    {
        const shape = this.difineWhichShape(config);
        const text = this.createTextShape(shape);
        shape.draw();
        text.draw();
    }

    createTextShape(shape)
    {
        const center = shape.calcCenter();

        const textShape = new Shape(
            this.svgSelector,
            "text",
            {
                x: center.x,
                y: center.y,
                "text-anchor": "middle",
                "dominant-baseline": "middle",
                "font-size": this.textStyles.fontSize,
                "font-family": this.textStyles.fontFamily,
                fill: this.textStyles.fill
            },
            this.width,
            this.height,
            `${this.name}-text`
        );

        textShape.create();
        textShape.element.textContent = this.svgText;

        return textShape;
    }

}

// CV - Introduction Title
const introductionTitleShape = new VectorShapes(
    ".cv-intro-section-title svg",
    "CV - Introduction",
    "title",
)

// CV - Introduction Subtitle
const introductionSubtitleShape = new VectorShapes(
    ".cv-intro-section-subtitle svg",
    "Who am I?",
    "subtitle"
)

// CV - Experience Title
const experienceTitleShape = new VectorShapes(
    ".cv-exp-section-title svg",
    "CV - Motivation",
    "title"
)

// CV - Eperience Subtitle
const experienceSubtitleShape = new VectorShapes(
    ".cv-exp-section-subtitle svg",
    "Why Programming?",
    "subtitle"
)

document.addEventListener("DOMContentLoaded", () => 
{
    introductionTitleShape.render();
    introductionSubtitleShape.render({
        shapeFill: "lightgrey",
        shapeStroke: "grey",
        shapeStrokeWidth: "2"
    });

    experienceTitleShape.render();
    experienceSubtitleShape.render();
});
