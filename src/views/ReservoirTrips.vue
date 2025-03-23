<template>
  <v-container fill-height>
    <v-card class="header" width="100%" img="'../assets/muscoot.jpeg'">
      <h1>{{ reservoir }} Reservoir</h1>
      <h2>Total Trips: {{ totalTrips }}</h2>
      <h2>Total Fish: {{ totalFish }}</h2>
      <h2>Total Weight: {{ totalWeight.toFixed(2) }} lbs</h2>
    </v-card>
    <v-select
      :items="years"
      label="Choose Season"
      v-model="selectedYear"
      solo
      class="search"
      @input="filterByYear()"
    ></v-select>

    <v-row no-gutters class="justify-space-between align-center">
      <v-col sm="12" md="12" class="pa-3" v-for="date in tripDates" :key="date">
        <v-card color="#F6F6F6">
          <v-card-title class="headline">{{ date }}</v-card-title>
          <trip-totals :date="date" :records="records"></trip-totals>
        </v-card>
        <v-btn @click="createTripDetailsRoute(date)" class="trip-details"
          >View Trip Details
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
import TripTotals from "../components/TripTotals.vue";
export default {
  name: "ReservoirTrips",
  emits: ["records", "tripDates"],
  components: { TripTotals },
  data() {
    return {
      reservoir: this.$route.params.reservoir,
      records: [],
      tripDates: [],
      recordsByDate: [],
      totalWeight: 0,
      totalTrips: 0,
      totalFish: 0,
      overlay: false,
      clickedDate: "",
      selectedYear: "All",
      headers: [
        { text: "Species", value: "species" },
        { text: "Angler", value: "angler" },
        { text: "Weight", value: "weight" },
      ],
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
    };
  },
  methods: {
    //takes full set of fish records and pulls only the unique dates so there are no duplicate dates
    getTripDates(records) {
      var recordDates = [];
      records.sort(function (a, b) {
        var ADate = new Date(a.date),
          BDate = new Date(b.date);
        return BDate - ADate;
      });
      for (var i = 0; i < records.length; i++) {
        var date = this.formatDates(records[i].date);
        recordDates.push(date);
      }
      //this is the logic to set the tripDates array to just the unique dates from the records
      this.tripDates = [...new Set(recordDates)];
    },

    //formats the dates to get rid of timestamp portion
    formatDates(dateString) {
      var formattedDate = dateString.slice(0, 10);
      return formattedDate;
    },

    //gets all the records that occurred on a single date
    filterRecords(records) {
      for (var i = 0; i < records.length; i++) {
        var date = this.formatDates(records[i].date);
        if (date == this.clickedDate) {
          this.recordsByDate.push(records[i]);
        }
      }
    },

    //filters the results shown to a specific year. if "all" is selected, resets the array to contain all dates. resets the array to all dates in the beginning to allow for switching between filters
    filterByYear() {
      this.getTripDates(this.records);
      this.totalWeight = 0;
      this.totalFish = 0;
      var filteredDates = [];
      for (var i = 0; i < this.tripDates.length; i++) {
        if (this.tripDates[i].slice(0, 4) === this.selectedYear) {
          filteredDates.push(this.tripDates[i]);
        }
      }
      this.tripDates = filteredDates;
      if (this.selectedYear === "All") {
        this.getTripDates(this.records);
      }
      this.calcReservoirTotalWeight(this.records);
      this.calcReservoirTotalTrips();
    },

    //clears data table on the "Close Trip Details" button so the table does not continue to aggregate as you view more trips
    //without refreshing
    purgeTable() {
      this.recordsByDate = [];
    },

    //Calculates Header data that sums total weight and total amount of trips that occurred on the reservoir
    calcReservoirTotalWeight(reservoirRecords) {
      for (var i = 0; i < reservoirRecords.length; i++) {
        if (this.selectedYear == "All") {
          this.totalWeight += reservoirRecords[i].weight;
          this.totalFish++;
        } else if (reservoirRecords[i].date.slice(0, 4) === this.selectedYear) {
          this.totalWeight += reservoirRecords[i].weight;
          this.totalFish++;
        }
      }
      //this.totalTrips = this.tripDates.length;
    },

    calcReservoirTotalTrips() {
      this.totalTrips = this.tripDates.length;
    },
    createTripDetailsRoute(date) {
      this.$router.push({
        name: "trip-details",
        link: "/:reservoir/",
        params: { trip: date },
      });
    },
  },

  async created() {
    this.records = await API.getRecordsByReservoir(this.reservoir);
    this.getTripDates(this.records);
    this.calcReservoirTotalWeight(this.records);
    this.calcReservoirTotalTrips();
  },
};
</script>
<style scoped>
h1 {
  font-size: 70px;
}
.headline {
  background-color: #b3b3b3;
  padding-top: 5px;
  padding-bottom: 5px;
  color: black;
}

.header {
  text-align: center;
  color: black;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("../assets/muscoot.jpeg") center center !important;
  background-size: cover;
}

.search {
  padding-top: 30px;
}

.trip-details {
  width: 100%;
  background-color: #6d9886 !important;
}

@media only screen and (max-width: 400px) {
  .headline {
    font-size: 20px !important;
    background-color: #b3b3b3;
    padding-top: 5px;
    padding-bottom: 5px;
    color: black;
  }

  v-overlay {
    max-width: 100px !important;
  }
}
</style>