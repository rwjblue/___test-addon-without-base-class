import { module, test } from 'qunit';
import require from 'require';

module('chicken', function() {
  test('it can provide functionality', function(assert) {
    assert.ok(require.has('chicken'), 'chicken module is present');
  });

  test('it can be invoked', function(assert) {
    let squawk = require('chicken').squawk;

    assert.equal(squawk(), 'cluck cluck!');
  });
});
