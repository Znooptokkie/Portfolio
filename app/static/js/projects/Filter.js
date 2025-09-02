export class ProjectFuncClass {
    constructor() {
        this.projects = document.querySelectorAll(".project");
        this.selects = document.querySelectorAll(".custom-select");
        this.undo = document.querySelector(".undo-icon-filters");
    }
    init() {
        if (this.undo) {
            this.undo.addEventListener("click", () => {
                // console.log("sd");
                sessionStorage.clear();
                window.location.reload();
            });
        }
        this.selects.forEach(select => {
            const selected = select.querySelector(".selected");
            const options = select.querySelector(".options");
            const savedValue = sessionStorage.getItem(`filter-${select.dataset.filter}`);
            if (!selected || !options)
                return;
            if (savedValue) {
                const savedOption = options.querySelector(`[data-value="${savedValue}"]`);
                if (savedOption) {
                    selected.textContent = savedOption.textContent;
                    selected.dataset.value = savedValue;
                }
            }
            select.addEventListener("click", e => {
                if (!e.target.closest("li")) {
                    select.classList.toggle("open");
                }
            });
            options.querySelectorAll("li").forEach(option => {
                option.addEventListener("click", e => {
                    var _a, _b;
                    e.stopPropagation();
                    selected.textContent = option.textContent;
                    selected.dataset.value = (_a = option.dataset.value) !== null && _a !== void 0 ? _a : "";
                    select.classList.remove("open");
                    sessionStorage.setItem(`filter-${select.dataset.filter}`, (_b = option.dataset.value) !== null && _b !== void 0 ? _b : "");
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
        this.sortProjectsByYearDesc();
        this.applyFilters();
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
    sortProjectsByYearDesc() {
        var _a;
        const parent = (_a = this.projects[0]) === null || _a === void 0 ? void 0 : _a.parentElement;
        if (!parent)
            return;
        const projectsArray = Array.from(this.projects);
        projectsArray.sort((a, b) => {
            var _a, _b;
            const yearA = parseInt((_a = a.dataset.year) !== null && _a !== void 0 ? _a : "0");
            const yearB = parseInt((_b = b.dataset.year) !== null && _b !== void 0 ? _b : "0");
            return yearB - yearA;
        });
        projectsArray.forEach(project => parent.appendChild(project));
    }
}
