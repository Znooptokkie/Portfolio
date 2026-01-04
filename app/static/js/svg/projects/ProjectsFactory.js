export {};
// export class ProjectsFactory
// {
//     public static createMany(projectsData: ProjectData[]): Project[] 
//     {
//         const mapData = projectsData.map(data => new Project(data))
//         return mapData
//     }
//     public static createRootElement(projectNameID: string): CreateSVG | null
//     {
//         if (!projectNameID)
//             return null
//         const projectContainer = new CreateSVG(
//             `${projectNameID}`,
//             {
//                 viewBox: `-50 -50 3670 1160`,
//                 preserveAspectRatio: "xMidYMid"
//             },
//             true
//         )
//         projectContainer.createRootSVG("projects")
//         return projectContainer
//     }
//     public static createDefs(container: CreateSVG | null): SVGElement | null
//     {
//         if (!container)
//             return null
//         return new SVGFactory(container, "defs", {}).createSvgTag()
//     }
//     // public static createInnerPathFirstHexa()
//     // {
//     //     const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"
//     // }
//     public static createInnerHexaPath(): string
//     {
//         const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"
//         // const logoPath = InnerPath.buildOffsetPath(HexagonPath, 15)
//         const logoPath = InnerPath.buildOffsetPathHexagon(HexagonPath, 25)
//         // console.log(logoPath);
//         return logoPath
//     }
//     public static addClipPathToDefs(defs: SVGElement | null, projectName: string, path: string): void
//     {
//         // FIRST
//         const firstPath = ProjectsFactory.createPaths(1, ProjectsFactory.createInnerHexaPath())
//         const firstClipPath = new SVGFactory(defs, "clipPath", {
//             id: `hex-1-${projectName}`,
//             clipPathUnits: "userSpaceOnUse"
//         }).createSvgTag()
//         new SVGFactory(firstClipPath, "path", {
//             d: firstPath
//         }).createSvgTag()
//         // SECOND
//         const secondPath = ProjectsFactory.createPaths(2, path)
//         const secondClipPath = new SVGFactory(defs, "clipPath", {
//             id: `hex-2-${projectName}`,
//             clipPathUnits: "userSpaceOnUse"
//         }).createSvgTag()
//         new SVGFactory(secondClipPath, "path", {
//             d: secondPath
//         }).createSvgTag()
//         // THIRD
//         const thirdPath = ProjectsFactory.createPaths(3, path)
//         const thirdClipPath = new SVGFactory(defs, "clipPath", {
//             id: `hex-3-${projectName}`,
//             clipPathUnits: "userSpaceOnUse"
//         }).createSvgTag()
//         new SVGFactory(thirdClipPath, "path", {
//             d: thirdPath
//         }).createSvgTag()
//         // FOURTH
//         const fourthPath = ProjectsFactory.createPaths(4, path)
//         const fourthClipPath = new SVGFactory(defs, "clipPath", {
//             id: `hex-4-${projectName}`,
//             clipPathUnits: "userSpaceOnUse"
//         }).createSvgTag()
//         new SVGFactory(fourthClipPath, "path", {
//             d: fourthPath
//         }).createSvgTag()
//     }
//     public static createPaths(positionNumber: number, path: string): string
//     {
//         const hashedPath = DeconstructPath.getPathParts(path)
//         const padding = 20
//         if (positionNumber === 1)
//         {
//             return path
//         }
//         else if (positionNumber === 2)
//         {
//             const secondTransformedPath = hashedPath.map(point => ({
//                 ...point,
//                 x: point.x + 500 + padding,
//                 y: point.y
//             }))
//             return DeconstructPath.createNewSVGPathString(secondTransformedPath)
//         }
//         else if (positionNumber === 3)
//         {
//             const thirdTransformedPath = hashedPath.map(point => ({
//                 ...point,
//                 x: point.x + 240 + 20, // Waardes kloppen niet!
//                 y: point.y + 433.333 + padding // Waardes kloppen niet!
//             }))
//             return DeconstructPath.createNewSVGPathString(thirdTransformedPath)
//         }
//         else
//         {
//             // const fourthTransformedPath = hashedPath.map(point => ({
//             //     ...point,
//             //     x: point.x + 740 + padding, // Waardes kloppen niet!
//             //     y: point.y + 433.333 + padding // Waardes kloppen niet!
//             // }))
//             const HARDCODED_PATH = DeconstructPath.getPathParts("M1030,453.333 L1260,630 L1260,886.666 L1010,1053.333 L780,886.666 L780,620 L1030,453.333") // Bovenstaande code werkt om een of andere reden niet.
//             return DeconstructPath.createNewSVGPathString(HARDCODED_PATH)
//         }
//     }
//     public static createLogo(container: CreateSVG | null, logoURL: string, projectName: string)
//     {
//         // const HexagonPath = "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0"
//         // // new SVGFactory(container, "path", {
//         // //     d: "M250,0 L500,166.667 L500,433.333 L250,600 L0,433.333 L0,166.667 L250,0",
//         // //     fill: "rgba(10, 37, 92, 0.5)"
//         // // }).createSvgTag()
//         // // new SVGFactory(container, "path", {
//         // //     d: ProjectsFactory.createInnerHexaPath(),
//         // //     fill: "rgba(10, 37, 92, 1)"
//         // // }).createSvgTag()
//         // const borderFigures = PathFigures.createFigurePathString(ProjectsFactory.createInnerHexaPath(), HexagonPath)
//         // // const borderFigures = InitPath.createBorderParts(container!, HexagonPath, ProjectsFactory.createInnerHexaPath(), "hexa")
//         // console.log(borderFigures);
//         new SVGFactory(container, "image", {
//             href: `./static/images/${logoURL}`,
//             x: 20,
//             y: 0,
//             width: 470,
//             height: 570,
//             "clip-path": `url(#hex-1-${projectName})`,
//             preserveAspectRatio: "xMidYMid meet"
//         }).createSvgTag()
//     }
//     public static createHexImages(container: CreateSVG | null, imageURL: string[], projectName: string)
//     {
//         let counter = 2
//         let xValue = 520
//         let yValue = 0
//         for (const url of imageURL)
//         {
//             switch (counter) 
//             {
//                 case 3:
//                     xValue = 270
//                     yValue = 450
//                     break;
//                 case 4:
//                     xValue = 770
//                     yValue = 450
//                 default:
//                     break;
//             }
//             new SVGFactory(container, "image", {
//                 href: `./static/images/${url}`,
//                 x: xValue,
//                 y: yValue,
//                 opacity: 0.5,
//                 width: 500,
//                 height: 600,
//                 "clip-path": `url(#hex-${counter}-${projectName})`,
//                 preserveAspectRatio: "xMidYMid slice"
//             }).createSvgTag()
//             counter++
//         }
//     }
// }
// export class ProjectsFactoryContent
// {
//     public static drawBorder(
//         container: CreateSVG | null, 
//         path: string, 
//         options?: Record<string, number | string>
//     )
//     {
//         const projectSecondSection = new SVGFactory(container, "path", {
//             d: path,
//             stroke: "rgba(10, 37, 92, 1)",
//             opacity: options?.opacity ?? 1,
//             fill: "none",
//             "stroke-width": 2
//         }).createSvgTag()
//         ProjectsFactoryContent.drawCircles(container)
//         ProjectsFactoryContent.drawInitials(container)
//     }
//     private static drawCircles(container: CreateSVG | null)
//     {
//         const circlesData = [
//             { cx: 1910, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
//             { cx: 1970, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
//             { cx: 2030, stroke: "rgba(10, 37, 92, 1)", fill: "none" },
//             { cx: 2090, stroke: "none", fill: "rgba(10, 37, 92, 1)" },
//             { cx: 2150, stroke: "none", fill: "rgba(10, 37, 92, 1)" }
//         ]
//         circlesData.forEach(data => {
//             new SVGFactory(container, "circle", {
//                 cx: data.cx,
//                 cy: 1025,
//                 r: 17,
//                 stroke: data.stroke,
//                 fill: data.fill,
//                 opacity: 0.5
//             }).createSvgTag()
//         })
//     }
//     private static drawInitials(container: CreateSVG | null)
//     {
//         const textBorder = new SVGFactory(container, "text", {
//             x: 2200,
//             y: 1025,
//             fill: "white",
//             "font-size": "38",
//             "font-family": "Courier Prime",
//             "dominant-baseline": "middle",
//             opacity: 0.25
//         }).createSvgTag()
//         textBorder!.textContent = "PY.2025.003A"
//     }
//     public static drawArrows(container: CreateSVG | null, count = 0) // Wordt veranderd
//     {
//         if (!container) 
//             return null
//         const arrowWidth = 15
//         const arrowHeight = 10
//         const spacing = 2
//         const startX = 2500
//         const startY = 1025
//         for (let i = 0; i < count; i++)
//         {   
//             const x = startX + i * (arrowWidth + spacing)
//             const points = `0,0 ${arrowWidth},${arrowHeight/2} 0,${arrowHeight}`;
//             const polygon = new SVGFactory(container, "polygon", {
//                 points: points,
//                 fill: "rgba(10, 37, 92, 1)",
//                 transform: `translate(${x},${startY})`
//             }).createSvgTag()
//         }
//     }
// }
// export class ProjectsFactoryButton
// {
//     public static createWrapper(projectName: string)
//     {
//         const wrapper = document.createElement("div")
//         wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
//         wrapper.style.cssText = `
//             width:100%;
//             height:100%;
//             display:flex;
//             flex-direction:column;
//             align-items:center;
//             justify-content:center;
//             gap:10px;
//         `
//         const link = document.createElement("a")
//         link.textContent = "GO >>"
//         link.style.textDecoration = "none"
//         link.style.fontSize = "64px"
//         // const newProjectName = projectName.replace(" ", "-").toLowerCase()
//         link.href = `http://127.0.0.1:5000/projecten/${projectName.toLowerCase()}`
//         wrapper.append(link)
//         return wrapper
//     }
//     public static linkInstance(container: CreateSVG | null, projectName: string)
//     {
//         // L3535,35 L3535,890 L3045,890 L2945,1025
//         const foreign = new SVGFactory(container, "foreignObject", {
//             x: 3000,
//             y: 950,
//             width: 500,
//             height: 135
//         }).createSvgTag()
//         ProjectsFactoryButton.createButtonPath(container)
//         // const wrapper = this.createXHTMLWrapper(language)
//         const wrapper = ProjectsFactoryButton.createWrapper(projectName)
//         foreign?.appendChild(wrapper)
//     }
//     public static createButtonPath(container: CreateSVG | null)
//     {
//         const path = "M3140,925 L3570,925 L3570,1060 L3050,1060 Z,"
//         new SVGFactory(container, "path", {
//             d: path,
//             stroke: "rgba(10, 37, 92, 1)",
//             "stroke-width": 2,
//             fill: "none"
//         }).createSvgTag()
//     }
// }
// export class ProjectsFactoryHTMLContent
// {
//     public static createWrapper(projectTitle: string, projectText: string)
//     {
//         const wrapper = document.createElement("div")
//         wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
//         wrapper.style.cssText = `
//             width:100%;
//             height:100%;
//             display:flex;
//             flex-direction:column;
//             align-items:center;
//             justify-content:center;
//             gap:10px;
//         `
//         const title = document.createElement("h2")
//         title.style.fontSize = "100px"
//         title.style.fontStyle = "italic"
//         title.style.fontFamily = "Goldman", "sans-serif"
//         title.style.color = "rgb(51, 81, 142)"
//         // title.textContent = "JAAAAAAAAA!!!!!"
//         title.textContent = projectTitle
//         const content = document.createElement("p")
//         content.style.fontSize = "54px"
//         content.style.lineHeight = "2.5"
//         // content.textContent = "Battlebot was een project dat ik samen met een klasgenoot op school heb uitgevoerd. We hebben een technische robot geüpgraded zodat deze kan worden aangestuurd via een Raspberry Pi 5 en een tweede Pico-microcontroller."
//         content.style.color = "rgb(51, 81, 142)"
//         content.style.textAlign = "center"
//         content.textContent = projectText
//         wrapper.append(title)
//         wrapper.append(content)
//         return wrapper
//     } 
//     public static createLanguagePaths(container: CreateSVG | null, path?: string): SVGPathElement | null
//     {
//         if (!container) 
//             return null;
//         // if (!path)
//         // {
//         //     path = "M1450,-20 L1560,-20 L1560,90 L1505,125 L1450,90 L1450,-20" 
//         // }
//         // const offsetX = 175
//         const pathElement = new SVGFactory(container, "path", {
//             d: path!,
//             stroke: "rgb(0, 12, 35)",
//             fill: "rgba(10, 20, 35, 0.15)",
//             // transform: `translate(${offsetX},0)`
//         }).createSvgTag() as SVGPathElement
//         return pathElement
//     }
//     public static initContent(container: CreateSVG | null, pathElement: SVGPathElement | null, projectTitle: string, projectText: string)
//     {
//         if (!container|| !pathElement) 
//             return null
//         const bbox = pathElement.getBBox()
//         const offsetX = bbox.x + bbox.width / 2;
//         const offsetY = bbox.y + bbox.height / 2;
//         const foreign = new SVGFactory(container, "foreignObject", {
//             x: 1750,
//             y: 100,
//             width: 1500,
//             height: 775
//         }).createSvgTag()
//         // const wrapper = this.createXHTMLWrapper(language)
//         const wrapper = ProjectsFactoryHTMLContent.createWrapper(projectTitle, projectText)
//         foreign?.appendChild(wrapper)
//     }
// }
// export class ProjectsLanguagesSVG
// {
//     public static createLanguagePaths(container: CreateSVG | null, index: number, path?: string): SVGPathElement | null
//     {
//         if (!container) 
//             return null;
//         if (!path)
//         {
//             path = "M1450,-20 L1560,-20 L1560,90 L1505,125 L1450,90 L1450,-20" 
//         }
//         const offsetX = index * 175
//         const pathElement = new SVGFactory(container, "path", {
//             d: path,
//             stroke: "rgb(0, 12, 35)",
//             fill: "rgb(10, 20, 35)",
//             transform: `translate(${offsetX},0)`
//         }).createSvgTag() as SVGPathElement
//         return pathElement
//     }
//     public static getDevIcons(container: CreateSVG | null, language: string, pathElement: SVGPathElement | null, index: number)
//     {
//         if (!container|| !pathElement) 
//             return null
//         const bbox = pathElement.getBBox()
//         const offsetX = bbox.x + bbox.width / 2 - 100 + index * 175;
//         const offsetY = bbox.y + bbox.height / 2 - 100;
//         const foreign = new SVGFactory(container, "foreignObject", {
//             x: offsetX,
//             y: offsetY,
//             width: 200,
//             height: 200
//         }).createSvgTag()
//         const wrapper = this.createXHTMLWrapper(language)
//         foreign?.appendChild(wrapper)
//     }
//     private static createXHTMLWrapper(language: string): HTMLElement
//     {
//         const wrapper = document.createElement("div")
//         wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
//         wrapper.style.cssText = `
//             width:100%;
//             height:100%;
//             display:flex;
//             flex-direction:column;
//             align-items:center;
//             justify-content:center;
//             gap:10px;
//         `
//         const icon = document.createElement("div")
//         const deviconMap: Record<string,string> = {
//             "react native": "react",
//             "c++": "cplusplus",
//             "c#": "csharp",
//             "f#": "fsharp",
//             "node.js": "nodejs",
//              "electron": "electron" 
//         }
//         let iconLanguage = deviconMap[language.toLowerCase()] ?? language.toLowerCase()
//         if (iconLanguage === "react native") iconLanguage = "react"
//         if (iconLanguage === "c++") iconLanguage = "cplusplus"
//         if (iconLanguage === "electron")
//         {
//             icon.className = `devicon-${iconLanguage}-original`
//         }
//         else
//         {
//             icon.className = `devicon-${iconLanguage}-plain`
//         }
//         icon.style.cssText = "font-size:60px; color:rgba(51,81,142,1);"
//         wrapper.append(icon)
//         return wrapper
//     }
// }
