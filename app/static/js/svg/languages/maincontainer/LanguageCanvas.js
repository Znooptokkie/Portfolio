const backgroundEl = document.getElementById('stars');
export function lanCanvas(innerPathD, bgCanvas, width, height) {
    const canvas = document.getElementById("lan-main-canvas");
    if (!canvas)
        return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    ctx.clearRect(0, 0, width, height);
    const path = new Path2D(innerPathD);
    ctx.save();
    ctx.clip(path);
    ctx.filter = 'blur(14px)';
    // teken het echte achtergrond-canvas
    ctx.drawImage(bgCanvas, 0, 0, width, height);
    ctx.restore();
}
const innerPath = "M25,0 L200,0 L250,50 L750,50 L800,0 L975,0 L1000,25 L1000,150 L975,175 L975,500 L1000,525 L1000,650 L975,675 L800,675 L775,650 L225,650 L200,675 L25,675 L0,650 L0,525 L25,500 L25,175 L0,150 L0,25 L25,0";
// const backgroundEl = document.querySelector('#stars') as HTMLCanvasElement; // je bewegende achtergrond
export function call() {
    lanCanvas(innerPath, backgroundEl, 1006, 682);
    // Animatie loop
    // Animatie loop
    animate();
    {
        lanCanvas(innerPath, backgroundEl, 1006, 682);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
}
