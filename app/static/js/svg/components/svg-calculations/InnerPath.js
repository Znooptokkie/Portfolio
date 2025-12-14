export class InnerPath {
    static buildInnerPath(sides, offset) {
        const minYTop = Math.min(...sides.top.map(p => p.y));
        const maxXRight = Math.max(...sides.right.map(p => p.x));
        const maxYBottom = Math.max(...sides.bottom.map(p => p.y));
        const minXLeft = Math.min(...sides.left.map(p => p.x));
        const innerTop = [];
        const innerRight = [];
        const innerBottom = [];
        const innerLeft = [];
        // Gehele code moet efficienter/dynamischer, maar voor nu werkt het
        if (sides.top) {
            // Als er maar 1 item in de Array staat
            if (sides.top.length <= 1) {
                const newPoints = {
                    x: sides.top[0].x - offset * 2,
                    y: sides.top[0].y + offset
                };
                innerTop.push(newPoints);
            }
            for (let i = 0; i < sides.top.length - 1; i++) {
                if (sides.top[i].y === sides.top[i + 1].y) {
                    if (sides.top[i].y === minYTop &&
                        sides.top[i + 1].y === minYTop) {
                        const newFirstPoints = {
                            x: sides.top[i].x + offset,
                            y: sides.top[i].y + offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.top[i + 1].x - offset,
                            y: sides.top[i + 1].y + offset * 2
                        };
                        innerTop.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.top[i].x - offset,
                            y: sides.top[i].y + offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.top[i + 1].x + offset,
                            y: sides.top[i + 1].y + offset * 2
                        };
                        innerTop.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
        }
        if (sides.right) {
            if (sides.right.length <= 1) {
                const newPoints = {
                    x: sides.right[0].x - offset * 2,
                    y: sides.right[0].y - offset
                };
                innerRight.push(newPoints);
            }
            for (let i = 0; i < sides.right.length - 1; i++) {
                if (sides.right[i].x === sides.right[i + 1].x) {
                    if (sides.right[i].x === maxXRight &&
                        sides.right[i + 1].x === maxXRight) {
                        const newFirstPoints = {
                            x: sides.right[i].x - offset * 2,
                            y: sides.right[i].y + offset
                        };
                        const newSecondPoints = {
                            x: sides.right[i + 1].x - offset * 2,
                            y: sides.right[i + 1].y - offset
                        };
                        innerRight.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.right[i].x - offset * 2,
                            y: sides.right[i].y - offset
                        };
                        const newSecondPoints = {
                            x: sides.right[i + 1].x - offset * 2,
                            y: sides.right[i + 1].y + offset
                        };
                        innerRight.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
        }
        if (sides.bottom) {
            if (sides.bottom.length <= 1) {
                const newPoints = {
                    x: sides.bottom[0].x + offset,
                    y: sides.bottom[0].y - offset * 2
                };
                innerBottom.push(newPoints);
            }
            for (let i = 0; i < sides.bottom.length - 1; i++) {
                if (sides.bottom[i].y === sides.bottom[i + 1].y) {
                    if (sides.bottom[i].y === maxYBottom &&
                        sides.bottom[i + 1].y === maxYBottom) {
                        const newFirstPoints = {
                            x: sides.bottom[i].x - offset,
                            y: sides.bottom[i].y - offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.bottom[i + 1].x + offset,
                            y: sides.bottom[i + 1].y - offset * 2
                        };
                        innerBottom.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.bottom[i].x + offset,
                            y: sides.bottom[i].y - offset * 2
                        };
                        const newSecondPoints = {
                            x: sides.bottom[i + 1].x - offset,
                            y: sides.bottom[i + 1].y - offset * 2
                        };
                        innerBottom.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
        }
        if (sides.left) {
            if (sides.left.length <= 1) {
                const newPoints = {
                    x: sides.left[0].x + offset * 2,
                    y: sides.left[0].y - offset
                };
                innerLeft.push(newPoints);
            }
            for (let i = 0; i < sides.left.length - 1; i++) {
                if (sides.left[i].x === sides.left[i + 1].x) {
                    if (sides.left[i].x === minXLeft &&
                        sides.left[i + 1].x === minXLeft) {
                        const newFirstPoints = {
                            x: sides.left[i].x + offset * 2,
                            y: sides.left[i].y - offset
                        };
                        const newSecondPoints = {
                            x: sides.left[i + 1].x + offset * 2,
                            y: sides.left[i + 1].y + offset
                        };
                        innerLeft.push(newFirstPoints, newSecondPoints);
                    }
                    else {
                        const newFirstPoints = {
                            x: sides.left[i].x + offset * 2,
                            y: sides.left[i].y + offset
                        };
                        const newSecondPoints = {
                            x: sides.left[i + 1].x + offset * 2,
                            y: sides.left[i + 1].y - offset
                        };
                        innerLeft.push(newFirstPoints, newSecondPoints);
                    }
                }
            }
            innerLeft.push(innerTop[0]);
        }
        return { innerTop, innerRight, innerBottom, innerLeft };
    }
    static mergePathArray(sides) {
        const newPath = [
            ...sides.innerTop,
            ...sides.innerRight,
            ...sides.innerBottom,
            ...sides.innerLeft
        ];
        return newPath;
    }
}
