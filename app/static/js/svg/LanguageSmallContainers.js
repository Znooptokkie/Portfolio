import { FetchData } from "../services/FetchData.js";
function createSmallSVGContainers() {
    const smallLanguagesContainer = document.querySelector(".languages-small");
    const blockCount = 8;
    for (let i = 0; i < blockCount; i++) {
        const smallHTMLElement = document.createElement("svg");
        smallHTMLElement.setAttribute("class", "devicon-python-plain");
        smallLanguagesContainer === null || smallLanguagesContainer === void 0 ? void 0 : smallLanguagesContainer.appendChild(smallHTMLElement);
    }
}
export function callSmallInstances() {
    createSmallSVGContainers();
    // fetchLanguages();
    const getLanguagesData = new FetchData("api/languages");
    getLanguagesData.fetchJsonData();
}
