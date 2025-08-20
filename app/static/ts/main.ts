import { SvgFactoryClass } from "./svg/svgFactory.js";
import { Dropdown } from "./controls.js";

const svgFactory = new SvgFactoryClass();
const callDropdownClass = new Dropdown();

document.addEventListener("DOMContentLoaded", () => 
{
    svgFactory.contentForDOMContentLoaded();
    callDropdownClass.checkForButton();
});

window.addEventListener("resize", () =>
{

});
