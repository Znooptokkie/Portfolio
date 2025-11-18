export class CalcPathProperties 
{
    public static calcCornersMinusStrokeWidth(path: string, strokeWidth: number): void 
    {
        const halvedStrokeWidth = (strokeWidth / 2);

        for (const char of path) 
        {
            // console.log(char);
            // const a: Array<string> = ["Z", "L", " ";]
            const startPath = "M";
            const startCoordinates = "L";

            // if (a.includes(char)) {
            // console.log(char);
            // continue
            // }
            // console.log(char);
        }
    }

    public static calcSpaceBetweenBorders(firstPath: string, secPath: string): void 
    {
        // firstPath = 
    }

    public static getPathParts(path: string) 
    {
        const pathValues = ["M", "L"];
        const pathParts: Array<{ x: number; y: number }> = [];

        let currentValues = "";

        for (const char of path) 
        {
            if (pathValues.includes(char)) 
            {
                if (currentValues.trim() !== "") 
                {
                    const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
                    pathParts.push({ x: px, y: py });
                }
                currentValues = "";
                continue;
            }

            currentValues += char;
        }

        if (currentValues.trim() !== "") 
        {
            const [px, py] = currentValues.split(",").map(s => Number(s.trim()));
            pathParts.push({ x: px, y: py });
        }

        // console.log(pathParts);
        return pathParts;
    }   
}