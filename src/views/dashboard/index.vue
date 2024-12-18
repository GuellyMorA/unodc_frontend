<template  >
    <v-container>
        <v-dialog v-model="dialog" >

            <v-card class="mt-2"  max-width="500" >
                <v-card-title class="text-center">
                    <v-container>
                        <h3>ALERTA DE SEGUIMIENTO</h3>

                      
                                <label class="text-h5 mt-4">Denuncias asignadas a su persona </label>

                         
                    </v-container>
                </v-card-title>

                <v-card-text>
                    <v-container>

                    
                        <!-- Datos del denunciante -->
                        <v-row>



                            <h3 class="p-0 py-0 px-0 ">Denuncias sin seguimiento:</h3>
                            <v-text-field v-model="denPerDnte.sin_seguimiento" :readonly="true" 
                                placeholder="Nombre del denunciante" outlined></v-text-field>

                        </v-row>
                        <v-row>



                            <h3 class="p-0 py-0 px-0 ">Denuncias con seguimiento:</h3>
                            <v-text-field v-model="denPerDnte.con_seguimiento" :readonly="true" 
                                placeholder="Nombre del denunciante" outlined></v-text-field>

                        </v-row>
                        <v-row>

                            <h3 class="p-0 py-0 px-0 ">Denuncias rechazadas:</h3>

                            <v-text-field v-model="denPerDnte.rechazadas" :readonly="true" 
                                placeholder="CI" outlined></v-text-field>

                        </v-row>
                        <v-row>
                            <h3 class="p-0 py-0 px-0 ">Denuncias aceptadas con informe final:</h3>

                            <v-text-field v-model="denPerDnte.aceptadas" :readonly="true"  placeholder="Ciudad" outlined></v-text-field>
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

import { useRouter } from "vue-router";

import Highcharts from 'highcharts';
import { mockData } from '../../data/mock/data.js';

const denPerDnte = {

    sin_seguimiento: 12,
    con_seguimiento: 5,
    rechazadas: 4,
    aceptadas:3,
    total_denuncias: 15,

};
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
// Utilizar el ciclo de vida
onMounted(() => {
    // Código que se ejecuta después de que el componente se ha montado
    // window.alert('¡La página se ha cargado!');
    dialog.value = true;
    console.log('alert:');

    desabilitar();
    renderLineChart();
    renderLineChart2();
    renderRegionChart();
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

