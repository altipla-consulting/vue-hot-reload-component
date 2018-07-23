
# vue-hot-reload-component

Init Vue components in different files with Hot Reload support.

Splitting the code allows for separation of concerns and improves the syntax highlight support, including snnipets or other custom configurations we may have in our editor when they don't work inside `*.vue` files.

This library allows to split a `button.vue` component file in three files: `button.vhtml`, `button.js` and `button.scss`. Any change in one of these files will trigger a hot reload like the original Vue component.


## Install

```shell
npm i --save-dev @altipla/vue-hot-reload-component
```


## Example

##### `checkout-hotel.js`

```js
import initComponent from 'vue-hot-reload-component';

import template from './checkout-hotel.vhtml';
import './checkout-hotel.scss';


export default initComponent(module, template, {
  name: 'checkout-hotel',

  data() {
    return {
      other: 'options',
    };
  },

  methods: {
    likeAnyOtherComponent() {

    },
  },
});
```

##### `checkout-hotel.vhtml`

```html
<h2>Checkout hotel</h2>
```

##### `checkout-hotel.scss`

```scss
h2 {
  color: royalblue;
}
```

##### `webpack.config.js`

Basic webpack configuration example to make this setup work. Note that the `*.vhtml` extension is not required, you can configure `*.html` for example as long as you change it too inside this file.

```js

const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../'),
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        ],
      },
      {
        test: /\.vhtml$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              parserOpts: {
                strictMode: false,
              },
              babelrc: true,
            },
          },
          {
            loader: 'vue-template-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',

      // Remove the following line in production.
      'vue-hot-reload-component$': 'vue-hot-reload-component/index.dev.js',
    },
  },
};
```


## Contributing

You can make pull requests or create issues in GitHub.


## License

[MIT License](LICENSE)
