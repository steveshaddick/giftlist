// The source code including full typescript support is available at: 
// https://github.com/shakacode/react_on_rails_demo_ssr_hmr/blob/master/config/webpack/commonWebpackConfig.js

const { resolve } = require('path');

// Common configuration applying to client and server configuration
const { webpackConfig: baseClientWebpackConfig, merge } = require('shakapacker');

const appPath = '../../client/app';

const commonOptions = {
  resolve: {
    extensions: ['.css', '.ts', '.tsx'],
    alias: {
      components: resolve(__dirname, `${appPath}/bundles/components/`),
      images: resolve(__dirname, `${appPath}/bundles/images/`),
      pages: resolve(__dirname, `${appPath}/bundles/pages/`),
      utilities: resolve(__dirname, `${appPath}/bundles/utilities/`),
    },
  },
};

// Copy the object using merge b/c the baseClientWebpackConfig and commonOptions are mutable globals
const commonWebpackConfig = () => merge({}, baseClientWebpackConfig, commonOptions);

module.exports = commonWebpackConfig;
