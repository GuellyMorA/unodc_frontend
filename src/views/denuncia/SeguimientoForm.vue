<template>
  <!--  Data Table -->
  <v-alert v-if="loading" type="info" dismissible>
    Cargando datos...
  </v-alert>

  <v-row class="mb-4">
    <v-col cols="6" class="p-0 py-0 px-1">

    </v-col>
    <v-col cols="6" class="p-0 py-0 px-1">
      <!-- Search Field -->
      <v-text-field v-model="search" class="pa-2" label="Buscar Denuncia" append-icon="mdi-magnify" single-line
        hide-details></v-text-field>
    </v-col>
  </v-row>

  <!-- Data Table --> <!-- v-model:page="page" -->
  <v-data-table :headers="headers" :items="filteredItems"
    :sort-by="[{ key: 'fila', order: 'asc' }, { key: 'cod_denuncia', order: 'desc' }]" class="elevation-1"
    :search="search" :items-per-page="itemsPerPage" rows-per-page-text="Filas por página"
    no-data-text="No existen registros." no-results-text="Sin resultados" page-text="de"
    items-per-page-text="Registros por pagina ">

    <template v-slot:headers="{ props }">
      <tr v-bind="props">
        <th v-for="header in headers" :key="header.value" class="text-center">
          {{ header.title }}
        </th>
      </tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title class="text-center">Denuncias registradas en sistema</v-toolbar-title>



        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- Action Buttons Column -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="viewItem(item)"> mdi-eye</v-icon>
      <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
    </template>

    <!--   <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>    

    </template>-->
  </v-data-table>

  <!-- Add New Person Button -->
  <v-btn class="custom-green-btn mt-4" @click="addNewPerson">
    Adicionar Denuncia
  </v-btn>

  <template>
    <!-- Edit Dialog -->
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card class="mx-auto  mt-4" max-width="700">
      
        <v-card-title class="mt-4">
          <v-container>
           <v-row  >
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.cod_denuncia" :readonly="lockField" label="Codigo Denuncia"
                :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
            </v-col>
             
     
              <v-col class="p-0 py-4 px-4"  cols="4" >
                <!-- Primera columna -->          
                <label for="file3">Reserva de identidad ? : </label>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="1" >
                <v-checkbox  value="true"   v-model="denPerDnte.reserva_identidad_si"  :readonly="lockField"  label="Si" ></v-checkbox>           
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="2" >
                <v-checkbox  value="false"  v-model="denPerDnte.reserva_identidad_no"  :readonly="lockField"  label="No" ></v-checkbox>           
                </v-col>
        
          </v-row>
            <span class="text-h5"> Datos del Denunciante </span>
          </v-container>
        </v-card-title>

        <v-card-text class="p-0 py-0 px-7  mb-2">

          <v-row>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.nombres" :readonly="lockField" label="nombres"
                :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.apellido_pat" :readonly="lockField" label="apellido pat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.apellido_mat" :readonly="lockField" label="apellido mat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.email" :readonly="lockField" label="correo electronico"
                :rules="[v => !!v || 'email es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-select v-model="denPerDnte.genero_sexo" :items="sexoOptions" item-title="sexo" item-value="sexo_sigla"
                :readonly="lockField" label="Género" @update:modelValue="onSexoChange"
                :rules="[v => !!v || 'sexo es requerido']"></v-select>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.telefono" :readonly="lockField" label="Telefono"
                :rules="[v => !!v || 'telefono es requerido']"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.ubic_donde" :readonly="lockField" label="Donde se encuentra"
                :rules="[v => !!v || 'Ubicacion es requerido']"></v-text-field>
            </v-col>
          </v-row>

        </v-card-text>

        <v-card-title>
          <v-container>
            <span class="text-h5"> Datos del Denunciado </span>
          </v-container>
        </v-card-title>

        <v-card-text class="p-0 py-0 px-7  mb-4">
          <v-row>
            <v-col cols="3" class="p-0 py-0 px-1">
              <v-text-field v-model="denunciado.nombres" :readonly="lockField" label="nombres"
                :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>

            </v-col>
            <v-col cols="3" class="p-0 py-0 px-1">
              <v-text-field v-model="denunciado.apellido_pat" :readonly="lockField" label="apellido pat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
            <v-col cols="3" class="p-0 py-0 px-1">
              <v-text-field v-model="denunciado.apellido_mat" :readonly="lockField" label="apellido mat"
                :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
            </v-col>
            <v-col cols="3" class="p-0 py-0 px-1">
              <v-select v-model="denunciado.genero_sexo" :items="sexoOptions" item-title="sexo" item-value="sexo_sigla"
                :readonly="lockField" label="Género" @update:modelValue="onSexoChangeDenunciado"
                :rules="[v => !!v || 'sexo es requerido']"></v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-select v-model="denunciado.grado" :items="gradoOptions" item-title="grado" item-value="grados_sigla"
                :readonly="lockField" label="grado" @update:modelValue="onGradoChange"
                :rules="[v => !!v || 'grado es requerido']"></v-select>

            </v-col>

            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denunciado.puesto_cargo_funcion" :readonly="lockField" label="Cargo y funcion"
                :rules="[v => !!v || 'cargo y funcion es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denunciado.unidad_policial_desc" :readonly="lockField" label="Unidad policial"
                :rules="[v => !!v || 'unidad policial es requerido']"></v-text-field>
            </v-col>


          </v-row>

        

          <div>
            <table>
              <thead>
                <tr>
                  <th>Fila</th>
                  <th>Nombre</th>
                  <th>Ap. Paterno</th>
                  <th>Ap. Materno</th>
                  <th>Ver</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(denunciado, index) in denunciadosArray" :key="index">
                  <td>{{ denunciado.fila }}</td>
                  <td>{{ denunciado.nombres }}</td>
                  <td>{{ denunciado.apellido_pat }}</td>
                  <td>{{ denunciado.apellido_mat }}</td>
                  <td>

                    <v-icon small class="mr-2" @click="cargarPersona(denunciado.fila )"> mdi-eye</v-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </v-card-text>

        <v-card-title>
          <v-container>
            <span class="text-h5"> Detalles del hecho </span>
          </v-container>
        </v-card-title>

        <v-card-text class="p-0 py-0 px-7  mb-4">
          <v-row>

              <v-col cols="4" class="p-0 py-0 px-1">
                <v-text-field v-model="denPerDnte.lugar_hecho" :readonly="lockField" label="Lugar del hecho (Calle,Edif...)"
                  :rules="[v => !!v || 'lugar del hecho es requerido']"></v-text-field>
              </v-col>
              <v-col cols="4" class="p-0 py-0 px-1">
                <v-select v-model="denPerDnte.departamento" :items="deptoOptions" item-title="depto" item-value="depto_id"
                  :readonly="lockField" label="Departamento" @update:modelValue="onDepartChange"
                  :rules="[v => !!v || 'departamento es requerido']"></v-select>
              </v-col>
              <v-col cols="4" class="p-0 py-0 px-1">
                <v-select v-model="denPerDnte.municipio" :items="munOptions" item-title="mun" item-value="mun_id"
                  :readonly="lockField" label="Ciudad" return-object
                  :rules="[v => !!v || 'Ciudad es requerido']"></v-select>
              </v-col>
           </v-row>
          <v-row>
            <v-col cols="4" class="p-0 py-0 px-1">
              <!--      <div class="d-flex align-center">    style="width: 400px;" -->
              <v-text-field v-model="denPerDnte.fec_registro_hecho" :readonly="lockField" label="Fecha del hecho"
                placeholder="DD/MM/AAAA" required></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.hora_registro_hecho" :readonly="lockField" label="Hora aprox. del hecho"
                placeholder="hh:mm" hide-details required></v-text-field>
              <!--</div>  -->

            </v-col>
          </v-row>
          <v-row>
            <v-col class="p-0 py-0 px-1">
              <v-textarea v-model="denPerDnte.detalle_hecho" :readonly="lockField" label="Breve detalle del hecho"
                :rules="[v => !!v || 'Detalle hecho es requerido']" placeholder="detalle del hecho"></v-textarea>
            </v-col>

          </v-row>
          <v-row>
            <v-col class="p-0 py-0 px-1">
              <h4>Archivos adjuntos: </h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="p-0 py-0 px-1">
              <!--  <v-btn @click="downloadFile" :disabled="isLoading" color="primary">
                <v-icon v-if="isLoading">mdi-loader mdi-spin</v-icon>
                Descargar Archivo
              </v-btn>-->


              <div v-for="file in files1" :key="file.id">
                <a :href="downloadURL(file.id)">
                  Descargar {{ file.name }}
                </a>
                <v-icon v-if="isLoading">mdi-loader mdi-spin</v-icon>
              </div>

              <div> <!-- Enlace que actúa como un botón -->
                <a href="#" @click.prevent="downloadFile" :class="{ 'btn-loading': isLoading }" :disabled="isLoading">

                  <span v-if="isLoading" class="mdi mdi-loader mdi-spin"></span>
                  Descargar Archivo
                </a>
              </div>


            </v-col>
          </v-row>

          <v-row class="p-0 py-4 px-0  ">
        
            <v-col cols="4" class="p-0 py-0 px-1">
                  <v-select v-model="denPerDnte.estado" :items="estadoOptions" item-title="est"
                    item-value="transac" :readonly="lockField2" label="Estado Seguimiento"
                    @update:modelValue="onEstadoChange" :rules="[v => !!v || 'Estado es requerido']"></v-select>
            </v-col>
     
            <v-col cols="8" class="p-0 py-0 px-1">
                  <v-select v-model="denPerDnte.gestor_id" :items="gestorOptions" item-title="nombre_completo"
                    item-value="id" :readonly="lockField2" label="Gestor Seguimiento" placeholder="Personal Asignado" 
                    @update:modelValue="onGestorChange" :rules="[v => !!v || 'Gestor es requerido']"></v-select>
            </v-col>

          </v-row>
          <v-row>
            <v-col class="p-0 py-0 px-1">


            </v-col>
          </v-row>



        </v-card-text>

        <v-card-actions v-if="lockField2 === false">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
          <v-btn class="custom-green-btn" text @click="denunciasSave"> Guardar </v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="lockField === true">
          <v-spacer></v-spacer>
          <v-btn class="custom-green-btn" text @click="close"> Cerrar </v-btn>
        </v-card-actions>


      </v-card>
    </v-dialog>

  </template>

  <template>

    <v-snackbar v-model="snackbar.visible" :timeout="5000" :color="snackbar.color" :top="'top'"
      :vertical="snackbar.mode === 'vertical'" :right="'right'" :multi-line="snackbar.mode === 'multi-line'">
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar.visible = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </template>
</template>


<script>
//     <v-row justify="space-between" align="center">
//   <v-col cols="auto">
import { toast } from 'vue3-toastify';
import Denuncia from '@/services/Denuncia';
import NivelGeografico from '@/services/NivelGeografico';
import Grado from '@/services/Grado';
import Rol from '@/services/Rol';
import DenunciasRol from '@/services/NivelGeografico';
import Denunciado from '@/services/Denunciado';

import { downloadFile } from '../../utils/fileDownloader';
import DocumentosPath from '@/services/DocumentosPath';
import Usuario from '@/services/Usuario';


export default {

  data: () => ({

    loading: true,
    isLoading: false,
    files1: [{ id: 1, name: 'archivo1.pdf' }, { id: 2, name: 'imagen.jpg' }],



    page: 1,
    itemsPerPage: 10,
    search: '',
    dialog: false,
    dialogDelete: false,
    // sortBy: ['calories'], // Ensure this is an array or an object with a 'find' method
    username: localStorage.getItem('username'),
    rolDesc: localStorage.getItem('rol_desc'),
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
        title: 'Num', key: 'fila', class: 'background',
        align: 'start', sortable: false,
      },
      { title: 'Cod. Denuncia', key: 'cod_denuncia', class: 'success--text title' },

      { title: 'Ap. Paterno', key: 'apellido_pat' },
      { title: 'Ap. Materno', key: 'apellido_mat' },
      { title: 'Nombres', key: 'nombres' },

      { title: 'Fecha', key: 'fec_registro_hecho' },
      { title: 'Gestor Seguimiento', key: 'gestor_seguimiento' },
      { title: 'Tipo Denuncia', key: 'tipo_denuncia' },
      { title: 'Estado', key: 'estado' },
      { title: 'Aciones', value: 'actions', sortable: false },
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
      reserva_identidad: '',
      reserva_identidad_si: '',
      reserva_identidad_no: '',
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

      orden: '',

      tipo_denuncia: '',
      seg_id: '',
      observacion: '',
      fec_registro: '',
      apellido_pat_gestor: '',
      apellido_mat_gestor: '',
      nombres_gestor: '',
      gestor_seguimiento: '',

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
      reserva_identidad: '',
      reserva_identidad_si: '',
      reserva_identidad_no: '',
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


    //******************************************** */

    editedItemRolUsu: {
      id: null,
      denuncias_id: null,
      roles_sigla: '',
      descripcion: null,
      estado: '',
      transaccion: '',
      usu_cre: null,
      usu_mod: null,
      fec_mod: null,


    },


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
    validationErrors: { nombres: { value: false } },

    selectedDeptoId: null,    // Código del país seleccionado
    selectedProvinceCode: 0,    // Código de la provincia seleccionada
    departamentos: [{}],
    deptoOptions: [{}],
    munOptions: [{}], //['El Alto', 'Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],
    
  
    estadoOptions: [{ est: 'SOLICITADO', transac: 'CREAR' }, { est: 'ASIGNADO', transac: 'DERIVAR' }
                     , { est: 'ACEPTADO', transac: 'ACEPTAR' }, { est: 'RECHAZADO', transac: 'RECHAZAR' } 
                    , { est: 'ABSUELTO', transac: 'ABSOLVER' }, { est: 'SANCIONADO', transac: 'SANCIONAR' }],
    gestorOptions: [],

  }),

  mounted() {
    this.loading = true;
    //this.username= localStorage.getItem('username');
    this.denunciaList();
    this.deptoList();
    this.gradoList();

   // this.denunciadoListByCod();
    //this.documentosPathListByCod();
//this.agregarPersona();
    this.loading = false;
    this.rolList();
    this.gestorList() ;

  },



  methods: {


    cargarPersona(item) {
      const denunciadoIndex = this.denunciadosArray.find(dndo => dndo.fila === item);
      //this.editedIndex = this.people.indexOf(item);
      this.denunciado = Object.assign({}, denunciadoIndex);   
      console.log('this.denPerDnte :', this.denPerDnte);      
    },

    downloadURL(fileId) {
      // Replace with the logic to generate the download URL based on fileId
      return `your-api-endpoint/download/${fileId}`;
    },

    downloadFile1(file1) {
      // Aquí puedes implementar la lógica para descargar el archivo
      // Por ejemplo, creando un enlace temporal y haciendo clic en él:
      const link = document.createElement('a');
      link.href = `/api/files/${file1.id}/download`; // Ajusta la ruta según tu backend
      link.download = file1.name;
      document.body.appendChild(link);
      // link.click();
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

    async gradoList() {
      Grado.gradoList()
        .then((response) => {
          // console.log("response.data[0]  : ", response.data[0], response.status);
          if (response.status === 200) {

            this.gradoOptions = Object.values(response.data);
            console.log("gradoOptions  : ", this.gradoOptions);
          } else {
            this.showSnackbar('Error recuperando Denuncia ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
     async rolList() {
      Rol.rolList()
        .then((response) => {
          // console.log("response.data[0]  : ", response.data[0], response.status);
          if (response.status === 200) {

            this.rolOptions = Object.values(response.data);
            console.log("rolOptions  : ", this.rolOptions);
          } else {
            this.showSnackbar('Error recuperando Denuncia ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async gestorList() {
      Usuario.usuarioListActivos()
        .then((response) => {
          // console.log("response.data[0]  : ", response.data[0], response.status);
          if (response.status === 200) {

            this.gestorOptions = Object.values(response.data);
            console.log("gestorOptions  : ", this.gestorOptions);
          } else {
            this.showSnackbar('Error recuperando gestor ' + response, 'red');
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
            this.showSnackbar('Error recuperando Denuncia ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async denunciaList() {
      Denuncia.denunciaPersonasGetByNivelGeo(this.deptoId)
        .then((response) => {
          console.log("denunciaPersonasGetByNivelGeo  : ", response.data, response.status);
          if (response.status === 200) {
            this.people = response.data;
          } else {
            this.showSnackbar('Error recuperando Denuncia ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    async denunciadoListByCod(cod_denuncia) {
      Denunciado.denunciadoListByCod(cod_denuncia)
        .then((response) => {
          console.log("denunciadoListByCod 1  : ", response.data, response.status);
          if (response.status === 200) {

            this.denunciadosArray = response.data;
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
         await DocumentosPath.documentosPathListByCod('C-002-10-24') //  this.denPerDnte.id
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



    onDepartChange() {
      // Encuentra el depart seleccionado por su id
      const departMun = this.departamentos.find(c => c.depto_id === this.denPerDnte.departamento);
      // Actualiza las municip según el depart seleccionado
      this.munOptions = departMun ? departMun.municipios : [];
      console.log("munOptions  : ", this.munOptions);
      // Resetear la mun seleccionada al cambiar el país
      this.denPerDnte.municipio = '';

      this.denPerDnte.depto_id = this.denPerDnte.departamento;

    },

    onEstadoChange() {
      // Encuentra el depart seleccionado por su id
      const estado = this.estadoOptions.find(c => c.transac === this.denPerDnte.estado);
      // Actualiza las municip según el depart seleccionado

      this.denPerDnte.estado = estado.est;
      this.denPerDnte.transaccion = estado.transac;
    },
    onGestorChange() {
      // Encuentra el depart seleccionado por su id
      const rol = this.gestorOptions.find(c => c.id === this.denPerDnte.gestor_id);
      // Actualiza las gestor_id según el depart seleccionado
      console.log("gestorOptions  : ", this.gestorOptions);
      this.denPerDnte.gestor_seguimiento = rol.nombre_completo; // rol.nombres  +'' +  rol.apellido_pat +'' + rol.apellido_mat  ;

    },
    onGradoChange() {
      // Encuentra el depart seleccionado por su id
      const grado = this.gradoOptions.find(c => c.grado === this.denPerDnte.grado);
      // Actualiza las municip según el depart seleccionado
      console.log("gradoOptions  : ", this.gradoOptions);
      this.denPerDnte.grados_sigla = grado.sigla;
      //this.denPerDnte.grado= grado.grado;
    },

    onRolChange() {
      // Encuentra el depart seleccionado por su id
      const rol = this.rolOptions.find(c => c.roles_sigla === this.denPerDnte.rol);
      // Actualiza las municip según el depart seleccionado
      console.log("rolOptions  : ", this.rolOptions);
      this.denPerDnte.roles_sigla = rol.roles_sigla;
      // this.denPerDnte.u_rol_id = rol.rol_id;
      //this.denPerDnte.grado= grado.grado;
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


    validateForm() {

      if (!this.denPerDnte.estado  ) this.validationErrors.estado = { value: true };
      else delete this.validationErrors.estado;

      if (!this.denPerDnte.gestor_id  ) this.validationErrors.gestor_id = { value: true };
      else delete this.validationErrors.gestor_id;


      return !Object.keys(this.validationErrors).length;
    },

    denunciasRolUpdate() {
      this.editedItemRolUsu.id = this.denPerDnte.u_rol_id === '' ? this.editedItemRolUsu.id : this.denPerDnte.u_rol_id;
      this.editedItemRolUsu.denuncias_id = this.denPerDnte.id;
      this.editedItemRolUsu.roles_sigla = this.denPerDnte.roles_sigla;
      this.editedItemRolUsu.descripcion = 'Cambio de rol';
      this.editedItemRolUsu.estado = 'ACTIVO';
      this.editedItemRolUsu.transaccion = 'MODIFICAR';
      this.editedItemRolUsu.usu_mod = this.username;
      this.editedItemRolUsu.fec_mod = new Date();


      DenunciasRol.DenunciasRolUpdate(this.editedItemRolUsu.id, JSON.stringify(this.editedItemRolUsu))
        .then((response) => {
          if (response.status === 200) {
            console.log("denunciaUpdate  : ", response.status, response);

            //  this.showSnackbar('Denuncia rol modificado correctamente !', 'green')
            toast.success('Denuncia rol modificado correctamente ! ', {
              autoClose: 3000,
              position: toast.POSITION.TOP_RIGHT,
              // toastClassName: 'custom-toast', // Add your custom class name here

            });
            //this.close()
          } else {
            console.log("denunciaUpdate  : ", response.status, "error:   : ", response.response.request.response);
            this.showSnackbar('Error modificando Denuncia rol: ' + response.response.request.response, 'red');

            toast.info('Error modificando Denuncia rol: ' + 'Revise logs con el Administrador del sistema', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,

            });
          }
        })
        .catch(error => {
          this.showSnackbar('Log Error modificando Denuncia rol ' + error, 'red');
          console.log('Log Error modificando Denuncia rol: ', error);
        });

    },


    denunciasRolCreate() {
      this.editedItemRolUsu.denuncias_id = this.denPerDnte.id;
      this.editedItemRolUsu.roles_sigla = this.denPerDnte.rol;
      this.editedItemRolUsu.descripcion = 'Asignaion de rol';
      this.editedItemRolUsu.estado = 'ACTIVO';
      this.editedItemRolUsu.transaccion = 'ACTIVAR';
      this.editedItemRolUsu.usu_cre = this.username;

      DenunciasRol.DenunciasRolCreate(JSON.stringify(this.editedItemRolUsu))
        .then((response) => {

          if (response.status === 201) {

            this.denPerDnte.u_rol_id = response.data.id;
            this.editedItemRolUsu.id = response.data.id;
            console.log("DenunciasRolCreate  : ", response.status, response);
            this.showSnackbar('Denuncia rol creado correctamente!', 'green')
            // this.close()
          } else {

            console.log("DenunciasRolCreate  : ", response.status, "error:   : ", response.response.request.response);
            this.showSnackbar('Error creando denuncia Rol: ' + response.response.request.response, 'red');
            toast.info('Error creando Denuncia rol: ' + 'Revise logs con el Administrador del sistema', {
              autoClose: 5000,
              position: toast.POSITION.TOP_RIGHT,

            });
          }
        })
        .catch(error => {
          this.showSnackbar('Log Error creando Denuncia rol: ' + error, 'red');
          console.log('Log Error creando Denuncia rol: ', error);
        })
    },

    denunciasSave() {
      try {

        if (!this.validateForm()) {
          toast.info('Debe ingresar los datos requeridos', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
          //this.dialog = false;
          return false;
        }
   
        this.denPerDnte.mun_id = this.denPerDnte.municipio.mun_id ? this.denPerDnte.municipio.mun_id : this.denPerDnte.mun_id;

        console.log('denPerDnte 2 : ', JSON.stringify(this.denPerDnte));

        if (this.editedIndex > -1) {   // Update person


          // this.denPerDnte.estado = 'ACTIVO';
          this.denPerDnte.transaccion = 'MODIFICAR';
          this.denPerDnte.usu_mod = this.username;
          this.denPerDnte.fec_mod = new Date();

          Denuncia.denunciaUpdate(this.denPerDnte.id, JSON.stringify(this.denPerDnte))
            .then((response) => {
              if (response.status === 200) {
                // this.people = response.data;
                Object.assign(this.people[this.editedIndex], this.denPerDnte)

                console.log("denunciaUpdate  : ", response.status, response);
                // toast('Wow so easy !', { containerId: 'A' });
                this.denunciasRolUpdate();


                //  this.showSnackbar('Denuncia modificado correctamente !', 'green')
                toast.success('Denuncia modificado correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here

                });
                this.close()
              } else {
                console.log("denunciaUpdate  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error modificando Denuncia: ' + response.response.request.response, 'red');

                toast.info('Error modificando Denuncia: ' + 'Revise el denuncia de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error modificando Denuncia ' + error, 'red');
              console.log('Log Error modificando Denuncia: ', error);
            });




        } else {  // Add new person

          this.denPerDnte.reset_key = 'PENDIENTE';
          this.denPerDnte.reset_date = new Date();

          this.denPerDnte.estado = 'ACTIVO';
          this.denPerDnte.transaccion = 'ACTIVAR';
          this.denPerDnte.usu_cre = this.username;


          Denuncia.denunciaCreate(JSON.stringify(this.denPerDnte))
            .then((response) => {

              if (response.status === 201) {
                //  this.people = response.data;
                this.people.push(this.denPerDnte);

                this.denPerDnte.id = response.data.id;
                this.denunciasRolCreate();

                console.log("denunciaCreate  : ", response.status, response);
                //  this.showSnackbar('Denuncia creado correctamente!', 'green')
                toast.success('Denuncia creado correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here

                });
                this.close()
              } else {

                console.log("denunciaCreate  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error creando Denuncia: ' + response.response.request.response, 'red');
                toast.info('Error creando Denuncia: ' + 'Revise el denuncia de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error creando Denuncia: ' + error, 'red');
              console.log('Log Error creando Denuncia: ', error);
            });

          // this.showSnackbar('Denuncia creado correctamente!', 'green')
          // this.close()







        }

      } catch (error) {
        this.showSnackbar('Error creating Denuncia: ' + error, 'red');
      }


    },

    

    addNewPerson() {
      this.editedIndex = -1
      this.denPerDnte = Object.assign({}, this.defaultItemUsu)
      this.dialog = true
    },

    editItem(item) {
    
      this.editedIndex = this.people.indexOf(item);
      this.denPerDnte = Object.assign({}, item);
      this.dialog = true;
      this.lockField = true;
      this.lockField2 = false;
      this.denunciadoListByCod(this.denPerDnte.cod_denuncia);
    },

    viewItem(item) {
      //this.editedIndex = this.people.indexOf(item)
      this.denPerDnte = Object.assign({}, item);
      this.dialog = true;
      this.lockField = true;
      this.lockField2 = true;
      this.denunciadoListByCod(this.denPerDnte.cod_denuncia);
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
        this.denPerDnte = Object.assign({}, this.defaultItemUsu)
        this.editedIndex = -1
      })
    },

    close() {
      this.dialog = false
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

    resetForm() {
      this.denPerDnte = Object.assign({}, this.defaultItemUsu)
      this.editedIndex = -1
      this.dialog = false
      //this.editingUserId = null;
    },

    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.visible = true;
    },


  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Adicionar Denuncia' : 'Modificar Denuncia'
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
/* Estilos para el enlace que actúa como un botón */




.btn-loading {
  position: relative;
}

.btn-loading .mdi {
  position: absolute;
  left: 10px;
}









table {
  /* ojo no borrar estilos para la tabla html */
  width: 100%;
  border-collapse: collapse;
}

th,
td {
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
  color: red;
  /* fin  ojo no borrar estilos para la tabla html */
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
