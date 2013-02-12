underscore-express
==================

Use Underscore templates easily in Express.

Install
-------

In Node, all you need to do is `require('underscore-express')`.

If you want to use a file extension other than `underscore`, set the
`templateExtension` property to reflect your choice...

```js
require('underscore').templateExtension = 'erb';
```

Usage
-----

In your Express app setup...

```js
app.set('view engine', 'underscore');
```

Done!
