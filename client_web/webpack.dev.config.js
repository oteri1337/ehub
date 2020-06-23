const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function rp(apath) {
  return path.resolve(__dirname, apath);
}

const appRules = [
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
    test: /\.css$/,
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
  mode: "production",
  bail: true,
  entry: "./src/index.js",
  target: "web",
  output: {
    path: path.resolve(__dirname, "../public_html/"),
    publicPath: "/",
    filename: "assets/javascript/reactapp.js",
  },
  module: {
    rules: appRules,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "/assets/css/reactapp.css",
    }),
    new webpack.DefinePlugin({
      PWA_NAME: JSON.stringify(process.env.PWA_NAME),
      MAIL_NAME: JSON.stringify(process.env.MAIL_USERNAME),
      VAPID_KEY: JSON.stringify(process.env.PUBLIC_VAPID_KEY),
    }),
  ],
  resolve: {
    alias: {
      providers: rp("src/providers/"),
      components: rp("src/pages/components/"),
      images: path.resolve(__dirname, "src/assets/images/"),
      functions$: path.resolve(__dirname, "src/functions.js"),
    },
  },
};

module.exports = [entryOne];