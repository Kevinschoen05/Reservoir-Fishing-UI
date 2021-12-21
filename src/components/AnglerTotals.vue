<template>
  <v-simple-table>
    <template>
      <thead>
        <tr>
          <td>Species</td>
          <td>Total Caught</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="species in anglerCounts" :key="species.species">
          <td>{{ species.species }}</td>
          <td>{{ species.count }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ["angler", "records"],
  data() {
    return {
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
      ],
    };
  },
  methods: {
    getTotalsByAngler(angler) {
      for (var i = 0; i < this.records.length; i++) {
        if (this.records[i].angler === angler) {
          console.log(angler);
          for (var k = 0; k < this.anglerCounts.length; k++) {
            if (this.records[i].species === this.anglerCounts[k].species) {
              this.anglerCounts[k].count++;
              console.log(this.anglerCounts.count);
            }
          }
        }
      }
    },
  },
  async created() {
    this.getTotalsByAngler(this.angler);
  },
};
</script>Î