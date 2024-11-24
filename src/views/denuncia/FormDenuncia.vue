<template>
  <!--  <v-breadcrumbs :items="breadcrumbs" separator="/">
  </v-breadcrumbs>
-->
  <v-alert v-if="loading" type="info" dismissible>
    Cargando datos...
  </v-alert>
  <h1>Formulario de denuncias</h1>
  <v-container>

    <v-card class="mx-auto  mt-1" max-width="700">

      <v-card-title class="text-multiline  title-small">
        "EL PRESENTE FORMULARIO RECIBE DENUNCIAS DE CORRUPCION, MALOS TRATOS Y OTROS COMETIDOS POR FUNCIONARIOS POLICIALES
        Y SERA REVISADO POR EL DEPARTAMENTO NACIONAL DE TRANSPARENCIA DE LA POLICIA BOLIVIANA"

      </v-card-title>

    </v-card>

    <v-card class="mx-auto mt-4" max-width="700">
      <v-card-title>
        <span class="text-h5"> Datos del Denunciante </span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denPerDnte.nombres" :readonly="lockField" label="nombres"
                :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denPerDnte.apellido_pat" :readonly="lockField" label="apellido pat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denPerDnte.apellido_mat" :readonly="lockField" label="apellido mat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denPerDnte.email" :readonly="lockField" label="correo electronico"
                :rules="[v => !!v || 'email es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-select v-model="denPerDnte.genero_sexo" :items="sexoOptions" item-title="sexo" item-value="sexo_sigla"
                :readonly="lockField" label="Género" @update:modelValue="onSexoChange"
                :rules="[v => !!v || 'sexo es requerido']"></v-select>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denPerDnte.telefono" :readonly="lockField" label="Telefono"
                :rules="[v => !!v || 'telefono es requerido']"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="p-0 py-0 px-0">
              <v-text-field v-model="denPerDnte.ubicdonde" :readonly="lockField" label="Donde se encuentra"
                :rules="[v => !!v || 'Ubicacion es requerido']"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card class="mx-auto  mt-4" max-width="700">
      <v-card-title>
        <span class="text-h5"> Datos del Denunciado </span>
      </v-card-title>
      <v-card-text>
        <v-container>

          <v-row>

            <v-col cols="3" class="p-0 py-0 px-0">
              <v-text-field v-model="denunciado.nombres" :readonly="lockField" label="nombres"
                :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>

            </v-col>
            <v-col cols="3" class="p-0 py-0 px-0">
              <v-text-field v-model="denunciado.apellido_pat" :readonly="lockField" label="apellido pat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
            <v-col cols="3" class="p-0 py-0 px-0">
              <v-text-field v-model="denunciado.apellido_mat" :readonly="lockField" label="apellido mat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
            <v-col cols="3" class="p-0 py-0 px-0">
              <v-select v-model="denunciado.genero_sexo" :items="sexoOptions" item-title="sexo" item-value="sexo_sigla"
                :readonly="lockField" label="Género" @update:modelValue="onSexoChange"
                :rules="[v => !!v || 'sexo es requerido']"></v-select>
            </v-col>
          </v-row>
      
          <v-row>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-select v-model="denunciado.grado" :items="gradoOptions" item-title="grado" item-value="grados_sigla"
                :readonly="lockField" label="grado" @update:modelValue="onGradoChange"
                :rules="[v => !!v || 'grado es requerido']"></v-select>

            </v-col>

            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denunciado.puesto_cargo_funcion" :readonly="lockField" label="Cargo y funcion"
                :rules="[v => !!v || 'cargo y funcion es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denunciado.unidad_policial_desc" :readonly="lockField" label="Unidad policial"
                :rules="[v => !!v || 'unidad policial es requerido']"></v-text-field>
            </v-col>
        

          </v-row>   
          <v-row>

            <v-col cols="4" class="p-0 py-0 px-0">
              <v-text-field v-model="denPerDnte.lugar_hecho" :readonly="lockField" label="Lugar del hecho"
                :rules="[v => !!v || 'lugar del hecho es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-select v-model="denPerDnte.departamento" :items="deptoOptions" item-title="depto" item-value="depto_id"
                :readonly="lockField" label="Departamento" @update:modelValue="onDepartChange"
                :rules="[v => !!v || 'departamento es requerido']"></v-select>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-select v-model="denPerDnte.municipio" :items="munOptions" item-title="mun" item-value="mun_id"
                :readonly="lockField" label="Ciudad" return-object
                :rules="[v => !!v || 'Ciudad es requerido']"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>


    <v-card class="mx-auto  mt-4" max-width="700">
      <v-card-title>
        <span class="text-h5"> Detalles del hecho </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="4" class="p-0 py-0 px-0">
          <!--      <div class="d-flex align-center">    style="width: 400px;" -->
                <v-text-field v-model="formattedDate" :readonly="lockField" label="Fecha del hecho" @input="handleInput"
                  placeholder="DD/MM/AAAA" hide-details required></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
                  <v-text-field v-model="denPerDnte.hora_registro_hecho" :readonly="lockField" label="Hora aprox. del hecho"
                  placeholder="hh:mm" hide-details required></v-text-field>
            <!--</div>  -->  

            </v-col>
          </v-row>
          <v-row>
            <v-col class="p-0 py-0 px-0">
               <v-textarea class="mx-auto  mt-4" v-model="denPerDnte.detalle_hecho" :readonly="lockField"
            label="Breve detalle del hecho" :rules="[v => !!v || 'Detalle hecho es requerido']"></v-textarea>
            </v-col>
      
          </v-row>
          <v-row>
            <v-col  class="p-0 py-0 px-0">     
                <h4>Adjuntar documentación: </h4> 
            </v-col>       
          </v-row>  

          <v-row>
            <v-col   cols="12" md="6" v-for="(fileType, index) in fileTypes" :key="index">
          <v-file-input
            v-model="files[index]"
            :label="fileType.label"
            :accept="fileType.accept"
            :show-size="true"
            :rules="[rules.required]"
            @change="handleFileChange(index)"
          ></v-file-input>
        </v-col>
        <v-col cols="12" md="6" v-for="(preview, index) in previews" :key="index" >
          <div v-if="preview">
            <h2>Vista Previa: {{ fileTypes[index].label }}</h2>
            <img :src="preview" alt="Vista Previa" width="200" />
          </div>
        </v-col>
          </v-row>    

        <v-row>
            <v-col class="p-0 py-0 px-0">    
              <v-btn @click="downloadFile" :disabled="isLoading" color="primary">
                <v-icon v-if="isLoading">mdi-loader mdi-spin</v-icon>
                Descargar Archivo
              </v-btn>

              <v-snackbar v-model="snackbar.visible" :timeout="3000" :color="snackbar.color">{{ snackbar.message }}</v-snackbar>


  <div v-for="file in files1" :key="file.id">
    <button @click="downloadFile1(file)">Descargar {{ file.name }}</button>
  </div>
            </v-col>      
          </v-row>
          
          <v-row>
              <v-col cols="4" class="p-0 py-4 px-4">
                <!-- Primera columna -->          
                <label for="file3">Reserva de identidad ? : </label>
              </v-col>
              <v-col cols="3" class="p-0 py-0 px-0">
                <v-checkbox label="Si"    v-model="reservaIdentSi"  value="si"></v-checkbox>           
              </v-col>
              <v-col cols="3" class="p-0 py-0 px-0">
                <v-checkbox label="No"  v-model="reservaIdentNo"  value="no"></v-checkbox>           
                </v-col>
          </v-row>

          <v-row>
            <v-col class="p-0 py-0 px-0">         

              <v-checkbox
                label="Estoy de acuerdo que todos mis datos seran tratados con absoluta reserva y confidencialidad por la Inspectoria General y Departamento Nacional de Transparencia de la Policia Boliviana."
                required></v-checkbox>

              <v-checkbox
                label="Declaro conocer el ARTICULO 166° (Código Penal).- (ACUSACION Y DENUNCIA FALSA). El que a sabiendas acusare o denunciare como autor o partícipe de un delito de acción pública a una persona que no lo cometió, dando lugar a que se inicie el proceso criminal correspondiente, será sancionado con privación de libertad de uno a tres años. Si como consecuencia sobreviniere la condena de la persona denunciada o acusada, la pena será de privación de libertad de dos a seis años"
                required></v-checkbox>

              </v-col>      
          </v-row>
       

        </v-container>
      </v-card-text>

    </v-card>
  </v-container>


  <v-container>
    <v-card class="mx-auto  mt-4" max-width="700">
      <v-card-text class="d-flex flex-column align-center justify-center">
        <div class="captcha-container" style="width: 300px;">
          <svg width="200" height="40" xmlns="http://www.w3.org/2000/svg">
            <text x="100" y="30" font-family="Verdana" font-size="30" fill="black">{{ captcha }}</text>
          </svg>

          <v-text-field v-model="userInput" label="Introduce el número de arriba" required></v-text-field>

        </div>


        <v-btn class="custom-green-btn mt-4" color="primary" @click="validateCaptcha">Validar</v-btn>

        <!-- Add New Person Button -->
        <v-btn class="custom-green-btn mt-4" @click="">
          Enviar Denuncia
        </v-btn>
      </v-card-text>
    </v-card>

    <template>
      <v-snackbar v-model="snackbar.visible" :timeout="2000" :color="snackbar.color" :top="'top'"
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

import Usuario from '@/services/Usuario';
import NivelGeografico from '@/services/NivelGeografico';
import Grado from '@/services/Grado';
import Rol from '@/services/Rol';
import UsuariosRol from '@/services/UsuariosRol';

import Denuncia from '@/services/Denuncia';
import Denunciado from '@/services/Denunciado';
import Denunciante from '@/services/Denunciante';
import axios from 'axios';
import { downloadFile } from '../../utils/fileDownloader';

export default {
  name: 'Breadcrumbs',// router.currentRoute.value.path
  data: () => ({
    files1: [
    { id: 1, name: 'archivo1.pdf' },
    { id: 2, name: 'imagen.jpg' }
  ],
    files: Array(5).fill(null), // Array para almacenar 5 archivos
    previews: Array(5).fill(null), // Array para almacenar vistas previas de los archivos
 

    fileTypes: [
        { label: 'Cargar Imagen (JPEG/PNG)', accept: 'image/jpeg,image/png' },
        { label: 'Cargar PDF', accept: 'application/pdf' },
       // { label: 'Cargar Texto (TXT)', accept: 'text/plain' },
        { label: 'Cargar Archivo de Word', accept: '.doc,.docx' },
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


      isLoading: false,
 
    selectedFileName: '...',




    breadcrumbs: [],
    loading: true,
    reservaIdentSi: null, // Inicialmente null, se actualizará al seleccionar una opción
    reservaIdentNo: null, // Inicialmente null, se actualizará al seleccionar una opción

    captcha: '',
    value: '',
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
      { title: 'Aciones', value: 'actions', sortable: false },
    ],
    people: [],
    editedIndex: -1,

    docsPath:[],

    editedItemDocsPath: {
      id: null,
      cod_denuncia: '',
      orden: '',
      origen: '',
      documento_path: '',
      descripcion: '',
      fec_registro: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
      estado: '',
      transaccion: ''
    },




    editedItemRolUsu: {
      id: null,
      usuarios_id: null,
      roles_sigla: '',
      descripcion: null,
      estado: '',
      transaccion: '',
      usu_cre: null,
      usu_mod: null,
      fec_mod: null,
    },


    // propiedades del formulario 
    denPerDnte: {
      fila: '',
      id: null,
      cod_denuncia: '',
      lugar_hecho: '',
      depto_id: '',
      departamento: '',
      mun_id: '',
      municipio: '',
      fec_registro_hecho: '',
      hora_registro_hecho: '',
      detalle_hecho: '',
      id_dnte: null,
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubicdonde: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
      estado: '',
      transaccion: ''
    },

    denunciado: {
      fila: '',
      id: null,
      cod_denuncia: '',
      depto_id: '',
      departamento: '',
      mun_id: '',
      municipio: '',
      grado_sigla: '',
      grado: '',
      fec_registro_hecho: '',
      hora_registro_hecho: '',
      detalle_hecho: '',
      id_dndo: null,
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      genero_sexo_sigla: '',
      genero_sexo: '',
      email: '',
      telefono: '',
      ubicdonde: '',
      puesto_cargo_funcion: '',
      unidad_policial_desc: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
      estado: '',
      transaccion: '',

    },

    defaultItem: {
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
      estado: '',
      transaccion: '',

      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
      reset_key: '',
      reset_date: ''
    },
    viewedItem: {},

    viewDialog: false,

  

    sexoOptions: [
      { sexo: 'MASCULINO', sexo_sigla: 'M' },
      { sexo: 'FEMENINO', sexo_sigla: 'F' }
    ],

    expedidoOptions: ['LP', 'CH', 'SC', 'CBBA', 'OR'],
    gradoOptions: [], // ['Capitan', 'Teniente', 'Sargento 1ro', 'Sin Grado'],
    rolOptions: [],
    validationErrors: { nombres: { value: false } },

    selectedDeptoId: null,    // Código del país seleccionado
    selectedProvinceCode: 0,    // Código de la provincia seleccionada
    departamentos: [{}],
    deptoOptions: [{}],
    munOptions: [{}], //['El Alto', 'Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],

    estadoOptions: [{ est: 'ACTIVO', transac: 'ACTIVAR' }, { est: 'INACTIVO', transac: 'INACTIVAR' }],
    depas: [{
      id: 1, departs: 'Chuquisaca',
      cities: [{ id: 1, name: 'Sucre' }, { id: 2, name: 'Montes' }, { id: 3, name: 'Chaco' }]
    },
    {
      id: 2, departs: 'La Paz',
      cities: [{ id: 1, name: 'La Paz' }, { id: 2, name: 'Santa Cruz' }]
    },
    {
      id: 3, departs: 'Santa Cruz',
      cities: [{ id: 1, name: 'Santa Cruz' }]
    }],
    // departOptions: [{id:1,depto:'Chuquisaca'},{id:2 , depto:'La Paz'}, {id:3 , depto:'Santa Cruz'},{id:4 , depto: 'Cochabamba'}],


  }),

  mounted() {
    const fileInputs = document.querySelectorAll('.file-input');

    fileInputs.forEach(input => {
      input.addEventListener('change', function () {
        const label = this.previousElementSibling;
        if (this.files.length > 0) {
          //  label.textContent = `${this.files[0].name}`;
          this.selectedFileName = this.files[0].name; // Actualiza el valor en Vue
        } else {
          label.textContent = "Selecciona un archivo";
          this.selectedFileName = "No se eligió ningún archivo";
        }
      });
    });



    //this.username= localStorage.getItem('username');

    this.deptoList();
    this.onDepartChange();
    this.gradoList();
    // this.rolList();
    //this.formattedDate();//

    this.generateCaptcha();
    this.updateBreadcrumbs();

    this.denunciaGetByCod();
    this.denunciadoListByCod();
    this.denunciadoListByCod();

    //this.loading = false;   
  },



  methods: {
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
      this.isLoading = true;
      this.snackbar.visible = false;

      try {
        await downloadFile('/archivo', 'archivo_descargado.ext'); // Cambia el nombre y la ruta específica del archivo
        this.snackbar.message = 'Archivo descargado exitosamente!';
        this.snackbar.color = 'success';
      } catch (error) {
        this.snackbar.message = 'Ocurrió un error al descargar el archivo.';
        this.snackbar.color = 'error';
      } finally {
        this.isLoading = false;
        this.snackbar.visible = true;
      }
    },
   /*
    downloadFile() {
      const fileName = 'your_pdf_file.pdf'; // Reemplaza con el nombre de tu archivo
      axios({
        url: `/download/${fileName}`,
        method: 'GET',
        responseType: 'blob'
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href
            = url;
          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();
        });
    },
    */ 
    
    
    handleFileChange(index) {
        const newFiles = this.files[index]
        if (newFiles && newFiles.target.files.length > 0) {
          const file = newFiles.target.files[0] // Solo tomamos el primer archivo
          const reader = new FileReader()

         /* reader.onload = e => {
            this.previews[index] = e.target.result // Guarda la vista previa del archivo
          }
          reader.readAsDataURL(file) // Lee el archivo como URL de datos
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
          console.error(error);
        });

        } else {
          this.previews[index] = null // Restablece la vista previa si no hay archivo
        }
      },

    onFileChange(event) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      const data = {
        isMarried: this.isMarried
      };


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
          //console.log("DEPAS  : ", this.depas);
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
          //console.log("DEPAS  : ", this.depas);
          // console.log("response.data[0]  : ", response.data[0], response.status);
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
          //console.log("DEPAS  : ", this.depas);
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
    async documentosPathListByCod() {
      DocumentosPath.denunciadoListByCod('C-002-10-24') //  this.denPerDnte.id
        .then((response) => {
          console.log("documentosPathListByCod  : ", response.data, response.status);
          if (response.status === 200) {
            this.docsPath = response.data;
            
          } else {
            this.showSnackbar('Error recuperando documentosPathListByCod ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async denunciaGetByCod() {
      Denuncia.denunciaGetByCod('C-002-10-24') //  this.denPerDnte.id
        .then((response) => {
          console.log("denunciaGetByCod  : ", response.data, response.status);
          if (response.status === 200) {
            this.denPerDnte = response.data[0];
          } else {
            this.showSnackbar('Error recuperando denunciaListByCod ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

    async denunciadoListByCod() {
      Denunciado.denunciadoListByCod('C-002-10-24')
        .then((response) => {
          console.log("denunciadoListByCod  : ", response.data, response.status);
          if (response.status === 200) {
            this.denunciado = response.data[0];
            this.loading = false;
          } else {
            this.showSnackbar('Error recuperando denun ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },


    usuariosRolUpdate() {
      this.editedItemRolUsu.id = this.denPerDnte.u_rol_id === '' ? this.editedItemRolUsu.id : this.denPerDnte.u_rol_id;
      this.editedItemRolUsu.usuarios_id = this.denPerDnte.id;
      this.editedItemRolUsu.roles_sigla = this.denPerDnte.roles_sigla;
      this.editedItemRolUsu.descripcion = 'Cambio de rol';
      this.editedItemRolUsu.estado = 'ACTIVO';
      this.editedItemRolUsu.transaccion = 'MODIFICAR';
      this.editedItemRolUsu.usu_mod = this.username;
      this.editedItemRolUsu.fec_mod = new Date();


      UsuariosRol.UsuariosRolUpdate(this.editedItemRolUsu.id, JSON.stringify(this.editedItemRolUsu))
        .then((response) => {
          if (response.status === 200) {
            console.log("usuarioUpdate  : ", response.status, response);

            //  this.showSnackbar('Usuario rol modificado correctamente !', 'green')
            toast.success('Usuario rol modificado correctamente ! ', {
              autoClose: 3000,
              position: toast.POSITION.TOP_RIGHT,
              // toastClassName: 'custom-toast', // Add your custom class name here

            });
            //this.close()
          } else {
            console.log("usuarioUpdate  : ", response.status, "error:   : ", response.response.request.response);
            this.showSnackbar('Error modificando Usuario rol: ' + response.response.request.response, 'red');

            toast.info('Error modificando Usuario rol: ' + 'Revise logs con el Administrador del sistema', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,

            });
          }
        })
        .catch(error => {
          this.showSnackbar('Log Error modificando Usuario rol ' + error, 'red');
          console.log('Log Error modificando Usuario rol: ', error);
        });

    },


    usuariosRolCreate() {
      this.editedItemRolUsu.usuarios_id = this.denPerDnte.id;
      this.editedItemRolUsu.roles_sigla = this.denPerDnte.rol;
      this.editedItemRolUsu.descripcion = 'Asignaion de rol';
      this.editedItemRolUsu.estado = 'ACTIVO';
      this.editedItemRolUsu.transaccion = 'ACTIVAR';
      this.editedItemRolUsu.usu_cre = this.username;

      UsuariosRol.UsuariosRolCreate(JSON.stringify(this.editedItemRolUsu))
        .then((response) => {

          if (response.status === 201) {

            this.denPerDnte.u_rol_id = response.data.id;
            this.editedItemRolUsu.id = response.data.id;
            console.log("UsuariosRolCreate  : ", response.status, response);
            this.showSnackbar('Usuario rol creado correctamente!', 'green')
            // this.close()
          } else {

            console.log("UsuariosRolCreate  : ", response.status, "error:   : ", response.response.request.response);
            this.showSnackbar('Error creando usuario Rol: ' + response.response.request.response, 'red');
            toast.info('Error creando Usuario rol: ' + 'Revise logs con el Administrador del sistema', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,

            });
          }
        })
        .catch(error => {
          this.showSnackbar('Log Error creando Usuario rol: ' + error, 'red');
          console.log('Log Error creando Usuario rol: ', error);
        })
    },

    saveUsuarios() {
      try {

        if (!this.validateForm()) {
          toast.info('Debe ingresar los datos requeridos', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
          //this.dialog = false;
          return false;
        }

        // if( this.denPerDnte && this.denPerDnte ){
        // const dateParts = (form.value.fecha || '').split("/");      
        // fec_ejecucion:   new Date(dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]).toISOString(), // form.value.fecha,        

        this.denPerDnte.mun_id = this.denPerDnte.municipio.mun_id ? this.denPerDnte.municipio.mun_id : this.denPerDnte.mun_id;

        console.log('denPerDnte 2 : ', JSON.stringify(this.denPerDnte));

        if (this.editedIndex > -1) {   // Update person


          // this.denPerDnte.estado = 'ACTIVO';
          this.denPerDnte.transaccion = 'MODIFICAR';
          this.denPerDnte.usu_mod = this.username;
          this.denPerDnte.fec_mod = new Date();

          Usuario.usuarioUpdate(this.denPerDnte.id, JSON.stringify(this.denPerDnte))
            .then((response) => {
              if (response.status === 200) {
                // this.people = response.data;
                Object.assign(this.people[this.editedIndex], this.denPerDnte)

                console.log("usuarioUpdate  : ", response.status, response);
                // toast('Wow so easy !', { containerId: 'A' });
                this.usuariosRolUpdate();


                //  this.showSnackbar('Usuario modificado correctamente !', 'green')
                toast.success('Usuario modificado correctamente ! ', {
                  autoClose: 3000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here

                });
                this.close()
              } else {
                console.log("usuarioUpdate  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error modificando Usuario: ' + response.response.request.response, 'red');

                toast.info('Error modificando Usuario: ' + 'Revise el usuario de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error modificando Usuario ' + error, 'red');
              console.log('Log Error modificando Usuario: ', error);
            });




        } else {  // Add new person


          this.denPerDnte.estado = 'ACTIVO';
          this.denPerDnte.transaccion = 'ACTIVAR';
          this.denPerDnte.usu_cre = this.username;


          Usuario.usuarioCreate(JSON.stringify(this.denPerDnte))
            .then((response) => {

              if (response.status === 201) {
                //  this.people = response.data;
                this.people.push(this.denPerDnte);

                this.denPerDnte.id = response.data.id;
                this.usuariosRolCreate();

                console.log("usuarioCreate  : ", response.status, response);
                this.showSnackbar('Usuario creado correctamente!', 'green')
                this.close()
              } else {

                console.log("usuarioCreate  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error creando Usuario: ' + response.response.request.response, 'red');
                toast.info('Error creando Usuario: ' + 'Revise el usuario de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error creando Usuario: ' + error, 'red');
              console.log('Log Error creando Usuario: ', error);
            });

          // this.showSnackbar('Usuario creado correctamente!', 'green')
          // this.close()


        }

      } catch (error) {
        this.showSnackbar('Error creating Usuario: ' + error, 'red');
      }


    },



    validateForm() {
      //this.validationErrors = {};

      if (!this.denPerDnte.nombres || !this.denPerDnte.apellido_pat || !this.denPerDnte.apellido_mat) this.validationErrors.nombres = { value: true };
      else delete this.validationErrors.nombres;

      if (!this.denPerDnte.ci_y_complemento || !this.denPerDnte.ci_expedido || !this.denPerDnte.grado) this.validationErrors.ci_y_complemento = { value: true };
      else delete this.validationErrors.ci_y_complemento;

      if (!this.denPerDnte.telefono || !this.denPerDnte.email || !this.denPerDnte.departamento) this.validationErrors.telefono = { value: true };
      else delete this.validationErrors.telefono;

      if (!this.denPerDnte.municipio || !this.denPerDnte.user_login || !this.denPerDnte.password_hash) this.validationErrors.municipio = { value: true };
      else delete this.validationErrors.municipio;

      if (!this.denPerDnte.rol || !this.denPerDnte.estado) this.validationErrors.rol = { value: true };
      else delete this.validationErrors.rol;


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



    /*  onRolChange() {
        // Encuentra el rol seleccionado por su descrip
        const rol = this.rolOptions.find(c => c.roles_sigla === this.denPerDnte.rol);
        // Actualiza las municip según el depart seleccionado
        console.log("rolOptions  : ", this.rolOptions);
        this.denPerDnte.roles_sigla = rol.roles_sigla;
     
      },*/



    addNewPerson() {
      this.editedIndex = -1
      this.denPerDnte = Object.assign({}, this.defaultItem)
      this.dialog = true


    },

    editItem(item) {
      this.editedIndex = this.people.indexOf(item)
      this.denPerDnte = Object.assign({}, item)
      this.dialog = true
      this.lockField = false
    },

    viewItem(item) {
      //this.editedIndex = this.people.indexOf(item)
      this.denPerDnte = Object.assign({}, item)
      this.dialog = true
      this.lockField = true
    },

    deleteItem(item) {
      this.editedIndex = this.people.indexOf(item)
      this.denPerDnte = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.people.splice(this.editedIndex, 1)
      this.closeDelete()
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

    closeView() {
      this.viewDialog = false
      this.viewedItem = {}
    },

    cancelEdit() {
      this.resetForm();
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
    { text: 'Formulario de Denuncia', disabled: false, href: '/denuncia/FormDenuncia' }
  ];*/

      //this.breadcrumbs = this.breadcrumbs[1];
      //const proxyArray = this.breadcrumbs; //new Proxy([], { /* ... */ });
      //this.breadcrumbs = Array.from(proxyArray);
      console.log(' this.breadcrumbs: ', this.breadcrumbs);
    },

    applyDateMaskXXX() {
      // Elimina caracteres no numéricos
      let inputValue = this.rawDate.replace(/\D/g, '');
      console.log("inputValue:", inputValue);
      // Aplica la máscara de fecha

      if (inputValue.length > 2) {
        inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
      }
      if (inputValue.length > 5) {
        inputValue = `${inputValue.slice(0, 5)}/${inputValue.slice(5, 9)}`;
      }

      // Actualiza rawDate con la fecha formateada
      this.rawDate = inputValue;
      console.log("inputValue2:", inputValue);
    },

    /* formattedDate() {
        // this.showDatePicker = false
 
 
   
           this.denPerDnte.fecha= this.denPerDnte.fecha ? new Date(this.denPerDnte.fecha):new Date();
           const day = this.selectedDate.getDate();
           const month = this.selectedDate.getMonth() + 1;
           const year = this.selectedDate.getFullYear();
           this.denPerDnte.fecha =`${day}/${month}/${year}`;
     },*/
    // Formato de la fecha
    // return this.selectedDate ? this.selectedDate.toISOString() : ''

    handleInput(event) {
      // Limitar la entrada a números y el separador de fecha
      this.value = event.target.value;//.replace(/^[0-9-]*$/, '').slice(0, 10);
      console.log("event:", this.value);  ///[^0-9]/g
    },

    format(inputValue) {
      // Función para formatear la fecha
      // Ejemplo: formato DD/MM/AAAA
      console.log("inputValue:", inputValue);
      // Aplica la máscara de fecha
      if (inputValue.length == 2) {
        inputValue = `${inputValue.slice(0, 2)}-`;
      }
      if (inputValue.length > 3 && inputValue.length < 5) {
        inputValue = `${inputValue.slice(0, 2)}${inputValue.slice(2, 4)}`;
      }
      if (inputValue.length == 5) {
        inputValue = `${inputValue.slice(0, 5)}-`;
      }
      if (inputValue.length > 5) {
        inputValue = `${inputValue.slice(0, 10)}`;
      }

      // Actualiza rawDate con la fecha formateada
      // this.rawDate = inputValue;
      console.log("inputValue2:", inputValue);

      // console.log("replace:", value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'));
      return inputValue; //value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    },

    generateCaptcha() {
      const randomNumber = Math.floor(Math.random() * 10000);
      this.captcha = randomNumber.toString();
    },
    validateCaptcha() {
      if (this.userInput === this.captcha) {
        alert('CAPTCHA válido');
      } else {
        alert('CAPTCHA no válido, por favor intenta de nuevo');
        this.generateCaptcha(); // Generar un nuevo CAPTCHA
        this.userInput = ''; // Limpiar entrada
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
      this.formattedDate = this.format(newValue);
    },



    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },



  /*  Guardando en un archivo:
  Utilizando Node.js y el módulo fs:
  JavaScript
  const fs = require('fs');
  
  fs.writeFile('formulario.json', JSON.stringify(formulario, null, 2), (err) => {
    if (err) throw err;
    console.log('El objeto se ha guardado en formulario.json');
  }); */

}
</script>


<style scoped>
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

.hiddenFileInput {
  border: 1px solid #ccc;
  width: 100px;
  height: 100px;
  display: inline-block;
  overflow: hidden;

  /*for the background, optional*/
  background: center center no-repeat;
  background-size: 75% 75%;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9Ii01MyAxIDUxMSA1MTEuOTk5MDYiIHdpZHRoPSI1MTJweCI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIGQ9Ik0gMjc2LjQxMDE1NiAzLjk1NzAzMSBDIDI3NC4wNjI1IDEuNDg0Mzc1IDI3MC44NDM3NSAwIDI2Ny41MDc4MTIgMCBMIDY3Ljc3NzM0NCAwIEMgMzAuOTIxODc1IDAgMC41IDMwLjMwMDc4MSAwLjUgNjcuMTUyMzQ0IEwgMC41IDQ0NC44NDM3NSBDIDAuNSA0ODEuNjk5MjE5IDMwLjkyMTg3NSA1MTIgNjcuNzc3MzQ0IDUxMiBMIDMzOC44NjMyODEgNTEyIEMgMzc1LjcxODc1IDUxMiA0MDYuMTQwNjI1IDQ4MS42OTkyMTkgNDA2LjE0MDYyNSA0NDQuODQzNzUgTCA0MDYuMTQwNjI1IDE0NC45NDE0MDYgQyA0MDYuMTQwNjI1IDE0MS43MjY1NjIgNDA0LjY1NjI1IDEzOC42MzY3MTkgNDAyLjU1NDY4OCAxMzYuMjg1MTU2IFogTSAyNzkuOTk2MDk0IDQzLjY1NjI1IEwgMzY0LjQ2NDg0NCAxMzIuMzI4MTI1IEwgMzA5LjU1NDY4OCAxMzIuMzI4MTI1IEMgMjkzLjIzMDQ2OSAxMzIuMzI4MTI1IDI3OS45OTYwOTQgMTE5LjIxODc1IDI3OS45OTYwOTQgMTAyLjg5NDUzMSBaIE0gMzM4Ljg2MzI4MSA0ODcuMjY1NjI1IEwgNjcuNzc3MzQ0IDQ4Ny4yNjU2MjUgQyA0NC42NTIzNDQgNDg3LjI2NTYyNSAyNS4yMzQzNzUgNDY4LjA5NzY1NiAyNS4yMzQzNzUgNDQ0Ljg0Mzc1IEwgMjUuMjM0Mzc1IDY3LjE1MjM0NCBDIDI1LjIzNDM3NSA0NC4wMjczNDQgNDQuNTI3MzQ0IDI0LjczNDM3NSA2Ny43NzczNDQgMjQuNzM0Mzc1IEwgMjU1LjI2MTcxOSAyNC43MzQzNzUgTCAyNTUuMjYxNzE5IDEwMi44OTQ1MzEgQyAyNTUuMjYxNzE5IDEzMi45NDUzMTIgMjc5LjUwMzkwNiAxNTcuMDYyNSAzMDkuNTU0Njg4IDE1Ny4wNjI1IEwgMzgxLjQwNjI1IDE1Ny4wNjI1IEwgMzgxLjQwNjI1IDQ0NC44NDM3NSBDIDM4MS40MDYyNSA0NjguMDk3NjU2IDM2Mi4xMTMyODEgNDg3LjI2NTYyNSAzMzguODYzMjgxIDQ4Ny4yNjU2MjUgWiBNIDMzOC44NjMyODEgNDg3LjI2NTYyNSAiIHN0eWxlPSIgZmlsbC1ydWxlOm5vbnplcm87ZmlsbC1vcGFjaXR5OjE7IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTSAzMDUuMTAxNTYyIDQwMS45MzM1OTQgTCAxMDEuNTM5MDYyIDQwMS45MzM1OTQgQyA5NC43MzgyODEgNDAxLjkzMzU5NCA4OS4xNzE4NzUgNDA3LjQ5NjA5NCA4OS4xNzE4NzUgNDE0LjMwMDc4MSBDIDg5LjE3MTg3NSA0MjEuMTAxNTYyIDk0LjczODI4MSA0MjYuNjY3OTY5IDEwMS41MzkwNjIgNDI2LjY2Nzk2OSBMIDMwNS4yMjY1NjIgNDI2LjY2Nzk2OSBDIDMxMi4wMjczNDQgNDI2LjY2Nzk2OSAzMTcuNTkzNzUgNDIxLjEwMTU2MiAzMTcuNTkzNzUgNDE0LjMwMDc4MSBDIDMxNy41OTM3NSA0MDcuNDk2MDk0IDMxMi4wMjczNDQgNDAxLjkzMzU5NCAzMDUuMTAxNTYyIDQwMS45MzM1OTQgWiBNIDMwNS4xMDE1NjIgNDAxLjkzMzU5NCAiIHN0eWxlPSIgZmlsbC1ydWxlOm5vbnplcm87ZmlsbC1vcGFjaXR5OjE7IiBzdHJva2U9IiMwMDAwMDAiIGZpbGw9IiMwMDAwMDAiLz4KPHBhdGggZD0iTSAxNDAgMjY4Ljg2MzI4MSBMIDE5MC45NTMxMjUgMjE0LjA3NDIxOSBMIDE5MC45NTMxMjUgMzQ5LjEyNSBDIDE5MC45NTMxMjUgMzU1LjkyNTc4MSAxOTYuNTE5NTMxIDM2MS40OTIxODggMjAzLjMyMDMxMiAzNjEuNDkyMTg4IEMgMjEwLjEyNSAzNjEuNDkyMTg4IDIxNS42ODc1IDM1NS45MjU3ODEgMjE1LjY4NzUgMzQ5LjEyNSBMIDIxNS42ODc1IDIxNC4wNzQyMTkgTCAyNjYuNjQwNjI1IDI2OC44NjMyODEgQyAyNjkuMTEzMjgxIDI3MS40NTcwMzEgMjcyLjMzMjAzMSAyNzIuODIwMzEyIDI3NS42Njc5NjkgMjcyLjgyMDMxMiBDIDI3OC42MzY3MTkgMjcyLjgyMDMxMiAyODEuNzMwNDY5IDI3MS43MDcwMzEgMjg0LjA3ODEyNSAyNjkuNDgwNDY5IEMgMjg5LjAyNzM0NCAyNjQuNzgxMjUgMjg5LjM5ODQzOCAyNTYuOTg4MjgxIDI4NC42OTkyMTkgMjUyLjA0Mjk2OSBMIDIxMi4yMjY1NjIgMTc0LjI1MzkwNiBDIDIwOS44NzUgMTcxLjc4MTI1IDIwNi42NjAxNTYgMTcwLjI5Njg3NSAyMDMuMTk5MjE5IDE3MC4yOTY4NzUgQyAxOTkuNzM0Mzc1IDE3MC4yOTY4NzUgMTk2LjUxOTUzMSAxNzEuNzgxMjUgMTk0LjE3MTg3NSAxNzQuMjUzOTA2IEwgMTIxLjY5OTIxOSAyNTIuMDQyOTY5IEMgMTE3IDI1Ni45ODgyODEgMTE3LjM3MTA5NCAyNjQuOTAyMzQ0IDEyMi4zMTY0MDYgMjY5LjQ4MDQ2OSBDIDEyNy41MTE3MTkgMjc0LjE3OTY4OCAxMzUuMzAwNzgxIDI3My44MDg1OTQgMTQwIDI2OC44NjMyODEgWiBNIDE0MCAyNjguODYzMjgxICIgc3R5bGU9IiBmaWxsLXJ1bGU6bm9uemVybztmaWxsLW9wYWNpdHk6MTsiIHN0cm9rZT0iIzAwMDAwMCIgZmlsbD0iIzAwMDAwMCIvPgo8L2c+Cjwvc3ZnPgo=)
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