import { Dropdown } from "./Dropdown.js";
import { TextResolver } from "./FancyText.js";
import { Starfield } from "./Background.js";
import { CardManager } from "./CardManager.js";
import { TimelineAnimation } from "./Timeline.js";
const resolver = new TextResolver(document.querySelector("[data-target-resolver]"), ["Goedendag, mijn naam is <span class='green-name'>Atilla Oomen</span>"], { timeout: 5, iterations: 10 }, 50000);
resolver.start();
const callDropdownClass = new Dropdown();
const cards = new CardManager();
new Starfield("stars", 50);
document.addEventListener("DOMContentLoaded", () => {
    callDropdownClass.checkForButton();
    cards.init();
    const timelineAnimation = new TimelineAnimation();
});
