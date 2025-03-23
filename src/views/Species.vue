<template>
  <v-container>
    <h1>Species Totals</h1>
    <h3>Total Number of Fish Caught of Each Species</h3>
    <v-select
      :items="years"
      label="Choose Season"
      v-model="selectedYear"
      solo
      class="search"
    ></v-select>
    <v-row no-gutters class="justify-space-between align-center">
      <v-col
        class="pa-3"
        sm="12"
        v-for="species in speciesCounts"
        :key="species.species"
      >
        <v-card>
          <h1 class="header pa-3">
            {{ species.species }}
          </h1>
          <v-container>
            <v-simple-table>
              <thead>
                <tr>
                  <td class="header">Reservoir</td>
                  <td class="header">Total Caught</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Muscoot</td>
                  <td>{{ species.muscootTotal }}</td>
                </tr>
                <tr>
                  <td>Croton</td>
                  <td>{{ species.crotonTotal }}</td>
                </tr>
                <tr>
                  <td class="header">Total</td>
                  <td>{{ species.total }}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
export default {
  watch: {
    selectedYear: function () {
      this.clearTotals();
      this.getSpeciesTotals();
    },
  },
  data() {
    return {
      records: [],
      selectedYear: "All",
      years: [
        "All",
        "2025",
        "2024",
        "2023",
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
      speciesCounts: [
        {
          species: "Large Mouth Bass",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Small Mouth Bass",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Rock Bass",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Pickerel",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Perch",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Sunny",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "White Perch",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Crappie",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Trout",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "White Bass",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Carp",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
        {
          species: "Catfish",
          muscootTotal: 0,
          crotonTotal: 0,
          total: 0,
        },
      ],
    };
  },
  methods: {
    getSpeciesTotals() {
      for (var i = 0; i < this.records.length; i++) {
        //console.log(this.records[i].species + " " + this.records[i].reservoir);
        for (var k = 0; k < this.speciesCounts.length; k++) {
          if (
            this.records[i].species === this.speciesCounts[k].species &&
            this.records[i].reservoir === "Muscoot" &&
            this.records[i].date.slice(0, 4) === this.selectedYear
          ) {
            this.speciesCounts[k].muscootTotal++;
          } else if (
            this.records[i].species === this.speciesCounts[k].species &&
            this.records[i].reservoir === "Muscoot" &&
            this.selectedYear === "All"
          ) {
            this.speciesCounts[k].muscootTotal++;
          } else if (
            this.records[i].species === this.speciesCounts[k].species &&
            this.records[i].reservoir === "Croton" &&
            this.records[i].date.slice(0, 4) === this.selectedYear
          ) {
            this.speciesCounts[k].crotonTotal++;
          } else if (
            this.records[i].species === this.speciesCounts[k].species &&
            this.records[i].reservoir === "Croton" &&
            this.selectedYear === "All"
          ) {
            this.speciesCounts[k].crotonTotal++;
          }
          this.speciesCounts[k].total =
            this.speciesCounts[k].muscootTotal +
            this.speciesCounts[k].crotonTotal;
        }
      }
    },
    clearTotals() {
      for (var i = 0; i < this.speciesCounts.length; i++) {
        this.speciesCounts[i].muscootTotal = 0;
        this.speciesCounts[i].crotonTotal = 0;
        this.speciesCounts[i].total = 0;
      }
    },
  },
  async created() {
    this.records = await API.getAllRecords();
    this.getSpeciesTotals();
  },
};
</script>
<style scoped>
.header {
  font-weight: 900;
}
.search {
  padding-top: 30px;
}
</style>