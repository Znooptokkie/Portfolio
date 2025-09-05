export class CardManager {
    private cardList!: NodeListOf<HTMLElement>;

    constructor() {
        console.log("Script geladen");
    }

    public init(): void {
        this.cardList = document.querySelectorAll<HTMLElement>(".skills-container");
        console.log("Aantal kaarten gevonden:", this.cardList.length);

        if (this.cardList.length !== 3) {
            console.error("Verkeerd aantal kaarten gevonden:", this.cardList.length);
            return;
        }

        this.logCardPositions();
        this.addClickEvents();
    }

    private logCardPositions(): void {
        this.cardList.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            console.log(`Kaart ${index + 1} (data-card=${card.dataset.card}):`, {
                visible: rect.width > 0 && rect.height > 0,
                position: `x: ${rect.x}, y: ${rect.y}`,
                classes: card.classList.toString()
            });
        });
    }

    private addClickEvents(): void {
        this.cardList.forEach((container) => {
            container.addEventListener("click", (e: Event) => {
                e.preventDefault();
                // Vind de dichtstbijzijnde .skills-container, zelfs als op een kind (zoals .project-banner) wordt geklikt
                const target = (e.target as HTMLElement).closest(".skills-container") as HTMLElement;
                if (!target) {
                    console.error("Geen skills-container gevonden in klik-event");
                    return;
                }
                const clickedCardId = parseInt(target.dataset.card ?? "0");
                console.log(`Geklikt op kaart met ID: ${clickedCardId}`);

                if (!target.classList.contains("front")) {
                    console.log("Wisselen van posities...");
                    this.switchCards(clickedCardId);
                } else {
                    console.log("Geklikt op voorste kaart, geen actie nodig");
                }
            });
        });
    }

    private switchCards(clickedCardId: number): void {
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