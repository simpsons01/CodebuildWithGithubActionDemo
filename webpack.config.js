const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ROOT = path.resolve(__dirname, "src");
const DESTINATION = path.resolve(__dirname, "dist");
const TEMPLATE = path.join(__dirname, "template/index.html")

module.exports = {
  context: ROOT,

  entry: {
    main: `./${process.env.ENTRY_FILE_NAME}.js`,
  },

  output: {
    filename: "[name].bundle.js",
    path: DESTINATION,
  },

  resolve: {
  },

  module: {

  },
  devServer: {},
  plugins: [
    new HtmlWebpackPlugin({
      template: TEMPLATE,
    }),
  ],
};
