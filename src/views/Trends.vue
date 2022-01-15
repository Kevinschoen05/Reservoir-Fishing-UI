<template>
  <v-container>
    <h1> Monthly Catch Trends</h1>
    <h3>Historic Catch Results of Each Fish Species Per Month</h3>
    <v-select
      :items="fishSelector"
      label="Choose Species"
      v-model="selectedFish"
      solo
      class="search"
      @input="getSelectedFishData(selectedFish)"
    ></v-select>
    <bar-chart
      v-if="loaded"
      class="chart"
      :chartData="chartData"
      :options="options"
    ></bar-chart>
  </v-container>
</template>
<script>
import BarChart from "../components/BarChart.vue";
import API from "../api";
export default {
  components: { BarChart },
  data() {
    return {
      loaded: false,
      records: [],
      selectedFish: "",
      janCounter: 0,
      febCounter: 0,
      marchCounter: 0,
      aprilCounter: 0,
      mayCounter: 0,
      juneCounter: 0,
      julyCounter: 0,
      augCounter: 0,
      septCounter: 0,
      octCounter: 0,
      novCounter: 0,
      decCounter: 0,
      chartData: {},
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
      fishSelector: [
        "Large Mouth Bass",
        "Small Mouth Bass",
        "Rock Bass",
        "Pickerel",
        "Perch",
        "Sunny",
        "White Perch",
        "Crappie",
        "Trout",
        "White Bass",
        "Carp",
      ],
    };
  },
  methods: {
    getSelectedFishData(selectedFish) {
      console.log(selectedFish);
      for (var i = 0; i < this.records.length; i++) {
        if (this.records[i].species === selectedFish) {
          var month = this.records[i].date.slice(5, 7);
          switch (month) {
            case "01":
              this.janCounter++;
              break;
            case "02":
              this.febCounter++;
              break;
            case "03":
              this.marchCounter++;
              break;
            case "04":
              this.aprilCounter++;
              break;
            case "05":
              this.mayCounter++;
              break;
            case "06":
              this.juneCounter++;
              break;
            case "07":
              this.julyCounter++;
              break;
            case "08":
              this.augCounter++;
              break;
            case "09":
              this.septCounter++;
              break;
            case "10":
              this.octCounter++;
              break;
            case "11":
              this.novCounter++;
              break;
            case "12":
              this.decCounter++;
              break;
          }
        }
      }
      this.chartData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: null,
            backgroundColor: "#6D9886",
            data: [
              this.janCounter,
              this.febCounter,
              this.marchCounter,
              this.aprilCounter,
              this.mayCounter,
              this.juneCounter,
              this.julyCounter,
              this.augCounter,
              this.septCounter,
              this.octCounter,
              this.novCounter,
              this.decCounter,
            ],
          },
        ],
      };
      this.loaded = true;
      this.janCounter = 0;
      this.febCounter = 0;
      this.marchCounter = 0;
      this.aprilCounter = 0;
      this.mayCounter = 0;
      this.juneCounter = 0;
      this.julyCounter = 0;
      this.augCounter = 0;
      this.septCounter = 0;
      this.octCounter = 0;
      this.novCounter = 0;
      this.decCounter = 0;
    },
  },
  async created() {
    this.records = await API.getAllRecords();
  },
};
</script>
<style scoped>
.chart {
  max-height: 100%;
  max-width: 100%;
  text-align: center;
}

.search {
  padding-top: 30px;
}
</style>