export class ProjectCarousel
{
    private carousel: HTMLElement | null;
    private mainImage: HTMLImageElement | null = null;
    private thumbs: NodeListOf<HTMLImageElement>;

    constructor(carouselSelector: string)
    {
        this.carousel = document.querySelector<HTMLElement>(carouselSelector);
        if (!this.carousel)
        {
            this.thumbs = document.querySelectorAll<HTMLImageElement>("");
            return;
        }

        this.mainImage = this.carousel.querySelector<HTMLImageElement>(".project-carousel-main img");
        this.thumbs = this.carousel.querySelectorAll<HTMLImageElement>(".project-carousel-thumbnails img");

        this.init();
    }

    private init(): void
    {
        if (this.thumbs.length > 0)
        {
            this.thumbs.forEach((thumb: HTMLImageElement) =>
            {
                thumb.addEventListener("click", () => this.changeImage(thumb));
            });
            this.thumbs[0].classList.add("active");
        }
    }

    private changeImage(thumb: HTMLImageElement): void
    {
        if (this.mainImage)
        {
            this.mainImage.src = thumb.src;
        }
        this.thumbs.forEach((img: HTMLImageElement) => img.classList.remove("active"));
        thumb.classList.add("active");
    }
}


export class SpecsAccordion
{
    private headers: NodeListOf<HTMLButtonElement>;

    constructor(selector: string = ".accordion-header")
    {
        this.headers = document.querySelectorAll<HTMLButtonElement>(selector);
        this.init();
    }

    private init(): void
    {
        this.headers.forEach(header =>
        {
            header.addEventListener("click", () => this.toggle(header));
        });
    }

    private toggle(header: HTMLButtonElement): void
    {
        const content = header.nextElementSibling as HTMLElement | null;
        if (!content) return;

        header.classList.toggle("active");
        content.classList.toggle("open");
    }
}

