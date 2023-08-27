import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StreetsIndexView from "../views/Streets/StreetsIndexView.vue";
import StreetsCreateView from "../views/Streets/StreetsCreateView.vue";
import StreetsEditView from "../views/Streets/StreetsEditView.vue";
import StreetsHouseholdsView from "../views/Streets/StreetsHouseholdsView.vue";
import HouseholdsCreateView from "../views/Households/HouseholdsCreateView.vue";
import HouseholdsEditView from "../views/Households/HouseholdsEditView.vue";
import ResidentsIndexView from "../views/Residents/ResidentsIndexView.vue";
import ResidentsCreateView from "../views/Residents/ResidentsCreateView.vue";
import ResidentsEditView from "../views/Residents/ResidentsEditView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/streets/index",
      name: "StreetsIndexView",
      component: StreetsIndexView,
    },
    {
      path: "/streets/create",
      name: "StreetsCreateView",
      component: StreetsCreateView,
    },
    {
      path: "/streets/edit/:id",
      name: "StreetsEditView",
      component: StreetsEditView,
    },
    {
      path: "/streets/:id/households",
      name: "StreetsHouseholdsView",
      component: StreetsHouseholdsView,
    },
    {
      path: "/streets/:id/households/create",
      name: "HouseholdsCreateView",
      component: HouseholdsCreateView,
    },
    {
      path: "/streets/:id/households/edit/:householdId",
      name: "HouseholdsEditView",
      component: HouseholdsEditView,
    },
    {
      path: "/streets/:id/households/:householdId/residents",
      name: "ResidentsIndexView",
      component: ResidentsIndexView,
    },
    {
      path: "/streets/:id/households/:householdId/residents/create",
      name: "ResidentsCreateView",
      component: ResidentsCreateView,
    },
    {
      path: "/streets/:id/households/:householdId/residents/edit/:residentId",
      name: "ResidentsEditView",
      component: ResidentsEditView,
    },
  ],
});

export default router;
