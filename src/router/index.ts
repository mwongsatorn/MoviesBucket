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
      path: "/:media(movies|series)",
      name: "MediaList",
      component: () => import("../views/MediaListPage.vue"),
      props: true,
    },
    {
      path: "/:media(movies|series)/:id",
      name: "MediaDetails",
      component: () => import("../views/MediaDetailsPage.vue"),
      props: true,
    },
    {
      path: "/:media(movies|series)/categories/:category(trending|top-rated|popular|upcoming)",
      name: "MediaByCategory",
      component: () => import("../views/MediaByCategoryPage.vue"),
      props: true,
    },
    {
      path: "/:media(movies|series)/keywords/:id",
      name: "MediaByKeyword",
      component: () => import("../views/MediaByKeywordPage.vue"),
      props: true,
    },
    {
      path: "/:media(movies|series)/genres/:id",
      name: "MediaByGenre",
      component: () => import("../views/MediaByGenrePage.vue"),
      props: true,
    },
    {
      path: "/search/:searchType?",
      name: "Search",
      component: () => import("../views/SearchPage.vue"),
      props: true,
    },
  ],
});

export default router;
