import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddRecord from "../views/AddRecord.vue";
import ReservoirTrips from "../views/ReservoirTrips.vue";
import Anglers from "../views/Anglers.vue";
import FishGallery from "../views/FishGallery.vue";
import Trends from "../views/Trends.vue";
import Species from "../views/Species.vue";
import CatchMap from "../views/CatchMap.vue";
import TripDetails from "../views/TripDetails.vue"
import Leaderboard from "../views/Leaderboard.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add-record",
    name: "add-record",
    component: AddRecord,
  },
  {
    path: "/anglers",
    name: "anglers-view",
    component: Anglers,
  },
  {
    path: "/species",
    name: "species-view",
    component: Species,
  },
  {
    path: "/fish-id",
    name: "fish-id",
    component: FishGallery,
  },
  {
    path: "/trends",
    name: "trends",
    component: Trends,
  },
  {
    path: "/catch-map",
    name: "catch-map",
    component: CatchMap,
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: Leaderboard,
  },
  {
    path: "/:reservoir",
    name: "reservoir-trips",
    component: ReservoirTrips,
  },
  {
    path: "/:reservoir/:trip",
    name: "trip-details",
    component: TripDetails,
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
