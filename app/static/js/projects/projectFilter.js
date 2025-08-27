export class ProjectFuncClass {
    constructor() {
        this.projects = document.querySelectorAll(".project");
        this.selects = document.querySelectorAll(".custom-select");
    }
    init() {
        this.selects.forEach(select => {
            const selected = select.querySelector(".selected");
            const options = select.querySelector(".options");
            if (!selected || !options)
                return;
            selected.addEventListener("click", () => {
                select.classList.toggle("open");
            });
            options.querySelectorAll("li").forEach(option => {
                option.addEventListener("click", () => {
                    var _a;
                    selected.textContent = option.textContent;
                    selected.dataset.value = (_a = option.dataset.value) !== null && _a !== void 0 ? _a : "";
                    select.classList.remove("open");
                    this.applyFilters();
                });
            });
        });
        document.addEventListener("click", e => {
            if (!(e.target instanceof HTMLElement))
                return;
            if (!e.target.closest(".custom-select")) {
                this.selects.forEach(select => select.classList.remove("open"));
            }
        });
    }
    applyFilters() {
        var _a, _b;
        const langEl = document.querySelector('[data-filter="language"] .selected');
        const yearEl = document.querySelector('[data-filter="year"] .selected');
        const lang = (_a = langEl === null || langEl === void 0 ? void 0 : langEl.dataset.value) !== null && _a !== void 0 ? _a : "";
        const year = (_b = yearEl === null || yearEl === void 0 ? void 0 : yearEl.dataset.value) !== null && _b !== void 0 ? _b : "";
        this.projects.forEach(project => {
            var _a, _b;
            const projectLangs = (_b = (_a = project.dataset.language) === null || _a === void 0 ? void 0 : _a.split(" ")) !== null && _b !== void 0 ? _b : [];
            const matchLang = !lang || projectLangs.includes(lang);
            const matchYear = !year || project.dataset.year === year;
            project.style.display = (matchLang && matchYear) ? "flex" : "none";
        });
    }
}
