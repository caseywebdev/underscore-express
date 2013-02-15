underscore-express
==================

Use Underscore templates easily in Express.

Install
-------

This package is registered in npm as `underscore-express`, so a simple...

```bash
npm install underscore-express
```

...will do it.

Usage
-----

In your Express app setup...

```js
// To use the default 'tmpl' extension...
require('underscore-express')(app);
// Or set your own...
require('underscore-express')(app, 'ut');
```

...and that's it!
