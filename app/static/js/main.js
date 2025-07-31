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
        if (this.type === "path" && this.shapeName === "title")
        {
            const gradientId = "titleGradient";
            const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
            const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        
            linearGradient.setAttribute("id", gradientId);
            linearGradient.setAttribute("x1", "0%");
            linearGradient.setAttribute("y1", "0%");
            linearGradient.setAttribute("x2", "100%");
            linearGradient.setAttribute("y2", "100%");
        
            const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop1.setAttribute("offset", "0%");
            stop1.setAttribute("stop-color", "#222");
        
            const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop2.setAttribute("offset", "100%");
            stop2.setAttribute("stop-color", "#666");
        
            linearGradient.appendChild(stop1);
            linearGradient.appendChild(stop2);
            defs.appendChild(linearGradient);
            this.svg.appendChild(defs);
        
            this.attributes.fill = `url(#${gradientId})`;
        }
        else if (this.type === "path" && this.shapeName === "subtitle")
        {
            // this.attributes.fill = "rgb(235, 235, 235)";
            this.attributes.fill = "transparent";
        }
    
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
        if (!this.element)
        {
            this.create();
        }
    
        const bbox = this.element.getBBox();
    
        return {
            x: bbox.x + bbox.width / 2,
            y: bbox.y + bbox.height / 2
        };
    }

}

class VectorShapes
    {
        static defaultConfig = {
        shapeStroke: "grey",
        shapeStrokeWidth: "3",
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
        // this.pathData = "M 2.5 2.5 L 247.5 2.5 L 247.5 47.5 L 2.5 47.5 Z";
        this.pathData = "M 7.5 32.5 L 27.5 12.5 L 247.5 12.5 L 247.5 57.5 27.5 57.5 L 7.5 37.5 Z";
        this.shapeStyles = {
            // fill: "url(#titleGradient)",
            stroke: cfg.shapeStroke,
            strokeWidth: cfg.shapeStrokeWidth
        };
        this.width = 250;
        this.height = 50;
        this.textStyles = {
            fontSize: cfg.fontSize,
            fontFamily: cfg.fontFamily,
            fill: cfg.fontFill,
            fontStyle: "italic"
        };

        return new Shape(
            this.svgSelector,
            "path",
            {
                d: this.pathData,
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
        this.pathData = "M 202.5 52.5 L 252.5 2.5 L 647.5 2.5 L 697.5 52.5 L 647.5 97.5 L 252.5 97.5 Z";
        this.shapeStyles = {
            stroke: cfg.shapeStroke,
            strokeWidth: cfg.shapeStrokeWidth
        };
        this.width = 500;
        this.height = 100;
        this.textStyles = {
            fontSize: cfg.fontSize,
            fontFamily: cfg.fontFamily,
            fill: cfg.fontFill,
            fontWeight: "bold",
        };

        return new Shape(
            this.svgSelector,
            "path",
            {
                d: this.pathData,
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
        shape.draw();
        const text = this.createTextShape(shape);
        text.draw(); 
    }

    createTextShape(shape)
    {
        const center = shape.calcCenter();
        // console.log(center.y);

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
                "font-style": this.textStyles.fontStyle, 
                "font-weight": this.textStyles.fontWeight,
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
    ".cv-intro-svg svg",
    "CV - Introduction",
    "title",
)

// CV - Introduction Subtitle
const introductionSubtitleShape = new VectorShapes(
    ".cv-intro-svg svg",
    "Who am I?",
    "subtitle"
)

// CV - Experience Title
const experienceTitleShape = new VectorShapes(
    ".cv-exp-svg svg",
    "CV - Motivation",
    "title"
)

// // CV - Eperience Subtitle
const experienceSubtitleShape = new VectorShapes(
    ".cv-exp-svg svg",
    "Why Programming?",
    "subtitle"
)


document.addEventListener("DOMContentLoaded", () => 
{
    introductionTitleShape.render({fontFill: "white"});
    introductionSubtitleShape.render({
        fontSize: 26, 
        shapeStroke: "grey",
        shapeStrokeWidth: "3",
    });

    experienceTitleShape.render({fontFill: "white"});
    experienceSubtitleShape.render({
        fontSize: 26, 
        fill: "transparent"
    });
});
