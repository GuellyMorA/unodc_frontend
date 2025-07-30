
<template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import { Chart } from 'highcharts';
import regions from '../../data/mock/regions.js';
import denuncias from '../../data/mock/denuncias.js';

export default {
  data() {
    return {
      regiones: [],
      chartOptions: {
        chart: {
          type: 'map',
          map: 'countries/bolivia/bolivia'
        },
        title: {
          text: 'Denuncias de tránsito en Bolivia'
        },
        series: [
          {
            name: 'Denuncias',
            data: []
          }
        ]
      }
    }
  },
  mounted() {
    this.regiones=regions.map(region => {
      return {
        name: region.name,
        value: Math.random() * 100
      }
    });
    this.chartOptions.series[0].data = this.regiones;
  }
}
</script>
