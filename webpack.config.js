const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const JavaScriptObfuscator = require('webpack-obfuscator')
const pkg = require('./package.json')

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  plugins: [
    new JavaScriptObfuscator({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.25,
      deadCodeInjection: false,
      deadCodeInjectionThreshold: 0.4,
      debugProtection: false, // in prod
      debugProtectionInterval: false, // in prod
      disableConsoleOutput: false, // in prod
      domainLock: [],
      identifierNamesGenerator: 'hexadecimal',
      identifiersDictionary: [],
      identifiersPrefix: '',
      inputFileName: '',
      log: false,
      renameGlobals: false,
      reservedNames: [],
      reservedStrings: [],
      rotateStringArray: true,
      seed: Math.floor(Math.random() * 1000000000),
      selfDefending: false,
      shuffleStringArray: true,
      sourceMap: false,
      sourceMapBaseUrl: '',
      sourceMapFileName: '',
      sourceMapMode: 'separate',
      splitStrings: false,
      splitStringsChunkLength: 3,
      stringArray: true,
      stringArrayEncoding: 'base64',
      stringArrayThreshold: 1,
      target: 'browser',
      transformObjectKeys: false,
      unicodeEscapeSequence: false
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/g
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: `harmony-${pkg.version}.min.js`,
    path: path.resolve(__dirname, 'out')
  }
}
