<template  >
    <v-container>
  
        <v-dialog v-model="dialog" >

            <v-card class="mx-auto mt-2"  max-width="500" >
                <v-card-title class="text-center">
                    <v-container>
                        <h3>ALERTA DE SEGUIMIENTO</h3>
                      
                                <label class="text-h5 mt-4">Denuncias asignadas a su persona </label>
                         
                    </v-container>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <!-- Denuncias nuevas asignadas -->
                        <v-row>
                            <h3 class="p-0 py-2 px-0 ">Denuncias nuevas :</h3>
                            <v-text-field  v-model="segEstadoCount.nuevas_hoy" :readonly="true" 
                                outlined></v-text-field>

                        </v-row>
                        <v-row>

                        <h3 class="p-0 py-2 px-0 ">Denuncias rechazadas:</h3>

                        <v-text-field v-model="segEstadoCount.rechazado" :readonly="true" 
                        outlined></v-text-field>

                        </v-row>                    
                 
                        <v-row>

                            <h3 class="p-0 py-2 px-0 ">Denuncias sin retraso en los plazos:</h3>
                            <v-text-field v-model="segEstadoCount.con_seguimiento" :readonly="true" 
                                outlined></v-text-field>

                        </v-row>
                                           <!-- Denuncias sin seguimiento -->
                          <v-row>
                            <h3 class="p-0 py-2 px-0 ">Denuncias con retraso en los plazos:</h3>
                            <v-text-field v-model="segEstadoCount.retraso" :readonly="true" 
                               outlined></v-text-field>

                        </v-row>

                        <v-row>
                            <h3 class="p-0 py-2 px-0 ">Denuncias aceptadas con informe final:</h3>

                            <v-text-field v-model="segEstadoCount.conclusion" :readonly="true" 
                            outlined></v-text-field>
                        </v-row>


                    </v-container>
                </v-card-text>

                <!-- Botón de Enviar -->
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="custom-green-btn" text @click="close"> Cerrar </v-btn>

                </v-card-actions>
            </v-card>
        </v-dialog>
    

    </v-container>

    <div :class="['container', { 'disabled': isDisabled }]">

        <v-row class="p-0 py-0 px-4">
            <a :href="manualLink" target="_blank" rel="noopener noreferrer" class="download-link">
                <img src="/assets/images/icon/success.svg" alt="Icono PDF" class="pdf-icon"> Descargar Manual de usuario
             </a>
          
        </v-row>
        <v-row class="p-0 py-0 px-4 mb-4">   
            <a :href="manualLink" target="_blank" rel="noopener noreferrer" class="download-link">
                <img src="/assets/images/icon/success.svg" alt="Icono PDF" class="pdf-icon"> Descargar Video tutorial
             </a>            
          
        </v-row>

        <v-row class="p-0 py-0 px-0 mt-2 mb-2">
            <v-col cols="4" class="p-0 py-0 px-0">
                <div class="chart" id="lineChart"></div>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
                <div class="chart" id="regionChart"></div>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
                <div class="chart" id="lineChart2"></div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="3">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Denuncias hoy</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Denuncias de los ultimos 5
                                    días
                                </div>
                                <label> {{ segEstadoCount.nuevas_hoy }} </label>

                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Inf. Fin. Aceptación</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Denuncias con Inf. Final
                                    de Aceptación
                                </div>
                                <label> {{ segEstadoCount.conclusion  }} </label>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Inf. Fin. Rechazo</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Denuncias con Inf. Final
                                    de Rechazo
                                </div>
                                <label> {{ segEstadoCount.rechazado}} </label>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </v-col>

            <v-col cols="3">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Segs. a la fecha</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Denuncias con seguimiento
                                    hasta la fecha
                                </div>
                                <label> {{ segEstadoCount.con_seguimiento}} </label>

                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/welcome-bg2-660061c8.png" class="bg-img-1 mb-n4 mt-4" alt="image" width="330"
                        data-v-81e7cbfb="">
                </v-card>
            </v-col>


        </v-row>
    </div>
</template>

<script setup lang="ts">
//import { ref } from 'vue';
import { ref, onMounted } from 'vue';
import { reactive } from 'vue';

import Highcharts from 'highcharts';
import { mockData } from '../../data/mock/data.js';
import Seguimiento from '@/services/Seguimiento';



const segEstadoCount = reactive({
    nuevas_hoy:0, // ASIGNADO_HOY al investigador , o para el caso de jefe departamental son las denuncias en estado SOLICITADO (pendientes de asignar) 
    retraso: 0, // RETRASO
    conclusion:0, //aceptadas CONCLUSION
    rechazado: 0, // RECHAZADO
    con_seguimiento: 0,  //  SEGUIMIENTO esta ASIGNADO  // SEGUIMIENTO  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
    solicitado: 0,  //sin_seguimiento: 12, // SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero

    //total_denuncias: 0, // TOTAL

});
// Definir variables reactivas usando `ref`
const isDisabled = ref(true);
const dialog = ref(false);
const rol = localStorage.getItem('rol');

const manualLink = ref( './manuales/manual.pdf'); // Ruta al archivo PDF en la carpeta public
  


// Función para habilitar/deshabilitar
const desabilitar = () => {
    console.log('rol:', rol);
    isDisabled.value = false; // rol === 'ADMIN' || rol === 'TRANSP_NAL' || rol === 'DIRECT_NAL' ? false : true;
};
const close = () => {
    dialog.value = false;

};
 let   seguimientosArray= [];
   
// Utilizar el ciclo de vida
onMounted(() => {
    // Código que se ejecuta después de que el componente se ha montado
    // window.alert('¡La página se ha cargado!');
  
    console.log('alert:');

    desabilitar();
    renderLineChart();
    renderLineChart2();
    renderRegionChart();
    const username= localStorage.getItem('username');
    const userId= localStorage.getItem('usuario_id');
    const rol= localStorage.getItem('rol');
    const deptoId= localStorage.getItem('depto_id');

    seguimientolistRepByNivelGeoByUsuId( userId , deptoId  );

  dialog.value = true;
});
const renderLineChart = () => {

    const meses = mockData.denunciasPorDia.map(d => d.dia);
    const totales = mockData.denunciasPorDia.map(d => d.total);

    Highcharts.chart('lineChart', {
        chart: { type: 'line' },
        title: { text: 'Denuncias realizadas ultimos 5 dias' },
        xAxis: { categories: meses },
        yAxis: { title: { text: 'Número de Denuncias' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
};

const  seguimientolistRepByNivelGeoByUsuId =async (usuarios_id,depto_id ) => {
    console.log(`usuarios_id ${usuarios_id} , depto_id: ${depto_id}`);

    await Seguimiento.seguimientolistRepByNivelGeoByUsuId(usuarios_id,depto_id ) 
        .then((response) => {
          console.log("seguimientolistRepByNivelGeoByUsuId  : ", response.data, response.status);
          if (response.status === 200) {

            seguimientosArray = response.data;
            seguimientosArray.forEach(async denuncia => {
       
              //  const depto = this.denunciasPorTipo.find(p => p.codigo === denuncia.estado); // Buscar la persona por id

                if (denuncia.estado ==='ASIGNADO_HOY') {
                    segEstadoCount.nuevas_hoy = denuncia.cantidad; //ASIGNADO_HOY al investigador , o para el caso de jefe departamental son las denuncias en estado SOLICITADO (pendientes de asignar) 
                    console.log(`cod_denuncia para el id ${denuncia.estado}: ${denuncia.cantidad}`);
                }
                if (denuncia.estado ==='RETRASO') {
                    segEstadoCount.retraso = denuncia.cantidad; //ARETRASO
                    console.log(`cod_denuncia para el id ${denuncia.estado}: ${denuncia.cantidad}`);
                } 
                if (denuncia.estado ==='CONCLUSION') {
                    segEstadoCount.conclusion = denuncia.cantidad; //aceptadas CONCLUSION  con inf final de aceptacion
                    console.log(`cod_denuncia para el id ${denuncia.estado}: ${denuncia.cantidad}`);
                }
                if (denuncia.estado ==='RECHAZADO') {
                    segEstadoCount.rechazado = denuncia.cantidad; //RECHAZADO
                    console.log(`cod_denuncia para el id ${denuncia.estado}: ${denuncia.cantidad}`);
                }                 
                if (denuncia.estado ==='ASIGNADO' || denuncia.estado ==='SEGUIMIENTO') {
                    segEstadoCount.con_seguimiento = denuncia.cantidad;  //  SEGUIMIENTO esta ASIGNADO  // SEGUIMIENTO  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
                    console.log(`cod_denuncia para el id ${denuncia.estado}: ${denuncia.cantidad}`);
                }
                if (denuncia.estado ==='SOLICITADO') {
                    segEstadoCount.solicitado = denuncia.cantidad;  //sin_seguimiento: SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero
                    console.log(`cod_denuncia para el id ${denuncia.estado}: ${denuncia.cantidad}`);
                }
              //  else {
               // console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.estado}`);
              //  }           
                

        });
                
           
        } else {
            //showSnackbar('Error recuperando seguimientolistRepByNivelGeoByUsuId ' + response, 'red');
               console.log("error seguimientolistRepByNivelGeoByUsuId  response  : ", response);

         }
        })
        .catch(error => {
            console.log("error seguimientolistRepByNivelGeoByUsuId error  : ", error);

          //showSnackbar('Error recuperando seguimientolistRepByNivelGeoByUsuId ' + error, 'red');
        });
    };
    
const renderRegionChart = () => {
    // Similar al renderPieChart, puedes personalizarlo
    // Para ilustrar, dejémoslo como un gráfico de columnas más
    //  const regiones = mockData.denunciasPorRegion.map(d => d.region);
    // const totales = mockData.denunciasPorRegion.map(d => d.total);
    const meses = mockData.denunciasPorMes.map(d => d.mes);
    const totales = mockData.denunciasPorMes.map(d => d.total);


    Highcharts.chart('regionChart', {
        chart: { type: 'column' },
        title: { text: 'Denuncias realizadas por mes' },
        xAxis: { categories: meses },
        yAxis: { title: { text: 'Número de Denuncias' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
}

const renderLineChart2 = () => {

    const meses = mockData.denunciasRechazadas.map(d => d.mes);
    const totales = mockData.denunciasRechazadas.map(d => d.total);

    Highcharts.chart('lineChart2', {
        chart: { type: 'line' },
        title: { text: 'Denuncias rechazadas' },
        xAxis: { categories: meses },
        yAxis: { title: { text: 'Número de Rechazos' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
};

</script>




<style scoped>

.pdf-icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.download-link {
  display: inline-flex;
  align-items: center;
  color: #007bff;
  text-decoration: none;
}
.custom-green-btn {
    background-color: #849C58;
    /* #073d09    cambio a color verde oscuro  */
    /* Verde */
    color: white;
    /* Texto en blanco */
}

.container {
    padding: 20px;
    /* border: 1px solid #ccc;  */
    border-radius: 5px;
}

.disabled {
    background-color: #9c9393;
    opacity: 0.5;
    pointer-events: none;
    /* Desactiva eventos dentro del contenedor */
}
</style>

