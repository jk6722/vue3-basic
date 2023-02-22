// import
const path = require('path')
// path라는 모듈은 별도의 설치 없이 node js 환경에서 사용할 수 있는 전역 모듈
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    // js파일 vue 파일은 확장자명을 명시하지 않아도 잘 동작하게 된다.
    alias: {
      // 실제 경로의 별칭을 지정
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
      // 상대 경로를 사용하지 않고도 파일을 찾을 수 있게 된다.
    }
  },
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // webpack 이라는 번들러를 동작시키면 어떠한 경로에 결과를 만들어서 내어줄 지 설정
    // parcel과 webpack은 별개의 번들러이기 때문에 1대1로 대응시켜 생각하는 것은 좋지 않지만
    // parcel 번들러에서의 dist 폴더와 같은 역할을 하는 폴더이다.
    path: path.resolve(__dirname, 'dist'),
    // __dirname은 Node js 환경에서 사용할 수 있는 전역 변수
    // 해당하는 파일의 실제 경로를 나타내는 전역 변수이고 이를 'dist'와 일치시키겠다는 뜻.
    filename: 'main.js',
    // 번들로 만들어서 내어줄 결과물(파일)의 이름을 filename 속성을 통해 설정
    clean: true
    // clean 속성을 true로 설정하면 build시에 필요 없는 파일들을 없애고 새로 만들어진 파일만 생성하게 된다.
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/, //.css 또는 .scss로 끝나는 모든 파일을 찾겠다는 정규표현식
        use: [
          // 연결할 패키지의 이름
          // 'vue-style-loader',
          'style-loader', // 해석한 css 파일을 index.html의 style 요소에 삽입해주는 패키지
          'css-loader',
          'postcss-loader',
          // webpack에서 css파일을 읽을 수 있도록 해주는 패키지
          'sass-loader'
        ]
      },
      {
        test: /\.js/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static' }
        // static폴더 안에 있는 내용을 복사해서 dist 폴더 안에 만들어 주겠다.
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host: 'localhost'
  }
}
