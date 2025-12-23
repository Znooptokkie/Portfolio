var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FetchData } from "../../services/FetchData.js";
export class FetchProjects {
    constructor() {
        this.projects = [];
    }
    getAPIData() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetcher = new FetchData("api/projects-values");
            const result = yield fetcher.fetchJsonData();
            this.projects = result.map(proj => {
                var _a;
                return ({
                    project: proj.title,
                    logo: proj.logo,
                    otherImages: (_a = proj.other_images) !== null && _a !== void 0 ? _a : []
                });
            });
            console.log(this.projects);
            return this.projects;
        });
    }
    static createMany(projectsData) {
        const mapData = projectsData.map(data => new Project(data));
        console.log(mapData);
        return mapData;
    }
    getProjects() {
        return this.projects;
    }
}
export class Project {
    constructor(data) {
        this.project = data.project;
        this.logo = data.logo;
        this.otherImages = data.otherImages;
    }
    getRandomOtherImage() {
        if (!this.otherImages.length)
            return null;
        const index = Math.floor(Math.random() * this.otherImages.length);
        return this.otherImages[index];
    }
}
