import { VectorShapes } from "./vectorShape.class.js";
export class SvgFactoryClassEducation {
    constructor() {
        // WELLANT
        this.wellantTitleShape = new VectorShapes(".education-wellant-svg svg", "2008 - 2012", "title");
        this.WellantSubtitleShape = new VectorShapes(".education-wellant-svg svg", "VMBO Gemengde Leerweg", "subtitle");
        // MONDRIAAN
        this.mondriaanTitleShape = new VectorShapes(".education-mondriaan-svg svg", "2014 - 2016", "title");
        this.mondriaanSubtitleShape = new VectorShapes(".education-mondriaan-svg svg", "MBO 2 - Medewerker Schilder", "subtitle");
        // RIJNLAND
        this.rijnlandTitleShape = new VectorShapes(".education-rijnland-svg svg", "2021 - 2025", "title");
        this.rijnlandSubtitleShape = new VectorShapes(".education-rijnland-svg svg", "MBO 4 - Software Developer", "subtitle");
        // IN VERBINDING
        this.inVerbindingTitleShape = new VectorShapes(".education-in-verbinding-svg svg", "Certificaaat", "title");
        this.inVerbindingSubtitleShape = new VectorShapes(".education-in-verbinding-svg svg", "In Verbinding", "subtitle");
        // AI ONDERZOEK
        this.AIOnderzoekTitleShape = new VectorShapes(".education-ai-onderzoek-svg svg", "Excellentie", "title");
        this.AIOnderzoekSubtitleShape = new VectorShapes(".education-ai-onderzoek-svg svg", "AI Onderzoek", "subtitle");
    }
    callAfterDOM() {
        //  - WELLANT
        this.wellantTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0",
        });
        this.WellantSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
        //  - MONDRIAAN
        this.mondriaanTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0",
        });
        this.mondriaanSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
        //  - RIJNLAND
        this.rijnlandTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0",
        });
        this.rijnlandSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
        //  - IN VERBINDING
        this.inVerbindingTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0",
        });
        this.inVerbindingSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
        //  - AI ONDERZOEK
        this.AIOnderzoekTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0",
        });
        this.AIOnderzoekSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
    }
}
export class SvgFactoryClassCV {
    constructor() {
        this.introductionTitleShape = new VectorShapes(".cv-intro-svg svg", "Introduction", "title");
        this.introductionSubtitleShape = new VectorShapes(".cv-intro-svg svg", "Who am I?", "subtitle");
        this.motivationTitleShape = new VectorShapes(".cv-mot-svg svg", "Motivation", "title");
        this.motivationSubtitleShape = new VectorShapes(".cv-mot-svg svg", "Why Programming?", "subtitle");
        this.interestTitleShape = new VectorShapes(".cv-inter-svg svg", "Interests", "title");
        this.interestSubtitleShape = new VectorShapes(".cv-inter-svg svg", "What do I like?", "subtitle");
        this.expertiseTitleShape = new VectorShapes(".cv-exper-svg svg", "Expertise", "title");
        this.expertiseSubtitleShape = new VectorShapes(".cv-exper-svg svg", "What do I know?", "subtitle");
        this.languageTitleShape = new VectorShapes(".cv-lang-svg svg", "Languages", "title");
        this.languageSubtitleShape = new VectorShapes(".cv-lang-svg svg", "Languages I know", "subtitle");
    }
    callAfterDOM() {
        // CV - INTRODUCTION
        this.introductionTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.introductionSubtitleShape.render({
            fontSize: 38,
            shapeStroke: "grey",
            shapeStrokeWidth: "3"
        });
        // CV - MOTIVATION
        this.motivationTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.motivationSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
        // CV - INTEREST
        this.interestTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.interestSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
        // CV - EXPERTISE
        this.expertiseTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.expertiseSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
        // CV - LANGUAGE
        this.languageTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.languageSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
    }
}
export class svgFactoryClassProjects {
    constructor() {
        var _a, _b, _c, _d;
        this.svgSelector = document.querySelector(".project-detail-svg");
        this.title = (_b = (_a = this.svgSelector) === null || _a === void 0 ? void 0 : _a.dataset.title) !== null && _b !== void 0 ? _b : "";
        this.subtitle = (_d = (_c = this.svgSelector) === null || _c === void 0 ? void 0 : _c.dataset.subtitle) !== null && _d !== void 0 ? _d : "";
        this.projectDetailTitleShape = new VectorShapes(".project-detail-svg svg", `${this.subtitle}`, "title");
        this.projectDetailSubtitleShape = new VectorShapes(".project-detail-svg svg", `${this.title}`, "subtitle");
    }
    callAfterDOM() {
        this.projectDetailTitleShape.render({
            fontFill: "white",
            shapeStrokeWidth: "0"
        });
        this.projectDetailSubtitleShape.render({
            fontSize: 38,
            fill: "transparent"
        });
    }
}
