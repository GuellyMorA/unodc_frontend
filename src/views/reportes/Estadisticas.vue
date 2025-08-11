<template>
    <div>
      <h1>Dashboard Denuncias de Corrupción</h1>
      <div class="grid-container">
        <div class="chart" id="barChart"></div>
        <div class="chart" id="pieChart"></div>
  
        <div class="chart" id="regionChart"></div>
        <div class="chart" id="totalDenunciasChart"></div>
        <div class="chart" id="monthlyReportChart"></div>
      </div>
    </div>
  </template>
  
  <script>
  import Highcharts from 'highcharts';
  //import { mockData } from '../../data/mock/data.js';
  import Seguimiento from '@/services/Seguimiento';
  import Denuncia from '@/services/Denuncia';
  import { toast } from 'vue3-toastify';


  export default {
    name: 'Dashboard',
    data() {

      return {
              
        seguimientosArray: [],
        people: [],      
        capitalsArray: [],
     // username: localStorage.getItem('username'),
     // deptoId: localStorage.getItem('depto_id'),

        denunciasPorTipo : [
        { codigo:'ASIGNADO_HOY' ,tipo: 'Den. nuevas asignadas hoy', total: 0 }, //nuevas:5, // ASIGNADO_HOY al investigador , o para el caso de jefe departamental son las denuncias en estado SOLICITADO (pendientes de asignar)
        { codigo:'RECHAZADO_CON_INF' ,tipo: 'Denuncias rechazadas', total: 0 },//rechazadas: 4, // RECHAZADO
        { codigo:'SIN_RETRASO' ,tipo: 'Den. sin retrazo en los plazos', total: 0 }, //retraso:5, // RETRASO luego de la primera o segunda ampliacion 
        { codigo:'CON_RETRASO' ,tipo: 'Den. con retrazo en los plazos', total: 0 }, //retraso:5, // RETRASO luego de la primera o segunda ampliacion 
        { codigo:'ACEPTADO_CON_INF' ,tipo: 'Den.con informe final', total: 0 },// aceptadas:3, // CONCLUSION
       
        { codigo:'SEGUIMIENTO' ,tipo: 'Den.con seguimiento', total: 0 },// SEGUIMIENTO esta ASIGNADO:  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
          { codigo:'SOLICITADO' ,tipo: 'Den.sin asignacion', total: 0 },//  SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero
    //nuevas_hoy:0, // ASIGNADO_HOY al investigador , o para el caso de jefe departamental son las denuncias en estado SOLICITADO (pendientes de asignar) 
    //retraso: 0, // RETRASO
   // conclusion:0, //aceptadas CONCLUSION
   // rechazado: 0, // RECHAZADO
    //con_seguimiento: 0,  //  SEGUIMIENTO esta ASIGNADO  // SEGUIMIENTO  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
    //solicitado: 0,  //sin_seguimiento: 12, // SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero

         // total_denuncias: 15, // TOTAL  
      ],

      denunciasPorDepto: [
        {  codigo:'LP',    region: 'La Paz', total: 0 },
        {  codigo:'SC',    region: 'Santa Cruz', total: 0 },
        {  codigo:'CH',    region: 'Chuquisaca', total: 0 },
        {  codigo:'CBBA',  region: 'Cochabamba', total: 0 },
        {  codigo:'OR',    region: 'Oruro', total: 0 },
        {  codigo:'TAR',   region: 'Tarija', total: 0 },
        {  codigo:'BE',    region: 'Beni', total: 0 },
        {  codigo:'PAN',   region: 'Pando', total: 0 },
        {  codigo:'PO',    region: 'Potosí', total: 0 },
      ],
      denunciasPorMes: [
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
      ],
      denunciasPorDeptoInfFinal: [
        {  codigo:'LP',    region: 'La Paz', total: 0 },
        {  codigo:'SC',    region: 'Santa Cruz', total: 0 },
        {  codigo:'CH',    region: 'Chuquisaca', total: 0 },
        {  codigo:'CBBA',  region: 'Cochabamba', total: 0 },
        {  codigo:'OR',    region: 'Oruro', total: 0 },
        {  codigo:'TAR',   region: 'Tarija', total: 0 },
        {  codigo:'BE',    region: 'Beni', total: 0 },
        {  codigo:'PAN',   region: 'Pando', total: 0 },
        {  codigo:'PO',    region: 'Potosí', total: 0 },
      ],

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

      }
    },
 
    mounted() {

    const rol= localStorage.getItem('rol');
    const deptoId= localStorage.getItem('depto_id');
    const usuarioId= localStorage.getItem('usuario_id');

     // this.seguimientolistRepByNivelGeoByUsuId( userId , deptoId  );
         this.listRepDenByTipo(deptoId,usuarioId);
      this.listRepDenByDepto(deptoId);

      this.listRepDenByDeptoByInfFinal(deptoId);
  

    },

    methods: {
        showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },
   
    async listRepDenByTipo(deptoId,usuarioId) {
      console.log('this.deptoId,usuarioId', deptoId,usuarioId );
      await  Denuncia.listRepDenByTipo( deptoId,usuarioId)
          .then((response) => {
            console.log("listRepDenByTipo  : ", response.data, response.status);
            if (response.status === 200) {
              this.people = response.data;
              this.denunciaAddCantidad();
              this.renderPieChart();
              this.renderBarChart();

            } else {
              this.showSnackbar('Error recuperando listRepDenByTipo ' + response, 'red');
            }
          })
          .catch(error => {
            this.showSnackbar('Error recuperando listRepDenByTipo ' + error, 'red');
            toast.error('Error recuperando datos por tipo/estado: ' + 'Revise configuracion del mapa', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
          });
    },
 async listRepDenByDepto(deptoId) {
      console.log('this.deptoId', deptoId );
      await  Denuncia.listRepDenByDepto( deptoId)
          .then((response) => {
            console.log("listRepDenByDepto  : ", response.data, response.status);
            if (response.status === 200) {
              this.people = response.data;
              this.denunciaAddCantidadByDepto();
              this.renderPieChart();

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
    async listRepDenByDeptoByInfFinal(deptoId) {
      console.log('this.deptoId', deptoId );
      await  Denuncia.listRepDenByDeptoByInfFinal( deptoId)
          .then((response) => {
            console.log("listRepDenByDeptoByInfFinal  : ", response.data, response.status);
            if (response.status === 200) {
              this.people = response.data;
              this.denunciaAddCantidadByDeptoByInfFinal();
              this.renderRegionChart();


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

   denunciaAddCantidadByDeptoByInfFinal() {
    
      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = this.people.map(denuncia => ({ ...denuncia }));
      
   //   this.capitalsArray = this.boliviaDptos.bolivia.capitals;
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = this.denunciasPorDeptoInfFinal.find(p => p.region === denuncia.descripcion); // 

              if (depto) {
                depto.total = parseInt(denuncia.cantidad); // Nuevo valor para la propiedad estado
                 console.log(`cod_denuncia para el id ;; ${depto.descripcion}: ${depto.cantidad}`);
              } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${depto.descripcion}`);
              }           
              
     
      });
       //  this.fetchData();
    },
    denunciaAddCantidadByDepto() {

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = this.people.map(denuncia => ({ ...denuncia }));
      
   //   this.capitalsArray = this.boliviaDptos.bolivia.capitals;
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = this.denunciasPorDepto.find(p => p.region === denuncia.descripcion); // 

              if (depto) {
                depto.total = (denuncia.cantidad); // Nuevo valor para la propiedad estado
                 console.log(`cod_denuncia para el id:: ${depto.region}: ${depto.total}`);
              } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.descrip}`);
              } 
     
      });
      
    },

   



    denunciaAddCantidad() {
      // filtrar solo los roles-modulos  en estado activo
      // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = this.people.map(denuncia => ({ ...denuncia }));
      
     // this.capitalsArray = this.denunciasPorTipo;
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = this.denunciasPorTipo.find(p => p.codigo === denuncia.codigo); // Buscar la persona por id

              if (depto) {
                depto.total = denuncia.total; // Nuevo valor para la propiedad estado
                 console.log(`denunciasPorTipo para el id ${denuncia.codigo}: ${depto.total}`);
              } else {
                console.log(`No se encontró  el id ${denuncia.codigo}`);
               
              }           
              
     
      });
     
    },

    async  seguimientolistRepByNivelGeoByUsuIdxxx (usuarios_id,depto_id ) {
       await Seguimiento.seguimientolistRepByNivelGeoByUsuId(usuarios_id,depto_id ) 
        .then((response) => {
          console.log("seguimientolistRepByNivelGeoByUsuId  people: ", response.data, response.status);
          if (response.status === 200) {

            this.people = response.data;
            this.denunciaAddCantidad();
            this.renderBarChart();
            console.log("this.people  : ",usuarios_id , depto_id, this.people, response.status);
           
          } else {
            //showSnackbar('Error recuperando seguimientolistRepByNivelGeoByUsuId ' + response, 'red');
               console.log("error seguimientolistRepByNivelGeoByUsuId  response  : ", response);

         }
        })
        .catch(error => {
            console.log("error seguimientolistRepByNivelGeoByUsuId error  : ", error);

          //showSnackbar('Error recuperando seguimientolistRepByNivelGeoByUsuId ' + error, 'red');
        });
    },



      renderBarChart() {
        const tipos = this.denunciasPorTipo.map(d => d.tipo); // mockData
        const totales = this.denunciasPorTipo.map(d => parseInt(d.total));
       // console.log(`tipos : ${tipos}`);
       // console.log(`totales : ${totales}`);
        console.log(`denunciasPorTipo : ${JSON.stringify(this.denunciasPorTipo)}`);

        
        Highcharts.chart('barChart', {
          chart: { type: 'column' },
          title: { text: 'Denuncias por Tipo' },
          xAxis: { categories: tipos },
          yAxis: { title: { text: 'Número de Denuncias' } },
          series: [{ name: 'Denuncias', data: totales }]
        });
      },
      renderPieChart() {
        const regiones = this.denunciasPorDepto.map(d => d.region);
        const totales = this.denunciasPorDepto.map(d => parseInt(d.total));
       // console.log(`denunciasPorDepto : ${JSON.stringify(this.denunciasPorDepto)}`);
       console.log(`denunciasPorDepto :`,regiones, totales);
        Highcharts.chart('pieChart', {
          chart: { type: 'pie' },
          title: { text: 'Denuncias por Departamento' },
          series: [{
            name: 'Denuncias',
            data: regiones.map((region, i) => ({
              name: region,
              y: totales[i]
            })),
            showInLegend: true,
            lineWidth: 15
          }]
        });
      },
      renderLineChart() {
        const meses = this.denunciasPorMes.map(d => d.mes);
        const totales = this.denunciasPorMes.map(d => parseInt(d.total));
  
        Highcharts.chart('lineChart', {
          chart: { type: 'line' },
          title: { text: 'Denuncias Mensuales' },
          xAxis: { categories: meses },
          yAxis: { title: { text: 'Número de Denuncias' }},
          series: [{ name: 'Denuncias', data: totales }]
        });
      },

      renderRegionChart() {
        // Similar al renderPieChart, se puede personalizar

        const regiones = this.denunciasPorDeptoInfFinal.map(d => d.region);
        const totales = this.denunciasPorDeptoInfFinal.map(d => d.total);
        console.log(`por depto inf. final :`,regiones, totales);
        Highcharts.chart('regionChart', {
          chart: { type: 'column' },
          title: { text: 'Denuncias con Inf. Final' },
          xAxis: { categories: regiones },
          yAxis: { title: { text: 'Número de Denuncias' }},
          series: [{ name: 'Denuncias', data: totales }]
        });
      },

    }
  };
  </script>
  
  <style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .chart {
    height: 400px;
  }
  </style>