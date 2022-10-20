const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(__dirname, "src");
const TEMPLATE = path.join(__dirname, "template/index.html")

const BuildConfig = {
  about: {
    entry: {
      main: "./about.js"
    },
    output: {
      path: path.resolve(__dirname, "dist/about")
    },
    publicPath: `https://${process.env.CDN_URL}/about`
  },
  home: {
    entry: {
      main: "./home.js"
    },
    output: {
      path: path.resolve(__dirname, "dist/home")
    },
    publicPath: `https://${process.env.CDN_URL}/home`
  }
}

const config = BuildConfig[process.env.ENTRY]

module.exports = {
  context: ROOT,

  entry: {
    main: config.entry.main
  },

  output: {
    filename: "[name].bundle.js",
    path: config.output.path
  },

  resolve: {
  },

  module: {

  },
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      publicPath: config.publicPath
    }),
  ],
};
