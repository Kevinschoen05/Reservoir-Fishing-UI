
   
<template>
  <v-app id="inspire">
    <v-navigation-drawer color="#6D9886" v-model="drawer" app class="top-bar">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Reservoir Fishing</v-list-item-title>
          <v-list-item-subtitle>2025</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="#6D9886" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn :to="homeLink" text :ripple="false" background-color: transparent>
        <v-toolbar-title>Reservoir Fishing</v-toolbar-title>
      </v-btn>
    </v-app-bar>

    <v-main class="main-container">
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>


<script>
export default {
  data: () => ({
    drawer: null,
    selectedItem: 1,
    items: [
      { title: "Muscoot", icon: "mdi-map", link: "/Muscoot" },
      { title: "Croton", icon: "mdi-map", link: "/Croton" },
      { title: "Anglers", icon: "mdi-account-group", link: "/anglers" },
      {title: "Leaderboard", icon: "mdi-seal", link: "/leaderboard" },
      { title: "Species", icon: "mdi-fish", link: "species" },
      { title: "Trends", icon: "mdi-chart-bar", link: "/trends" },
      { title: "Record Fish", icon: "mdi-note-plus", link: "/add-record" },
      { title: "Catch Map", icon: "mdi-map-marker", link: "/catch-map" },
      { title: "Fish ID", icon: "mdi-magnify", link: "/fish-id" },
    ],
    homeLink: "/",
  }),
};
</script>

<style scoped>
.v-btn::before {
  background-color: transparent;
}
.main-container {
  background-color: #d9cab3;
}

.top-bar {
  background-color: #212121;
}
</style>