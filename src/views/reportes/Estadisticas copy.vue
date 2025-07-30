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
    mounted() {
      this.renderBarChart();
      this.renderPieChart();
      //this.renderLineChart();
      this.renderRegionChart();
      this.renderTotalDenunciasChart();
      this.renderMonthlyReportChart();
    },
    methods: {
      renderBarChart() {
        const tipos = mockData.denunciasPorTipo.map(d => d.tipo);
        const totales = mockData.denunciasPorTipo.map(d => d.total);
  
        Highcharts.chart('barChart', {
          chart: { type: 'column' },
          title: { text: 'Denuncias por Tipo' },
          xAxis: { categories: tipos },
          yAxis: { title: { text: 'Número de Denuncias' } },
          series: [{ name: 'Denuncias', data: totales }]
        });
      },
      renderPieChart() {
        const regiones = mockData.denunciasPorDepto.map(d => d.region);
        const totales = mockData.denunciasPorDepto.map(d => d.total);
  
        Highcharts.chart('pieChart', {
          chart: { type: 'pie' },
          title: { text: 'Denuncias por Región' },
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
        const meses = mockData.denunciasPorMes.map(d => d.mes);
        const totales = mockData.denunciasPorMes.map(d => d.total);
  
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
        const regiones = mockData.denunciasPorDepto.map(d => d.region);
        const totales = mockData.denunciasPorDepto.map(d => d.total);
  
        Highcharts.chart('regionChart', {
          chart: { type: 'column' },
          title: { text: 'Denuncias por Región' },
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