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
            <h3 class="p-0 py-6 px-2 ">Estado:</h3>
            <v-col cols="12" md="3">
                      
                        <v-select v-model="denPerDnte.estado" :items="estadoOptions" 
                            item-title="est"     item-value="transac"     @update:modelValue="onEstadoChange" 
                            ></v-select>
            </v-col>


              <h3 class="p-0 py-6 px-2 ml-4">Departamento: </h3> 
              <v-col cols="12" md="3">
                <v-select v-model="denPerDnte.departamento" :items="deptoOptions" 
                          item-title="depto"     item-value="depto_id"   @update:modelValue="onDepartChange"
                          :disabled="isDisabled"
                  ></v-select>
                  
            </v-col>         

            </v-row>


           <v-row>         
            <h3 class="p-0 py-6 px-2 ">Fecha:</h3>
            <v-col cols="12" md="3">
            <v-text-field v-model="denPerDnte.fec_registro_hecho_desde" :readonly="lockField" label="Desde" @input="handleInputDateDesde"
                placeholder="DD/MM/AAAA" required></v-text-field>
        
            </v-col>
            <v-col cols="12" md="3">
            <v-text-field v-model="denPerDnte.fec_registro_hecho_hasta" :readonly="lockField" label="Hasta" @input="handleInputDateHasta"
                placeholder="DD/MM/AAAA" required></v-text-field>
        
              </v-col>
            
            <v-col>  
                <v-row>  
                      <v-col cols="12" md="3" >
                          <v-btn  class="custom-green-btn"  @click="exportToExcel"> Excel </v-btn>         
                      </v-col>

                    <v-col cols="12" md="3" class="px-1">              
                      <v-btn class="custom-green-btn" text @click="exportToPDF"> PDF </v-btn>
                    </v-col>
                </v-row>  
          </v-col>
          </v-row>
        </v-container>
        
      </v-card-text>

<v-container>
  <v-row class="mb-4">
    <v-col cols="6" class="p-0 py-0 px-1">

      <!-- Search Field -->
      <v-text-field v-model="search" class="pa-2" label="Buscar Denuncia" append-icon="mdi-magnify" single-line
        hide-details></v-text-field>
   
    </v-col>
    <v-col cols="6" class="p-0 py-0 px-1">
   </v-col>
  </v-row>
  <!-- Data Table --> <!-- v-model:page="page"     filteredItems-->
  <v-data-table :headers="headers" :items="filteredItems"
    class="elevation-1"
    :search="search" 
    no-data-text="No existen registros." no-results-text="Sin resultados" 
    page-text="." :items-per-page="itemsPerPage"  
    rows-per-page-text="Filas por página"   :page-count="pageCount"
    items-per-page-text="Registros por pagina "

    >

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

import Denuncia from '@/services/Denuncia';
import NivelGeografico from '@/services/NivelGeografico';

import jsPDF from 'jspdf';
import 'jspdf-autotable';




import * as XLSX from 'xlsx'

export default {

  data: () => ({


  //  visibleItems:[],

   // toPrint: true,
    loading: true,
    isLoading: false,
    isDisabled: false,
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
      { title: 'Nombre denunciante', key: 'dnte_nombre_completo' },
      { title: 'Nombres denunciados', key: 'dndo_nombre_completo' },
      { title: 'Detalle hecho', key: 'detalle_hecho' },
      { title: 'Departamento', key: 'departamento' },
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
      fec_registro_hecho_desde: '',
      fec_registro_hecho_hasta: '',

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
      { sexo: 'FEMENINO', sexo_sigla: 'F' },
  { sexo: 'OTRO', sexo_sigla: 'O' }
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


    estadoOptions: [{ est: 'TODOS', transac: '' }, { est: 'SOLICITADO', transac: 'CREAR' }, { est: 'ASIGNADO', transac: 'DEN_DERIVAR' }
      , { est: 'ACEPTADO', transac: 'DEN_ACEPTAR' }, { est: 'RECHAZADO', transac: 'DEN_RECHAZAR' }
      ,{ est: 'AMPLIACION', transac: 'DEN_SOL_AMPLIACION' }],
    
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
   

    console.log('this.deptoId' ,this.deptoId, ',this.estado: ',this.estado,'this.denPerDnte.fec_registro_hecho', this.denPerDnte.fec_registro_hecho );

    this.listRepDenByDeptoByEstado( this.deptoId, this.estado , this.denPerDnte.fec_registro_hecho_desde  , this.denPerDnte.fec_registro_hecho_hasta  );
    
    this.loading = false;

    //console.log ('deptoOptions:',this.deptoOptions);

   // const departamento= this.deptoOptions.find(opt => opt.depto_id === this.deptoId); 
    //  console.log ('departamento',departamento);
    //    this.deptoOptions.depto = departamento.depto; // Asignamos el valor del select 
      if (this.deptoId>0) { 
        this.isDisabled = true; // Lo deshabilitamos
      }    
  },



  methods: {  //  this.people


    // Función para exportar los datos de la tabla a un archivo Excel
    exportToExcel() {
      // Extraemos las cabeceras de la tabla
      const ws_data = [
        this.headers.map(header => header.title), // Cabeceras de las columnas
        ...this.people.map(item => [item.fila2  , item.cod_denuncia  , item.dnte_nombre_completo  , item.dndo_nombre_completo
             , item.detalle_hecho  , item.departamento  , item.asignado_nombre_completo, item.estado, item.resultado, item.fec_registro_hecho
            ]), // Filas de datos
      ];

      // Crear una hoja de trabajo (worksheet) con los datos
      const ws = XLSX.utils.aoa_to_sheet(ws_data);

      // Crear un libro de trabajo (workbook) con la hoja de trabajo
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Datos');

      // Exportar el archivo Excel
      XLSX.writeFile(wb, 'tabla_datos.xlsx');
    },
  
    exportToPDF() {
      //const doc = new jsPDF();
      const doc = new jsPDF('landscape'); // Configurar la orientación horizontal
      const margins = { top: 20, bottom: 20 };

      // Configurar la tabla en el PDF usando jsPDF y autotable
      const columns = this.headers.map(header => header.title); // Cabeceras
      const rows = this.people.map(item => [item.fila2  , item.cod_denuncia  , item.dnte_nombre_completo  , item.dndo_nombre_completo
             , item.detalle_hecho  , item.departamento  , item.asignado_nombre_completo, item.estado, item.resultado, item.fec_registro_hecho
            ]);

     // Agregar la tabla al documento PDF con formato horizontal
        // Agregar la tabla al documento PDF
    //  doc.autoTable(columns, rows);

      doc.autoTable({
        head: [columns],
        body: rows,
      });


 // Calcular el ancho y alto disponibles para la tabla
 /*const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contentWidth = pageWidth - margins.left - margins.right;
      const contentHeight = pageHeight - margins.top - margins.bottom;

      // Crear una tabla usando jsPDF-Autotable
      doc.autoTable({
        head: [columns],
        body: [rows],
        startY: margins.top,
        theme: 'grid',
        margin: { horizontal: margins.left }
     
      });
*/

      const filename = `tabla_datos_${new Date().toISOString().slice(0, 10)}.pdf`;
      // Descargar el archivo PDF
      doc.save(filename);
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
            this.deptoOptions.push({
              depto: '(Nacional)',   // Bolivia
              depto_id: 0,
              depto_sigla: 'BOL',
            });
            this.departamentos.push({
              depto: '(Nacional)',   // Bolivia
              depto_id: 0,
              depto_sigla: 'BOL',
            });
            console.log("deptoOptions  : ", this.deptoOptions);
          } else {
            this.showSnackbar('Error recuperando Denuncia ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

 
    async listRepDenByDeptoByEstado(deptoId,estado, fec_registro_hecho_desde  , fec_registro_hecho_hasta  )  {
      console.log('deptoId ' ,deptoId ,'this.estado: ',estado,'fec_registro_hecho_desde',fec_registro_hecho_desde,'fec_registro_hecho_hasta',fec_registro_hecho_hasta );
     if(!fec_registro_hecho_desde || !fec_registro_hecho_hasta)     {
      fec_registro_hecho_desde='1999-01-01';
      fec_registro_hecho_hasta='1999-01-01';

     }
     else{
      let dateParts =   fec_registro_hecho_desde.split("/"); //// "2024-05-17".split("/");  //
      fec_registro_hecho_desde = dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]; //.toISOString(),  
      dateParts =   fec_registro_hecho_hasta.split("/"); //// "2024-05-17".split("/");  //
      fec_registro_hecho_hasta = dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]; //.toISOString(),     
     }
     
      await Denuncia.listRepDenByDeptoByEstado(deptoId,estado, fec_registro_hecho_desde  , fec_registro_hecho_hasta  ) 
        .then((response) => {
      
          if (response.status === 200) {
                console.log("listRepDenByDeptoByEstado : ", response.data, response.status);
            this.people = response.data;
         
          } else {
            this.people =[];
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

      this.deptoId = depart.depto_id;
      console.log('this.deptoId ' ,this.deptoId ,'this.estado: ',this.estado );
    // if(this.denPerDnte.fec_registro_hecho_desde.length >=10 || this.denPerDnte.fec_registro_hecho_hasta.length ==0 ){

      this.listRepDenByDeptoByEstado( this.deptoId, this.estado , this.denPerDnte.fec_registro_hecho_desde, this.denPerDnte.fec_registro_hecho_hasta );

    // }
    },

    onEstadoChange() {
      // Encuentra el depart seleccionado por su id
      const estado = this.estadoOptions.find(c => c.transac === this.denPerDnte.estado);
      // Actualiza las municip según el depart seleccionado
   
      this.estado = estado.est;
      console.log('this.deptoId ' ,this.deptoId ,'this.estado: ',this.estado );

      this.listRepDenByDeptoByEstado( this.deptoId, this.estado , this.denPerDnte.fec_registro_hecho_desde, this.denPerDnte.fec_registro_hecho_hasta );
    },
  
  // Formato de la fecha
    handleInputDateDesde(event) {  //  @input="handleInputDate"
      // Limitar la entrada a números y el separador de fecha
      this.denPerDnte.fec_registro_hecho_desde = this.formatDate(event.target.value) ;//.replace(/^[0-9-]*$/, '').slice(0, 10);
     // console.log("handleInputDate fecha del hecho:", this.denPerDnte.fec_registro_hecho);  ///[^0-9]/g
     if(this.denPerDnte.fec_registro_hecho_desde.length >=10 || this.denPerDnte.fec_registro_hecho_desde.length ==0 ){

      this.listRepDenByDeptoByEstado( this.deptoId, this.estado , this.denPerDnte.fec_registro_hecho_desde, this.denPerDnte.fec_registro_hecho_hasta );

      }
    
    },
  // Formato de la fecha
  handleInputDateHasta(event) {  //  @input="handleInputDate"
      // Limitar la entrada a números y el separador de fecha
      this.denPerDnte.fec_registro_hecho_hasta = this.formatDate(event.target.value) ;//.replace(/^[0-9-]*$/, '').slice(0, 10);
     // console.log("handleInputDate fecha del hecho:", this.denPerDnte.fec_registro_hecho);  ///[^0-9]/g
     if(this.denPerDnte.fec_registro_hecho_hasta.length >=10 || this.denPerDnte.fec_registro_hecho_hasta.length ==0 ){

      this.listRepDenByDeptoByEstado( this.deptoId, this.estado , this.denPerDnte.fec_registro_hecho_desde, this.denPerDnte.fec_registro_hecho_hasta );

      }
    
    },
    // Función para formatear la fecha// Aplica la máscara de fecha  dd/mm/yyyy
    formatDate(inputValue) {
        inputValue = this.eliminarUltimoCaracterNoNumerico(inputValue);
      // Ejemplo: formato DD/MM/AAAA     // console.log("formatDate:", inputValue);
      
      if (inputValue.length == 2) {
        inputValue = `${inputValue.slice(0, 2)}/`;
      }
      if (inputValue.length > 3 && inputValue.length < 5) {
        inputValue = `${inputValue.slice(0, 2)}${inputValue.slice(2, 4)}`;
      }
      if (inputValue.length == 5) {
        inputValue = `${inputValue.slice(0, 5)}/`;
      }
      if (inputValue.length > 5) {
        inputValue = `${inputValue.slice(0, 10)}`;
      }

      // Actualiza rawDate con la fecha formateada
      // this.rawDate = inputValue;
     // console.log("formatDate:", inputValue);

      return inputValue; //value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    },
    eliminarUltimoCaracterNoNumerico(str) {
      // Verificamos si el string no está vacío
      if (str.length === 0) {
        return str; // Devuelve el string sin cambios si está vacío
      }

      // Obtenemos el último carácter
      const ultimoCaracter = str.charAt(str.length - 1);

      // Comprobamos si es un carácter numérico
      if (!/\d/.test(ultimoCaracter)) {
        // Si no es numérico, eliminamos el último carácter
        return str.slice(0, -1);
      }

      // Si es un carácter numérico, devolvemos el string sin cambios
      return str;
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