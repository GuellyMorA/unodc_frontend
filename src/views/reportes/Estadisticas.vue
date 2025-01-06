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
      username: localStorage.getItem('username'),
      deptoId: 0, //localStorage.getItem('depto_id'),

        denunciasPorTipo : [
        { codigo:'ASIGNADO_HOY' ,tipo: 'Den. nuevas asignadas hoy', total: 0 }, //nuevas:5, // ASIGNADO_HOY al investigador , o para el caso de jefe departamental son las denuncias en estado SOLICITADO (pendientes de asignar)
        { codigo:'RETRASO' ,tipo: 'Den. con retrazo en los plazos', total: 0 }, //retraso:5, // RETRASO luego de la primera o segunda ampliacion 
          
          { codigo:'CONCLUSION' ,tipo: 'Den.con informe final', total: 0 },// aceptadas:3, // CONCLUSION
          { codigo:'RECHAZADO' ,tipo: 'Denuncias rechazadas', total: 0 },//rechazadas: 4, // RECHAZADO
          { codigo:'SEGUIMIENTO' ,tipo: 'Den.con seguimiento', total: 0 },// SEGUIMIENTO esta ASIGNADO:  para el investigador muestra un numero,  para el caso de jefe departamental muestra cero
          { codigo:'SOLICITADO' ,tipo: 'Den.sin asignacion', total: 0 },//  SOLICITADO  para el investigador muestra cero,  para el caso de jefe departamental muestra un numero

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
        {codigo:'PO',   region: 'Potosí', total: 0 },
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
      {  codigo:'LP',    region: 'La Paz', total: 0 },
        {  codigo:'SC',    region: 'Santa Cruz', total: 0 },
        {  codigo:'CH',    region: 'Chuquisaca', total: 0 },
        {  codigo:'CBBA',  region: 'Cochabamba', total: 0 },
        {  codigo:'OR',    region: 'Oruro', total: 0 },
        {  codigo:'TAR',   region: 'Tarija', total: 0 },
        {  codigo:'BE',    region: 'Beni', total: 0 },
        {  codigo:'PAN',   region: 'Pando', total: 0 },
        {codigo:'PO',   region: 'Potosí', total: 0 },
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
      const username= localStorage.getItem('username');
    const userId= localStorage.getItem('usuario_id');
    const rol= localStorage.getItem('rol');
    const deptoId= localStorage.getItem('depto_id');

      this.seguimientolistRepByNivelGeoByUsuId( userId , deptoId  );
      this.listRepDenByDepto(deptoId);

      this.listRepDenByDeptoByInfFinal(deptoId);


    // this.renderBarChart();
    //  this.renderPieChart();
    //  this.renderRegionChart();

     // this.renderTotalDenunciasChart();
     // this.renderMonthlyReportChart();
      //this.renderLineChart();

    },

    methods: {

      denunciaAddCantidadByDeptoByInfFinal() {
      // filtrar solo los roles-modulos  en estado activo
      // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = this.people.map(denuncia => ({ ...denuncia }));
      
   //   this.capitalsArray = this.boliviaDptos.bolivia.capitals;
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = this.denunciasPorDeptoInfFinal.find(p => p.region === denuncia.descripcion); // 

              if (depto) {
                depto.total = denuncia.cantidad; // Nuevo valor para la propiedad estado
                 console.log(`cod_denuncia para el id ${denuncia.descripcion}: ${denuncia.cantidad}`);
              } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.descripcion}`);
              }           
              
     
      });
       //  this.fetchData();
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





      denunciaAddCantidadByDepto() {
      // filtrar solo los roles-modulos  en estado activo
      // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado

      // Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
      const denunciasArray = this.people.map(denuncia => ({ ...denuncia }));
      
   //   this.capitalsArray = this.boliviaDptos.bolivia.capitals;
      denunciasArray.forEach(async denuncia => {
       
            //const capitals = response.bolivia.capitals;          
              const depto = this.denunciasPorDepto.find(p => p.region === denuncia.descripcion); // 

              if (depto) {
                depto.total = denuncia.cantidad; // Nuevo valor para la propiedad estado
                 console.log(`cod_denuncia para el id ${denuncia.descripcion}: ${denuncia.cantidad}`);
              } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.descripcion}`);
              }           
              
     
      });
       //  this.fetchData();
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
        console.log(`denunciasPorDepto : ${JSON.stringify(this.denunciasPorDepto)}`);

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