<template>
  <div id="app">
    <h1>PostgreSQL Data</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.mailaddress }}
      </li>
    </ul>
    <router-link to="/insertData">Go to About</router-link>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, onMounted } from "vue";

// users データを格納するための ref
const users = ref<Array<{ id: number; mailaddress: string }>>([]);

// コンポーネントがマウントされた時にデータを取得
onMounted(async () => {
  try {
    // Node.js サーバーからデータを取得
    const response = await axios.get("http://localhost:3000/data");
    users.value = response.data; // 取得したデータを users にセット
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
  }
});
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
</style>
