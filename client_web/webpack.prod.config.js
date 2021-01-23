const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin");

function rp(apath) {
  return path.resolve(__dirname, apath);
}

const rules = [
  {
    test: /\.js$/,
    use: [
      {
        loader: "babel-loader",
        query: {
          presets: ["react-app"],
        },
      },
    ],
    exclude: /(node_modules)/,
  },
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: "../../",
        },
      },
      { loader: "css-loader" },
    ],
  },
  {
    test: /\.(gif|png|jpe?g|svg|webp)$/i,
    loader: "file-loader",
    options: {
      name: "[name].[ext]",
      outputPath: "assets/images/",
    },
  },
  {
    test: /\.(ttf|eot|woff|woff2)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/fonts/",
        },
      },
    ],
  },
];

const entryOne = {
  entry: "./src/index.js",
  mode: "production",
  target: "web",
  output: {
    path: path.resolve(__dirname, "../public_html"),
    publicPath: "/",
    filename: "assets/javascript/reactapp.js",
  },
  module: {
    rules,
  },
  resolve: {
    alias: {
      providers: rp("src/providers/"),
      components: rp("src/pages/components/"),
      hooks$: path.resolve(__dirname, "src/hooks.js"),
      images: path.resolve(__dirname, "src/assets/images/"),
      functions$: path.resolve(__dirname, "src/functions.js"),
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/reactapp.css",
    }),
    new webpack.DefinePlugin({
      APK_LINK: JSON.stringify(process.env.APK_LINK),
      IPA_LINK: JSON.stringify(process.env.IPA_LINK),
      PWA_NAME: JSON.stringify(process.env.PWA_NAME),
      ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
      MAIL_NAME: JSON.stringify(process.env.MAIL_USERNAME),
      VAPID_KEY: JSON.stringify(process.env.PUBLIC_VAPID_KEY),
    }),
    new HtmlWebpackPlugin({
      title: process.env.PWA_NAME,
      description: process.env.PWA_DESCRIPTION,
      template: "./src/assets/index.html",
      filename: "index.html",
    }),
    // new AppManifestWebpackPlugin({
    //   logo: "../logo.png",
    //   output: "/assets/pwa/",
    //   config: {
    //     appName: process.env.PWA_NAME,
    //     version: 1,
    //     start_url: "/",
    //     background: "#fff",
    //     theme_color: "#fff",
    //     display: "standalone",
    //     orientation: "portrait",
    //   },
    // }),
  ],
};

const entryTwo = {
  target: "web",
  mode: "production",
  entry: "./src/assets/modules.js",
  output: {
    path: path.resolve(__dirname, "../public_html/"),
    filename: "assets/javascript/reactapp-modules.js",
  },
  module: {
    rules,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "/assets/css/reactapp-modules.css",
    }),
  ],
};

module.exports = [entryOne, entryTwo];
