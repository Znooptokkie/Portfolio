import { VectorShapes } from "./vectorShape.class.js";

export class SvgFactoryClass 
{
    private introductionTitleShape: VectorShapes;
    private introductionSubtitleShape: VectorShapes;
    private motivationTitleShape: VectorShapes;
    private motivationSubtitleShape: VectorShapes;
    private interestTitleShape: VectorShapes;
    private interestSubtitleShape: VectorShapes;
    private expertiseTitleShape: VectorShapes;
    private expertiseSubtitleShape: VectorShapes;
    private languageTitleShape: VectorShapes;
    private languageSubtitleShape: VectorShapes;

    constructor() 
    {
        this.introductionTitleShape = new VectorShapes(
            ".cv-intro-svg svg",
            "CV - Introduction",
            "title"
        );
        this.introductionSubtitleShape = new VectorShapes(
            ".cv-intro-svg svg",
            "Who am I?",
            "subtitle"
        );
        this.motivationTitleShape = new VectorShapes(
            ".cv-mot-svg svg",
            "CV - Motivation",
            "title"
        );
        this.motivationSubtitleShape = new VectorShapes(
            ".cv-mot-svg svg",
            "Why Programming?",
            "subtitle"
        );
        this.interestTitleShape = new VectorShapes(
            ".cv-inter-svg svg",
            "CV - Interests",
            "title"
        );
        this.interestSubtitleShape = new VectorShapes(
            ".cv-inter-svg svg",
            "What do I like?",
            "subtitle"
        );
        this.expertiseTitleShape = new VectorShapes(
            ".cv-exper-svg svg",
            "CV - Expertise",
            "title"
        );
        this.expertiseSubtitleShape = new VectorShapes(
            ".cv-exper-svg svg",
            "Which concepts do I understand?",
            "subtitle"
        );
        this.languageTitleShape = new VectorShapes(
            ".cv-lang-svg svg",
            "CV - Languages",
            "title"
        );
        this.languageSubtitleShape = new VectorShapes(
            ".cv-lang-svg svg",
            "What languages do I master?",
            "subtitle"
        );

    }

    public contentForDOMContentLoaded(): void 
    {
        // CV - INTRODUCTION
        this.introductionTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.introductionSubtitleShape.render({
            fontSize: "26",
            shapeStroke: "grey",
            shapeStrokeWidth: "3"
        });

        // CV - MOTIVATION
        this.motivationTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.motivationSubtitleShape.render({
            fontSize: "26",
            fill: "transparent"
        });

        // CV - INTEREST
        this.interestTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.interestSubtitleShape.render({
            fontSize: "26",
            fill: "transparent"
        });

        // CV - EXPERTISE
        this.expertiseTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.expertiseSubtitleShape.render({
            fontSize: "26",
            fill: "transparent"
        });

        // CV - LANGUAGE
        this.languageTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.languageSubtitleShape.render({
            fontSize: "26",
            fill: "transparent"
        });
    }
}