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
    <div v-if="response">
      <h2>挿入されたデータ</h2>
      <p>メールアドレス: {{ response.name }}</p>
      <p>名前: {{ response.email }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "InsertData",
  setup() {
    const name = ref("");
    const email = ref("");
    const passWd = ref("");
    const response = ref<any | null>(null);

    const submitForm = async () => {
      try {
        const res = await fetch("http://localhost:3001/insert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            passWd: passWd.value,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          response.value = data; // レスポンスデータを保存
        } else {
          console.error("Error inserting data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return {
      name,
      email,
      passWd,
      response,
      submitForm,
    };
  },
});
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
