export class ProjectFuncClass
{
    private projects: NodeListOf<HTMLElement>;
    private selects: NodeListOf<HTMLElement>;

    constructor()
    {
        this.projects = document.querySelectorAll(".project");
        this.selects = document.querySelectorAll(".custom-select");
    }

    public init(): void
    {
        this.selects.forEach(select =>
        {
            const selected = select.querySelector<HTMLElement>(".selected");
            const options = select.querySelector<HTMLElement>(".options");

            if (!selected || !options) return;

            selected.addEventListener("click", () =>
            {
                select.classList.toggle("open");
            });

            options.querySelectorAll<HTMLLIElement>("li").forEach(option =>
            {
                option.addEventListener("click", () =>
                {
                    selected.textContent = option.textContent;
                    selected.dataset.value = option.dataset.value ?? "";
                    select.classList.remove("open");
                    this.applyFilters();
                });
            });
        });

        document.addEventListener("click", e =>
        {
            if (!(e.target instanceof HTMLElement)) return;

            if (!e.target.closest(".custom-select"))
            {
                this.selects.forEach(select => select.classList.remove("open"));
            }
        });
    }

    public applyFilters(): void
    {
        const langEl = document.querySelector<HTMLElement>('[data-filter="language"] .selected');
        const yearEl = document.querySelector<HTMLElement>('[data-filter="year"] .selected');

        const lang: string = langEl?.dataset.value ?? "";
        const year: string = yearEl?.dataset.value ?? "";

        this.projects.forEach(project =>
        {
            const projectLangs = project.dataset.language?.split(" ") ?? [];

            const matchLang = !lang || projectLangs.includes(lang);
            const matchYear = !year || project.dataset.year === year;

            project.style.display = (matchLang && matchYear) ? "flex" : "none";
        });
    }
}
