<template>
  <v-simple-table>
    <template>
      <thead>
        <tr>
          <td class="header">Reservoir</td>
          <td class="header">Total Caught</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="species in anglerCounts" :key="species.species">
          <td>{{ species.species }}</td>
          <td>{{ species.count }}</td>
        </tr>
        <tr>
          <td class="header">Total</td>
          <td>{{ anglerTotal }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>