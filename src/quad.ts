/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

'use strict';
/**
 * Calculate the roots of a quadratic equation using the quadratic formula
 * 
 * @module Quadratic - Perform quadratic manipulations
 * @param {number} a Non zero coefficient of x^2 term
 * @param {number} b Coefficient of x term
 * @param {number} c Constant term of quadratic
 * @returns {Array<number> | string} The roots of the quadratic equation or an error message if roots are imaginary
 */
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
