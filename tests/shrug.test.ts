import { shrug } from '../src/shrug';

describe('Running emote module tests...', () => {
    it('Should obviously shrug lol', () => {
        expect(shrug).toEqual(`¯\\_(ツ)_/¯`);
        expect(typeof shrug).toBe('string');
    });
});
