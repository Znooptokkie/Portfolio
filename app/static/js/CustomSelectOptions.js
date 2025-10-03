export class CustomSelect {
    constructor(select) {
        this.select = select;
        this.selected = select.querySelector(".selected");
        this.options = select.querySelectorAll(".options li");
        this.init();
    }
    init() {
        this.selected.addEventListener("click", () => this.toggleOpen());
        this.options.forEach(option => option.addEventListener("click", () => this.selectOption(option)));
    }
    toggleOpen() {
        this.select.classList.toggle("open");
    }
    selectOption(option) {
        this.selected.textContent = option.textContent;
        this.select.classList.remove("open");
    }
    static initAll() {
        document.querySelectorAll(".custom-select").forEach(select => new CustomSelect(select));
        document.addEventListener("click", (e) => {
            document.querySelectorAll(".custom-select.open").forEach(select => {
                if (!(e.target instanceof Node && select.contains(e.target))) {
                    select.classList.remove("open");
                }
            });
        });
    }
}
