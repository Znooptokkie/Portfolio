export class ProjectCarousel {
    constructor(carouselSelector) {
        this.mainImage = null;
        this.carousel = document.querySelector(carouselSelector);
        if (!this.carousel) {
            this.thumbs = document.querySelectorAll("");
            return;
        }
        this.mainImage = this.carousel.querySelector(".project-carousel-main img");
        this.thumbs = this.carousel.querySelectorAll(".project-carousel-thumbnails img");
        this.init();
    }
    init() {
        if (this.thumbs.length > 0) {
            this.thumbs.forEach((thumb) => {
                thumb.addEventListener("click", () => this.changeImage(thumb));
            });
            this.thumbs[0].classList.add("active");
        }
    }
    changeImage(thumb) {
        if (this.mainImage) {
            this.mainImage.src = thumb.src;
        }
        this.thumbs.forEach((img) => img.classList.remove("active"));
        thumb.classList.add("active");
    }
}
export class SpecsAccordion {
    constructor(selector = ".accordion-header") {
        this.headers = document.querySelectorAll(selector);
        this.init();
    }
    init() {
        this.headers.forEach(header => {
            header.addEventListener("click", () => this.toggle(header));
        });
    }
    toggle(header) {
        const content = header.nextElementSibling;
        if (!content)
            return;
        header.classList.toggle("active");
        content.classList.toggle("open");
    }
}
