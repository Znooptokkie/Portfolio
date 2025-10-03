import { Dropdown } from "./Dropdown.js"
import { TextResolver } from "./FancyText.js"
import { Starfield } from "./Background.js"
import { CardManager } from "./CardManager.js"
import { TimelineAnimation } from "./Timeline.js"
import { CustomSelect } from "./CustomSelectOptions.js"
import { ProjectsOverlay } from "./ProjectsOverlay.js";

const resolver = new TextResolver(
    document.querySelector("[data-target-resolver]") as HTMLElement,
    ["Goedendag, mijn naam is <span class='green-name'>Atilla Oomen</span>"],
    { timeout: 5, iterations: 10 },
    50000 
);

resolver.start();

const callDropdownClass = new Dropdown()

const cards = new CardManager()

new Starfield("stars", 50)

const projectOverlays = new ProjectsOverlay

document.addEventListener("DOMContentLoaded", () => 
{
    callDropdownClass.checkForButton()

    cards.init()

    CustomSelect.initAll()

    const timelineAnimation = new TimelineAnimation();

    projectOverlays.getAndPushDivProperties()
});