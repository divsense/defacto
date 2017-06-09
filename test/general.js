import test from 'ava';
import * as defacto from '../lib/defacto';

test('does defacto.parse exist', t => {
    t.is('function', typeof defacto.parse);
});

