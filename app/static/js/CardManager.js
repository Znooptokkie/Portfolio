export class CardManager {
    constructor() {
        console.log("Script geladen");
    }
    init() {
        this.cardList = document.querySelectorAll(".skills-container");
        console.log("Aantal kaarten gevonden:", this.cardList.length);
        if (this.cardList.length !== 3) {
            console.error("Verkeerd aantal kaarten gevonden:", this.cardList.length);
            return;
        }
        this.logCardPositions();
        this.addClickEvents();
    }
    logCardPositions() {
        this.cardList.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            console.log(`Kaart ${index + 1} (data-card=${card.dataset.card}):`, {
                visible: rect.width > 0 && rect.height > 0,
                position: `x: ${rect.x}, y: ${rect.y}`,
                classes: card.classList.toString()
            });
        });
    }
    addClickEvents() {
        this.cardList.forEach((container) => {
            container.addEventListener("click", (e) => {
                var _a;
                e.preventDefault();
                // Vind de dichtstbijzijnde .skills-container, zelfs als op een kind (zoals .project-banner) wordt geklikt
                const target = e.target.closest(".skills-container");
                if (!target) {
                    console.error("Geen skills-container gevonden in klik-event");
                    return;
                }
                const clickedCardId = parseInt((_a = target.dataset.card) !== null && _a !== void 0 ? _a : "0");
                console.log(`Geklikt op kaart met ID: ${clickedCardId}`);
                if (!target.classList.contains("front")) {
                    console.log("Wisselen van posities...");
                    this.switchCards(clickedCardId);
                }
                else {
                    console.log("Geklikt op voorste kaart, geen actie nodig");
                }
            });
        });
    }
    switchCards(clickedCardId) {
        this.cardList.forEach(card => {
            card.classList.remove("front", "left", "right");
        });
        const clickedIndex = clickedCardId - 1;
        this.cardList[clickedIndex].classList.add("front");
        const otherIndices = [0, 1, 2].filter(i => i !== clickedIndex);
        this.cardList[otherIndices[0]].classList.add("left");
        this.cardList[otherIndices[1]].classList.add("right");
        console.log(`Kaart ${clickedCardId} is nu front`);
    }
}
