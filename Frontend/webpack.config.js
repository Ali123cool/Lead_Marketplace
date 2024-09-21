const path = require('path');

module.exports = {
  entry: './Src/Index.js',  // Ensure the correct case-sensitive path
  output: {
    path: path.resolve(__dirname, 'Dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,   // Handle JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',   // Transpile JS and JSX using Babel
        },
      },
      {
        test: /\.css$/,  // For handling CSS files (Tailwind or other)
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Handle both .js and .jsx extensions
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'Public'),  // Updated to 'static' for Webpack 5
    },
    hot: true,
    compress: true,
    port: 8080,  // You can customize the port if necessary
  },
};
