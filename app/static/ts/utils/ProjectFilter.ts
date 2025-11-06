export class CustomSelect
{
    private select: HTMLDivElement
    private selected: HTMLDivElement
    private options: NodeListOf<HTMLLIElement>
    private defaultText: string

    constructor(select: HTMLDivElement)
    {
        this.select = select
        this.selected = select.querySelector<HTMLDivElement>(".selected")!
        this.options = select.querySelectorAll<HTMLLIElement>(".options li")
        this.defaultText = this.selected.textContent?.trim() || ""
        this.init()
    }

    private static activeFilters: Record<string, string> = {}

    private static applyFilters(filterType: string, filterValue: string): void
    {
        if (filterValue) CustomSelect.activeFilters[filterType] = filterValue
        else delete CustomSelect.activeFilters[filterType]

        const projects = document.querySelectorAll<HTMLDivElement>(".progress-child-container")

        projects.forEach(project => 
        {
            const tags = (project.dataset.tags || "").split(",").map(t => t.trim().toLowerCase())
            const visible = Object.entries(CustomSelect.activeFilters).every(([type, value]) => 
            {
                if (type === "language" || type === "framework") 
                {
                    return tags.includes(value.toLowerCase())
                }
                return project.dataset[type] === value
            })
            project.style.display = visible ? "" : "none"
        })
        CustomSelect.updateDividers()
    }

    public static updateDividers(): void 
    {
        document.querySelectorAll(".project-divider").forEach(el => el.remove())

        const visibleProjects = Array.from(
            document.querySelectorAll<HTMLDivElement>(".progress-child-container")
        ).filter(p => p.style.display !== "none")

        for (let i = 0; i < visibleProjects.length - 1; i++) 
        {
            const hr = document.createElement("hr")
            hr.className = "project-divider"
            visibleProjects[i].insertAdjacentElement("afterend", hr)
        }
    }
    private init(): void
    {
        const isMobile = window.innerWidth <= 768
    
        if (!isMobile) 
        {
            this.select.addEventListener("click", (e) => 
            {
                e.stopPropagation()
                this.toggleOpen()
            })
        }
    
        this.options.forEach(option => option.addEventListener("click", (e) => 
        {
            e.stopPropagation()
            this.selectOption(option)
        }))
    }

    private selectOption(option: HTMLLIElement): void
    {
        const filterType = this.select.dataset.filter!
        const filterValue = option.dataset.value || ""

        this.options.forEach(o => o.classList.remove("active"))

        option.classList.add("active")

        if (window.innerWidth > 768)
        {
            this.selected.textContent = option.textContent
            this.select.classList.remove("open")
        }

        CustomSelect.applyFilters(filterType, filterValue)
    }

    private toggleOpen(): void
    {
        this.select.classList.toggle("open")
    }

    public reset(): void
    {
        this.selected.textContent = this.defaultText
        this.options.forEach(o => o.classList.remove("active"))
    }

    public static initAll(): void
    {
        const selects = Array.from(document.querySelectorAll<HTMLDivElement>(".custom-select"))
            .map(select => new CustomSelect(select))

        const mobileFilterHeader = document.querySelector<HTMLDivElement>(".mobile-filter-header")
        const mobileFilter = document.querySelector<HTMLDivElement>(".mobile-filter")

        if (mobileFilterHeader && mobileFilter) 
        {
            mobileFilterHeader.addEventListener("click", () => 
            {
                mobileFilter.classList.toggle("open")
            })
        }


        document.addEventListener("click", (e: MouseEvent) =>
        {
            document.querySelectorAll<HTMLDivElement>(".custom-select.open").forEach(select =>
            {
                if (!(e.target instanceof Node && select.contains(e.target)))
                {
                    select.classList.remove("open")
                }
            })
        })

        // resetknop
        const resetButton = document.querySelector<HTMLButtonElement>(".reset-filters")
        const searchInput = document.querySelector<HTMLInputElement>(".filter-search")

        if (resetButton) 
        {
            resetButton.addEventListener("click", () => 
            {

                CustomSelect.activeFilters = {}
            
                if (searchInput) searchInput.value = ""
            
                const projects = document.querySelectorAll<HTMLDivElement>(".progress-child-container")
                projects.forEach(project => project.style.display = "")
                
                CustomSelect.updateDividers()
                selects.forEach(s => s.reset())
            })
        }


        // tekstzoekveld
        if (searchInput) 
        {
            searchInput.addEventListener("input", () => 
            {
                const query = searchInput.value.trim().toLowerCase()
            
                const projects = document.querySelectorAll<HTMLDivElement>(".progress-child-container")
                projects.forEach(project => 
                {
                    const title = project.querySelector("h3")?.textContent?.toLowerCase() || ""
                    const excerpt = project.querySelector("p")?.textContent?.toLowerCase() || ""
                
                    const passesFilters = Object.entries(CustomSelect.activeFilters).every(([type, value]) => 
                    {
                        const tags = (project.dataset.tags || "").split(",").map(t => t.trim().toLowerCase())
                        if (type === "language" || type === "framework") 
                        {
                            return tags.includes(value.toLowerCase())
                        }
                        return project.dataset[type] === value
                    })
                
                    const matchesText = title.includes(query) || excerpt.includes(query)
                
                    project.style.display = passesFilters && matchesText ? "" : "none"
                })
                CustomSelect.updateDividers()
            })
        }
    }
}