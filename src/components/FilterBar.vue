<!--NOT IN USE YET -->
<template>
  <v-select :items="items" label="Choose Season" v-model="selectedYear" solo class="search" @input="getSelection()"></v-select>
</template>
<script>
export default {
    props: ["items"],
    data(){
        return {
            selectedYear: ''
        }
    },
    methods: {
        getSelection(){
            console.log(this.selectedYear)
        }
    }
    
}
</script>

<style scoped>
    .search{
        padding-top: 30px
    }
</style>