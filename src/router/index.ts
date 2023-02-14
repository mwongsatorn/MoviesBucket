import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/movies/:id",
      name: "MovieDetails",
      component: () => import("../views/MediaDetailsPage.vue"),
    },
    {
      path: "/series/:id",
      name: "SerieDetails",
      component: () => import("../views/MediaDetailsPage.vue"),
    },
  ],
});

export default router;
