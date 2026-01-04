export class Project {
    constructor(data) {
        this.project = data.project;
        this.languages = data.languages;
        this.logo = data.logo;
        this.otherImages = data.otherImages;
        this.excerpt = data.excerpt;
        this.link = data.link;
    }
    // Moet niet random zijn maar 3 gekozen afbeeldingen
    // Hiervoor moet het model aangepast worden
    // Zorg dat er een column komt met 3 favorieten afbeeldingen in de DB
    getRandomOtherImage() {
        if (!this.otherImages.length)
            return null;
        const index = Math.floor(Math.random() * this.otherImages.length);
        return this.otherImages[index];
    }
}
