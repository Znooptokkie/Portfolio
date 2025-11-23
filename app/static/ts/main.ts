import { Dropdown } from "./utils/Dropdown.js"
import { TextResolver } from "./utils/FancyText.js"
import { Starfield } from "./utils/Background.js"
import { CardManager } from "./utils/CardManager.js"
import { TimelineAnimation } from "./utils/Timeline.js"
import { CustomSelect } from "./utils/ProjectFilter.js"

import { callAllInstances } from "./svg/profilePicSVG.js";
import { exportClass } from "./svg/languages/languageInit.js"
// import { callSmallInstances } from "./svg/languages/SmallContainers.js"

const resolver = new TextResolver(
    document.querySelector("[data-target-resolver]") as HTMLElement,
    ["hey, mijn naam is <span class='green-name'>Atilla Oomen</span>"],
    { timeout: 5, iterations: 10 },
    50000 
);

resolver.start();

const callDropdownClass = new Dropdown()

const cards = new CardManager()

new Starfield("stars", 50)

// const projectOverlays = new ProjectsOverlay

document.addEventListener("DOMContentLoaded", () => 
{
    callDropdownClass.checkForButton()

    cards.init()

    CustomSelect.initAll()
    CustomSelect.updateDividers()

    const timelineAnimation = new TimelineAnimation();

    // projectOverlays.getAndPushDivProperties()
});

callAllInstances();
exportClass()
// callSmallInstances();