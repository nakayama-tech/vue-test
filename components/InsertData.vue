<template>
  <div id="app2">
    <h1>PostgreSQL INSERT DATA</h1>

    <form @submit.prevent="submitForm">
      <div>
        <label for="email">メールアドレス：:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="passWd">パスワード:</label>
        <input type="password" v-model="passWd" id="passWd" required />
      </div>
      <div>
        <label for="name">名前:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">登録</button>
    </form>
    <div v-if="responseMessage">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const email = ref("");
const passWd = ref("");
const responseMessage = ref<string | null>(null);
const submitForm = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/insert",
      {
        email: email.value,
        passWd: passWd.value,
        name: name.value,
      },
      {
        headers: {
          "Content-Type": "application/json", // JSON として送信
        },
      }
    );
    // 成功時のメッセージ
    responseMessage.value = `ユーザー ${response.data.name} が追加されました。`;
    // 入力フィールドのリセット
    email.value = "";
    passWd.value = "";
    name.value = "";
  } catch (error) {
    console.error(error);
    responseMessage.value = "データの送信に失敗しました。";
  }
};
</script>
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
</style>
