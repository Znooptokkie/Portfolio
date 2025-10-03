export class CustomSelect
{
    private select: HTMLDivElement;
    private selected: HTMLDivElement;
    private options: NodeListOf<HTMLLIElement>;

    constructor(select: HTMLDivElement)
    {
        this.select = select;
        this.selected = select.querySelector<HTMLDivElement>(".selected")!;
        this.options = select.querySelectorAll<HTMLLIElement>(".options li");

        this.init();
    }

    private init(): void
    {
        this.selected.addEventListener("click", () => this.toggleOpen());
        this.options.forEach(option => option.addEventListener("click", () => this.selectOption(option)));
    }

    private toggleOpen(): void
    {
        this.select.classList.toggle("open");
    }

    private selectOption(option: HTMLLIElement): void
    {
        this.selected.textContent = option.textContent;
        this.select.classList.remove("open");
    }

    public static initAll(): void
    {
        document.querySelectorAll<HTMLDivElement>(".custom-select").forEach(select => new CustomSelect(select));
        document.addEventListener("click", (e: MouseEvent) =>
        {
            document.querySelectorAll<HTMLDivElement>(".custom-select.open").forEach(select =>
            {
                if (!(e.target instanceof Node && select.contains(e.target)))
                {
                    select.classList.remove("open");
                }
            });
        });
    }
}