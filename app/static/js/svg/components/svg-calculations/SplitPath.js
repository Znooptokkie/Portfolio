export class SplitPath {
    static getPathParts(path) {
        const pathValues = ["M", "L"];
        const pathParts = [];
        let currentValues = "";
        for (const char of path) {
            if (pathValues.includes(char)) {
                if (currentValues.trim() !== "") {
                    const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
                    pathParts.push({ x: px, y: py });
                }
                currentValues = "";
                continue;
            }
            currentValues += char;
        }
        if (currentValues.trim() !== "") {
            const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
            pathParts.push({ x: px, y: py });
        }
        return pathParts;
    }
}
