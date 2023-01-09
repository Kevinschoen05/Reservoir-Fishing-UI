<template>
  <v-container>
    <v-alert
      border="left"
      close-text="Close Alert"
      color="green accent-4"
      dismissible
      v-if="this.locationAdded"
      >{{ "Location Successfully Added" }}</v-alert
    >
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Record New Fish</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            @submit.prevent="submitForm"
            class="pa-5"
            enctype="multipart/form-data"
          >
            <v-select
              label="Fish Species"
              :items="species"
              v-model="record.species"
              prepend-icon="mdi-fish"
              :rules="rules"
            ></v-select>
            <v-text-field
              label="Name of Angler"
              v-model="record.angler"
              prepend-icon="mdi-account"
              :rules="rules"
            ></v-text-field>
            <v-text-field
              label="Weight of Fish"
              v-model="record.weight"
              prepend-icon="mdi-scale"
              :rules="rules"
            ></v-text-field>
            <v-select
              label="Reservoir"
              :items="reservoirs"
              v-model="record.reservoir"
              prepend-icon="mdi-map"
              :rules="rules"
            ></v-select>
            <v-textarea
              label="Comments"
              v-model="record.comment"
              prepend-icon="mdi-note"
            ></v-textarea>
            <v-btn class="mt-3 mr-3" @click="getCurrentLocation()"
              >Add Current Location</v-btn
            >
            <v-btn type="submit" class="mt-3" color="primary">Add Fish</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import API from "../api";
import exifr from "exifr";
export default {
  watch: {
    latitude: function () {
      this.locationAdded = true;
    },
    image: function () {
      console.log("Getting coordinate Data");
      this.getExif(this.image);
    },
  },
  data() {
    return {
      rules: [(value) => !!value || "This field is required"],
      locationAdded: false,
      record: {
        species: "",
        angler: "",
        weight: "",
        reservoir: "",
        comment: "",
        date: "",
        image: "",
        latitude: "",
        longitude: "",
      },
      image: "",
      coordinates: ["test"],
      latitude: "",
      longitude: "",
      reservoirs: ["Muscoot", "Croton"],
      species: [
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
      ],
    };
  },
  methods: {
    selectFile(file) {
      this.image = file[0];
    },
    getExif(image) {
      exifr
        .gps(image)
        .then(
          (coords) => (
            (this.latitude = coords.latitude),
            (this.longitude = coords.longitude)
          )
        );
    },
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
      console.log(this.latitude, this.longitude);
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("species", this.record.species);
      formData.append("angler", this.record.angler);
      formData.append("weight", this.record.weight);
      formData.append("reservoir", this.record.reservoir);
      formData.append("comment", this.record.comment);
      formData.append("latitude", this.latitude);
      formData.append("longitude", this.longitude);
      if (this.$refs.form.validate()) {
        const response = await API.addRecord(formData);
        this.$router.push({
          name: "Home",
          params: { message: response.message },
        });
      }
    },
  },
};
</script>