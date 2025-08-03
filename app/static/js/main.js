import { VectorShapes } from './svg/vectorShape.class.js';
// CV - Introduction Title
const introductionTitleShape = new VectorShapes(".cv-intro-svg svg", "CV - Introduction", "title");
// CV - Introduction Subtitle
const introductionSubtitleShape = new VectorShapes(".cv-intro-svg svg", "Who am I?", "subtitle");
// CV - Motivation Title
const motivationTitleShape = new VectorShapes(".cv-mot-svg svg", "CV - Motivation", "title");
// CV - Motivation Subtitle
const motivationSubtitleShape = new VectorShapes(".cv-mot-svg svg", "Why Programming?", "subtitle");
// CV - Interest Title
const interestTitleShape = new VectorShapes(".cv-inter-svg svg", "CV - Interests", "title");
// CV - Interest Subtitle
const interestSubtitleShape = new VectorShapes(".cv-inter-svg svg", "What do I like?", "subtitle");
// CV - Expertise Title
const expertiseTitleShape = new VectorShapes(".cv-exper-svg svg", "CV - Expertise", "title");
// CV - Expertise Subtitle
const expertiseSubtitleShape = new VectorShapes(".cv-exper-svg svg", "Which concepts do I understand?", "subtitle");
// CV - Language Title
const languageTitleShape = new VectorShapes(".cv-lang-svg svg", "CV - Languages", "title");
// CV - Language Subtitle
const languageSubtitleShape = new VectorShapes(".cv-lang-svg svg", "What languages do I master?", "subtitle");
document.addEventListener("DOMContentLoaded", () => {
    // CV - INTRODUCTION
    introductionTitleShape.render({
        fontFill: "white",
        shapeStrokeWidth: "0"
    });
    introductionSubtitleShape.render({
        fontSize: "26",
        shapeStroke: "grey",
        shapeStrokeWidth: "3",
    });
    // CV - MOTIVATION
    motivationTitleShape.render({
        fontFill: "white",
        shapeStrokeWidth: "0"
    });
    motivationSubtitleShape.render({
        fontSize: "26",
        fill: "transparent"
    });
    // CV - INTEREST
    interestTitleShape.render({
        fontFill: "white",
        shapeStrokeWidth: "0"
    });
    interestSubtitleShape.render({
        fontSize: "26",
        fill: "transparent"
    });
    // CV - EXPERTISE
    expertiseTitleShape.render({
        fontFill: "white",
        shapeStrokeWidth: "0"
    });
    expertiseSubtitleShape.render({
        fontSize: "26",
        fill: "transparent"
    });
    // CV - LANGUAGE
    languageTitleShape.render({
        fontFill: "white",
        shapeStrokeWidth: "0"
    });
    languageSubtitleShape.render({
        fontSize: "26",
        fill: "transparent"
    });
});
