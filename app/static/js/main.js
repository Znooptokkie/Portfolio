import { Dropdown } from "./utils/Dropdown.js";
import { TextResolver } from "./utils/FancyText.js";
import { Starfield } from "./utils/Background.js";
import { CardManager } from "./utils/CardManager.js";
import { TimelineAnimation } from "./utils/Timeline.js";
import { CustomSelect } from "./utils/ProjectFilter.js";
import { callAllInstances } from "./svg/profile/profilePicSVG.js";
import { exportClass } from "./svg/languages/languageInit.js";
// import { callSmallInstances } from "./svg/languages/smallcontainer/SmallContainers.js"
import { LanguageSmallBorder } from "./svg/languages/smallcontainer/LanguageSmallHTML.js";
import { educationInit } from "./svg/education/educationInit.js";
import { initProjects } from "./svg/projects/projectsInit.js";
// Start animatie voor introductietekst
const resolver = new TextResolver(document.querySelector("[data-target-resolver]"), ["hey, mijn naam is <span class='green-name'>Atilla Oomen</span>"], { timeout: 5, iterations: 10 }, 50000);
resolver.start();
// Dropdown menu functionaliteit initialiseren
const callDropdownClass = new Dropdown();
// Kaartbeheer voor projecten of items initialiseren
const cards = new CardManager();
// Sterrenachtergrond genereren
new Starfield("stars", 50);
// Wacht tot DOM geladen is voor interacties en SVG-elementen
document.addEventListener("DOMContentLoaded", () => {
    // Controleer en activeer dropdown buttons
    callDropdownClass.checkForButton();
    // Initieer kaartfunctionaliteit
    cards.init();
    // Initialiseer en update project filter selecties
    CustomSelect.initAll();
    CustomSelect.updateDividers();
    // Start animaties voor tijdlijn
    new TimelineAnimation();
    if (window.location.pathname === "/opleidingen") {
        // Bouw en render education SVG-secties
        educationInit();
    }
});
// Initialiseer profiel SVG's
callAllInstances();
// Exporteer taal-specifieke SVG's
exportClass();
// projects()
if (window.location.pathname === "/projecten")
    initProjects();
// Creëer kleine taalcontainers
const smallContainer = new LanguageSmallBorder();
smallContainer.createInnerPath();
