<template>
  <div>
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
      style="width: 100%; height: 400px"
      :mapTypeId="mapTypeId"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :title="m.title"
      ></gmap-marker>
    </GmapMap>
  </div>
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
        var marker = { lat, lng };
        console.log(marker);
        this.markers.push({ position: marker, title: label });
        console.log(this.markers);
      }
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
</style>>