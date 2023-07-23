<template>
  <b-col cols="6">
    <b-table striped hover :fields="fields" :items="features">
      <template #cell(level)="data">
        <span
          v-for="x in data.value"
          :key="x">
          <b-icon-star-fill></b-icon-star-fill>
        </span>
      </template>
    </b-table>
  </b-col>
</template>

<script>
export default {
  name: 'FeaturesTable',
  props: [
    'title',
    'features'
  ],
  data () {
    return {
      fields: [{
        key: 'title',
        label: this.title
      }, {
        key: 'level',
        label: '',
        tdClass: 'text-right'
      }]
    }
  }
}
</script>