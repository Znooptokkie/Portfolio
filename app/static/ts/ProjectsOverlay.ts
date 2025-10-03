import { DivProperties } from "./interfaces/div.interface";

export class ProjectsOverlay
{
    private gridSpecificDiv: NodeListOf<HTMLElement>;
    private divProperties: DivProperties[] = [];

    constructor()
    {
        this.gridSpecificDiv = document.querySelectorAll<HTMLElement>(".projects-overlay");
    }

    public getAndPushDivProperties(): void
    {
        this.gridSpecificDiv.forEach((divElement) =>
        {               
            const name = divElement.dataset.name;
            
            if (name)
            {
                const rect = divElement.getBoundingClientRect();
                this.divProperties.push({
                    overlayName: name, 
                    startPointX: rect.left, 
                    endPointX: rect.right,
                    startPointY: rect.top, 
                    endPointY: rect.bottom,
                    divElement: divElement 
                });
            }
        });

        this.triggerHoverEffect();
    }

    private triggerHoverEffect(): void
    {
        this.divProperties.forEach((value: DivProperties) =>
        {
            const container = value.divElement.parentElement;
            const overlay = value.divElement;

            if (!container || !overlay) return;

            container.addEventListener("mouseenter", () =>
            {
                overlay.style.display = "block";
                console.log("Overlay getoond voor " + value.overlayName);
                container.style.border = "none";
            });

            container.addEventListener("mouseleave", () =>
            {
                overlay.style.display = "none";
                console.log("Overlay verborgen voor " + value.overlayName);
                // container.style.border = "solid 2px red"
            });
        });
    }

}
