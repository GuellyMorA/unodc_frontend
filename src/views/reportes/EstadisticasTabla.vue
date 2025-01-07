<template>
  <!-- 
 <div>
    <button @click="exportarExcel">Exportar a Excel</button>
    <button @click="exportarPDF">Exportar a PDF</button>
    <div id="container" style="width: 100%; height: 400px;"></div>
  </div>
  -->
<div ref="popupContent"> 
    <v-card>
      <v-card-title class="text-center">
        <v-container>
        <h3>DEPARTAMENTO NACIONAL DE TRANSPARENCIA</h3>
        <label class="text-h5">REPORTE NACIONAL DE DENUNCIAS</label>
          </v-container>
      </v-card-title>

      <v-card-text>
        <v-container>
          
          <v-row>
            <v-col class="p-0 py-0 px-0" cols="4">
          </v-col>  
            <v-col class="p-0 py-0 px-0 mb-3" cols="8">
            <label class="text-h5">.</label>
        
          </v-col>    
          </v-row>
          <v-row>
            <h3 class="p-0 py-3 px-2 ">Estado:</h3>
            <v-col class="p-0 py-0 px-0" cols="2">
                      
                        <v-select v-model="denPerDnte.estado" :items="estadoOptions" 
                            item-title="est"     item-value="transac"     @update:modelValue="onEstadoChange" 
                      ></v-select>
            </v-col>


              <h3 class="p-0 py-3 px-2 ml-4">Departamento:</h3> 
              <v-col class="p-0 py-0 px-0" cols="3">
                <v-select v-model="denPerDnte.departamento" :items="deptoOptions" 
                          item-title="depto"     item-value="depto_id"   @update:modelValue="onDepartChange"
                  ></v-select>
                  
            </v-col>

            <v-col class="p-0 py-1 px-0 ml-6" cols="1">
              <v-btn  class="custom-green-btn"  @click="close"> Excel </v-btn>


            </v-col>
            <v-col class="p-0 py-1 px-0" cols="1">
              <v-btn class="custom-green-btn" text @click="downloadPDF"> PDF </v-btn>

            </v-col>

          </v-row>
        </v-container>
        
      </v-card-text>

<v-container>
  <!-- Data Table --> <!-- v-model:page="page"     filteredItems-->
  <v-data-table :headers="headers" :items="filteredItems"
    class="elevation-1"
    :search="search" 
    no-data-text="No existen registros." no-results-text="Sin resultados" 
    page-text="de" :items-per-page="itemsPerPage"  
    rows-per-page-text="Filas por página"   :page-count="pageCount"
    items-per-page-text="Registros por pagina ">

    <template v-slot:headers="{ props }">
      <tr v-bind="props">
        <th v-for="header in headers" :key="header.value" class="text-center"  >
          {{ header.title }}
        
        </th>
      </tr>
    </template>
    <!--  secuencial Column -->
    <template v-slot:item.fila2="{ index }">
      <td class="sin-borde text-center">{{ index + 1 }}</td>
    </template>


 

  </v-data-table>
</v-container>
    </v-card>
</div>


</template>

<script>
//     <v-row justify="space-between" align="center">
//   <v-col cols="auto">
import { toast } from 'vue3-toastify';
import Denuncia from '@/services/Denuncia';
import NivelGeografico from '@/services/NivelGeografico';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Highcharts from 'highcharts';
import exportChart from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';


export default {

  data: () => ({
   // toPrint: true,
    loading: true,
    isLoading: false,

    datos: [
        { nombre: 'Juan', edad: 28, ciudad: 'Madrid' },
        { nombre: 'María', edad: 22, ciudad: 'Barcelona' },
        { nombre: 'Luis', edad: 35, ciudad: 'Valencia' }
      ],

    pagination: {
        page: 1,
        sortBy: 'cod_denuncia',
        sortDesc: false
      },

    page: 1,
    itemsPerPage:10,
    search: '',
    dialog: false,
    dialog2: false,
    dialog3: false,
    dialogPrint:false,

    dialogDelete: false,

    estado: 'TODOS',
    deptoId: localStorage.getItem('depto_id'),

    lockField: false,
    lockField2: false,

    show1: false,
    show2: true,
    password: 'Password',
    rules: {
      required: value => !!value || 'Requirido.',
      min: v => v.length >= 8 || 'Min. 8 caracteres',
      emailMatch: () => `The email and password you entered don't match`,
    },



    headers: [
      {
        title: 'Num.', key: 'fila2'   },
      { title: 'Cod. Denuncia', key: 'cod_denuncia'},
      { title: 'nombre denunciante', key: 'dnte_nombre_completo' },
      { title: 'nombres denunciados', key: 'dndo_nombre_completo' },
      { title: 'detalle hecho', key: 'detalle_hecho' },
      { title: 'departamento', key: 'departamento' },
      { title: 'Asignado', key: 'asignado_nombre_completo' },
   
      { title: 'Estado', key: 'estado' },
      { title: 'Resultado', key: 'resultado' },
     { title: 'Fecha', key: 'fec_registro_hecho' },
    ],
    people: [],
    editedIndex: -1,
    codDenuncia: '',
    denPerDnteUpd: {

      modulos_sigla_amp_1: '',
      fec_ampliacion_1: '',
      estado: '',
      transaccion: '',

      usu_mod: null,
      fec_mod: null
    },
    // propiedades del formulario 
    denPerDnte: {
      fila: '',
      id: null,
      denuncia_personas_id:0,
      cod_denuncia: '',
      tipo_personas: '',
      sigla: '',
      lugar_hecho: '',
      depto_id: '',
      departamento: '',
      mun_id: '',
      municipio: '',
      grados_sigla: '',
      grado: '',
      fec_registro_hecho: '',
      hora_registro_hecho: '',
      detalle_hecho: '',
      denuncia_anonima: '',
      denuncia_anonima_no: '',
      reserva_identidad: '',
      reserva_identidad_si: '',
      reserva_identidad_no: '',
      dnte_id: null,
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      den_nombre_completo: '',

      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',

      orden: '',

      tipo_denuncia: '',
      seg_id: '', //  seguimiento id
      gestor_id: null,  //  usuarios_id
    
      apellido_pat_gestor: '',
      apellido_mat_gestor: '',
      nombres_gestor: '',
      gestor_seguimiento: '',
   observacion: '',
      fec_registro: '',

      actividades_id: '',
      actividad: '',
      actividad_sigla: '',
      
      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null


    },
    defaultItem: {
      fila: '',
      id: null,
      cod_denuncia: '',
      tipo_personas: '',
      sigla: '',
      lugar_hecho: '',
      depto_id: '',
      departamento: '',
      mun_id: '',
      municipio: '',
      grados_sigla: '',
      grado: '',
      fec_registro_hecho: '',
      hora_registro_hecho: '',
      detalle_hecho: '',
      denuncia_anonima: '',
      denuncia_anonima_no: '',
      reserva_identidad: '',
      reserva_identidad_si: '',
      reserva_identidad_no: '',
      dnte_id: null,
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      den_nombre_completo: '',

      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',

      orden: 0,
      user_login: '',
      password_hash: '',
      u_rol_id: '',
      roles_sigla: '',
      rol: '',
      reset_key: '',
      reset_date: '',

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
    },
        
    seguimiento: {
      fila: '',
      denuncia_personas_id: 0,
      usuarios_id: null,  
      gestor_id:null,
      cod_denuncia: '',
      tipo_personas: '',
      sigla: '',
      lugar_hecho: '',
      depto_id: '',
      departamento: '',
      mun_id: '',
      municipio: '',
 
      fec_registro_hecho: '',
      hora_registro_hecho: '',
      detalle_hecho: '',
      reserva_identidad: '',
      reserva_identidad_si: '',
      reserva_identidad_no: '',
      denuncia_anonima: '',

      seg_id: '',
      observacion: '',
      fec_registro: '',
      
      apellido_pat_gestor: '',
      apellido_mat_gestor: '',
      nombres_gestor: '',
      gestor_seguimiento: '',
    
      
      actividades_id: '',
      actividad: '',
      actividad_sigla: '',
      descripcion: '',
      actividad_tipo: '',
      tiempo_respuesta: '',

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
    },
    seguimientosArray: [],
   

  
    //denunciadosConcat:'',
    denunciado: {
      fila: '',
      id: null,   //  id de la tabla padre denuncia
      id_dndo: null,
      cod_denuncia: '',
      tipo_personas: '',
      depto_id: '',
      departamento: '',
      mun_id: '',
      municipio: '',
      grados_sigla: '',
      grado: '',
      fec_registro_hecho: '',
      hora_registro_hecho: '',
      detalle_hecho: '',
      lugar_hecho: '',
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      dnado_nombre_completo: '',
      dnado_nombre_completo_concat: '',
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',
      puesto_cargo_funcion: '',
      unidad_policial_desc: '',
      orden: 0,
      gestor_id: '',
      gestor_seguimiento: '',
      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null

    },
    denunciadosArray: [],
    defaultItemDenunciado: {
      fila: '',
      id: null,   //  id de la tabla padre denuncia
      id_dndo: null,
      cod_denuncia: '',
      tipo_personas: '',
      depto_id: '',
      departamento: '',
      mun_id: '',
      municipio: '',
      grados_sigla: '',
      grado: '',
      fec_registro_hecho: '',
      hora_registro_hecho: '',
      detalle_hecho: '',
      lugar_hecho: '',
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      dnado_nombre_completo: '',
      dnado_nombre_completo_concat:'',
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',
      puesto_cargo_funcion: '',
      unidad_policial_desc: '',
      orden: 0,

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null
    },

    documentosPath: {
      id: null,
      denuncia_personas_id: 0,
      denunciante_id: null,
      //  cod_denuncia: '',
      orden: 0,
      origen: '',
      documento_path: '',
      descripcion: '',
      justificacion_legal: '',
      fec_registro: '',

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,

    },
    docsPath: [],
    docsPath_adj_si:false,
  docsPath_adj_no:false,

    //******************************************** */

   


    defaultItemUsu: {
      id: null,
      nombres: '',
      apellido_pat: '',
      apellido_mat: '',
      ci_y_complemento: '',
      ci_expedido: '',
      grado: '',
      grados_sigla: '',
      telefono: '',
      email: '',
      departamento: '',
      depto_id: '',
      municipio: '',
      mun_id: '',
      user_login: '',
      password_hash: '',
      u_rol_id: '',
      roles_sigla: '',
      rol: '',
      reset_key: '',
      reset_date: '',

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null
    },
    viewedItem: {},

    viewDialog: false,

    snackbar: {
      visible: false,
      message: '',
      color: "success",
      mode: "",
      timeout: 2500,
    },
    sexoOptions: [
      { sexo: 'MASCULINO', sexo_sigla: 'M' },
      { sexo: 'FEMENINO', sexo_sigla: 'F' }
    ],

    expedidoOptions: ['LP', 'CH', 'SC', 'CBBA', 'OR'],
    gradoOptions: [], // ['Capitan', 'Teniente', 'Sargento 1ro', 'Sin Grado'],
    rolOptions: [],
    validationErrors: {},

    selectedDeptoId: null,    // Código del país seleccionado
    selectedProvinceCode: 0,    // Código de la provincia seleccionada
    departamentos: [{}],
    deptoOptions: [{}],
    munOptions: [{}], //['El Alto', 'Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],


    estadoOptions: [{ est: 'SOLICITADO', transac: 'CREAR' }, { est: 'ASIGNADO', transac: 'DERIVAR' }
      , { est: 'ACEPTADO', transac: 'ACEPTAR' }, { est: 'RECHAZADO', transac: 'RECHAZAR' }
      , { est: 'ABSUELTO', transac: 'ABSOLVER' }, { est: 'SANCIONADO', transac: 'SANCIONAR' }],
    
    gestorOptions: [],
    actividadOptions: [],

  }),

  mounted() {
    this.loading = true;

  /*  this.$nextTick(() => {
      this.generarReporte();
      this.inicializarHighcharts();
    });
*/

   this.deptoList();

    console.log('this.deptoId' ,this.deptoId, ',this.estado: ',this.estado );

    this.listRepDenByDeptoByEstado( this.deptoId, this.estado  );
    
    this.loading = false;
  },



  methods: {
    generarReporte() {
      const dataTable = this.datos.map(item => [item.nombre, item.edad, item.ciudad]);
      return dataTable;
    },
    inicializarHighcharts() {
      Highcharts.chart('container', {
        title: {
          text: 'Reporte de Datos'
        },
        exporting: {
          buttons: {
            contextButton: {
              menuItems: ['exportChart', 'separator', 'downloadXLSX', 'downloadPDF']
            }
          },
          csv: {
            dateFormat: '%Y-%m-%d',
            itemDelimiter: ',',
            lineDelimiter: '\n'
          },
          xlsx: {
            filename: 'reporte_datos'
          }
        },
        series: [{
          type: 'table',
          data: this.generarReporte(),
          name: 'Datos',
          colorByPoint: true
        }],
        lang: {
          downloadXLSX: 'Descargar Excel',
          downloadPDF: 'Descargar PDF'
        }
      });
    },
    exportarExcel() {
      const chart = Highcharts.charts[0];
      chart.exportChart({
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        filename: 'reporte_datos',
        options: {
          filename: 'reporte_datos'
        }
      });
    },
    exportarPDF() {
      const chart = Highcharts.charts[0];
      chart.exportChart({
        type: 'application/pdf',
        filename: 'reporte_datos',
        options: {
          filename: 'reporte_datos'
        }
      });
    },
    downloadPDF() {
      const popupContent = this.$refs.popupContent;
     // console.log('this.toPrint :',  this.toPrint   );
     // this.toPrint= false;

      html2canvas(popupContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
    
        const imgWidth = 190; // Ajusta el ancho de la imagen, si es necesario
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Añade la imagen al PDF
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Si la imagen es más larga que una página, hay que añadir más en páginas nuevas
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('denuncia.pdf'); // Nombre del archivo PDF
      });


    },

     imprimirContenido() {
       const popupContent = this.$refs.popupContent;

 const printWindow = window.open("", "_blank");
      const content =  this.$refs.popupContent; //popupContent.value;

      if (printWindow && content) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Imprimir Contenido</title>
            </head>
            <body>
              ${content.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
 

    },
 


    async deptoList() {
      NivelGeografico.nivelGeograficoList()
        .then((response) => {
          // console.log("response.data[0]  : ", response.data[0], response.status);
          if (response.status === 200) {
            this.departamentos = Object.values(response.data[0]);
            this.departamentos = Object.values(this.departamentos[0]);
            //   console.log("departamentos  : ", this.departamentos);
            this.deptoOptions = this.departamentos.map(depart => ({
              depto: depart.depto,
              depto_id: depart.depto_id,
            }));
            console.log("deptoOptions  : ", this.deptoOptions);
          } else {
            this.showSnackbar('Error recuperando Denuncia ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

 
    async listRepDenByDeptoByEstado(depto_id,estado)  {
      
      await Denuncia.listRepDenByDeptoByEstado(depto_id,estado) 
        .then((response) => {
          console.log("listRepDenByDeptoByEstado : ", response.data, response.status);
          if (response.status === 200) {
            this.people = response.data;
         
          } else {
            this.showSnackbar('Error recuperando listRepDenByDeptoByEstado ' + response, 'red');
          }
        })
        .catch(error => {
          this.showSnackbar('Error recuperando listRepDenByDeptoByEstado ' + error, 'red');

        });
    },

    onDepartChange() {
      // Encuentra el depart seleccionado por su id
      const depart = this.departamentos.find(c => c.depto_id === this.denPerDnte.departamento);

      console.log("depart  : ", depart.depto_id);
   
      this.depto_id = depart.depto_id;
      this.listRepDenByDeptoByEstado( this.deptoId, this.estado  );
    },

    onEstadoChange() {
      // Encuentra el depart seleccionado por su id
      const estado = this.estadoOptions.find(c => c.transac === this.denPerDnte.estado);
      // Actualiza las municip según el depart seleccionado
      console.log("estado  : ", estado.est);
   
      this.estado = estado.est;
      this.listRepDenByDeptoByEstado( this.deptoId, this.estado  );
    },
  



    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
      this.dialogPrint = false;

      this.$nextTick(() => {
        this.denPerDnte = Object.assign({}, this.defaultItemUsu)
        this.editedIndex = -1
      })
    },

    closeView() {
      this.viewDialog = false
      this.viewedItem = {}
    },

    cancelEdit() {
      this.resetForm();
    },


    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },


  },

  computed: {

   
    filteredItems() {
      return this.people.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key])
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
      })
    },
 
    paginatedItems() {
      const start = (this.pagination.page - 1) * this.itemsPerPage;
      return this.filteredItems.slice(start, start + this.itemsPerPage);
    },
    pageCount() {
      return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    },
    computedHeaders() {
      return this.headers.map(header => ({
        ...header,
        sortable: true // Todas las columnas son ordenables
      }));
    },
    sortBy(sortKey) {
      this.pagination.sortBy = sortKey;
      this.pagination.sortDesc = !this.pagination.sortDesc; // Alterna el orden
    },

  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    dialog2(val) {
      val || this.close()
    },
    dialog3(val) {
      val || this.close()
    },
  },



}
</script>

<style scoped>

.custom-green-btn {
  background-color: #849C58;
  /* #073d09    cambio a color verde oscuro  */
  /* Verde */
  color: white;
  /* Texto en blanco */
}


.v-data-table .v-table__wrapper>table>thead>tr>td,
.v-data-table .v-table__wrapper>table>thead>tr th,
.v-data-table .v-table__wrapper>table tbody>tr>td,
.v-data-table .v-table__wrapper>table tbody>tr th {
  background: #849C58 !important;
  /* #073d09    cambio a color verde oscuro  */
  color: white;
  /* Texto en blanco */

}

.custom-toast {
  background-color: #333;
  color: #fff;
  font-size: 16px;
  /* Add more styles as needed */
}


</style>