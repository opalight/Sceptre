export function quadratic(a: number, b: number, c: number): void {
    if (a === 0) {
        return console.log(`ERROR: Not a quadratic or invalid arguments`);
    }

    const D:number = Math.pow(b, 2) - (4 * a * c);
    if (isNaN(D)) return console.log(`No real roots`);

    const x1:number = (-1 * b + Math.sqrt(D)) / 2 * a;
    const x2:number = (-1 * b - Math.sqrt(D)) / 2 * a;

    return console.log(`X1: ${x1}, X2: ${x2}`);
}
export default quadratic
