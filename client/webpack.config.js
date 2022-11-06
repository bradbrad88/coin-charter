const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((p, key) => {
  p[`process.env.${key}`] = JSON.stringify(env[key]);
  return p;
}, {});

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
  target: "web",
  devServer: {
    port: "3000",
    proxy: {
      "/graphql": "http://localhost:3001",
      "/api": "http://localhost:3001",
    },
    static: {
      directory: path.join(__dirname, "public"),
    },
    watchFiles: ["src/**/*.{js,ts,tsx,jsx}", "public/**/*"],
    open: true,
    hot: "only",
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "src/"),
      pages: path.resolve(__dirname, "src/pages/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      contexts: path.resolve(__dirname, "src/contexts/"),
      common: path.resolve(__dirname, "src/components/common/"),
      features: path.resolve(__dirname, "src/components/features/"),
    },
  },
  module: {
    // Apply to .ts or .tsx files
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      { test: /\.(tsx?)$/, loader: "ts-loader" },
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: "babel-loader" },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  stats: "minimal",
};
