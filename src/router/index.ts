import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
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
      path: "/movies",
      name: "Movies",
      component: () => import("../views/MoviesPage.vue"),
    },
    {
      path: "/series",
      name: "Series",
      component: () => import("../views/SeriesPage.vue"),
    },
    {
      path: "/series/:id",
      name: "SerieDetails",
      component: () => import("../views/MediaDetailsPage.vue"),
    },
  ],
});

export default router;
