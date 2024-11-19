<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="changeMessage" class="ai-button">call AI SDK</button>
    <h3>AI Data:</h3>
    <p>{{ aiData }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      aiData: {}
    }
  },
  methods: {
    changeMessage: function() {
      // 使用 SDK 调用 AI 模型
      window.aiSdk.callModel('mnn-age-googlenet', ['--input', 'input.jpg'])
      .then(resultJson => {
        console.log('Received RESULTJSON:', resultJson)
        this.aiData = resultJson
      })
      .catch(error => {
        console.error('Error:', error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ai-button {
  background-color: #4CAF50; /* 绿色背景 */
  border: none; /* 无边框 */
  color: white; /* 白色文字 */
  padding: 15px 32px; /* 内边距 */
  text-align: center; /* 文字居中 */
  text-decoration: none; /* 无下划线 */
  display: inline-block; /* 行内块元素 */
  font-size: 16px; /* 字体大小 */
  margin: 4px 2px; /* 外边距 */
  cursor: pointer; /* 鼠标指针 */
  border-radius: 12px; /* 圆角 */
  transition-duration: 0.4s; /* 过渡时间 */
}

.ai-button:hover {
  background-color: white; /* 悬停时背景变为白色 */
  color: black; /* 悬停时文字变为黑色 */
  border: 2px solid #4CAF50; /* 悬停时添加绿色边框 */
}
</style>
