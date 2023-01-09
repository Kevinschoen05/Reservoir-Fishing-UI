<template>
    <v-container>
        <h1>Reservoir Leaderboard</h1>
        <h3>Largest Fish Caught on Each Reservoir By Weight</h3>
        <v-select :items="years" label="Choose Season" v-model="selectedYear" solo class="search"></v-select>
        <v-row no-gutters class="justify-space-between align-center">
            <v-col class="pa-3" sm="12">
                <v-card class="ma-3">
                    <h1 class="header pa-3">Croton Reservoir</h1>
                    <v-simple-table width="100">
                        <template>
                            <thead>
                                <tr>
                                    <td class="header">Angler</td>
                                    <td class="header">Species</td>
                                    <td class="header">Weight</td>
                                    <td class="header">Year</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="fish in crotonLeaders" :key="fish.weight">
                                    <td> {{ fish[0].angler }}</td>
                                    <td>{{ fish[0].species }}</td>
                                    <td>{{ fish[0].weight }}</td>
                                    <td>{{ fish[0].date.slice(0, 4) }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
                <v-card class="ma-3">
                    <h1 class="header pa-3">Muscoot Reservoir</h1>
                    <v-simple-table width="100">
                        <template>
                            <thead>
                                <tr>
                                    <td class="header">Angler</td>
                                    <td class="header">Species</td>
                                    <td class="header">Weight</td>
                                    <td class="header">Year</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="fish in muscootLeaders" :key="fish.weight">
                                    <td> {{ fish[0].angler }}</td>
                                    <td>{{ fish[0].species }}</td>
                                    <td>{{ fish[0].weight }}</td>
                                    <td>{{ fish[0].date.slice(0, 4) }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import API from "../api";
export default {
    name: "Leaderboard",
    watch: {
        selectedYear: function () {
            this.sortedMuscootRecords = [],
            this.sortedCrotonRecords = [],
            this.muscootLeaders =[],
            this.crotonLeaders = [],
            this.getTopFish(this.records)
        },
    },

    data() {
        return {
            records: [],
            sortedMuscootRecords: [],
            sortedCrotonRecords: [],
            muscootLeaders: [],
            crotonLeaders: [],
            reservoirs: ["Croton", "Muscoot"],
            years: [
                "All",
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
            selectedYear: "All",
        };
    },
    methods: {
        getTopFish() {
            for (let i = 0; i < this.records.length; i++) {
                if (this.records[i].reservoir === "Muscoot" && this.records[i].date.slice(0, 4) === this.selectedYear ) {
                    this.sortedMuscootRecords.push([this.records[i], this.records[i].weight])
                }
                else if (this.records[i].reservoir === "Muscoot" && this.selectedYear== 'All') {
                    this.sortedMuscootRecords.push([this.records[i], this.records[i].weight])
                }
                else if (this.records[i].reservoir === "Croton"  && this.records[i].date.slice(0, 4) === this.selectedYear) {
                    this.sortedCrotonRecords.push([this.records[i], this.records[i].weight])
                }
                else if (this.records[i].reservoir === "Croton" && this.selectedYear== 'All') {
                    this.sortedCrotonRecords.push([this.records[i], this.records[i].weight])
                }
            }
            this.sortedCrotonRecords.sort(function (a, b) {
             return b[1] - a[1];
            });
            this.sortedMuscootRecords.sort(function (a, b) {
             return b[1] - a[1];
            });

            for(let i = 0; i < 10; i++){
                this.crotonLeaders.push(this.sortedCrotonRecords[i]) 
                this.muscootLeaders.push(this.sortedMuscootRecords[i])
            }

            console.log(this.sortedCrotonRecords, this.sortedMuscootRecords)
            console.log(this.crotonLeaders, this.muscootLeaders)


        },

    },
    async created() {
        this.records = await API.getAllRecords();
        this.getTopFish()
    },
};
</script>
<style scoped>
.search {
    padding-top: 30px;
}

.header {
    font-weight: 900;
}
</style>>