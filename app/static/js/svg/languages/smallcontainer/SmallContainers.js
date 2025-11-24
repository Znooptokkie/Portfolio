var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FetchData } from "../../../services/FetchData.js";
export const outerPath = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0 L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650 L975,675 L800,675 L775,650 L225,650 L200,675 L25,675 L0,650 L0,525 L25,500 L25,175 L0,150 L0,25 L25,0";
export class LanguageSmallContainerHTML {
    constructor() {
        this.languageName = [];
    }
    createSmallSVGContainers() {
        return __awaiter(this, void 0, void 0, function* () {
            const smallLanguagesContainer = document.querySelector(".languages-small");
            const APIData = yield this.getAPIData();
            for (const language of APIData) {
                const smallHTMLElement = document.createElement("svg");
                smallHTMLElement.setAttribute("id", `${language.language.toLowerCase()}-svg`);
                smallLanguagesContainer === null || smallLanguagesContainer === void 0 ? void 0 : smallLanguagesContainer.appendChild(smallHTMLElement);
            }
        });
    }
    getAPIData() {
        return __awaiter(this, void 0, void 0, function* () {
            const getLanguagesData = new FetchData("api/languages");
            const call = yield getLanguagesData.fetchJsonData();
            this.languageName = call;
            console.log(this.languageName);
            return call;
        });
    }
}
