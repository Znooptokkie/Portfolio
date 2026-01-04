import { CreateSVG } from "../../components/core/SVGCreate.js";
import { SVGFactory } from "../../components/core/SVGFactory.js";
import { InnerPath } from "../../components/InnerPath.js";
import { DeconstructPath } from "../../components/DeconstructPath.js";
import { Project } from "../Project.js";
export class ProjectsRootElement {
    static createMany(projectsData) {
        const mapData = projectsData.map(data => new Project(data));
        return mapData;
    }
    static createRootElement(projectNameID) {
        if (!projectNameID)
            return null;
        const projectContainer = new CreateSVG(`${projectNameID}`, {
            viewBox: `-50 -50 3670 1160`,
            preserveAspectRatio: "xMidYMid"
        }, true);
        projectContainer.createRootSVG("projects");
        return projectContainer;
    }
    static createDefs(container) {
        if (!container)
            return null;
        return new SVGFactory(container, "defs", {}).createSvgTag();
    }
    // public static createInnerPathFirstHexa()
    // {
    //     const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"
    // }
    static createInnerHexaPath() {
        const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0";
        // const logoPath = InnerPath.buildOffsetPath(HexagonPath, 15)
        const logoPath = InnerPath.buildOffsetPathHexagon(HexagonPath, 25);
        // console.log(logoPath);
        return logoPath;
    }
    static addClipPathToDefs(defs, projectName, path) {
        // FIRST
        const firstPath = ProjectsRootElement.createPaths(1, ProjectsRootElement.createInnerHexaPath());
        const firstClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-1-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(firstClipPath, "path", {
            d: firstPath
        }).createSvgTag();
        // SECOND
        const secondPath = ProjectsRootElement.createPaths(2, path);
        const secondClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-2-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(secondClipPath, "path", {
            d: secondPath
        }).createSvgTag();
        // THIRD
        const thirdPath = ProjectsRootElement.createPaths(3, path);
        const thirdClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-3-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(thirdClipPath, "path", {
            d: thirdPath
        }).createSvgTag();
        // FOURTH
        const fourthPath = ProjectsRootElement.createPaths(4, path);
        const fourthClipPath = new SVGFactory(defs, "clipPath", {
            id: `hex-4-${projectName}`,
            clipPathUnits: "userSpaceOnUse"
        }).createSvgTag();
        new SVGFactory(fourthClipPath, "path", {
            d: fourthPath
        }).createSvgTag();
    }
    static createPaths(positionNumber, path) {
        const hashedPath = DeconstructPath.getPathParts(path);
        const padding = 20;
        if (positionNumber === 1) {
            return path;
        }
        else if (positionNumber === 2) {
            const secondTransformedPath = hashedPath.map(point => (Object.assign(Object.assign({}, point), { x: point.x + 500 + padding, y: point.y })));
            return DeconstructPath.createNewSVGPathString(secondTransformedPath);
        }
        else if (positionNumber === 3) {
            const thirdTransformedPath = hashedPath.map(point => (Object.assign(Object.assign({}, point), { x: point.x + 240 + 20, y: point.y + 433.333 + padding // Waardes kloppen niet!
             })));
            return DeconstructPath.createNewSVGPathString(thirdTransformedPath);
        }
        else {
            // const fourthTransformedPath = hashedPath.map(point => ({
            //     ...point,
            //     x: point.x + 740 + padding, // Waardes kloppen niet!
            //     y: point.y + 433.333 + padding // Waardes kloppen niet!
            // }))
            const HARDCODED_PATH = DeconstructPath.getPathParts("M1030,453.333 L1260,630 L1260,886.666 L1010,1053.333 L780,886.666 L780,620 L1030,453.333"); // Bovenstaande code werkt om een of andere reden niet.
            return DeconstructPath.createNewSVGPathString(HARDCODED_PATH);
        }
    }
    static createLogo(container, logoURL, projectName) {
        // const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"
        // // new SVGFactory(container, "path", {
        // //     d: "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0",
        // //     fill: "rgba(10, 37, 92, 0.5)"
        // // }).createSvgTag()
        // // new SVGFactory(container, "path", {
        // //     d: ProjectsRootElement.createInnerHexaPath(),
        // //     fill: "rgba(10, 37, 92, 1)"
        // // }).createSvgTag()
        // const borderFigures = PathFigures.createFigurePathString(ProjectsRootElement.createInnerHexaPath(), HexagonPath)
        // // const borderFigures = InitPath.createBorderParts(container!, HexagonPath, ProjectsRootElement.createInnerHexaPath(), "hexa")
        // console.log(borderFigures);
        new SVGFactory(container, "image", {
            href: `./static/images/${logoURL}`,
            x: 20,
            y: 0,
            width: 470,
            height: 570,
            "clip-path": `url(#hex-1-${projectName})`,
            preserveAspectRatio: "xMidYMid meet"
        }).createSvgTag();
    }
    static createHexImages(container, imageURL, projectName) {
        let counter = 2;
        let xValue = 520;
        let yValue = 0;
        for (const url of imageURL) {
            switch (counter) {
                case 3:
                    xValue = 270;
                    yValue = 450;
                    break;
                case 4:
                    xValue = 770;
                    yValue = 450;
                default:
                    break;
            }
            new SVGFactory(container, "image", {
                href: `./static/images/${url}`,
                x: xValue,
                y: yValue,
                opacity: 0.5,
                width: 500,
                height: 600,
                "clip-path": `url(#hex-${counter}-${projectName})`,
                preserveAspectRatio: "xMidYMid slice"
            }).createSvgTag();
            counter++;
        }
    }
}
