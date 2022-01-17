<template>
  <v-container>
    <h1>Angler Totals</h1>
    <h3>Total Number of Fish Caught by Each Angler Broken Down by Species</h3>
    <v-select
      :items="years"
      label="Choose Season"
      v-model="selectedYear"
      solo
      class="search"
    ></v-select>
    <v-row no-gutters class="justify-space-between align-center">
      <v-col class="pa-3" sm="12" v-for="angler in sortedAnglers" :key="angler">
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
      sortedAnglers: [],
      years: [
        "All",
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
      ],
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
      this.orderByTotals(anglersList);
    },

    //function to sort the anglers into an array by decreasing value
    orderByTotals(anglersList) {
      var totals = {};
      //creates totals object with totals assigned to each angler name as the key
      for (var name of anglersList) {
        totals[name] = 0;
      }
      for (var i = 0; i < this.records.length; i++) {
        if (this.records[i].angler in totals) {
          totals[this.records[i].angler]++;
        }
      }
      //takes the totals object and puts it back in array form
      var orderedAnglers = [];
      for (var anglers in totals) {
        orderedAnglers.push([anglers, totals[anglers]]);
      }
      //sorts the array from highest total to lowest
      orderedAnglers.sort(function (a, b) {
        return b[1] - a[1];
      });
      //pushes the ordered array into the sortedAngers array for use in the v-for
      for (var k = 0; k < orderedAnglers.length; k++) {
        this.sortedAnglers.push(orderedAnglers[k][0]);
      }
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

