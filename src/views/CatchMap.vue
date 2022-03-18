<template>
  <v-container>
    <h1>Catch Map</h1>
    <h3>Catch Location of Uploaded Fish by Reservoir</h3>
    <v-select
      :items="reservoirs"
      label="Choose Reservoir"
      v-model="selectedReservoir"
      solo
      class="search"
    ></v-select>

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
      <ul class="markerKeys">
        <li class="markerKey-icon">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            alt=""
          />
          Large Mouth Bass
        </li>
        <li class="markerKey-icon">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            alt=""
          />
          Small Mouth Bass
        </li>
        <li class="markerKey-icon">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png"
            alt=""
          />
          Rock Bass
        </li>
        <li class="markerKey-icon">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            alt=""
          />
          Pickerel
        </li>
        <li class="markerKey-icon">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/orange-dot.png"
            alt=""
          />
          Perch
        </li>
        <li class="markerKey-icon">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png"
            alt=""
          />
          Sunny
        </li>
        <li class="markerKey-icon">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            alt=""
          />
          Crappie
        </li>
      </ul>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  watch: {
    selectedReservoir: function () {
      this.markers = [];
      if (this.selectedReservoir === "Croton") {
        this.center = this.crotonCenter;
      } else if (this.selectedReservoir === "Muscoot") {
        this.center = this.muscootCenter;
      }
      this.getRecordsWithLocation(this.records, this.selectedReservoir);
    },
  },
  data() {
    return {
      reservoirs: ["Muscoot", "Croton"],
      selectedReservoir: "",
      muscootCenter: { lat: 41.2695, lng: -73.7051 },
      crotonCenter: { lat: 41.251568, lng: -73.730955 },
      center: { lat: 41.260629, lng: -73.717068 },
      records: [],
      mappedRecords: [],
      key: process.env.VUE_APP_MAPS_API,
      markers: [],
      mapTypeId: "satellite",
    };
  },
  methods: {
    getRecordsWithLocation(records, reservoir) {
      for (var i = 0; i < records.length; i++) {
        if (
          records[i].latitude !== "" &&
          records[i].latitude !== "undefined" &&
          records[i].reservoir === reservoir
        ) {
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
  },
  async created() {
    this.records = await API.getAllRecords();
  },
};
</script>
<style scoped>
.search {
  padding-top: 30px;
}
.map {
  display: flex;
  width: 80%;
  justify-content: center;
}
.markerKeys {
  display: inline;
  margin-top: 20px;
}
.markerKey-icon {
  display: inline;
}
</style>>