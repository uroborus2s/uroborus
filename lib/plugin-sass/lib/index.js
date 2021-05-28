'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

function _react() {
  const data = _interopRequireDefault(require('react'));

  _react = function _react() {
    return data;
  };

  return data;
}

function _umi() {
  const data = require('umi');

  _umi = function _umi() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var _default = (api) => {
  api.describe({
    key: 'sass',
    config: {
      schema(Joi) {
        return Joi.object({
          implementation: Joi.any(),
          sassOptions: Joi.object(),
          prependData: Joi.alternatives(Joi.string(), Joi.func()),
          sourceMap: Joi.boolean(),
          webpackImporter: Joi.boolean(),
        });
      },
    },
  });
  api.chainWebpack((memo, { createCSSRule }) => {
    createCSSRule({
      lang: 'sass',
      test: /\.(sass|scss)(\?.*)?$/,
      loader: require.resolve('sass-loader'),
      options: _umi().utils.deepmerge(
        {
          implementation: require('sass'),
        },
        api.config.sass || {},
      ),
    });
    return memo;
  });
};

exports.default = _default;
