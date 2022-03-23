<template>
  <div>
    <h1>{{ formattedDate }}</h1>
    <h1>{{ reservoir }}</h1>

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
  </div>
</template>
<script>
import API from "../api";
export default {
  data() {
    return {
      records: [],
      tripRecords: [],
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
      console.log(this.mappedRecords);
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
        console.log(url);
        var marker = { lat, lng };
        console.log(marker);
        this.markers.push({ position: marker, title: label, icon: url });
        console.log(this.markers);
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
  },
  async created() {
    this.formatDate(this.date);
    this.records = await API.getRecordsByReservoir(this.reservoir);
    this.getTripData(this.date);
    this.getRecordsWithLocation(this.tripRecords);
    console.log(this.tripRecords);
  },
};
</script>