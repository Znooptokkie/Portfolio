import { SvgFactoryClassCV, SvgFactoryClassEducation, svgFactoryClassProjects } from "./svg/SvgFactory.js"
import { Dropdown } from "./Dropdown.js"
import { ProjectFuncClass } from "./projects/Filter.js"
// import { ProjectCarousel, SpecsAccordion } from "./projects/Carousel.js"
import { TextResolver } from "./FancyText.js"
import { Starfield } from "./Background.js"
import { CardManager } from "./CardManager.js"
// import { TimelineAnimator } from "./Timeline.js"

const resolver = new TextResolver(
    document.querySelector("[data-target-resolver]") as HTMLElement,
    ["Greetings, my name is <span class='green-name'>Atilla Oomen</span>"],
    { timeout: 5, iterations: 10 },
    50000 
);

resolver.start();

const svgFactoryCV = new SvgFactoryClassCV()
const svgFactoryEducation = new SvgFactoryClassEducation()
const svgFactoryProjects = new svgFactoryClassProjects()

const callDropdownClass = new Dropdown()

const callProjectClass = new ProjectFuncClass()

// const timeline = new TimelineAnimator()
new Starfield("stars", 50)
const cards = new CardManager()

document.addEventListener("DOMContentLoaded", () => 
{
    svgFactoryCV.callAfterDOM()
    svgFactoryEducation.callAfterDOM()
    svgFactoryProjects.callAfterDOM()

    callDropdownClass.checkForButton()
    callProjectClass.init()

    cards.init()
    // timeline.init()
    // new ProjectCarousel(".project-carousel")
    // new SpecsAccordion()
    // Initialiseren

});