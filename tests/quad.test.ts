import { quadratic as Quad } from '../src/quad';

describe('Running Test for Quadratic module...', () => {
    it('Return the correct answer for a basic quadratic', () => {
        expect(Quad(1, -2, -3)).toEqual([3, -1]);
    });
    it('Should return Error if the coefficient of ax^2 is zero', () => {
        expect(Quad(0, 2, -1)).toEqual('ERROR: Not a quadratic or invalid arguments');
    });
    it('Return "No root" if the quadratic has complex roots', () => {
        expect(Quad(1, 4, 5)).toEqual('No real roots');
    });
})