const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(__dirname, "src");
const TEMPLATE = path.join(__dirname, "template/index.html")

const config = {
  about: {
    filename: "about.js",
    outputPath: path.resolve(__dirname, "dist/about"),
    publicPath: "about"
  },
  home: {
    filename: "home.js",
    outputPath: path.resolve(__dirname, "dist/home"),
    publicPath: "home"
  }
}

module.exports = {
  context: ROOT,

  entry: {
    main: `./${config[process.env.ENTRY].filename}`,
  },

  output: {
    filename: "[name].bundle.js",
    path: config[process.env.ENTRY].outputPath,
  },

  resolve: {
  },

  module: {

  },
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE,
      publicPath: `https://${process.env.CDN_URL}/${config[process.env.ENTRY].publicPath}`
    }),
  ],
};
