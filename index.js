const JSObject = require('./src/JSObject');
const additionalMethods = require('./src/additionalMethods');

Object.keys(additionalMethods).forEach(method => {
    JSObject[method] = additionalMethods[method];
})

module.exports = JSObject;