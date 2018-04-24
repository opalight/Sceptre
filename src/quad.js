function quadratic(a, b, c) {
    if (a === 0) {
        return console.log(`ERROR: Not a quadratic or invalid arguments`);
    }

    const D = Math.pow(b, 2) - (4 * a * c);
    if (isNaN(D)) return console.log(`No real roots`);

    const x1 = (-1 * b + Math.sqrt(D)) / 2 * a;
    const x2 = (-1 * b - Math.sqrt(D)) / 2 * a;

    return console.log(`X1: ${x1}, X2: ${x2}`);
}

module.exports = quadratic;
