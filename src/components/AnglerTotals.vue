<template>
  <v-container>
    <h2>Catch Average: {{ catchAverage.toFixed(2) }}</h2>
    <v-simple-table width="100">
      <template>
        <thead>
          <tr>
            <td class="header">Species</td>
            <td class="header">Total Caught</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="species in anglerCounts" :key="species.species">
            <td>{{ species.species }}</td>
            <td>{{ species.count }}</td>
          </tr>
          <tr>
            <td class="header">Total</td>
            <td>{{ anglerTotal }}</td>
            <td></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
export default {
  props: ["angler", "records", "selectedYear"],
  watch: {
    selectedYear: function () {
      this.anglerTotal = 0;
      this.clearTotals();
      this.getTotalsByAngler(this.angler);
    },
  },
  data() {
    return {
      anglerTotal: 0,
      anglerCounts: [
        {
          species: "Large Mouth Bass",
          count: 0,
        },
        {
          species: "Small Mouth Bass",
          count: 0,
        },
        {
          species: "Rock Bass",
          count: 0,
        },
        {
          species: "Pickerel",
          count: 0,
        },
        {
          species: "Perch",
          count: 0,
        },
        {
          species: "Sunny",
          count: 0,
        },
        {
          species: "White Perch",
          count: 0,
        },
        {
          species: "Crappie",
          count: 0,
        },
        {
          species: "Trout",
          count: 0,
        },
        {
          species: "White Bass",
          count: 0,
        },
        {
          species: "Carp",
          count: 0,
        },
      ],
      uniqueTrips: [],
      catchAverage: 0,
    };
  },
  methods: {
    getTotalsByAngler(angler) {
      for (var i = 0; i < this.records.length; i++) {
        if (
          this.records[i].angler === angler &&
          this.records[i].date.slice(0, 4) === this.selectedYear
        ) {
          this.anglerTotal++;
          for (var k = 0; k < this.anglerCounts.length; k++) {
            if (this.records[i].species === this.anglerCounts[k].species) {
              this.anglerCounts[k].count++;
            }
          }
        } else if (
          this.records[i].angler === angler &&
          this.selectedYear === "All"
        ) {
          this.anglerTotal++;
          for (var j = 0; j < this.anglerCounts.length; j++) {
            if (this.records[i].species === this.anglerCounts[j].species) {
              this.anglerCounts[j].count++;
            }
          }
        }
      }
    },
    getCatchAverage(angler, total) {
      let trips = [];
      for (var i = 0; i < this.records.length; i++) {
        if (this.records[i].angler === angler) {
          trips.push(this.records[i].date.slice(0, 10));
        }
      }
      var uniqueTrips = [...new Set(trips)];
      this.catchAverage = total / uniqueTrips.length;
    },
    clearTotals() {
      for (var i = 0; i < this.anglerCounts.length; i++) {
        this.anglerCounts[i].count = 0;
      }
    },
  },
  async created() {
    this.getTotalsByAngler(this.angler);
    this.getCatchAverage(this.angler, this.anglerTotal);
  },
};
</script>Î

<style scoped>
.header {
  font-weight: 900;
}
</style>
