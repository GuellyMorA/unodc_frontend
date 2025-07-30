<template>
  <!--  <v-breadcrumbs :items="breadcrumbs" separator="/">
  </v-breadcrumbs>
-->
  <v-alert v-if="loading" type="info" dismissible>
    Cargando datos...
  </v-alert>
  <v-container>
    <v-card class="mx-auto  mt-1" max-width="700">

<v-card-title class="text-center">
  <h1>    Formulario de denuncias</h1>
</v-card-title>



</v-card>
    <v-card class="mx-auto  mt-1" max-width="700">

      <v-card-title class="text-multiline  title-small" >
       <h3>"EL PRESENTE FORMULARIO RECIBE DENUNCIAS DE POSIBLES ACTOS DE CORRUPCIÓN Y/O NEGATIVA INJUSTIFICADA DE ACCESO A LA INFORMACIÓN POR FUNCIONARIOS POLICIALES Y SERÁ REVISADO POR EL DEPARTAMENTO NACIONAL DE TRANSPARENCIA DE LA POLICÍA BOLIVIANA. LA DENUNCIA PUEDE SER CON RESERVA DE IDENTIDAD O ANONIMA ,PERO ES IMPORTANTE QUE USTED REGISTRE AL MENOS UN CORREO ELECTRONICO"</h3> 



        
      </v-card-title>

    </v-card>

    <v-card class="mx-auto mt-4" max-width="700">
      <v-card-text>
        
        <v-row class="ml-1">
        
            <label class="text-h5">Datos del Denunciante</label>        
         
        </v-row>

      
          <v-row >
            <h3 class="p-0 py-7 px-6 ">Denuncia anónima ? : </h3>
            <v-col>  
               <v-row>    

                <v-col cols="12" md="3">
            
                    <v-checkbox  v-model="denPerDnte.denuncia_anonima"  @change="handleSiChange"
                    label="Si"></v-checkbox>
                    </v-col>
                    <v-col cols="12" md="3">
                          <v-checkbox  v-model="denPerDnte.denuncia_anonima_no"  @change="handleNoChange"  
                            label="No"></v-checkbox>
                        </v-col>
                </v-row>  
              </v-col>

          </v-row>
   
        <v-container>
      
          <v-row>
            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-text-field v-model="denPerDnte.nombres" :readonly="lockField" label="Nombres"
              :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="px-1">
              <v-text-field v-model="denPerDnte.apellido_pat" :readonly="lockField" label="Ap. Paterno"
               :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="px-1">
              <v-text-field v-model="denPerDnte.apellido_mat" :readonly="lockField" label="Ap. Materno."
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row  >
            <span class="ml-3 text-h7"> (*) El registro de correo es obligatorio</span>
        </v-row>
        
          <v-row>
            <v-col cols="12" sm="6" md="4"   class="px-1">
              <v-text-field v-model="denPerDnte.email" :readonly="lockField" label="Correo electrónico"
                :rules="[v => !!v || 'Correo es requerido']"  ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-select v-model="denPerDnte.genero_sexo" :items="sexoOptions" item-title="sexo" item-value="sexo_sigla"
                :readonly="lockField" label="Género" @update:modelValue="onSexoChange"
                :rules="[v => !!v || 'Género es requerido']"></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-text-field v-model="denPerDnte.telefono" :readonly="lockField" label="Teléfono"
                :rules="[v => !!v || 'Teléfono es requerido']"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="p-0 py-0 px-0   ml-3 mr-3 ">
              <v-text-field v-model="denPerDnte.ubic_donde" :readonly="lockField" label="Donde se encuentra"
                :rules="[v => !!v || 'Ubicación es requerido']"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card class="mx-auto  mt-4" max-width="700">
      <v-card-title >
        <v-row class="mx-auto  mt-1">   
          <v-col cols="12" sm="6" md="4">
          <span class="text-h5"> Datos del Denunciado </span>
        </v-col>
        <v-col cols="12" sm="6" md="4">
            <v-icon small class="mr-2" @click="agregarPersona"> mdi-plus-circle-outline</v-icon>
        
      </v-col>
      </v-row>
      </v-card-title>

      <v-card-text  >
        <v-container>
          <v-row  class="mb-4">
            <span class="text-h7"> Para adicionar a un denunciado presione "+", depues de llenar los datos requeridos. El registro de Genero, Lugar, Dpto. y Ciudad es obligatorio</span>
        </v-row>

          <v-row >

            <v-col cols="12" md="3"   class="px-1">
              <v-text-field v-model="denunciado.nombres" :readonly="lockField" label="nombres"
               ></v-text-field>

            </v-col>
            <v-col cols="12" md="3"   class="px-1">
              <v-text-field v-model="denunciado.apellido_pat" :readonly="lockField" label="apellido pat"
               ></v-text-field>
            </v-col>
            <v-col cols="12" md="3"   class="px-1">
              <v-text-field v-model="denunciado.apellido_mat" :readonly="lockField" label="apellido mat"
             ></v-text-field>
            </v-col>
            <v-col cols="12" md="3"   class="px-1">
              <v-select v-model="denunciado.genero_sexo" :items="sexoOptions" item-title="sexo" item-value="sexo_sigla"
                :readonly="lockField" label="Género" @update:modelValue="onSexoChangeDenunciado"
               ></v-select>
            </v-col>
          </v-row>
      
          <v-row>
            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-select v-model="denunciado.grado" :items="gradoOptions" item-title="grado" item-value="grados_sigla"
                :readonly="lockField" label="grado" @update:modelValue="onGradoChange"
              ></v-select>

            </v-col>

            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-text-field v-model="denunciado.puesto_cargo_funcion" :readonly="lockField" label="Cargo y funcion"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-text-field v-model="denunciado.unidad_policial_desc" :readonly="lockField" label="Unidad policial"
              ></v-text-field>
            </v-col>        

          </v-row>   
          <v-row>

            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-text-field v-model="denPerDnte.lugar_hecho" :readonly="lockField" label="Lugar del hecho (Calle,Edif...)"
            ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-select v-model="denPerDnte.departamento" :items="deptoOptions" item-title="depto" item-value="depto_id"
                :readonly="lockField" label="Departamento" @update:modelValue="onDepartChange"
               ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="4"  class="px-1">
              <v-select v-model="denPerDnte.municipio" :items="munOptions" item-title="mun" item-value="mun_id"
                :readonly="lockField" label="Ciudad" return-object
               ></v-select>
            </v-col>
          </v-row>
    <div>   
    <table>
      <thead>
        <tr>
          <th>Nombres</th>
          <th>Ap. Paterno.</th>
          <th>Ap. Materno.</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(denunciado, index) in denunciadosArray" :key="index">
          <td>{{ denunciado.nombres }}</td>
          <td>{{ denunciado.apellido_pat }}</td>
          <td>{{ denunciado.apellido_mat }}</td>
          <td>
           
            <v-icon small class="mr-2" @click="quitarPersona(index)">mdi-delete-forever</v-icon>
          </td>
        </tr>
      </tbody>
    </table>
   
  </div>

        </v-container>
      </v-card-text>

    </v-card>

  

    <v-card class="mx-auto  mt-4" max-width="700">
      <v-card-title>
        <v-row class="mx-auto  mt-1">   
          <v-col cols="12" sm="6" md="4">
        <span class="text-h5"> Detalles del hecho </span>
      </v-col>
    </v-row>
      </v-card-title>
      
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4" class="px-1">
          <!--      <div class="d-flex align-center">    style="width: 400px;" -->
                <v-text-field v-model="denPerDnte.fec_registro_hecho" :readonly="lockField" label="Fecha del hecho"  @input="handleInputDate"
                  placeholder="DD/MM/AAAA" required></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="px-1">
                  <v-text-field v-model="denPerDnte.hora_registro_hecho" :readonly="lockField" label="Hora aprox. del hecho" @input="handleInputHour"
                  placeholder="hh:mm" hide-details required></v-text-field>
            <!--</div>  -->  

            </v-col>
          </v-row>
          <v-row>
            <v-col class="p-0 py-0 px-0">
               <v-textarea class="mx-auto  mt-4" v-model="denPerDnte.detalle_hecho" :readonly="lockField"
               rows="3" cols="1" label="Breve detalle del hecho" :rules="[v => !!v || 'Detalle hecho es requerido']"></v-textarea>
            </v-col>
      
          </v-row>
          <v-row>
            <v-col  class="p-0 py-0 px-0">     
                <h4>Adjuntar documentación: </h4> 
            </v-col>       
          </v-row>  

          <v-row>
            <v-col  class="p-0 py-0 px-0"  cols="12" md="6" v-for="(fileType, index) in fileTypes" :key="index">
          <v-file-input
            v-model="files[index]"
            :label="fileType.label"
            :accept="fileType.accept"
            :show-size="true"
            :rules="[rules.required]"
            multiple    @change="onMultipleFilesChange"
          ></v-file-input>
            </v-col>      
          </v-row>    
   
      
          
          <v-row>
              <v-col class="p-0 py-4 px-4"  cols="4" >
                <!-- Primera columna -->          
                <label for="file3">Reserva de identidad ? : </label>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="3" >
                <v-checkbox v-model="denPerDnte.reserva_identidad_si"  @change="handleSiReservaChange"
                 label="Si" ></v-checkbox>           
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="3" >
                <v-checkbox   v-model="denPerDnte.reserva_identidad_no" @change="handleNoReservaChange"
                label="No" ></v-checkbox>           
                </v-col>
          </v-row>

      <!--    <v-row>
            <v-col class="p-0 py-0 px-0">         

              <v-checkbox  value="false"  v-model="reserva_datos" 
                label="Estoy de acuerdo que todos mis datos seran tratados con absoluta reserva y confidencialidad por la Inspectoria General y Departamento Nacional de Transparencia de la Policia Boliviana."
                required></v-checkbox>

              <v-checkbox  value="false"  v-model="articulo_166_cp" 
                label="Declaro conocer el ARTICULO 166° (Código Penal).- (ACUSACION Y DENUNCIA FALSA). El que a sabiendas acusare o denunciare como autor o partícipe de un delito de acción pública a una persona que no lo cometió, dando lugar a que se inicie el proceso criminal correspondiente, será sancionado con privación de libertad de uno a tres años. Si como consecuencia sobreviniere la condena de la persona denunciada o acusada, la pena será de privación de libertad de dos a seis años"
                required></v-checkbox>

              </v-col>      
          </v-row>
        -->

        </v-container>
      </v-card-text>

    </v-card>
  </v-container>


  <v-container>
    <v-card class="mx-auto  mt-4" max-width="700">
      <v-card-text class="d-flex flex-column align-center justify-center">
        <div class="captcha-container" style="width: 300px;">
          <v-row>
            
          <svg width="200" height="40" xmlns="http://www.w3.org/2000/svg">
            <text x="100" y="30" font-family="Verdana" font-size="30" fill="black">{{ captcha }}</text>
          </svg>
         </v-row>

          <v-row>
          <v-text-field v-model="userInput" label="Introduce el número de arriba" required></v-text-field>
        </v-row>
        </div>

<!--
        <v-btn class="custom-green-btn mt-4" color="primary" @click="validateCaptcha">Validar</v-btn>
-->
        <!-- Add New Person Button -->
        <v-btn class="custom-green-btn mt-4" @click="denunciaSave">
          Enviar Denuncia
        </v-btn>
      </v-card-text>

    </v-card>

    <template>
      <v-snackbar v-model="snackbar.visible" :timeout="3000" :color="snackbar.color" :top="'top'"
        :vertical="snackbar.mode === 'vertical'" :right="'right'" :multi-line="snackbar.mode === 'multi-line'">
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar.visible = false">
            Cerrar
          </v-btn>
        </template>
      </v-snackbar>



    </template>

  </v-container>
</template>


<script >

//import { toast } from 'vue3-toastify/index';
import { toast } from 'vue3-toastify';

import NivelGeografico from '@/services/NivelGeografico';
import Grado from '@/services/Grado';
import Rol from '@/services/Rol';

import Denuncia from '@/services/Denuncia';
import Denunciado from '@/services/Denunciado';
import Denunciante from '@/services/Denunciante';
import axios from 'axios';
import { downloadFile } from '../../utils/fileDownloader';
import DocumentosPath from '@/services/DocumentosPath';



export default {

 
  data: () => ({
      singleFile: null,
      multipleFiles: [],
      singleUploadResponse: "",
      multipleUploadResponse: "",

      nameFile:'',





    files1: [
    { id: 1, name: 'archivo1.pdf' },
    { id: 2, name: 'imagen.jpg' }
  ],
    files:[], // Array(5).fill(null), // Array para almacenar 5 archivos
    previews: Array(5).fill(null), // Array para almacenar vistas previas de los archivos
 
    fileTypes: [
        { label: 'Cargar Fotos (JPEG/PNG)', accept: 'image/jpeg,image/png,image/bmp' },
        { label: 'Cargar PDF', accept: 'application/pdf' },
       // { label: 'Cargar Texto (TXT)', accept: 'text/plain' },
      //  { label: 'Cargar Archivo de Word', accept: '.doc,.docx' },
        //{ label: 'Cargar Archivo de Excel', accept: '.xls,.xlsx' },
        { label: 'Cargar Archivo de Video', accept: 'video/*' },
        { label: 'Cargar Archivo de Audio', accept:  'audio/*' },
    ],

    snackbar: {
      visible: false,
      message: '',
      color: "success",
      mode: "",
      timeout: 2500,
    },


   // isLoading: true,
 
    selectedFileName: '...',


    name: 'Breadcrumbs',// router.currentRoute.value.path 
    breadcrumbs: [],
    loading: true,
    reservaIdentSi: null, // Inicialmente null, se actualizará al seleccionar una opción
    reservaIdentNo: null, // Inicialmente null, se actualizará al seleccionar una opción
    reserva_datos: '',
    articulo_166_cp: '',

    captcha: '',
    //value: '',
    formattedDate: '',
    rawDate: '', // Almacena el valor crudo ingresado


    selectedDate: null, // Para almacenar la fecha seleccionada
    showDatePicker: false, // Para controlar la visibilidad del selector de fecha
    menu: false,

    userInput: '', //ok 
    page: 1,
    itemsPerPage: 5,
    search: '',
    dialog: false,
    dialogDelete: false,

    username: localStorage.getItem('username'),

    lockField: false,

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
        title: 'Num',
        align: 'start',
        sortable: false,
        key: 'id',
        class: 'background'
      },
      { title: 'CI', key: 'ci_y_complemento', class: 'success--text title' },
      { title: 'Grado', key: 'grados_sigla' },
      { title: 'Ap. Paterno', key: 'apellido_pat' },
      { title: 'Ap. Materno', key: 'apellido_mat' },
      { title: 'Nombres', key: 'nombres' },
      { title: 'Rol Asignado', key: 'rol' },
      { title: 'Estado', key: 'estado' },
      { title: 'Acciones', value: 'actions', sortable: false },
    ],
    people: [],
    editedIndex: -1,

 

    codDenuncia: '',

    // propiedades del formulario 
    denPerDnte: {
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
      denuncia_anonima_no: true,
      reserva_identidad:'',
      reserva_identidad_si: '',
      reserva_identidad_no: true,
      dnte_id: null,
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',
      
      orden:0,

         estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
   
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
      denuncia_anonima: false,
      denuncia_anonima_no: '',
      reserva_identidad: false,
      reserva_identidad_si: false,
      reserva_identidad_no: false,
      dnte_id: null,
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',
      
      orden:0,

         estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
    },
    denunciadosArray: [],

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
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',
      puesto_cargo_funcion: '',
      unidad_policial_desc: '',
      orden:0,
      
      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null 

    },
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
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubic_donde: '',
      direccion: '',
      puesto_cargo_funcion: '',
      unidad_policial_desc: '',
      orden:0,
      
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
   docsPath:[],
  
   
    viewedItem: {},

    viewDialog: false,

  

    sexoOptions: [
      { sexo: 'MASCULINO', sexo_sigla: 'M' },
      { sexo: 'FEMENINO', sexo_sigla: 'F' },
  { sexo: 'OTRO', sexo_sigla: 'O' }
    ],

    expedidoOptions: ['LP', 'CH', 'SC', 'CBBA', 'OR'],
    gradoOptions: [], // ['Capitan', 'Teniente', 'Sargento 1ro', 'Sin Grado'],
    rolOptions: [],
    validationErrors: {  },

    selectedDeptoId: null,    // Código del país seleccionado
    selectedProvinceCode: 0,    // Código de la provincia seleccionada
    departamentos: [{}],
    deptoOptions: [{}],
    munOptions: [{}],          //['El Alto', 'Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],

    estadoOptions: [{ est: 'ACTIVO', transac: 'ACTIVAR' }, { est: 'INACTIVO', transac: 'INACTIVAR' }],
  

  }),

  mounted() {
    const fileInputs = document.querySelectorAll('.file-input');

    this.deptoList();
    this.onDepartChange();
    this.gradoList();
   
    this.generateCaptcha();
    this.updateBreadcrumbs();
   // this.denPerDnte.denuncia_anonima=false;
   // this.denPerDnte.reserva_identidad_no = true;

    this.loading= false;
  },



  methods: {
    handleSiChange() {
      if (this.denPerDnte.denuncia_anonima) {
        this.denPerDnte.denuncia_anonima_no = false;
        this.denPerDnte.reserva_identidad_si = true;
        this.denPerDnte.reserva_identidad_no = false;

        this.denPerDnte.nombres='(ANONIMO)';
        this.denPerDnte.apellido_pat='(ANONIMO)';
        this.denPerDnte.apellido_mat='(ANONIMO)';
        this.denPerDnte.telefono='N/D';
       // this.denPerDnte.email='N/D';
       this.denPerDnte.ubic_donde='N/D';


      }
    },
    handleNoChange() {
      if (this.denPerDnte.denuncia_anonima_no) {
        this.denPerDnte.denuncia_anonima = false;
        this.denPerDnte.reserva_identidad_si = false;
        this.denPerDnte.reserva_identidad_no = true;

        this.denPerDnte.nombres='';
        this.denPerDnte.apellido_pat='';
        this.denPerDnte.apellido_mat='';
        this.denPerDnte.telefono='';
        //this.denPerDnte.email='';
        this.denPerDnte.ubic_donde='';
      }
    },

    handleSiReservaChange() {
      if (this.denPerDnte.reserva_identidad_si) {
        this.denPerDnte.reserva_identidad_no = false   ;

      }
    },
    handleNoReservaChange() {
      if (this.denPerDnte.reserva_identidad_no) {
        this.denPerDnte.reserva_identidad_si = false  ;
  
      }
    },
    agregarPersona() {
       // validar nulos
      if(!this.denunciado.genero_sexo_sigla || !this.denPerDnte.lugar_hecho || !this.denPerDnte.departamento || !this.denPerDnte.municipio  ) {// || !this.denunciado.apellido_pat
       return ;
      }  
      
      if (!this.denunciado.nombres  )   { // || !this.denunciado.apellido_pat
        this.denunciado.nombres= 'N/D';     

    }
         this.denunciadosArray.push({ ...this.denunciado });

      console.log('this.denunciadosArray :', this.denunciadosArray);
      this.denunciado = Object.assign({}, this.defaultItemDenunciado);
     /* this.denunciado = {
        nombres: '',
        apellido_pat: '',
        apellido_mat: '',
      };*/
    },
    quitarPersona(index) {
      this.denunciadosArray.splice(index, 1);
      console.log('this.denunciadosArray :', this.denunciadosArray);
    },

    onSingleFileChange(event) {
      this.singleFile = event.target.files[0];
    },
    onMultipleFilesChange(event) {
     this.multipleFiles = Array.from(event.target.files);
      console.log('this.multipleFiles :', this.multipleFiles);
    },
 
   // {{ id: number; name: string; }} file1

    downloadFile1(file1) {
      // Aquí puedes implementar la lógica para descargar el archivo
      // Por ejemplo, creando un enlace temporal y haciendo clic en él:
      const link = document.createElement('a');
      link.href = `/api/files/${file1.id}/download`; // Ajusta la ruta según tu backend
      link.download = file1.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    async downloadFile() { //  en utils
      this.loading = true;
      this.snackbar.visible = false;

      try {
        await downloadFile('/archivo', 'archivo_descargado.ext'); // Cambia el nombre y la ruta específica del archivo
        this.snackbar.message = 'Archivo descargado exitosamente!';
        this.snackbar.color = 'success';
      } catch (error) {
        this.snackbar.message = 'Ocurrió un error al descargar el archivo.';
        this.snackbar.color = 'error';
      } finally {
        this.loading = false;
        this.snackbar.visible = true;
      }
    },
   
    async enviarArchivos() {
      try {
        //this.uploadSingleFile();
        //this.uploadMultipleFiles();
        // return;
        const arrayPlano = Array.from(this.files).flat();


             // console.log('multipleFiles :',  this.multipleFiles);
              console.log('this.files:  ', this.files);
              //  console.log('this.files:  ', Array.from(this.files));
                console.log(' arrayPlano:  ', arrayPlano);
                //console.log(typeof this.multipleFiles);
              //  console.log(typeof arrayPlano);
        const formData = new FormData();
        
        arrayPlano.forEach((file, index) => {
          // Renombrar el archivo
          if (file !== undefined){
            const typeFile = file.name.split('.').pop()  ;
       
           this.nameFile =  file.name  +'-'+'SD-' +  Date.now()+'.'+ typeFile ; // ${Date.now()}-SD-s
           const newFile = new File([file], this.nameFile, { type: file.type });
           this.nameFile  =newFile;
          formData.append("files", newFile);
          
          console.log('this.nameFile.name :', this.nameFile.name);
          console.log(typeof this.nameFile);
          }
       // });
    
       
       // arrayPlano.forEach((file, index) => { //for (let i = 0; i < this.files.length; i++) {
      
          if (file !== undefined) { // Asegúrate de que el archivo no esté vacío

            this.documentosPath.denuncia_personas_id = this.denPerDnte.id;
            // this.documentosPath.cod_denuncia = this.denPerDnte.cod_denuncia;
            this.documentosPath.denunciante_id = this.denPerDnte.dnte_id;
            this.documentosPath.orden = index + 1; // parseInt(this.documentosPath.orden) == 1 ? parseInt(this.documentosPath.orden) : parseInt(this.denunciado.orden) + 1;
            this.documentosPath.origen ='DENUNCIANTE'; // this.nameFile ;// +'.'+ file[index].type; //  Date.now() +'-'+ 'SD' + file[index].name; // ${Date.now()}-SD-s
            //file[index].name= this.documentosPath.origen;
            this.documentosPath.documento_path = 'uploads/evidencia_denuncias/' + this.nameFile.name ;

            this.documentosPath.fec_registro = this.denPerDnte.fec_registro_hecho; //new Date();    
            this.documentosPath.descripcion = this.nameFile.name; //'SE ADJUNTA ARCHIVOS DE EVIDENCIA POR EL DENUNCIANTE DESDE UNA PAGINA WEB PUBLICA';
            this.documentosPath.justificacion_legal = 'TRANSPARENCIA INSTITUCIONAL';
            this.documentosPath.estado = 'ACTIVO';
            this.documentosPath.transaccion = 'ACTIVAR';
            this.documentosPath.usu_cre = this.username;

            //  formData.append("file", file);// formData.append(`files[${index}].name`, file);
            // formData.append(`files[${index}]`, file);// formData.append(`file_${index}`, file);//formData.append('file', file);
          
           DocumentosPath.documentosPathCreate(this.documentosPath)
                .then((response) => {
                    if (response.status === 201) {

                      //this.documentosPath.u_rol_id = response.data.id;
                      //this.denunciado.id = response.data.id;
                      console.log("documentosPathCreate  archivos: ", response.status, response);
                      this.showSnackbar('archivo subido correctamente!', 'green')
                      // this.close()
                      this.files=[];
                    } else {

                      console.log("denuncianteCreate  : ", response.status, "error:   : ", response.response.request.response);
                      this.showSnackbar('Error creando denuncianteCreate: ' + response.response.request.response, 'red');
                      toast.info('Error creando archivos: ' + 'Revise logs con el Administrador del sistema', {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_RIGHT,

                      });
                    }
                  })
                  .catch(error => {
                    this.showSnackbar('Log Error subiendo archivos: ' + error, 'red');
                    console.log('Log Error subiendo archivos: ', error);
                  })
          
          
          }
        });


        //console.log(Array.from(formData.entries()));       
        //for (let [key, value] of formData.entries()) {      console.log(key, value);    }
            if ( this.files.length>0){
         
                const apiUrl = import.meta.env;
                  axios.post('/documentosPathUpload', formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': apiUrl.VITE_API_URL_TOKEN
                  },
                })
                  .then(response => {
                    console.log('Archivos subidos correctamente:', response.data);
                    // Actualizar el estado de la aplicación, mostrar mensajes de éxito, etc.
                    toast.success('archivos subidos correctamente ! ', {
                      autoClose: 5000,
                      position: toast.POSITION.TOP_RIGHT,

                    });
                  })
                  .catch(error => {
                    console.error('Error subiendo archivos:', error);
                    // Mostrar mensajes de error al usuario
                    this.showSnackbar('Error subiendo archivos: ' + error, 'red');
                  });
              }


      } catch (error) {
        console.error('Error en la carga de archivos:', error);
        this.showSnackbar('Error en la carga de archivos:' + error, 'red');
      }
    },


    onFileChange(event) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

   /*   const data = {
        isMarried: this.isMarried
      };
      */

      axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log('Archivo subido:', response.data);
        })
        .catch(error => {
          console.error('Error al enviar los datos:', error);
        });
    },


    async gradoList() {
      Grado.gradoList()
        .then((response) => {

          // console.log("response.data[0]  : ", response.data[0], response.status);
          if (response.status === 200) {

            this.gradoOptions = Object.values(response.data);
            console.log("gradoOptions  : ", this.gradoOptions);
          } else {
            this.showSnackbar('Error recuperando Usuario ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async rolList() {
      Rol.rolList()
        .then((response) => {
        
          if (response.status === 200) {

            this.rolOptions = Object.values(response.data);
            console.log("rolOptions  : ", this.rolOptions);
          } else {
            this.showSnackbar('Error recuperando Usuario ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
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
            this.showSnackbar('Error recuperando Usuario ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async denunciaPersonasList() {
         await  Denuncia.denunciaPersonasList() 
        .then( (response) => {
        
          if (response.status === 200) {
            const fechaActual = new Date(); //.toLocaleDateString();          
            const denunciaPersonasMaxId =  String(parseInt(response.data[0].latestId) +1);
            this.codDenuncia = 'SD-'+ denunciaPersonasMaxId.padStart(4, '0') +'-' + String(parseInt(fechaActual.getMonth()+1))+'-' + fechaActual.getFullYear(); ; 
            console.log("this.codDenuncia  : ", this.codDenuncia);
          } else {
            this.showSnackbar('Error recuperando denunciaPersonasList ' + response, 'red');
          }
        })
        .catch(error => {
             this.showSnackbar('Error recuperando denunciaPersonasList ' + error, 'red');

        });
    },
 

    async denunciaPersonasGetByCod() {
          Denuncia.denunciaPersonasGetByCod('SD-0305-11-2024') //  this.denPerDnte.id
        .then((response) => {
          console.log("denunciaPersonasGetByCod  : ", response.data, response.status);
          if (response.status === 200) {
            this.denPerDnte = response.data[0];
          } else {
            this.showSnackbar('Error recuperando denunciaPersonasGetByCod ' + response, 'red');
          }
        })
        .catch(error => {
           this.showSnackbar('Error recuperando denunciaPersonasGetByCod ' + error, 'red'); 
        });
    },
    async denunciadoListByCod() {
      Denunciado.denunciadoListByCod('SD-0306-11-2024')
        .then((response) => {
          if (response.status === 200) {
                      console.log("denunciadoListByCod 1  : ", response.data, response.status);

            this.denunciado = response.data[0];
            this.loading = false;
          } else {
            this.showSnackbar('Error recuperando denunciadoListByCod ' + response, 'red');
          }
        })
        .catch(error => {
          this.showSnackbar('Error recuperando denunciadoListByCod ' + error, 'red'); 
        });
    },  
    async documentosPathListByCod() {
         await DocumentosPath.documentosPathListByCod('SD-0306-11-2024') //  this.denPerDnte.id
        .then((response) => {
          console.log("documentosPathListByCod  : ", response.data, response.status);
          if (response.status === 200) {
            this.docsPath = response.data;
            
          } else {
            this.showSnackbar('Error recuperando documentosPathListByCod ' + response, 'red');
          }
        })
        .catch(error => {
             this.showSnackbar('Error recuperando documentosPathListByCod ' + error, 'red'); 

        });
    },

    async denuncianteCreate() {
      //this.denPerDnte.id = this.denPerDnte.id;
     // this.denPerDnte.cod_denuncia = this.denPerDnte.cod_denuncia;
      this.denPerDnte.tipo_personas = 'DENUNCIANTE';
      this.denPerDnte.orden = parseInt(this.denPerDnte.orden)==1 ? parseInt(this.denPerDnte.orden) : parseInt(this.denunciado.orden)  + 1;
      this.denPerDnte.grados_sigla = 'CIVIL';
      this.denPerDnte.genero_sexo_sigla=  this.denPerDnte.genero_sexo_sigla ? this.denPerDnte.genero_sexo_sigla:  this.denPerDnte.genero_sexo;
      this.denPerDnte.sigla = 'INTERNET';
      this.denPerDnte.direccion =    this.denPerDnte.ubic_donde ;
      if( this.denPerDnte.genero_sexo_sigla ==''){
        this.denPerDnte.genero_sexo_sigla ='M';
      }
      
      this.denPerDnte.estado = 'ACTIVO';
      this.denPerDnte.transaccion = 'ACTIVAR';
      this.denPerDnte.usu_cre = this.username;  

      await Denunciante.denuncianteCreate(this.denPerDnte)
        .then((response) => {
          if (response.status === 201) {

            //this.denPerDnte.u_rol_id = response.data.id;
            //this.denunciado.id = response.data.id;
            console.log("denuncianteCreate  : ", response.status, response);
            this.showSnackbar('Denunciante creado correctamente!', 'green')
            // this.close()
          } else {

            console.log("denuncianteCreate  : ", response.status, "error:   : ", response.response.request.response);
            this.showSnackbar('Error creando denuncianteCreate: ' + response.response.request.response, 'red');
            toast.info('Error creando Denunciante: ' + 'Revise logs con el Administrador del sistema', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,

            });
          }
        })
        .catch(error => {
          this.showSnackbar('Log Error creando Denunciante: ' + error, 'red');
          console.log('Log Error creando Denunciante: ', error);
        })
    },
    async documentosPathCreate() {
      this.documentosPath.denuncia_personas_id = this.denPerDnte.id;
      this.documentosPath.denunciante_id = this.denPerDnte.id;
     // this.documentosPath.cod_denuncia = this.denPerDnte.cod_denuncia;
      this.documentosPath.orden = parseInt(this.documentosPath.orden)==1 ? parseInt(this.documentosPath.orden) : parseInt(this.documentosPath.orden)  + 1;
     // this.documentosPath.direccion = 'N/A';
      
      
      this.documentosPath.estado = 'ACTIVO';
      this.documentosPath.transaccion = 'ACTIVAR';
      this.documentosPath.usu_cre = this.username;
  
      await DocumentosPath.documentosPathCreate(this.documentosPath)
        .then((response) => {
          if (response.status === 201) {

            //this.denPerDnte.u_rol_id = response.data.id;
            //this.documentosPath.id = response.data.id;
            console.log("documentosPathCreate  : ", response.status, response);
            this.showSnackbar('documentosPath creado correctamente!', 'green')
           
          } else {

            console.log("documentosPathCreate error : ", response.status, "error:   : ", response.response.request.response);
            this.showSnackbar('Error creando documentosPathCreate: ' + response.response.request.response, 'red');
            toast.info('Error creando documentosPath: ' + 'Revise logs con el Administrador del sistema', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,

            });
          }
        })
        .catch(error => {
          this.showSnackbar('Log Error creando documentosPath: ' + error, 'red');
          console.log('Log Error creando documentosPath: ', error);
        })
    },

    async denunciadoCreate() {
      this.denunciado.id = this.denPerDnte.id;
      this.denunciado.cod_denuncia = this.denPerDnte.cod_denuncia;
      this.denunciado.tipo_personas = 'DENUNCIADO';
      this.denunciado.orden = parseInt(this.denunciado.orden)==1 ? parseInt(this.denunciado.orden) : parseInt(this.denunciado.orden)  + 1;
      this.denunciado.direccion = 'N/A';
      this.denunciado.genero_sexo_sigla=  this.denunciado.genero_sexo_sigla ? this.denunciado.genero_sexo_sigla:  this.denunciado.genero_sexo;

      if( this.denunciado.nombres ==''){
        this.denunciado.nombres ='N/D';
        this.denunciado.apellido_pat ='N/D';
        this.denunciado.apellido_mat ='N/D';
      } 
  

      if( this.denunciado.grados_sigla ==''){
        this.denunciado.grados_sigla ='CIVIL';
      }
    



      this.denunciado.estado = 'ACTIVO';
      this.denunciado.transaccion = 'ACTIVAR';
      this.denunciado.usu_cre = this.username;

      this.denunciadosArray =   this.denunciadosArray.length==0 ?     [{ ...this.denunciado }]: this.denunciadosArray;
     
      await this.denunciadosArray.forEach((dndo, index) => {
          // Recorrer array denuncados
          if (dndo !== undefined){
            dndo.id = this.denPerDnte.id;
            dndo.cod_denuncia = this.denPerDnte.cod_denuncia;
            dndo.tipo_personas = 'DENUNCIADO';
            dndo.orden = index + 1 ; //parseInt(dndo.orden)==1 ? parseInt(dndo.orden) : parseInt(this.dndo.orden)  + 1;
            dndo.direccion = 'N/A';
            
            if( dndo.nombres ==''){
              dndo.nombres ='N/D';
              dndo.apellido_pat ='N/D';
              dndo.apellido_mat ='N/D';
            } 
        
            if( dndo.grados_sigla ==''){
              dndo.grados_sigla ='CIVIL';
            }

            dndo.estado = 'ACTIVO';
            dndo.transaccion = 'ACTIVAR';
            dndo.usu_cre = this.username;
              
            
              Denunciado.denunciadoCreate(dndo)
                  .then((response) => {
                    if (response.status === 201) {
                 
                      console.log("DenunciadoCreate  : ", response.status, response);
                      this.showSnackbar('Denunciado creado correctamente!', 'green')
                    } else {

                      console.log("DenunciadoCreate  error: ", response.status, "error:   : ", response.response.request.response);
                      this.showSnackbar('Error creando DenunciadoCreate: ' + response.response.request.response, 'red');
                      toast.info('Error creando Denunciado: ' + 'Revise logs con el Administrador del sistema', {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_RIGHT,

                      });
                    }
                  })
                  .catch(error => {
                    this.showSnackbar('Log Error creando Denunciado: ' + error, 'red');
                    console.log('Log Error creando Denunciado: ', error);
                  })
          }
      });
      this.denunciadosArray =[];

    },

    async denunciaSave() {
      try {

        if (!this.validateForm()) {
          toast.info('Debe ingresar los datos requeridos', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
          //this.dialog = false;
         this.validationErrors = {};
          return false;
        }

        if (!this.validateCaptcha()) {
          toast.info('CAPTCHA no válido. Debe ingresar un número CAPTCHA válido', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
     
          return false;
        }
      //  this.validateCaptcha();

        this.denPerDnte.mun_id = this.denPerDnte.municipio.mun_id ? this.denPerDnte.municipio.mun_id : this.denPerDnte.mun_id;
        console.log('denPerDnte 2 : ',this.denPerDnte);

        if (this.editedIndex > -1) {   // Update person

          // this.denPerDnte.estado = 'ACTIVO';
          this.denPerDnte.transaccion = 'MODIFICAR';
          this.denPerDnte.usu_mod = this.username;
          this.denPerDnte.fec_mod = new Date();

       

        } else {  // Add new person
          var dateParts =   this.denPerDnte.fec_registro_hecho.split("/"); //// "2024-05-17".split("/");  //
          this.denPerDnte.fec_registro_hecho=new Date(dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]); //.toISOString(),  

          this.denPerDnte.reserva_identidad=  this.denPerDnte.reserva_identidad_si ? true:  
                                              this.denPerDnte.reserva_identidad_no ? false:  'xxx';
          this.denPerDnte.denuncia_anonima=  this.denPerDnte.denuncia_anonima ? true:  
                                              this.denPerDnte.denuncia_anonima_no ? false:  'xxx';
          await this.denunciaPersonasList() ;

          this.denPerDnte.cod_denuncia = this.codDenuncia;         
          this.denPerDnte.sigla = 'INTERNET';
          this.denPerDnte.estado = 'SOLICITADO';
          this.denPerDnte.transaccion = 'CREAR';
          this.denPerDnte.usu_cre = this.username;


          await Denuncia.denunciaCreate(this.denPerDnte)
            .then((response) => {

              if (response.status === 201) {
                //  this.people = response.data;
               // this.people.push(this.denPerDnte);

                this.denPerDnte.id = response.data.id;
                this.denuncianteCreate();
                this.denunciadoCreate();
                this.enviarArchivos() ;
                this.captcha='';
                console.log("denunciaCreate  correctamente: ", response.status, response);
                
                this.showSnackbar('Denuncia creada correctamente!', 'green');
                toast.success('denuncia creada correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });

              } else {
                 this.captcha='';
                console.log("denuncia  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error creando denuncia: ' + response.response.request.response, 'red');
                toast.info('Error creando Denuncia: ' + 'Revise logs con el Administrador del sistema', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error creando denuncia: ' + error, 'red');
              console.log('Log Error creando denuncia: ', error);
            });
      

        }

      } catch (error) {
        this.showSnackbar('Error creando denuncia: ' + error, 'red');
        console.log('Log Error creando denuncia 2: ', error);
      }


    },


    validateForm() {
    if ( this.denPerDnte.denuncia_anonima_no ){   //  || !this.denPerDnte.apellido_mat
      if (!this.denPerDnte.nombres || !this.denPerDnte.apellido_pat )     this.validationErrors.nombres = { value: true };
      else delete this.validationErrors.nombres;
  
      if (!this.denPerDnte.email ||  !this.denPerDnte.genero_sexo || !this.denPerDnte.telefono )   this.validationErrors.email = { value: true };
      else delete this.validationErrors.email;

      if (  !this.denPerDnte.departamento  ||  !this.denPerDnte.municipio )    this.validationErrors.departamento = { value: true };
      else delete this.validationErrors.departamento;  //  ubic_donde

    }

     if ( this.denunciadosArray.length==0 ){  // || !this.denunciado.apellido_mat
       if (!this.denunciado.genero_sexo  )    this.validationErrors.genero_sexo = { value: true };
       else delete this.validationErrors.genero_sexo;
      // if (!this.denunciado.nombres || !this.denunciado.apellido_pat )    this.validationErrors.nombres = { value: true };
    //  else delete this.validationErrors.nombres;
      
     // if (!this.denunciado.grado ||  !this.denunciado.puesto_cargo_funcion || !this.denunciado.unidad_policial_desc )    this.validationErrors.grado = { value: true };
     // else delete this.validationErrors.grado;
     }

      if (!this.denPerDnte.lugar_hecho ||  !this.denPerDnte.departamento || !this.denPerDnte.municipio ) this.validationErrors.lugar_hecho = { value: true };
      else delete this.validationErrors.lugar_hecho;

      if (!this.denPerDnte.fec_registro_hecho ||  !this.denPerDnte.hora_registro_hecho ||   !this.denPerDnte.detalle_hecho ) this.validationErrors.fec_registro_hecho = { value: true };
      else delete this.validationErrors.fec_registro_hecho;

      if ((this.denPerDnte.reserva_identidad_si &&  this.denPerDnte.reserva_identidad_no) || ( this.denPerDnte.reserva_identidad_si==false && this.denPerDnte.reserva_identidad_no==false) ) this.validationErrors.reserva_identidad_si = { value: true };
      else delete this.validationErrors.reserva_identidad_si;

      if ((this.denPerDnte.denuncia_anonima &&  this.denPerDnte.denuncia_anonima_no) || ( this.denPerDnte.denuncia_anonima==false && this.denPerDnte.denuncia_anonima_no==false) ) this.validationErrors.denuncia_anonima = { value: true };
      else delete this.validationErrors.denuncia_anonima;

    /*  if (!this.reserva_datos )  this.validationErrors.reserva_datos = { value: true };
      else delete this.validationErrors.reserva_datos;

      if ( !this.articulo_166_cp)  this.validationErrors.articulo_166_cp = { value: true };
      else delete this.validationErrors.articulo_166_cp;
*/ 
      console.log('validationErrors : ',this.validationErrors);
      return !Object.keys(this.validationErrors).length;
    },


    onDepartChange() {
      // Encuentra el depart seleccionado por su descrip
      const departMun = this.departamentos.find(c => c.depto_id === this.denPerDnte.departamento);
      // Actualiza las municip según el depart seleccionado
      this.munOptions = departMun ? departMun.municipios : [];
      console.log("munOptions  : ", this.munOptions);
      // Resetear la mun seleccionada al cambiar el país
      this.denPerDnte.municipio = '';
      this.denPerDnte.depto_id = this.denPerDnte.departamento;

    },

    onEstadoChange() {
      // Encuentra el estado seleccionado por su descrip
      const estado = this.estadoOptions.find(c => c.transac === this.denPerDnte.estado);
      // Actualiza estado según el depart seleccionado

      this.denPerDnte.estado = estado.est;
      this.denPerDnte.transaccion = estado.transac;
    },

    onGradoChange() {
      // Encuentra el grado seleccionado por su 
      const grado = this.gradoOptions.find(c => c.grado === this.denunciado.grado);
      // Actualiza grado según el  seleccionado
      console.log("gradoOptions  : ", this.gradoOptions);
      this.denunciado.grados_sigla = grado.sigla;

    },

    onSexoChange() {
      // Encuentra el sexo seleccionado por su descrip
      const sexo = this.sexoOptions.find(c => c.sexo_sigla === this.denPerDnte.genero_sexo);
      // Actualiza sexo según el  seleccionado
      console.log("sexoOptions  : ", this.sexoOptions);
      this.denPerDnte.genero_sexo_sigla = sexo.sexo_sigla;

    }, 
    onSexoChangeDenunciado() {
      // Encuentra el sexo seleccionado por su descrip
      const sexo = this.sexoOptions.find(c => c.sexo_sigla === this.denunciado.genero_sexo);
      // Actualiza sexo según el  seleccionado
      console.log("sexoOptions  : ", this.sexoOptions);
      this.denunciado.genero_sexo_sigla = sexo.sexo_sigla;

    }, 

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.denPerDnte = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.denPerDnte = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    resetForm() {
      this.denPerDnte = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
      this.dialog = false
      //this.editingUserId = null;
    },


    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },

    // utilitarios
    updateBreadcrumbs() {
      const routes = this.$route.matched;
      this.breadcrumbs = routes.map(route => ({
        text: route.meta.title || route.name,
        disabled: false,
        href: route.path,
      }));
      /*this.breadcrumbs=   [
    { text: 'Inicio', disabled: false, href: '/main' },
    { text: 'Formulario de Denuncia', disabled: false, href: '/denuncia/DenunciaForm' }
  ];*/

      //this.breadcrumbs = this.breadcrumbs[1];
      //const proxyArray = this.breadcrumbs; //new Proxy([], { /* ... */ });
      //this.breadcrumbs = Array.from(proxyArray);
      console.log(' this.breadcrumbs: ', this.breadcrumbs);
    },

    applyDateMaskXXX() {
      // Elimina caracteres no numéricos
      let inputValue = this.rawDate.replace(/\D/g, '');
    //  console.log("inputValue:", inputValue);
      // Aplica la máscara de fecha

      if (inputValue.length > 2) {
        inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
      }
      if (inputValue.length > 5) {
        inputValue = `${inputValue.slice(0, 5)}/${inputValue.slice(5, 9)}`;
      }

      // Actualiza rawDate con la fecha formateada
      this.rawDate = inputValue;
      //console.log("inputValue2:", inputValue);
    },
 
    // Formato de la fecha
    // return this.selectedDate ? this.selectedDate.toISOString() : ''

    handleInputDate(event) {  //  @input="handleInputDate"
      // Limitar la entrada a números y el separador de fecha
      this.denPerDnte.fec_registro_hecho = this.formatDate(event.target.value) ;//.replace(/^[0-9-]*$/, '').slice(0, 10);
     // console.log("handleInputDate fecha del hecho:", this.denPerDnte.fec_registro_hecho);  ///[^0-9]/g
    },
    // Función para formatear la fecha// Aplica la máscara de fecha  dd/mm/yyyy
    formatDate(inputValue) {
        inputValue = this.eliminarUltimoCaracterNoNumerico(inputValue);
      // Ejemplo: formato DD/MM/AAAA
     // console.log("formatDate:", inputValue);
      
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

    handleInputHour(event) {  //  @input="handleInputDate"
      // Limitar la entrada a números y el separador de fecha
      this.denPerDnte.hora_registro_hecho = this.formatHour(event.target.value) ;//.replace(/^[0-9-]*$/, '').slice(0, 10);
    //  console.log("handleInputHour hora del hecho:", this.denPerDnte.hora_registro_hecho);  ///[^0-9]/g
    },
     // Función para formatear la fecha.       // Ejemplo: formato hh:mm
     formatHour(inputValue) {
     inputValue = this.eliminarUltimoCaracterNoNumerico(inputValue);
     
     // console.log("inputValue:", inputValue);
      // Aplica la máscara de fecha
      if (inputValue.length == 2) {
        inputValue = `${inputValue.slice(0, 2)}:`;
      }
      if (inputValue.length > 3 && inputValue.length < 5) {
        inputValue = `${inputValue.slice(0, 2)}${inputValue.slice(2, 4)}`;
      }
   
      if (inputValue.length >= 5) {
        inputValue = `${inputValue.slice(0, 5)}`;
      }

      // Actualiza rawDate con la fecha formateada
      // this.rawDate = inputValue;
     // console.log("inputValue2:", inputValue);

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
    generateCaptcha() {
      const randomNumber = Math.floor(Math.random() * 10000);
      this.captcha = randomNumber.toString();
    },
    validateCaptcha() {
      if ( this.captcha === (!this.userInput ? '': this.userInput  ) &&  this.captcha !='' ) {
        alert('CAPTCHA válido');
        this.generateCaptcha(); 
        this.userInput = ''; // Limpiar entrada
        this.captcha='';
        return true;
      } 
      else {
       // alert('CAPTCHA no válido, por favor intenta de nuevo');
        this.generateCaptcha(); // Generar un nuevo CAPTCHA
        this.userInput = ''; // Limpiar entrada
        return false;
      }
    },
    async onSubmit() {
      if (this.$refs.form.validate() && this.isCaptchaVerified) {
        // Aquí puedes manejar el registro, como enviar los datos a una API

        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };

        console.log("Datos del usuario:", userData);
        alert('Registro exitoso');
      } else {
        alert('Por favor completa todos los campos y verifica el CAPTCHA');
      }
    },

  },

  computed: {


    formTitle() {
      return this.editedIndex === -1 ? 'Adicionar Usuario' : 'Modificar Usuario'
    },
    filteredItems() {
      return this.people.filter(item => {
        return Object.keys(item).some(key => {
          return String(item[key])
            .toLowerCase()
            .includes(this.search.toLowerCase())
        })
      })
    },
    pageCount() {
      return Math.ceil(this.people.length / this.itemsPerPage)
    },
  },

  watch: {
    '$route'() {
      this.updateBreadcrumbs();
    },



    value(newValue) {
      // Lógica para aplicar la máscara de fecha
      this.formattedDate = this.formatDate(newValue);
    },



    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },


}
</script>


<style scoped>


table {/* ojo no borrar estilos para la tabla html */
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: red; /* fin  ojo no borrar estilos para la tabla html */
}




.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;

}

.hiddenFileInput>input {
  height: 100%;
  width: 100;

  cursor: pointer;
}

.input-row {
  margin-bottom: 10px;
  /* Espaciado entre filas */
}

.file-input {
  display: none;
  /* Oculta el input de tipo file */
}

.custom-file-label {
  display: inline-block;
  padding: 10px;
  background-color: #007bff;
  /* Color de fondo */
  color: white;
  /* Color del texto */
  border-radius: 5px;
  /* Bordes redondeados */
  cursor: pointer;
  /* Cambia el cursor para indicar que es clickeable */
}




.form-group {
  margin-bottom: 1rem;
  /* Espacio general al final de la agrupación */
}

.input-row {
  display: flex;
  align-items: center;
  /* Centra verticalmente */
  margin-top: 1rem;
  /* Margen superior para cada fila */

}

.input-row label {
  margin-right: 10px;
  /* Espaciado entre label e input */
  flex: 0 0 auto;
  /* Para que el label no crezca */
}

.input-row input {
  flex: 1;
  /* El input ocupa el espacio restante */
}




.v-input {
  margin-right: 30px;
  /* Espacio entre los campos */
  flex: 1;
  /* Los campos ocuparán el mismo espacio */
}


.text-multiline {
  overflow-wrap: break-word;
  /* Permite que las palabras se dividan para ajustarse al contenedor */
  word-wrap: break-word;
  /* Efecto similar para compatibilidad */
  word-break: break-word;
  /* División de palabras largas */
  white-space: normal;
  /* Permite que el texto se ajuste automáticamente */
}

.title-small {
  font-size: 10px;
  /* Ajusta este valor a tu preferencia */
}


.v-breadcrumbs {
  margin-bottom: 20px;
  /* Espaciado inferior */
}

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

/*
.table-header {
  background:  #0c7e0f !important;
  color: var(--v-theme-on-primary); 
  justify-content: center; // Centers horizontally    class="text-center"
--toastify-color-dark
}

 */
</style>