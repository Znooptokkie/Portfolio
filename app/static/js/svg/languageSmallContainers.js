var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchLanguages() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fetch("api/languages");
            const data = yield result.json();
            console.log(data);
        }
        catch (error) {
            console.log(error);
        }
    });
}
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
    fetchLanguages();
}
