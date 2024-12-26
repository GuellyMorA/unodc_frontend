<template>
    <div>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </template>
  
  <script>

  import mapData from "@highcharts/map-collection/countries/bo/bo-all.geo.json"; // Mapa de Bolivia
  import Highcharts from "highcharts";


  export default {
    name: "MapaBolivia",
    data() {
      return {
        // Mock data para las capitales y cantidad de denuncias
        mockData: [
          { name: "La Paz", value: 120 },
          { name: "Sucre", value: 80 },
          { name: "Santa Cruz", value: 200 },
          { name: "Cochabamba", value: 90 },
          { name: "Tarija", value: 40 },
          { name: "Potosí", value: 70 },
          { name: "Beni", value: 30 },
          { name: "Pando", value: 10 },
        ],
      };
    },
    
    computed: {
      chartOptions() {
        return {
          title: {
            text: "Denuncias de Tránsito en las Capitales de Bolivia"
          },
          mapView: {
            // Ajusta esta área de visualización si es necesario
            zoom: 1,
            center: [-64.5, -15.5]
          },
          colorAxis: {
            min: 0,
            minColor: "#FFFFFF",
            maxColor: "#FF0000"
          },
          series: [
            {
              data: this.mockData,
              mapData: mapData,
              joinBy: ["name", "name"],
              name: "Denuncias",
              states: {
                hover: {
                  color: "#BADA55"
                }
              },
              dataLabels: {
                enabled: true,
                format: "{point.name}: {point.value}"
              }
            }
          ]
        };
      }
    },
  
    created() {
      Highcharts.mapChart(this.$refs.chartContainer, this.chartOptions);
    }
  };
  </script>
  
  <style scoped>
  #container {
    height: 400px; /* Ajustar según sea necesario */
  }
  </style>