export class CalcCircleProperties
{
    public static calcCircleCircumference(radius: number): number
    {
        const circumference = (radius * 2 * Math.PI);
        return parseFloat(circumference.toFixed(2));
    }

    public static calcStrokeDasharray(dasharrayElement: number, circumference: number): string
    {
        const availableRoom = (circumference - dasharrayElement);
        console.log(`${dasharrayElement} ${availableRoom}`);
        return `${dasharrayElement} ${availableRoom}`;
    }

    public static calcRadiusDifferenceAndWidth(strokeWidth: number, basicRadius: number): number
    {
        return (strokeWidth / 2) + basicRadius;
    }
}