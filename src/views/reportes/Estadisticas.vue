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
  
  export default {
    name: 'Dashboard',
    data() {

      return {
        
        people: [],      
        capitalsArray: [],

        denunciasPorTipo : [
          { codigo:'nuevas' ,tipo: 'Den.nuevas asignadas', total: 120 }, //nuevas:5,
          { codigo:'sin_seguimiento' ,tipo: 'Den.con retraso en plazos', total: 85 },// sin_seguimiento: 12, // SOLICITADO
          { codigo:'con_seguimiento' ,tipo: 'Denu.con seguimiento', total: 56 },// con_seguimiento: 5,  // ASIGMNADO
          { codigo:'rechazadas' ,tipo: 'Denuncias rechazadas', total: 33 },//rechazadas: 4, // RECHAZO
          { codigo:'aceptadas' ,tipo: 'Den.con informe final', total: 75 },// aceptadas:3, // CONCLUSION
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
      this.renderBarChart();
      this.renderPieChart();
      //this.renderLineChart();
      this.renderRegionChart();
     // this.renderTotalDenunciasChart();
     // this.renderMonthlyReportChart();
    },
    methods: {
      renderBarChart() {
        const tipos = this.denunciasPorTipo.map(d => d.tipo); // mockData
        const totales = this.denunciasPorTipo.map(d => d.total);
  
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
        const totales = this.denunciasPorDepto.map(d => d.total);
  
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
        const totales = this.denunciasPorMes.map(d => d.total);
  
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