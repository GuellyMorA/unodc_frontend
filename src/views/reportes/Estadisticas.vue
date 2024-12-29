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
  import { mockData } from '../../data/mock/data.js';
  import Seguimiento from '@/services/Seguimiento';

  export default {
    name: 'Dashboard',
    data() {

      return {
              
        seguimientosArray: [],
        people: [],      
      capitalsArray: [],
      username: localStorage.getItem('username'),
      deptoId: 0, //localStorage.getItem('depto_id'),

        denunciasPorTipo : [
        { codigo:'ASIGNADO_HOY' ,tipo: 'Den.nuevas asignadas hoy', total: 0 }, //nuevas:5, // ASIGNADO_HOY al investigador , o para el caso de jefe departamental son las denuncias en estado SOLICITADO (pendientes de asignar)
          { codigo:'RETRASO' ,tipo: 'Den.con retrazo en los plazos', total: 0 }, //retraso:5, // RETRASO luego de la primera o segunda ampliacion 
          
          { codigo:'CONCLUSION' ,tipo: 'Den.con informe final', total: 0 },// aceptadas:3, // CONCLUSION
          { codigo:'RECHAZADO' ,tipo: 'Denuncias rechazadas', total: 0 },//rechazadas: 4, // RECHAZADO
          { codigo:'SEGUIMIENTO' ,tipo: 'Den.con seguimiento', total: 0 },// SEGUIMIENTO esta ASIGNADO:  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
          { codigo:'SOLICITADO' ,tipo: 'Den.sin asignacion', total: 0 },//  SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero

         // total_denuncias: 15, // TOTAL  
      ],

      denunciasPorDepto: [
        {  codigo:'LP',    region: 'LP', total: 100 },
        {  codigo:'SC',    region: 'SC', total: 80 },
        {  codigo:'CH',    region: 'CH', total: 45 },
        {  codigo:'CBBA',   region: 'CBBA', total: 60 },
        {  codigo:'OR',    region: 'OR', total: 100 },
        {  codigo:'TAR',   region: 'TAR', total: 80 },
        {  codigo:'BE',    region: 'BE', total: 45 },
        {  codigo:'PAN',   region: 'PAN', total: 60 },
      ],
      denunciasPorMes: [
        {  codigo:'Ene', mes: 'Enero', total: 45 },
        {  codigo:'Feb', mes: 'Febrero', total: 60 },
        {  codigo:'Mar', mes: 'Marzo', total: 75 },
        {  codigo:'Abr', mes: 'Abril', total: 80 },
        {  codigo:'May', mes: 'Mayo', total: 50 },
        {  codigo:'Jun', mes: 'Junio', total: 40 },
        {  codigo:'Jul', mes: 'Julio', total: 45 },
        {  codigo:'Ago', mes: 'Agosto', total: 60 },
        {  codigo:'Sep', mes: 'Septiembre', total: 75 },
        {  codigo:'Oct', mes: 'Octubre', total: 80 },
        {  codigo:'Nov', mes: 'Noviembre', total: 50 },
        {  codigo:'Dic', mes: 'Diciembre', total: 40 }
      ],
      denunciasPorDeptoInfFinal: [
        {  codigo:'LP',    region: 'LP', total: 100 },
        {  codigo:'SC',    region: 'SC', total: 80 },
        {  codigo:'CH',    region: 'CH', total: 45 },
        {  codigo:'CBBA',   region: 'CBBA', total: 60 },
        {  codigo:'OR',    region: 'OR', total: 100 },
        {  codigo:'TAR',   region: 'TAR', total: 80 },
        {  codigo:'BE',    region: 'BE', total: 45 },
        {  codigo:'PAN',   region: 'PAN', total: 60 },
      ],


      }
    },
 
    mounted() {
      const username= localStorage.getItem('username');
    const userId= localStorage.getItem('usuario_id');
    const rol= localStorage.getItem('rol');
    const deptoId= localStorage.getItem('depto_id');

      this.seguimientolistRepByNivelGeoByUsuId( userId , deptoId  );

    // this.renderBarChart();
      this.renderPieChart();
      this.renderRegionChart();

     // this.renderTotalDenunciasChart();
     // this.renderMonthlyReportChart();
      //this.renderLineChart();

    },

    methods: {
  denunciaAddCantidad() {
      // filtrar solo los roles-modulos  en estado activo
      // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = this.people.map(denuncia => ({ ...denuncia }));
      
     // this.capitalsArray = this.denunciasPorTipo;
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = this.denunciasPorTipo.find(p => p.codigo === denuncia.estado); // Buscar la persona por id

              if (depto) {
                depto.total = denuncia.cantidad; // Nuevo valor para la propiedad estado
                 console.log(`cod_denuncia para el id ${denuncia.estado}: ${depto.total}`);
              } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.estado}`);
                console.log(`cod_denuncia para el id ${denuncia.estado}: 0`);
              }           
              
     
      });
      //this.renderBarChart();
    },

    async  seguimientolistRepByNivelGeoByUsuId (usuarios_id,depto_id ) {
       await Seguimiento.seguimientolistRepByNivelGeoByUsuId(usuarios_id,depto_id ) 
        .then((response) => {
          console.log("seguimientolistRepByNivelGeoByUsuId  people: ", response.data, response.status);
          if (response.status === 200) {

            this.people = response.data;
            this.denunciaAddCantidad();
            this.renderBarChart();
           // console.log("this.people  : ", this.people, response.status);
           
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
        // Similar al renderPieChart, puedes personalizarlo
        // Para ilustrar, dejémoslo como un gráfico de columnas más
        const regiones = this.denunciasPorDeptoInfFinal.map(d => d.region);
        const totales = this.denunciasPorDeptoInfFinal.map(d => d.total);
  
        Highcharts.chart('regionChart', {
          chart: { type: 'column' },
          title: { text: 'Denuncias con Inf. Final' },
          xAxis: { categories: regiones },
          yAxis: { title: { text: 'Número de Denuncias' }},
          series: [{ name: 'Denuncias', data: totales }]
        });
      },
      renderTotalDenunciasChart() {
        // Aquí puedes implementar tu lógica para otro gráfico
      },
      renderMonthlyReportChart() {
        // Aquí puedes implementar tu lógica para otro gráfico
      }
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