export class ProjectFuncClass
{
    private projects: NodeListOf<HTMLElement>;
    private selects: NodeListOf<HTMLElement>;
    private undo: HTMLDivElement

    constructor()
    {
        this.projects = document.querySelectorAll(".project")
        this.selects = document.querySelectorAll(".custom-select")
        this.undo = document.querySelector(".undo-icon-filters")! as HTMLDivElement
    }

    public init(): void
    {
        if (this.undo)
        {
            this.undo.addEventListener("click", () => 
            {
                // console.log("sd");
                sessionStorage.clear()
                window.location.reload()
            }) 
        }

        this.selects.forEach(select =>
        {
            const selected = select.querySelector<HTMLElement>(".selected");
            const options = select.querySelector<HTMLElement>(".options");

            const savedValue = sessionStorage.getItem(`filter-${select.dataset.filter}`);

            if (!selected || !options) return;

            if (savedValue)
            {
                const savedOption = options.querySelector<HTMLLIElement>(`[data-value="${savedValue}"]`);

                if (savedOption)
                {
                    selected.textContent = savedOption.textContent;
                    selected.dataset.value = savedValue;
                }
            }

            select.addEventListener("click", e =>
            {
                if (!(e.target as HTMLElement).closest("li"))
                {
                    select.classList.toggle("open");
                }
            });

            options.querySelectorAll<HTMLLIElement>("li").forEach(option =>
            {
                option.addEventListener("click", e =>
                {
                    e.stopPropagation();
                    selected.textContent = option.textContent;
                    selected.dataset.value = option.dataset.value ?? "";
                    select.classList.remove("open");

                    sessionStorage.setItem(`filter-${select.dataset.filter}`, option.dataset.value ?? "");

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

        this.sortProjectsByYearDesc();
        this.applyFilters();

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

    private sortProjectsByYearDesc(): void
    {
        const parent = this.projects[0]?.parentElement;
        if (!parent) return;

        const projectsArray = Array.from(this.projects);
        projectsArray.sort((a, b) =>
        {
            const yearA = parseInt(a.dataset.year ?? "0");
            const yearB = parseInt(b.dataset.year ?? "0");
            return yearB - yearA;
        });

        projectsArray.forEach(project => parent.appendChild(project));
    }

}
