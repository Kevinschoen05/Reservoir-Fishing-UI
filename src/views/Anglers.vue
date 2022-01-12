<template>
  <v-container>
    <v-select
      :items="years"
      label="Choose Season"
      v-model="selectedYear"
      solo
      class="search"
    ></v-select>
    <v-row no-gutters class="justify-space-between align-center">
      <v-col class="pa-3" sm="12" v-for="angler in anglers" :key="angler">
        <v-card>
          <h1 class="header pa-3">
            {{ angler }}
          </h1>
          <angler-totals
            :records="records"
            :angler="angler"
            :selectedYear="selectedYear"
          ></angler-totals>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
import AnglerTotals from "../components/AnglerTotals.vue";
export default {
  name: "Anglers",
  emits: ["species", "angler", "records"],
  components: { AnglerTotals },
  data() {
    return {
      records: [],
      anglers: [],
      years: ["All", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"],
      selectedYear: "All",
    };
  },
  methods: {
    getAnglers(records) {
      var anglersList = [];
      for (var i = 0; i < records.length; i++) {
        var angler = this.records[i].angler;
        anglersList.push(angler);
      }
      this.anglers = [...new Set(anglersList)];
    },
  },
  async created() {
    this.records = await API.getAllRecords();
    this.getAnglers(this.records);
  },
};
</script>
<style scoped>
.search {
  padding-top: 30px;
}
</style>>

