<template>
  <v-container>
    <h1>Trip Results</h1>
    <h3>{{ formattedDate }} on {{ reservoir }} Reservoir</h3>
    <GmapMap
      :center="center"
      :zoom="13.5"
      style="width: 100%; height: 400px; justify: center"
      :mapTypeId="mapTypeId"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :title="m.title"
        :icon="m.icon"
      ></gmap-marker>
    </GmapMap>
    <v-row class="data">
      <v-data-table class="table" :headers="headers" :items="tripRecords">
        <h3>Catch Results</h3>
      </v-data-table>
      <v-simple-table class="table">
        <template>
          <h3>Trip Weather</h3>
          <tbody>
            <tr>
              <td class="value">Conditions</td>
              <td>{{ weatherConditions }}</td>
            </tr>
            <tr>
              <td class="value">Temperature</td>
              <td>{{ weatherTemperature }} Degrees</td>
            </tr>
            <tr>
              <td class="value">Wind Speed</td>
              <td>{{ weatherWindSpeed }} MPH</td>
            </tr>
            <tr>
              <td class="value">Precipitation</td>
              <td>{{ weatherPrecipitation }} Inches</td>
            </tr>
                        <tr>
              <td class="value">Humidty</td>
              <td>{{ weatherHumidity }}%</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
export default {
  data() {
    return {
      records: [],
      weatherData: [],
      weatherConditions: "",
      weatherTemperature: "",
      weatherWindSpeed: "",
      weatherPrecipitation: "",
      weatherHumidity: "",
      tripRecords: [],
      headers: [
        { text: "Species", value: "species" },
        { text: "Angler", value: "angler" },
        { text: "Weight", value: "weight" },
      ],
      mappedRecords: [],
      date: this.$route.params.trip,
      formattedDate: "",
      reservoir: this.$route.params.reservoir,
      key: process.env.VUE_APP_MAPS_API,
      muscootCenter: { lat: 41.2695, lng: -73.7051 },
      crotonCenter: { lat: 41.251568, lng: -73.730955 },
      center: { lat: 41.260629, lng: -73.717068 },
      markers: [],
      mapTypeId: "satellite",
    };
  },
  methods: {
    getTripData(tripDate) {
      for (var i = 0; i < this.records.length; i++) {
        if (tripDate === this.records[i].date.slice(0, 10)) {
          this.tripRecords.push(this.records[i]);
        }
      }
    },
    getRecordsWithLocation(records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].latitude !== "" && records[i].latitude !== "undefined") {
          this.mappedRecords.push(records[i]);
        }
      }
      this.createMarkers(this.mappedRecords);
      this.mappedRecords = [];
    },
    createMarkers(recordsWithCoords) {
      for (var i = 0; i < recordsWithCoords.length; i++) {
        var lat = parseFloat(recordsWithCoords[i].latitude);
        var lng = parseFloat(recordsWithCoords[i].longitude);
        var label =
          recordsWithCoords[i].species + "\n" + recordsWithCoords[i].angler;
        var url = this.getMarkerColor(recordsWithCoords[i].species);
        var marker = { lat, lng };
        this.markers.push({ position: marker, title: label, icon: url });
      }
    },
    getMarkerColor(fishSpecies) {
      switch (fishSpecies) {
        case "Large Mouth Bass":
          var url = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
          break;
        case "Small Mouth Bass":
          url = "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
          break;
        case "Rock Bass":
          url = "http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png";
          break;
        case "Pickerel":
          url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
          break;
        case "Perch":
          url = "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
          break;
        case "Sunny":
          url = "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
          break;
        case "White Perch":
          url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
          break;
        case "Crappie":
          url = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
          break;
        case "Trout":
          url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
          break;
        case "White Bass":
          url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
          break;
        case "Carp":
          url = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
          break;
      }
      return url;
    },
    getMapCenter() {
      if (this.reservoir === "Muscoot") {
        this.center = this.muscootCenter;
      } else {
        this.center = this.crotonCenter;
      }
    },
    formatDate(date) {
      var year = date.slice(0, 4);
      var month = date.slice(5, 7);
      var day = date.slice(8, 10);

      var monthName = this.getMonthName(month);
      this.formattedDate = monthName + " " + day + ", " + year;
    },
    getMonthName(month) {
      switch (month) {
        case "01":
          var monthName = "January";
          break;
        case "02":
          monthName = "February";
          break;
        case "03":
          monthName = "March";
          break;
        case "04":
          monthName = "April";
          break;
        case "05":
          monthName = "May";
          break;
        case "06":
          monthName = "June";
          break;
        case "07":
          monthName = "July";
          break;
        case "08":
          monthName = "August";
          break;
        case "09":
          monthName = "September";
          break;
        case "10":
          monthName = "October";
          break;
        case "11":
          monthName = "November";
          break;
        case "12":
          monthName = "December";
          break;
      }
      return monthName;
    },
    async getWeather() {
      var weatherData = await API.getWeather(
        this.date + "T00:00:00",
        this.date + "T00:00:00"
      );
      console.log(weatherData.locations["Yorktown Heights, NY"].values[0]);
      this.weatherConditions =
        weatherData.locations["Yorktown Heights, NY"].values[0].conditions;
      this.weatherTemperature =
        weatherData.locations["Yorktown Heights, NY"].values[0].temp;
      this.weatherWindSpeed =
        weatherData.locations["Yorktown Heights, NY"].values[0].wspd;
      this.weatherPrecipitation =
        weatherData.locations["Yorktown Heights, NY"].values[0].precip;
      this.weatherHumidity =
        weatherData.locations["Yorktown Heights, NY"].values[0].humidity;
    },
  },
  async created() {
    this.formatDate(this.date);
    this.getMapCenter();
    this.records = await API.getRecordsByReservoir(this.reservoir);
    this.getWeather();
    this.getTripData(this.date);
    this.getRecordsWithLocation(this.tripRecords);
    console.log(this.weatherData.locations.values);
  },
};
</script>
<style scoped>
.table {
  width: 100%;
  margin-top: 10px;
}
.data {
  margin-top: 10px;
}
.value {
  font-weight: 900;
}
</style>