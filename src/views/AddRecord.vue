<template>
  <v-container>
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
            <v-file-input
              @change="selectFile"
              show-size
              counter
              multiple
              label="Select Image to Upload Catch Location"
            >
            </v-file-input>
            <v-btn type="submit" class="mt-3" color="primary">Add Fish</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    <script
      type="application/javascript"
      src="https://cdn.jsdelivr.net/npm/exif-js"
    ></script>
  </v-container>
</template>
<script>
import API from "../api";
import EXIF from "exif-js";
export default {
  watch: {
    image: function () {
      console.log("Getting coordinate Data");
      this.coordinates = this.getExif();
      console.log(this.coordinates);
    },
  },
  data() {
    return {
      rules: [(value) => !!value || "This field is required"],
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
      coordinates: [],
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
    getExif() {
      var image = this.image;

      EXIF.getData(image, function () {
        var imageData = this;

        // get latitude from exif data and calculate latitude decimal
        var latDegree = imageData.exifdata.GPSLatitude[0].numerator;
        var latMinute = imageData.exifdata.GPSLatitude[1].numerator;
        var latSecond = imageData.exifdata.GPSLatitude[2].numerator;
        var latDirection = imageData.exifdata.GPSLatitudeRef;

        var latFinal = convertDMSToDD(
          latDegree,
          latMinute,
          latSecond,
          latDirection
        );
        //console.log(latFinal);

        // get longitude from exif data and calculate longitude decimal
        var lonDegree = imageData.exifdata.GPSLongitude[0].numerator;
        var lonMinute = imageData.exifdata.GPSLongitude[1].numerator;
        var lonSecond = imageData.exifdata.GPSLongitude[2].numerator;
        var lonDirection = imageData.exifdata.GPSLongitudeRef;

        var lonFinal = convertDMSToDD(
          lonDegree,
          lonMinute,
          lonSecond,
          lonDirection
        );
        console.log(lonFinal);
        return latFinal;
      });
      function convertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = degrees + minutes / 60 + seconds / 360000;
        if (direction == "S" || direction == "W") {
          dd = dd * -1;
        }
        return dd;
      }
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