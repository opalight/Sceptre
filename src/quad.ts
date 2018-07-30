export function quadratic(a: number, b: number, c: number): Array<number> | string {
    if (a === 0) {
        return `ERROR: Not a quadratic or invalid arguments`;
    }

    const D: number = Math.pow(b, 2) - (4 * a * c);
    if (isNaN(D) || D < 0) return `No real roots`;

    const x1: number = (-1 * b + Math.sqrt(D)) / 2 * a;
    const x2: number = (-1 * b - Math.sqrt(D)) / 2 * a;

    return [x1, x2];
}
export default quadratic
