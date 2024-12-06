<template>
  <div>
    <highcharts :constructorType="'mapChart'" class="hc" :options="chartOptions" ref="chart"></highcharts>
  </div>
</template>
  

  <script>
//import Highcharts from 'highcharts'
//import HighchartsVue from 'highcharts-vue'
import { Chart } from 'highcharts-vue';
import Highcharts from "highcharts";
import Maps from "highcharts/modules/map";
import HighchartsVue from "highcharts-vue";
  import mapModule from "@highcharts/map-collection/countries/bo/bo-all.topo.json";
 // import { Chart } from 'highcharts-vue'
//import Highcharts from "highcharts";

  //import { Chart } from "highcharts-vue";
  //import Highcharts from "highcharts";
  //import hcHeatmap from "highcharts/modules/heatmap";
  
  //hcHeatmap(Highcharts);
 // import Highmaps from 'highmaps';

//Highcharts.mapChart = Highmaps.mapChart;

  export default {
    name: 'app',
  components: {
    highcharts: Chart,
  },
    data() {
      
      return {
        chartOptions: {
          chart: {
            map: mapModule,
          },
          title: {
            text: "Denuncias de Tránsito por Capitales de Bolivia",
          },
          subtitle: {
            text: "Cantidad de denuncias reportadas",
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: "bottom",
            },
          },
          tooltip: {
            headerFormat: "",
            pointFormat: "<b>{point.name}</b>: {point.reports} denuncias",
          },
          series: [
            {
              // Capa del mapa base
              name: "Regiones",
              mapData: mapModule,
              borderColor: "#A0A0A0",
              nullColor: "#F3F3F3",
              showInLegend: false,
            },
            {
              // Capa de las capitales
              type: "mappoint",
              name: "Denuncias",
              color: "#FF5733",
              data: [], // Se llenará dinámicamente
              dataLabels: {
                enabled: true,
                format: "{point.name}",
              },
            },
          ],
        },
      };
    },
    methods: {
      async fetchData() {
        try {
          const response ={
  "bolivia": {
    "capitals": [
      { "city": "La Paz", "lat": -16.5, "lon": -68.15, "reports": 150 },
      { "city": "Sucre", "lat": -19.0333, "lon": -65.2627, "reports": 45 },
      { "city": "Santa Cruz", "lat": -17.7833, "lon": -63.1833, "reports": 200 },
      { "city": "Cochabamba", "lat": -17.3895, "lon": -66.1568, "reports": 120 },
      { "city": "Oruro", "lat": -17.9833, "lon": -67.15, "reports": 60 },
      { "city": "Potosí", "lat": -19.5833, "lon": -65.75, "reports": 35 },
      { "city": "Tarija", "lat": -21.5333, "lon": -64.7333, "reports": 25 },
      { "city": "Trinidad", "lat": -14.8333, "lon": -64.9, "reports": 15 },
      { "city": "Cobija", "lat": -11.0333, "lon": -68.7333, "reports": 5 }
    ]
  }
};
          // await axios.get("/data.json"); // Ruta al archivo JSON mock

          const capitals = response.bolivia.capitals;
  
          // Formatear datos para el mapa
          const formattedData = capitals.map((capital) => ({
            name: capital.city,
            lat: capital.lat,
            lon: capital.lon,
            reports: capital.reports,
          }));
  
          // Actualizar opciones del gráfico
          this.chartOptions.series[1].data = formattedData;
        } catch (error) {
          console.error("Error al cargar datos:", error);
        }
      },
    },
    mounted() {
      this.fetchData();
    },
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  h1 {
    color: #333;
  }
  </style>
  