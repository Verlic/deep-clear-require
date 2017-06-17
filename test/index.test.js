const assert = require('chai').assert;

const clear = require('../index');

describe('Clear Require', () => {
  it('should reset value after clearing', () => {
    var a = require('./test');
    var b = require('./test');
    assert.equal(a, b);

    clear(require.resolve('./test'));
    var c = require('./test');
    assert.notEqual(a, c);
    assert.notEqual(b, c);
  });

  it('should reset value from dependent file after clearing', () => {
     var a = require('./test2');
    var b = require('./test2');
    assert.equal(a, b);

    clear(require.resolve('./test2'));
    var c = require('./test2');
    assert.notEqual(a, c);
    assert.notEqual(b, c);
  });
});
