<template>
    <div id="container" style="height: 500px; min-width: 310px"></div>
  </template>
  
  <script>
  import Highcharts from 'highcharts';
  //import HighchartsVue from 'highcharts-vue';
  //import Highmaps from 'highcharts/modules/map';
  import worldMap from '@highcharts/map-collection/custom/world.geo.json';
  
  //Highmaps(Highcharts);
  
  export default {
    name: 'HighchartsMap',
    mounted() {
      this.renderChart();
    },
    methods: {
      renderChart() {
        Highcharts.mapChart('container', {
          chart: {
            map: worldMap
          },
          title: {
            text: 'World Map'
          },
          series: [{
            data: [
              ['fr', 1], ['de', 2], ['us', 3]
            ],
            mapData: worldMap,
            joinBy: 'hc-key',
            name: 'Random data',
            states: {
              hover: {
                color: '#BADA55'
              }
            },
            dataLabels: {
              enabled: true,
              format: '{point.name}'
            }
          }]
        });
      }
    }
  };
  </script>
  
  <style scoped>
  #container {
    width: 100%;
    height: 100%;
  }
  </style>
  