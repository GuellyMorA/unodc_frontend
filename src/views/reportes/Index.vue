<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Utils from '@/utils/Utils';

import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useRouter } from "vue-router";
const router = useRouter();

// Definir variables reactivas usando `ref`
const isDisabled = ref(true);

// Función para habilitar/deshabilitar
const desabilitarXXX = () => {
    console.log('rol', rol)
  isDisabled.value = rol === 'ADMIN' || rol === 'TRANSP_NAL'  ? false : true;
};

// Definir variables reactivas usando `ref`

const rol = localStorage.getItem('rol');
const  operacionModM_DEN_DERI = ref({});
const  operAltaM_DEN_DERI = ref(true);
const  operEdicioM_DEN_DERI = ref(true);
const  operConsultaM_DEN_DERI = ref(true);

const  operacionModM_DEN_SEG = ref({});
const  operAltaM_DEN_SEG = ref(true);
const  operEdicionM_DEN_SEG = ref(true);
const  operConsultaM_DEN_SEG = ref(true);

const  operacionModM_DEN_CON = ref({});
const  operAltaM_DEN_CON = ref(true);
const  operEdicionM_DEN_CON = ref(true);
const  operConsultaM_DEN_CON = ref(true);

// Función para habilitar/deshabilitar
const desabilitar = () => {
  console.log('DERIV rol', rol)
   operacionModM_DEN_DERI.value = Utils.operacionModulo('M_DE_REP_E');
   console.log('operacionModM_ADM_USU', operacionModM_DEN_DERI)
   operAltaM_DEN_DERI.value=!operacionModM_DEN_DERI.value.operAlta.operExist;
   operEdicioM_DEN_DERI.value=!operacionModM_DEN_DERI.value.operEdicion.operExist;
  operConsultaM_DEN_DERI.value =!operacionModM_DEN_DERI.value.operConsulta.operExist;




};
// Utilizar el ciclo de vida
onMounted(() => {
  desabilitar();
});

</script>


<style scoped>

.container {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.disabled {
  background-color: #9c9393;
  opacity: 0.5;
  pointer-events: none; /* Desactiva eventos dentro del contenedor */
}
</style>


<template>

    <v-row>    
        <v-col cols="12" lg="3" sm="6">
            <div :class="['container', { 'disabled': operConsultaM_DEN_DERI }]">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Reporte</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Gráfico Estadísticas</div>                            
                                <v-btn rounded="pill" to="/reportes/estadisticas" color="primary" class="v-btn--size-large v-btn--variant-elevated mt-4 mb-2 px-7">Ingresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </div>
        </v-col>
        <v-col cols="12" lg="3" sm="6">
            <div :class="['container', { 'disabled': operConsultaM_DEN_DERI }]">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Reporte</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Mapa de denuncias</div>
                                <v-btn rounded="pill" to="/reportes/mapa" color="primary" class="v-btn--size-large v-btn--variant-elevated mt-4 mb-2 px-7">Ingresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </div>
        </v-col>
        <v-col cols="12" lg="3" sm="6">
            <div :class="['container', { 'disabled': operConsultaM_DEN_DERI }]">
                <v-card elevation="10" class="withbg">
                    <v-card-item>
                        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
                            <v-card-title class="text-h5">Reporte</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Estadísticas (PDF y Excel)</div>
                                <v-btn rounded="pill" to="/reportes/estadisticasTabla" color="primary" class="v-btn--size-large v-btn--variant-elevated mt-4 mb-2 px-7">Ingresar</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-item>
                    <img src="@/assets/school-d037249b.png" class="bg-img-1 mt-sm-0 mt-sm-n10" data-v-81e7cbfb="">
                </v-card>
            </div>   
        </v-col>
    </v-row>
</template>
