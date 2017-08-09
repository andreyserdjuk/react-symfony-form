import update = require('immutability-helper');

export class ImportTest {
    static aaa(msg:string):{} {
        const state1 = ['x'];
        const state2 = update(state1, {$push: ['y']}); // ['x', 'y']
        return state2;
    }
}