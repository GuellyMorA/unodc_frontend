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
                            <h3 class="p-0 py-2 px-0 ">Denuncias nuevas asignadas hoy:</h3>
                            <v-text-field  v-model="segEstadoCount.nuevasHoy" :readonly="true" 
                                outlined></v-text-field>

                        </v-row>
                        <v-row>
                        <h3 class="p-0 py-2 px-0 ">Denuncias con informe de rechazo:</h3>

                        <v-text-field v-model="segEstadoCount.conInfFinalRechazo" :readonly="true" 
                        outlined></v-text-field>

                        </v-row>                    
                 
                        <v-row>
                            <h3 class="p-0 py-2 px-0 ">Denuncias sin retraso en los plazos:</h3>
                            <v-text-field v-model="segEstadoCount.sinRetraso" :readonly="true" 
                                outlined></v-text-field>

                        </v-row>               <!-- Denuncias sin seguimiento -->
                          <v-row>
                            <h3 class="p-0 py-2 px-0 ">Denuncias con retraso en los plazos:</h3>
                            <v-text-field v-model="segEstadoCount.conRetraso" :readonly="true" 
                               outlined></v-text-field>

                        </v-row>

                        <v-row>
                            <h3 class="p-0 py-2 px-0 ">Denuncias con Inf. final de aceptacion:</h3>

                            <v-text-field v-model="segEstadoCount.conInfFinalAceptacion" :readonly="true" 
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
                            <v-card-title class="text-h5">Den.sin asignacion</v-card-title>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <div class="text-subtitle-1 text-grey100 pb-1" data-v-81e7cbfb="">Denuncias sin asignacion de los ultimos 5
                                    días
                                </div>
                                <label> {{ segEstadoCount.nuevasHoy }} </label>

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
                                <label> {{ segEstadoCount.conInfFinalAceptacion  }} </label>
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
                                <label> {{ segEstadoCount.conInfFinalRechazo}} </label>
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
                            <v-card-title class="text-h5">Denuncias asignadas</v-card-title>
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
//import Seguimiento from '@/services/Seguimiento';
import Denuncia from '@/services/Denuncia.js';
  import { toast } from 'vue3-toastify';

// Definir variables reactivas usando `ref`
const isDisabled = ref(true);
const dialog = ref(false);
const rol = localStorage.getItem('rol');

const manualLink = ref( './manuales/manual.pdf'); // Ruta al archivo PDF en la carpeta public
  
let   snackbar= {
      visible: false,
      message: '',
      color: "success",
      mode: "",
      timeout: 2500,
    };
let segEstadoCount = reactive({
    nuevasHoy:0, // sin asignar
    conInfFinalRechazo: 0, // RECHAZADO
    sinRetraso: 0, // SIN RETRASO
    conRetraso: 0, // CON RETRASO
    conInfFinalAceptacion: 0, // CON INF FINAL
  // xxxxxxx
    conclusion:0, //aceptadas CONCLUSION    
    con_seguimiento: 0,  //  SEGUIMIENTO esta ASIGNADO  // SEGUIMIENTO  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
    solicitado: 0,  //sin_seguimiento: 12, // SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero

});
let denunciasPorDia= [
    { dia: 'Lunes', total: 0 },
    { dia: 'Martes', total: 0 },
    { dia: 'Miercoles', total: 0 },
    { dia: 'Jueves', total: 0 },
    { dia: 'Viernes', total: 0 },
  ];

  let  denunciasPorMes= [
        {  codigo:'Ene', mes: 'Enero', total: 0 },
        {  codigo:'Feb', mes: 'Febrero', total: 0 },
        {  codigo:'Mar', mes: 'Marzo', total: 0 },
        {  codigo:'Abr', mes: 'Abril', total: 0 },
        {  codigo:'May', mes: 'Mayo', total: 0 },
        {  codigo:'Jun', mes: 'Junio', total: 0 },
        {  codigo:'Jul', mes: 'Julio', total: 0 },
        {  codigo:'Ago', mes: 'Agosto', total: 0 },
        {  codigo:'Sep', mes: 'Septiembre', total: 0 },
        {  codigo:'Oct', mes: 'Octubre', total: 0 },
        {  codigo:'Nov', mes: 'Noviembre', total: 0 },
        {  codigo:'Dic', mes: 'Diciembre', total: 0 }
      ];
    let    denunciasRechazadas= [
    { mes: 'Enero', total: 0 },
    { mes: 'Febrero', total: 0 },
    { mes: 'Marzo', total: 0 },
    { mes: 'Abril', total: 0},
    { mes: 'Mayo', total: 0 },
    { mes: 'Junio', total: 0 },
    { mes: 'Julio', total: 0 },
    { mes: 'Agosto', total: 0 },
    { mes: 'Septiembre', total: 0 },
    { mes: 'Octubre', total: 0 },
    { mes: 'Noviembre', total: 0 },
    { mes: 'Diciembre', total: 0 }
  ];
  let      denunciasPorTipoXXX = [
        { codigo:'SIN_ASIGNACION' ,tipo: 'Den.sin asignar', total: 0 }, //nuevas:5, // ASIGNADO_HOY al investigador , o para el caso de jefe departamental son las denuncias en estado SOLICITADO (pendientes de asignar)
        { codigo:'RECHAZADO_CON_INF' ,tipo: 'Denuncias rechazadas', total: 0 },//rechazadas: 4, // RECHAZADO
        { codigo:'SIN_RETRASO' ,tipo: 'Den. sin retrazo en los plazos', total: 0 }, //retraso:5, // RETRASO luego de la primera o segunda ampliacion 
        { codigo:'CON_RETRASO' ,tipo: 'Den. con retrazo en los plazos', total: 0 }, //retraso:5, // RETRASO luego de la primera o segunda ampliacion 
        { codigo:'ACEPTADO_CON_INF' ,tipo: 'Den.con informe final', total: 0 },// aceptadas:3, // CONCLUSION
       
//**** */
          { codigo:'CONCLUSION' ,tipo: 'Den.con informe final', total: 0 },// aceptadas:3, // CONCLUSION
          { codigo:'RECHAZADO' ,tipo: 'Denuncias rechazadas', total: 0 },//rechazadas: 4, // RECHAZADO
          { codigo:'SEGUIMIENTO' ,tipo: 'Den.con seguimiento', total: 0 },// SEGUIMIENTO esta ASIGNADO:  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
          { codigo:'SOLICITADO' ,tipo: 'Den.sin asignacion', total: 0 },//  SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero
 
      ];
 let     denunciasPorDepto= [
        {  codigo:'LP',    region: 'La Paz', total: 0 },
        {  codigo:'SC',    region: 'Santa Cruz', total: 0 },
        {  codigo:'CH',    region: 'Chuquisaca', total: 0 },
        {  codigo:'CBBA',  region: 'Cochabamba', total: 0 },
        {  codigo:'OR',    region: 'Oruro', total: 0 },
        {  codigo:'TAR',   region: 'Tarija', total: 0 },
        {  codigo:'BE',    region: 'Beni', total: 0 },
        {  codigo:'PAN',   region: 'Pando', total: 0 },
        {  codigo:'PO',    region: 'Potosí', total: 0 },
      ];
 let   seguimientosArray= [];
  let   people= []; 



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
  
    console.log('onMounted:');

    desabilitar();
    const rol= localStorage.getItem('rol');

    const depto_id= localStorage.getItem('depto_id');
    const usuarios_id= localStorage.getItem('usuario_id');
   // seguimientolistRepByNivelGeoByUsuId( userId , deptoId  );
    listRepDenByTipoPlazo(depto_id,usuarios_id);
    listRepDenByTipo(depto_id,usuarios_id);
   // listRepDenByTipoRech(depto_id,usuarios_id);
  dialog.value = true;
});
const renderLineChart = () => {  
   // const meses = mockData.denunciasPorDia.map(d => d.dia);
    //   const totales = mockData.denunciasPorDia.map(d => d.total);
    
    const dias =denunciasPorDia.map(d => d.dia); 
    const totales = denunciasPorDia.map(d => parseInt(d.total));

    console.log(`denunciasPorDia 1:`,dias, totales);

    Highcharts.chart('lineChart', {
        chart: { type: 'line' },
        title: { text: 'Denuncias realizadas ultimos 5 dias' },
        xAxis: { categories: dias },
        yAxis: { title: { text: 'Número de Denuncias' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
};
const renderRegionChart = () => {
   // const meses = mockData.denunciasPorMes.map(d => d.mes);
   // const totales = mockData.denunciasPorMes.map(d => d.total);
 const meses =denunciasPorMes.map(d => d.mes); 
    const totales = denunciasPorMes.map(d => parseInt(d.total));
  console.log(`denunciasPorMes reg :`,meses, totales);

    Highcharts.chart('regionChart', {
        chart: { type: 'column' },
        title: { text: 'Denuncias realizadas por mes' },
        xAxis: { categories: meses },
        yAxis: { title: { text: 'Número de Denuncias' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
};

const renderLineChart2 = () => {
   // const meses = mockData.denunciasRechazadas.map(d => d.mes);
   // const totales = mockData.denunciasRechazadas.map(d => d.total);
 const meses =denunciasRechazadas.map(d => d.mes); 
    const totales = denunciasRechazadas.map(d => parseInt(d.total));
  console.log(`denunciasRechazadas 2 :`,meses, totales);

    Highcharts.chart('lineChart2', {
        chart: { type: 'line' },
        title: { text: 'Denuncias rechazadas..' },
        xAxis: { categories: meses },
        yAxis: { title: { text: 'Número de Rechazos' } },
        series: [{ name: 'Denuncias', data: totales }]
    });
};

 const denunciaAddCantidadByDia = async ()=> {
      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = people.map(denuncia => ({ ...denuncia }));

      denunciasArray.forEach(async denuncia => {
             
        const depto = denunciasPorDia.find(p => p.dia === denuncia.codigo); // 

        if (depto) {
            depto.total = (denuncia.total); // Nuevo valor para la propiedad estado
            console.log(`denunciasPorDia id:: ${depto.dia}: ${depto.total}`);
        } else {
            console.log(`No se encontró ningun dia con el id ${denuncia.codigo}`);
        }      
      });

    };
 const denunciaAddCantidadByMes = async ()=> {

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = people.map(denuncia => ({ ...denuncia }));

      denunciasArray.forEach(async denuncia => {
         
        const depto = denunciasPorMes.find(p => p.mes === denuncia.codigo); // 

        if (depto) {
            depto.total = (denuncia.total); // Nuevo valor para la propiedad estado
                console.log(`denunciasPorMes id:: ${depto.mes}: ${depto.total}`);
        } else {
            console.log(`No se encontró ningun mes con el id ${denuncia.codigo}`);
        }      
      });

    };
const denunciaAddCantidadByMesRech = async ()=> {

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = seguimientosArray.map(denuncia => ({ ...denuncia }));

      denunciasArray.forEach(async denuncia => {
         
        const depto = denunciasRechazadas.find(p => p.mes === denuncia.codigo); // 

        if (depto) {
            depto.total = (denuncia.total); // Nuevo valor para la propiedad estado
                console.log(`denunciasPorMes id:: ${depto.mes}: ${depto.total}`);
        } else {
            console.log(`No se encontró ningun mes con el id ${denuncia.codigo}`);
        }      
      });

    };
 const listRepDenByTipo =async  (deptoId,usuarioId) =>{
      console.log('this.deptoId,usuarioId', deptoId,usuarioId );
      await  Denuncia.listRepDenByTipo( deptoId,usuarioId)
          .then((response) => {
            console.log("listRepDenByTipo  : ", response.data, response.status);
            if (response.status === 200) {
              people = response.data;
              denunciaAddCantidadByMes();
              denunciaAddCantidadByDia();
             
              renderLineChart();
                renderRegionChart();
                renderLineChart2();

            seguimientosArray = response.data;
            seguimientosArray.forEach(async denuncia => {
    
                if (denuncia.codigo ==='SIN_ASIGNACION') {// ok NUEVAS de los ultimos dias
                    segEstadoCount.nuevasHoy = denuncia.total; //
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                }
                if (denuncia.codigo ==='SEGUIMIENTO') {
                    segEstadoCount.con_seguimiento = denuncia.total; //con_seguimiento
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                }                
                else {
                console.log(`No se encontró registro con el id ${denuncia.codigo}`);
                }           
                
              });

            } else {
              showSnackbar('Error recuperando listRepDenByTipo ' + response, 'red');
            }
          })
          .catch(error => {
            showSnackbar('Error recuperando listRepDenByTipo ' + error, 'red');
            toast.error('Error recuperando datos por tipo/estado: ' + 'Revise configuracion del mapa', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
          });
    };

//const  seguimientolistRepByNivelGeoByUsuId =async (usuarios_id,depto_id ) => {
const  listRepDenByTipoPlazo =async (depto_id ,usuarios_id) => {    
    console.log(` depto_id: ${depto_id}, usuarios_id ${usuarios_id} `);

    await Denuncia.listRepDenByTipoPlazo(depto_id ,usuarios_id) 
        .then((response) => {
          console.log("listRepDenByTipoPlazo  : ", response.data, response.status);
          if (response.status === 200) {

            seguimientosArray = response.data;
            seguimientosArray.forEach(async denuncia => {
    
                if (denuncia.codigo ==='SIN_ASIGNACION') {// ok NUEVAS de los ultimos dias
                    segEstadoCount.nuevasHoy = denuncia.total; //
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                }
                if (denuncia.codigo ==='RECHAZADO_CON_INF') {
                    segEstadoCount.conInfFinalRechazo = denuncia.total; //RECHAZADO
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                }

                if (denuncia.codigo ==='SIN_RETRASO') {
                    segEstadoCount.sinRetraso = denuncia.total; //RETRASO
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                } 
                if (denuncia.codigo ==='CON_RETRASO') {
                    segEstadoCount.conRetraso = denuncia.total; //RETRASO
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                } 
                if (denuncia.codigo ==='ACEPTADO_CON_INF') {
                    segEstadoCount.conInfFinalAceptacion = denuncia.total; //aceptadas CONCLUSION  con inf final de aceptacion
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                } 
                if (denuncia.codigo ==='SEGUIMIENTO') {
                    segEstadoCount.con_seguimiento = denuncia.total; //con_seguimiento
                    console.log(`cod_denuncia para el id ${denuncia.codigo}: ${denuncia.total}`);
                } 
                //xxxxxxxxxxxxx     
                else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.codigo}`);
                }           
                

            });  
            
            
             denunciaAddCantidadByMesRech();
        } else {
            showSnackbar('Error recuperando listRepDenByTipoPlazo ' + response, 'red');
               console.log("error listRepDenByTipoPlazo  response  : ", response);
         }
        })
        .catch(error => {
            console.log("error listRepDenByTipoPlazo error  : ", error);

        });
    };
    



 const   denunciaAddCantidadByDeptoByInfFinalxxxx=()=> {    

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = people.map(denuncia => ({ ...denuncia }));
      
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = denunciasPorDeptoInfFinal.find(p => p.region === denuncia.descripcion); // 

              if (depto) {
                depto.total = parseInt(denuncia.cantidad); // Nuevo valor para la propiedad estado
                 console.log(`cod_denuncia para el id ;; ${depto.descripcion}: ${depto.cantidad}`);
              } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${depto.descripcion}`);
              }           
              
     
      });
       //  this.fetchData();
    }

const     showSnackbar=(message, color) =>{
      snackbar.message = message;
      snackbar.color = color;
      snackbar.visible = true;
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

