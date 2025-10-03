export class CardManager 
{
    private cardList: NodeListOf<HTMLElement>;

    constructor() 
    {
        this.cardList = document.querySelectorAll<HTMLElement>(".skills-container");
    }

    public init(): void 
    {
        if (this.cardList.length === 0) 
        {
            console.error("No .skills-container elements found in the DOM");
            return;
        }

        const run = () => 
        {
            requestAnimationFrame(() => 
            {
                this.adjustSvgTitlesAndPaths();
                this.setInitialCardPositions();
                this.addClickEvents();
                this.logCardPositions();
            });
        };

        const fonts = (document as any).fonts;
        if (fonts && fonts.ready) 
        {
            fonts.ready.then(run).catch(run);
        } 
        else 
        {
            run();
        }
    }

    private adjustSvgTitlesAndPaths(): void 
    {
        this.cardList.forEach((cardWrapper) => 
        {
            const text = cardWrapper.querySelector(".card-title") as SVGTextElement;
            const shape = cardWrapper.querySelector(".card-shape") as SVGPathElement;
            if (!text || !shape) return;

            const title = text.textContent?.trim() || "";

            // woord te lang = kleiner font
            if (title.length > 20) 
            {
                text.setAttribute("font-size", "16");
            } 
            else if (title.length > 10) 
            {
                text.setAttribute("font-size", "20");
            } 
            else 
            {
                text.setAttribute("font-size", "28");
            }

            const bbox = text.getBBox();
            const padding = 20;
            const cx = 170;
            const left = cx - (bbox.width / 2) - padding;
            const right = cx + (bbox.width / 2) + padding;
            const path = `M10,30 L30,10 H${left} L${left + 20},40 H${right - 20} L${right},10 H310 L330,30 V475 H260 L230,510 H30 L10,490 Z`;
            shape.setAttribute("d", path);
        });
    }

    private setInitialCardPositions(): void 
    {
        this.cardList.forEach((card, index) => 
        {
            card.classList.remove("front", "left", "right");
            if (this.cardList.length === 1) 
            {
                card.classList.add("front");
            } 
            else if (this.cardList.length === 2) 
            {
                card.classList.add(index === 0 ? "front" : "right");
            } 
            else 
            {
                if (index === 0) card.classList.add("front");
                else if (index === 1) card.classList.add("left");
                else card.classList.add("right");
            }
        });
    }

    private logCardPositions(): void 
    {
        this.cardList.forEach((card, index) => 
        {
            const rect = card.getBoundingClientRect();
            // console.log(`Card ${index + 1}: `, rect);
        });
    }

    private addClickEvents(): void 
    {
        const leftArrow = document.querySelector(".left-arrow") as HTMLElement;
        const rightArrow = document.querySelector(".right-arrow") as HTMLElement;

        if (leftArrow)
        {
            leftArrow.addEventListener("click", () => this.switchRelative(-1));
        }

        if (rightArrow)
        {
            rightArrow.addEventListener("click", () => this.switchRelative(1));
        }

        this.cardList.forEach((container) => 
        {
            container.addEventListener("click", (e: Event) => 
            {
                if (window.innerWidth < 1024) return;

                e.preventDefault();
                const target = (e.target as HTMLElement).closest(".skills-container") as HTMLElement;

                if (!target) return;

                const clickedCardId = parseInt(target.dataset.card ?? "0");
                if (isNaN(clickedCardId) || clickedCardId < 1) return;

                if (!target.classList.contains("front")) 
                {
                    this.switchCards(clickedCardId);
                }
            });
        });
    }

    private switchRelative(direction: number): void 
    {
        const frontIndex = Array.from(this.cardList).findIndex(card => 
            card.classList.contains("front")
        );
        if (frontIndex === -1) return;

        let newIndex = frontIndex + direction;
        if (newIndex < 0) newIndex = this.cardList.length - 1;
        if (newIndex >= this.cardList.length) newIndex = 0;

        this.switchCards(newIndex + 1);
    }


    private switchCards(clickedCardId: number): void 
    {
        this.cardList.forEach((card) => 
        {
            card.classList.remove("front", "left", "right");
        });

        const clickedIndex = clickedCardId - 1;
        this.cardList[clickedIndex].classList.add("front");

        const otherCards = Array.from(this.cardList)
          .map((card, index) => ({ card, index }))
          .filter(({ index }) => index !== clickedIndex);

        otherCards.forEach(({ card, index }, i) => 
        {
            if (this.cardList.length === 2) 
            {
                card.classList.add("right");
            } 
            else 
            {
              card.classList.add(i % 2 === 0 ? "left" : "right");
            }
        });
    }
}   