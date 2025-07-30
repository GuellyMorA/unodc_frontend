<template> 
<!-- div id="container" style="height: 900px;  min-width: 700px; max-width: 1000px;  margin: 0 auto;" -->
  <div id="container" >
    <highcharts :constructorType="'mapChart'" class="hc" :options="chartOptions" ref="chart"  style="width: 100%; height: 800px; display: block;"></highcharts>
  </div>
</template>
  

<script>

import { Chart } from 'highcharts-vue';

import mapModule from "@highcharts/map-collection/countries/bo/bo-all.topo.json";
import Denuncia from '@/services/Denuncia';
import { toast } from 'vue3-toastify';

export default {
  name: 'app',
  components: {
    highcharts: Chart,
  },
  data() {

    return {
      people: [],      
      capitalsArray: [],
      username: localStorage.getItem('username'),
      deptoId: localStorage.getItem('depto_id'),
      boliviaDptos : {
          "bolivia": {
            "capitals": [
              { "city": "La Paz", "lat": -15.5, "lon": -68.15, "cantidad": 0 },
              { "city": "Chuquisaca", "lat": -19.0333, "lon": -65.2627, "cantidad": 0 },
              { "city": "Santa Cruz", "lat": -17.7833, "lon": -62.1833, "cantidad": 0 },
              { "city": "Cochabamba", "lat": -17.3895, "lon": -66.1568, "cantidad": 0 },
              { "city": "Oruro", "lat": -18.9833, "lon": -68.00, "cantidad": 0 },
              { "city": "Potosí", "lat": -20.5833, "lon": -66.75, "cantidad": 0 },
              { "city": "Tarija", "lat": -21.5333, "lon": -64.7333, "cantidad": 0 },
              { "city": "Beni", "lat": -14.8333, "lon": -64.9, "cantidad": 0 },
              { "city": "Pando", "lat": -11.5333, "lon": -67.7333, "cantidad": 0 }
            ]
          }
        },
        snackbar: {
      visible: false,
      message: '',
      color: "success",
      mode: "",
      timeout: 2500,
    },

      chartOptions: {
        chart: {
          map: mapModule,
        },
        title: {
          text: "Denuncias por departamento",
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
          pointFormat: "<b>{point.name}</b>: {point.cantidad} denuncias",
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
  mounted() {
    this.fetchData();
    this.listRepDenByDepto();
  },
  methods: {
    denunciaAddCantidad() {
      // filtrar solo los roles-modulos  en estado activo
      // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = this.people.map(denuncia => ({ ...denuncia }));
      
      this.capitalsArray = this.boliviaDptos.bolivia.capitals;
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = this.capitalsArray.find(p => p.city === denuncia.descripcion); // Buscar la persona por id

              if (depto) {
                depto.cantidad = denuncia.cantidad; // Nuevo valor para la propiedad estado
                 console.log(`cod_denuncia para el id ${denuncia.descripcion}: ${denuncia.cantidad}`);
              } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.descripcion}`);
              }           
              
     
      });
         this.fetchData();
    },

    async listRepDenByDepto() {
      console.log('this.deptoId', this.deptoId );
      await  Denuncia.listRepDenByDepto( this.deptoId )
          .then((response) => {
            console.log("listRepDenByDepto  : ", response.data, response.status);
            if (response.status === 200) {
              this.people = response.data;
              this.denunciaAddCantidad();

            } else {
              this.showSnackbar('Error recuperando listRepDenByDepto ' + response, 'red');
            }
          })
          .catch(error => {
            this.showSnackbar('Error recuperando listRepDenByDepto ' + error, 'red');
            toast.error('Error recuperando datos por departamenteo: ' + 'Revise configuracion del mapa', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
          });
    },


    async fetchData() {
      try {
 
        // await axios.get("/data.json"); // Ruta al archivo JSON mock

        const capitals = this.capitalsArray; //boliviaDptos.bolivia.capitals;

        // Formatear datos para el mapa
        const formattedData = capitals.map((capital) => ({
          name: capital.city,
          lat: capital.lat,
          lon: capital.lon,
          cantidad: capital.cantidad,
        }));

        // Actualizar opciones del gráfico
        this.chartOptions.series[1].data = formattedData;
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    },

    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },


  },

};



</script>
  
<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}

h1 {
  color: #333;
}



</style>
  