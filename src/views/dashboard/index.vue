<template  >
    <div :class="['container', { 'disabled': isDisabled }]">

        <v-row class="p-0 py-0 px-0 mt-2 mb-2">
            <v-col cols="6" class="p-0 py-0 px-0">
                <div class="chart" id="lineChart"></div>
            </v-col>
            <v-col cols="6" class="p-0 py-0 px-1">
                <div class="chart" id="regionChart"></div>
            </v-col>
        </v-row>

        <!--      <div class="grid-container">
       <tr>   
        <td>
     <div class="chart" id="lineChart"></div>
       </td>
       <td>
        <div class="chart" id="regionChart"></div>
       </td>
        </tr>
          </div>
  
    </div>
   -->


        <v-row>
            <v-col cols="12" lg="3" sm="6">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Denuncias hoy</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Administracion del Sistema
                                </div>
                                <v-btn rounded="pill" to="/administracion/admUsuarioForm" color="primary"
                                    class="v-btn--size-large v-btn--variant-elevated mt-4 mb-2 px-7">Ingresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </v-col>
            <v-col cols="12" lg="3" sm="6">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Denuncias con informe final de aceptacion</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Administracion de roles
                                </div>
                                <v-btn rounded="pill" to="/administracion/admRolForm" color="primary"
                                    class="v-btn--size-large v-btn--variant-elevated mt-4 mb-2 px-7">Ingresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </v-col>
            <v-col cols="12" lg="3" sm="6">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Denuncias con seguimiento hasta la fecha</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Administracion de perfiles
                                </div>
                                <v-btn rounded="pill" to="/administracion/admPerfilForm" color="primary"
                                    class="v-btn--size-large v-btn--variant-elevated mt-4 mb-2 px-7">Ingresar</v-btn>
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

import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRouter } from "vue-router";

import Highcharts from 'highcharts';
import { mockData } from '../../mock/data.js';

const router = useRouter();



// Definir variables reactivas usando `ref`
const isDisabled = ref(true);

const rol = localStorage.getItem('rol');

// Función para habilitar/deshabilitar
const desabilitar = () => {
    console.log('rol:',rol);
    isDisabled.value = false; // rol === 'ADMIN' || rol === 'TRANSP_NAL' || rol === 'DIRECT_NAL' ? false : true;
};
 
// Utilizar el ciclo de vida
onMounted(() => {
    desabilitar();
    renderLineChart();
    renderRegionChart();
});
const renderLineChart = () => {

    const meses = mockData.denunciasPorMes.map(d => d.mes);
    const totales = mockData.denunciasPorMes.map(d => d.total);

    Highcharts.chart('lineChart', {
        chart: { type: 'line' },
        title: { text: 'Denuncias Mensuales' },
        xAxis: { categories: meses },
        yAxis: { title: { text: 'Número de Denuncias' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
};
const renderRegionChart = () => {


    // Similar al renderPieChart, puedes personalizarlo
    // Para ilustrar, dejémoslo como un gráfico de columnas más
    const regiones = mockData.denunciasPorRegion.map(d => d.region);
    const totales = mockData.denunciasPorRegion.map(d => d.total);

    Highcharts.chart('regionChart', {
        chart: { type: 'column' },
        title: { text: 'Denuncias por Región' },
        xAxis: { categories: regiones },
        yAxis: { title: { text: 'Número de Denuncias' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
}



</script>




<style scoped>
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
}</style>

