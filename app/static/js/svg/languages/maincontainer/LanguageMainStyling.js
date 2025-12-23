"use strict";
// import { CreateSVG } from "../../components/core/SVGCreate.js";
// import { SVGFactory } from "../../components/core/SVGFactory.js";
// export class LanguageMainStyling {
//   public static createGradient(container: CreateSVG): void {
//     const innerPath = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0 L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650 L975,675 L800,675 L775,650 L225,650 L200,675 L25,675 L0,650 L0,525 L25,500 L25,175 L0,150 L0,25 L25,0";
//     const defs = new SVGFactory(container, "defs").createSvgTag();
//     // Mask voor het path
//     const mask = new SVGFactory(defs, "mask", { id: "glass-mask" }).createSvgTag();
//     new SVGFactory(mask, "path", { d: innerPath, fill: "white" }).createSvgTag();
//     // foreignObject met HTML content IN de SVG
//     const foreignObject = new SVGFactory(container, "foreignObject", {
//       x: 0,
//       y: 0,
//       width: "100%",
//       height: "100%",
//       mask: "url(#glass-mask)"
//     }).createSvgTag();
//     // Voeg het HTML-element toe met blur en background
//     foreignObject!.innerHTML = `
//       <div xmlns="http://www.w3.org/1999/xhtml" class="glass-layer"></div>
//     `;
//   }
// }
