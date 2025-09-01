import { SvgFactoryClassCV, SvgFactoryClassEducation, svgFactoryClassProjects } from "./svg/svgFactory.class.js";
import { Dropdown } from "./controls.js";
import { ProjectFuncClass } from "./projects/projectFilter.js";
import { ProjectCarousel, SpecsAccordion } from "./projects/projectDetails.js";
document.addEventListener("DOMContentLoaded", () => {
    // new ProjectCarousel(".project-carousel");
});
const svgFactoryCV = new SvgFactoryClassCV();
const svgFactoryEducation = new SvgFactoryClassEducation();
const svgFactoryProjects = new svgFactoryClassProjects();
const callDropdownClass = new Dropdown();
const callProjectClass = new ProjectFuncClass();
document.addEventListener("DOMContentLoaded", () => {
    svgFactoryCV.callAfterDOM();
    svgFactoryEducation.callAfterDOM();
    svgFactoryProjects.callAfterDOM();
    callDropdownClass.checkForButton();
    callProjectClass.init();
    new ProjectCarousel(".project-carousel");
    new SpecsAccordion();
});
// window.addEventListener("resize", () =>
// {
// });
