(function(modules) {
    function require(fileName) {
      const fn = modules[fileName];
      const module = { exports : {} };
      fn(require, module, module.exports);
      return module.exports;
    }
    require('./src/main.js');
  })({'./src/main.js': function (require, module, exports) { "use strict";

var _foo = require("src/foo.js");

console.log(_foo)

var _foo2 = _interopRequireDefault(_foo);

var _bar = require("src/bar.js");

var _bar2 = _interopRequireDefault(_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getKeys() {
  return "fooKey: " + _foo2.default.key + ", barKey: " + _bar2.default.key;
}

var keys = getKeys();
console.log(keys); },'src/foo.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  key: 'foo',
  name: 'foo'
}; },'src/bar.js': function (require, module, exports) { "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  key: 'bar',
  name: 'bar'
}; },})
  