import path from "path";
import { Configuration, EnvironmentPlugin } from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { ESBuildMinifyPlugin } from "esbuild-loader";

const isProduction = process.env.BUILD_ENV === "umd-min";

const mode = process.env.BUILD_ENV === "umd-min" ? "production" : "development";

const filename =
  process.env.BUILD_ENV === "umd-min"
    ? "react-module.min.js"
    : "react-module.js";

const config: Configuration = {
  entry: path.resolve(__dirname, "../src/index.tsx"),
  mode: mode,
  output: {
    path: path.resolve(__dirname, "../lib"),
    filename,
    sourceMapFilename: `${filename}.map`,
    libraryTarget: "umd",
  },
  optimization: isProduction
    ? {
        minimize: true,
        usedExports: true,
        minimizer: [
          new ESBuildMinifyPlugin({
            target: "es6",
            css: true,
          }),
        ],
      }
    : {
        mangleExports: false,
        minimize: false,
      },
  devtool: isProduction ? false : "source-map",
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
    antd: "antd",
    "@ant-design/icons": "@ant-design/icons",
  },
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: mode,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: true,
      reportFilename: "../report.html",
    }),
  ],
  resolve: {
    modules: [path.resolve(__dirname, "../src"), "node_modules"],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?/i,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};

export default config;
