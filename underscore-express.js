var _ = require('underscore');
var fs = require('fs');
var path = require('path');

// Store templates as they're compiled in production.
var cache = {};

// Set the default template extension. Override as necessary.
var ext = 'tmpl';

// Set the special express property for templating to work.
var render = function (abs, options, cb) {
  var sync = !cb;
  try {

    // Helper function for sub-templating, store the original value for nested
    // sub-templates.
    var dir = path.dirname(abs);
    options.include = function (rel) {
      var include = options.include;
      var str = render(path.resolve(dir, rel + '.' + ext), options);
      options.include = include;
      return str;
    };

    // Check cache...
    var fn = options.cache && cache[abs];
    if (!fn) {
      if (sync) {
        var data = fs.readFileSync(abs, 'utf8');
        fn = cache[abs] = _.template(data, options);
      } else {
        return fs.readFile(abs, 'utf8', function (er, data) {
          if (er) return cb(er);
          try { cb(null, (cache[abs] = _.template(data, options))(options)); }
          catch (er) { cb(er); }
        });
      }
    }

    // Run and return template
    var str = fn(options);
    if (sync) return str; else cb(null, str);
  } catch (er) {
    if (sync) throw er; else cb(er);
  }
};

module.exports = function (app, _ext) {
  app.engine(_ext ? ext = _ext : ext, render);
};
