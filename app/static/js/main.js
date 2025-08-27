import { SvgFactoryClassCV, SvgFactoryClassEducation, svgFactoryClassProjects } from "./svg/svgFactory.js";
import { Dropdown } from "./controls.js";
import { ProjectFuncClass } from "./projects/projectFilter.js";
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
});
// window.addEventListener("resize", () =>
// {
// });
