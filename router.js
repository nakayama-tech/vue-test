import { createRouter, createWebHistory } from "vue-router";
import Home from "@/components/HelloWorld.vue";
import InsertData from "@/components/InsertData.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/insertData",
    name: "InsertData",
    component: InsertData,
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
//# sourceMappingURL=router.js.map
