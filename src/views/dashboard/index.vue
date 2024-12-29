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
                                    dias
                                </div>
                                <label> {{ 3 }} </label>

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
                            <v-card-title class="text-h5">Inf. Fin. Aceptacion</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Denuncias con Inf. Final
                                    de Aceptacion
                                </div>
                                <label> {{ 7 }} </label>
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
                                <label> {{ 7 }} </label>
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
                                <label> {{ 76 }} </label>

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

import { useRouter } from "vue-router";

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
    await Seguimiento.seguimientolistRepByNivelGeoByUsuId(usuarios_id,depto_id ) 
        .then((response) => {
          console.log("seguimientolistRepByNivelGeoByUsuId  : ", response.data, response.status);
          if (response.status === 200) {

            seguimientosArray = response.data;
            segEstadoCount.nuevas_hoy = seguimientosArray[4].cantidad; //error  nuevas hoy  SOLICITADO
            segEstadoCount.retraso = seguimientosArray[0].cantidad;// Denuncias con RETRASO en los plazos:
            segEstadoCount.rechazado = seguimientosArray[2].cantidad; // denuncias con RECHAZO

            segEstadoCount.con_seguimiento = seguimientosArray[3].cantidad;// Denuncias SIN RETRASO , con seguimiento , 
            segEstadoCount.conclusion = seguimientosArray[1].cantidad; // Denuncias con COCLUSION, aceptadas con informe final: 

            console.log("segEstadoCount  : ", segEstadoCount, response.status);
            //segEstadoCount.total_denuncias = seguimientosArray.cantidad[1];
           
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

