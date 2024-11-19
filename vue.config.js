const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/aiSdk.js',
      builderOptions: {
        extraMetadata: {
          python: "/opt/homebrew/anaconda3/bin/python"
        },
        extraResources: [
          {
            from: 'bin', // 资源文件的路径
            to: 'resource', // 打包后资源文件的路径
            filter: ['**/*'] // 过滤器
          }
        ]
      }
    }
  }
})
