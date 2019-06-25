
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'DockerMgrFrontEnd',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  alias: {
    '@': `${__dirname}/src/`,
  },
  history: 'hash',
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:5001',
  //     pathRewrite: { '^/api': '/api' },
  //     changeOrigin: true
  //   }
  // },
}
