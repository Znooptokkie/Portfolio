import { SvgFactoryClassCV, SvgFactoryClassEducation, svgFactoryClassProjects } from "./svg/svgFactory.js";
import { Dropdown } from "./controls.js";

const svgFactoryCV = new SvgFactoryClassCV();
const svgFactoryEducation = new SvgFactoryClassEducation();
const svgFactoryProjects = new svgFactoryClassProjects();

const callDropdownClass = new Dropdown();

document.addEventListener("DOMContentLoaded", () => 
{
    svgFactoryCV.callAfterDOM();
    svgFactoryEducation.callAfterDOM();
    svgFactoryProjects.callAfterDOM();

    callDropdownClass.checkForButton();
});

// window.addEventListener("resize", () =>
// {

// });
