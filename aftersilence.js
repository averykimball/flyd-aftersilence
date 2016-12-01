var flyd = require('flyd');

module.exports = function(duration, sourceStream) {
  var scheduled;
  var buffer = [];
  var bufferStream = flyd.stream();
  flyd.on(function(sourceValue) {
    buffer.push(sourceValue);
    clearTimeout(scheduled);
    scheduled = setTimeout(function() {
      bufferStream(buffer);
      buffer = [];
    }, duration);
  },sourceStream);
  return bufferStream;
};
