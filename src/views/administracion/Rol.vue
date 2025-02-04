<template>
  <v-container>

    <v-alert v-if="loading" type="info" dismissible>
      Cargando datos...
    </v-alert>


    <v-row class="mb-4">
    <v-col cols="6" class="p-0 py-0 px-1">
   <!-- Search Field -->
    <v-text-field v-model="search" class="pa-2" label="Buscar Rol" append-icon="mdi-magnify" single-line
      hide-details></v-text-field>
   
    </v-col>
    <v-col cols="6" class="p-0 py-0 px-1">
  </v-col>
  </v-row>
    <!-- Data Table --> <!-- v-model:page="page" -->
    <v-data-table :headers="headers" :items="filteredItems"
      :sort-by="[{ key: 'fila', order: 'asc' }, { key: 'rol', order: 'desc' }]" class="elevation-1"
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
           <v-toolbar-title class="text-center">Roles por módulo y perfil habilitado</v-toolbar-title>
          


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
  



    <template>
      <!-- Edit Dialog -->
      <v-dialog v-model="dialog" max-width="1000px">

        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemRol.roles_sigla" :readonly="lockField" label="roles_sigla"
                    :rules="[v => !!v || 'roles_sigla es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemRol.rol" :readonly="lockField" label="rol"
                    :rules="[v => !!v || 'rol es requerido']"></v-text-field>
                </v-col>
                                        
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemRol.departamento" :items="deptoOptions" item-title="depto"
                    item-value="depto_sigla" :readonly="lockField" label="departamento" @update:modelValue="onDepartChange"
                    :rules="[v => !!v || 'departamento es requerido']"></v-select>
                </v-col>
                 
              </v-row>
           <!-- <v-row>             
              <v-col cols="8" class="p-0 py-0 px-0">
                  <v-textarea v-model="editedItemRol.operaciones_concat" :readonly="lockField" label="Modulo:Perfil"
                :rules="[v => !!v || 'Perfil es requerido']" placeholder="Modulo:Perfil (operaciones)"></v-textarea>

                </v-col>
              </v-row>-->
           <v-row class="p-0 py-1 px-0  ">
            <v-col class="p-0 py-0 px-1">
              <div>
            <table>
              <thead>
                <tr>
                  <th>Fila</th>
                  <th>Perfiles por Módulo activos</th>
                  <th>Asignar</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(operacion, index) in perfilOperacionesArray" :key="index">
                  <td>{{ index +1 }}</td>
                  <td>{{ operacion }}</td>
                 
                   <td>
                    <v-icon small  @click="cargarPerfilOperaciones(operacion)"> mdi-arrow-right-bold</v-icon>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
            </v-col>
            <v-col class="p-0 py-0 px-1">
              <div>
            <table>
              <thead>
                <tr>
                    <th>Des-Asig.</th>
                  <th>Perfiles por Módulo inactivos</th>
                
                </tr>
              </thead>
              <tbody>
                <tr v-for="(operacion, index) in perfilOperNewArray" :key="index">
                      <td>
                    <v-icon small  @click="quitarPerfilOperaciones(operacion)"> mdi-arrow-left-bold</v-icon>
                  </td>
                 
                  <td>{{ operacion }}</td>
              
                </tr>
              </tbody>
            </table>
          </div>
            </v-col>
          </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions v-if="lockField === false">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
            <v-btn class="custom-green-btn" text @click="rolesSave"> Guardar </v-btn>
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

  </v-container>
</template>


<script>
import { toast } from 'vue3-toastify';

import Rol from '@/services/Rol';
import NivelGeografico from '@/services/NivelGeografico';
import Grado from '@/services/Grado';
import RolMenusOperaciones from '@/services/RolMenusOperaciones';


export default {

  data: () => ({

    loading: true,

    page: 1,
    itemsPerPage: 10,
    search: '',
    dialog: false,
    dialogDelete: false,
    // sortBy: ['calories'], // Ensure this is an array or an object with a 'find' method
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
        title: 'Num.',
        align: 'start',
        sortable: false,
        key: 'fila',
        class: 'background'
      },
      { title: 'Código Rol', key: 'roles_sigla', class: 'success--text title' },
      { title: 'Rol', key: 'rol' },
      { title: 'Módulo/Perfil', key: 'operaciones_concat' },
      { title: 'Estado', key: 'rol_estado' },

      { title: 'Acciones', value: 'actions', sortable: false },
    ],
    people: [],
    editedIndex: -1,
    editedItemRolUsu: {
      id: null,
      roles_id: null,
      roles_sigla: '',
      descripcion: null,
      estado: '',
      transaccion: '',
      usu_cre: null,
      usu_mod: null,
      fec_mod: null,


    },
    // ... propiedades del formulario 
    itemArray:[],
    itemArray2:[],
    perfilOperacionesArray:[],
    perfilOperNewArray:[],

    editedItemMenuOper: {
        id: 0,
      menus_sigla: '',
      roles_sigla: '',
      operaciones_sigla: '',
      descripcion: '',

      operaciones_concat: '',

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null
    },

    editedItemRol: {
      fila: '',
      id: null,
      menus_sigla: '',
      rol:'',
      roles_sigla: '',
      operaciones_sigla: '',
      descripcion: '',

      operaciones_concat: '',
      municipio: '',
      mun_id: '',
      

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null
    },

    defaultItemUsu: {
      fila: '',
      id: null,
      menus_sigla: '',
      rol:'',
      roles_sigla: '',
      operaciones_sigla: '',
      descripcion: '',

      operaciones_concat: '',
      municipio: '',
      mun_id: '',
      

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
    expedidoOptions: ['LP', 'CH', 'SC', 'CBBA', 'OR'],
    gradoOptions: [], // ['Capitan', 'Teniente', 'Sargento 1ro', 'Sin Grado'],
    rolOptions: [],
    validationErrors: { roles_sigla: { value: false } },

    selectedDeptoId: null,    // Código del país seleccionado
    selectedProvinceCode: 0,    // Código de la provincia seleccionada
    departamentos: [{}],
    deptoOptions: [{}],
    munOptions: [{}], //['El Alto', 'Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],

    estadoOptions: [{ est: 'ACTIVO', transac: 'ACTIVAR' }, { est: 'INACTIVO', transac: 'INACTIVAR' }],


  }),

  mounted() {
    this.loading = true;
    //this.username= localStorage.getItem('username');
    this.rolList();
    this.deptoList();
    this.gradoList();
    this.loading = false;


  },



  methods: {

    perfilOperacionesList(item) {
  
         this.itemArray = [item ];
         this.itemArray2 = this.itemArray.map(oper => ({
          fila: oper.fila,
          rol: oper.rol,
          roles_sigla: oper.roles_sigla,
          operaciones_sigla_concat: oper.operaciones_sigla_concat.split("+"),
          operaciones_concat:item.operaciones_concat.split("-"),
          operaciones_concat_estado:item.operaciones_concat_estado.split("-"),
          nivel_geografico_sigla: oper.nivel_geografico_sigla,
          departamento:oper.departamento,
          rol_estado: oper.rol_estado
        })) ;

        // filtrar solo los roles-modulos  en estado activo
       // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado
       this.perfilOperacionesArray=  this.itemArray2.flatMap(grupo =>  grupo.operaciones_concat_estado.filter(modul => modul.includes('(ACTIVO)')) ) ;
      // quitar (ACTIVO)
       let array3 =[];
       this.perfilOperacionesArray.forEach(element =>{
        array3.push(element.split('(')[0]);
       });

       this.perfilOperacionesArray=array3;
       //this.perfilOperacionesArray= [{'operaciones_concat': itemArray2.flatMap(grupo =>  grupo.operaciones_concat_estado.filter(modul => modul.includes('(ACTIVO)')) )  }];

    // segunda forma para  Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado
  /*      this.perfilOperacionesArray = itemArray2.flatMap(oper => 
            oper.operaciones_concat.map(objeto => ({
                fila: oper.fila,
                rol: oper.rol,
                roles_sigla: oper.roles_sigla,
                operaciones_sigla_concat: oper.operaciones_sigla_concat,
               // operaciones_sigla_concat_estado: oper.operaciones_sigla_concat_estado,
                nivel_geografico_sigla: oper.nivel_geografico_sigla,
                departamento:oper.departamento,
                rol_estado: oper.rol_estado,
                operaciones_concat: objeto  // Cada numero se convierte en un objeto separado
          }))
        );
*/
         //   this.perfilOperacionesArray = this.perfilOperacionesArray.filter((elemento) => elemento.edad >= 30);
         this.perfilOperacionesArray = this.perfilOperacionesArray.sort();
            console.log("perfilOperacionesArray  : ", this.perfilOperacionesArray);


            // CARGAR los roles mmodulos inactivos
                         // filtrar solo los roles-modulos  en estado activo
       // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado
       this.perfilOperNewArray=  this.itemArray2.flatMap(grupo =>  grupo.operaciones_concat_estado.filter(modul => modul.includes('(INACTIVO)')) ) ;
   // quitar (INACTIVO)
   array3 =[];
       this.perfilOperNewArray.forEach(element =>{
        array3.push(element.split('(')[0]);
       });

       this.perfilOperNewArray=array3;
      console.log('this.perfilOperNewArray :', this.perfilOperNewArray);
  },

    cargarPerfilOperaciones(operaciones_concat) {
      if(!this.lockField ){


    
      const operacionObjeto = this.perfilOperacionesArray.find(oper => oper === operaciones_concat);
      this.perfilOperNewArray.push(operacionObjeto); // Object.assign({}, operacionObjeto);
      console.log('this.perfilOperNewArray :', this.perfilOperNewArray);
      
      const indice = this.perfilOperacionesArray.findIndex(oper => oper === operaciones_concat);
            
            // Si se encontró, eliminar el elemento
            if (indice !== -1) {
              this.perfilOperacionesArray.splice(indice, 1);
              console.log('this.perfilOperacionesArray :', this.perfilOperacionesArray);

              //this.perfilOperacionesArray.push(operaciones_concat); 
            } else {
                console.log(`No se encontró operaciones_concat con nombre: ${operaciones_concat}`);
            }
         }

    },
    quitarPerfilOperaciones(operaciones_concat) {
      if(!this.lockField ){
        // Encontrar el índice del elemento
        const indice = this.perfilOperNewArray.findIndex(oper => oper === operaciones_concat);
            
            // Si se encontró, eliminar el elemento
            if (indice !== -1) {
            
              const operacionObjeto = this.perfilOperNewArray.find(oper => oper === operaciones_concat);
              this.perfilOperacionesArray.push(operacionObjeto); // Object.assign({}, operacionObjeto);
              console.log('this.perfilOperacionesArray :', this.perfilOperacionesArray);
              this.perfilOperNewArray.splice(indice, 1);
              console.log('this.perfilOperNewArray :', this.perfilOperNewArray);

            } else {
                console.log(`No se encontró operaciones_concat con nombre: ${operaciones_concat}`);
            }
       
         
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
            this.showSnackbar('Error recuperando Rol ' + response, 'red');
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
              depto_sigla: depart.depto_sigla,
            }));
            this.deptoOptions.push({
              depto: '(Nacional)',   // Bolivia
              depto_id: 0,
              depto_sigla: 'BOL',
            });
            console.log("deptoOptions  : ", this.deptoOptions);
          } else {
            this.showSnackbar('Error recuperando Rol ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },


    onDepartChange() {
      // Encuentra el depart seleccionado por su id
      const departMun = this.departamentos.find(c => c.depto_id === this.editedItemRol.departamento);
      // Actualiza las municip según el depart seleccionado
      this.munOptions = departMun ? departMun.municipios : [];
      console.log("munOptions  : ", this.munOptions);
      // Resetear la mun seleccionada al cambiar el país
      this.editedItemRol.municipio = '';

      this.editedItemRol.depto_id = this.editedItemRol.departamento;

    },

    onEstadoChange() {
      // Encuentra el depart seleccionado por su id
      const estado = this.estadoOptions.find(c => c.transac === this.editedItemRol.estado);
      // Actualiza las municip según el depart seleccionado

      this.editedItemRol.estado = estado.est;
      this.editedItemRol.transaccion = estado.transac;
    },

    onGradoChange() {
      // Encuentra el depart seleccionado por su id
      const grado = this.gradoOptions.find(c => c.grado === this.editedItemRol.grado);
      // Actualiza las municip según el depart seleccionado
      console.log("gradoOptions  : ", this.gradoOptions);
      this.editedItemRol.grados_sigla = grado.sigla;
      //this.editedItemRol.grado= grado.grado;
    },

    onRolChange() {
      // Encuentra el depart seleccionado por su id
      const rol = this.rolOptions.find(c => c.roles_sigla === this.editedItemRol.rol);
      // Actualiza las municip según el depart seleccionado
      console.log("rolOptions  : ", this.rolOptions);
      this.editedItemRol.roles_sigla = rol.roles_sigla;
      // this.editedItemRol.u_rol_id = rol.rol_id;
      //this.editedItemRol.grado= grado.grado;
    },


    validateForm() {
      //this.validationErrors = {};

      if (!this.editedItemRol.roles_sigla ) this.validationErrors.roles_sigla = { value: true };
      else delete this.validationErrors.roles_sigla;

      if (!this.editedItemRol.rol ) this.validationErrors.rol = { value: true };
      else delete this.validationErrors.rol;

      if (!this.editedItemRol.operaciones_concat ) this.validationErrors.operaciones_concat = { value: true };
      else delete this.validationErrors.operaciones_concat;




      return !Object.keys(this.validationErrors).length;
    },


    rolesSave() {
      try {

        if (!this.validateForm()) {
          toast.info('Debe ingresar los datos requeridos', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
          //this.dialog = false;
          return false;
        }

        // if( this.editedItemRol && this.editedItemRol ){
        // const dateParts = (form.value.fecha || '').split("/");      
        // fec_ejecucion:   new Date(dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]).toISOString(), // form.value.fecha,        
    
        //id|menus_sigla|roles_sigla|operaciones_sigla|descripcion      
      //  this.editedItemRol.mun_id = this.editedItemRol.municipio.mun_id ? this.editedItemRol.municipio.mun_id : this.editedItemRol.mun_id;

        //console.log('editedItemRol 2 : ', JSON.stringify(this.editedItemRol));

        if (this.editedIndex > -1) {   // Update person

              // segunda forma para  Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado
          this.itemArray = this.itemArray2.flatMap(oper => 
                oper.operaciones_sigla_concat.map(objeto => ({
                fila: oper.fila,
                rol: oper.rol,
                roles_sigla: oper.roles_sigla,
                //operaciones_sigla_concat: oper.operaciones_sigla_concat,
                operaciones_sigla_concat_estado: oper.operaciones_sigla_concat_estado,
                nivel_geografico_sigla: oper.nivel_geografico_sigla,
                departamento:oper.departamento,
                rol_estado: oper.rol_estado,
                operaciones_sigla_concat: objeto  // Cada numero se convierte en un objeto separado
          }))
        );
                console.log("itemArray  : ", this.itemArray);
          //  grabar oper activas
          this.perfilOperacionesArray.forEach( (element, index) => {
            
            console.log("2 perfilOperNewArray operaciones_sigla_concat  : ", element.operaciones_sigla_concat);
            this.editedItemMenuOper.descripcion = element.split(' (')[0];
         //   this.editedItemMenuOper.id = element[1];
        //    const operAlta= operaciones.split(',')[0]; 
          //  const operConsulta= operaciones.split(',')[1]; 
          //  const operEdicion= operaciones.split(',')[2]; 
          let moduloRol=  this.itemArray.filter(modul => modul.operaciones_sigla_concat.includes(this.editedItemMenuOper.descripcion.trim() ))  ;
          moduloRol=moduloRol[0].operaciones_sigla_concat.split('-');
          this.editedItemMenuOper.id = moduloRol[0];
        //  this.editedItemMenuOper.menus_sigla = moduloRol[1];
      //    this.editedItemMenuOper.operaciones_sigla = moduloRol[2];

          this.editedItemMenuOper.estado = 'ACTIVO';
          this.editedItemMenuOper.transaccion = 'ACTIVAR';
          this.editedItemMenuOper.usu_mod = this.username;
          this.editedItemMenuOper.fec_mod = new Date();

          RolMenusOperaciones.rolMenusOperacionesUpdate(this.editedItemMenuOper.id, (this.editedItemMenuOper))
            .then((response) => {
              if (response.status === 200) {
                // this.people = response.data;
             //   Object.assign(this.people[this.editedIndex], this.editedItemMenuOper)

                console.log("rolMenusOperacionesUpdate  : ", response.status, response);
                this.rolList();

                toast.success('Rol operaciones modificado correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here

                });
                this.close()
              } else {
                console.log("rolMenusOperacionesUpdate  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error modificando Rol operaciones: ' + response.response.request.response, 'red');

                toast.info('Error modificando Rol operaciones: ' + 'Revise el rol de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error modificando Rol operaciones' + error, 'red');
              console.log('Log Error modificando Rol operaciones: ', error);
            });

          });
      //  grabar oper activas
          this.perfilOperNewArray.forEach( (element, index) => {
            
            console.log("2 perfilOperNewArray operaciones_sigla_concat  : ", element.operaciones_sigla_concat);
            this.editedItemMenuOper.descripcion = element.split(' (')[0];
         //   this.editedItemMenuOper.id = element[1];
        //    const operAlta= operaciones.split(',')[0]; 
          //  const operConsulta= operaciones.split(',')[1]; 
          //  const operEdicion= operaciones.split(',')[2]; 
          let moduloRol=  this.itemArray.filter(modul => modul.operaciones_sigla_concat.includes(this.editedItemMenuOper.descripcion.trim() ))  ;
          moduloRol=moduloRol[0].operaciones_sigla_concat.split('-');
          this.editedItemMenuOper.id = moduloRol[0];
        //  this.editedItemMenuOper.menus_sigla = moduloRol[1];
      //    this.editedItemMenuOper.operaciones_sigla = moduloRol[2];

          this.editedItemMenuOper.estado = 'INACTIVO';
          this.editedItemMenuOper.transaccion = 'INACTIVAR';
          this.editedItemMenuOper.usu_mod = this.username;
          this.editedItemMenuOper.fec_mod = new Date();

          RolMenusOperaciones.rolMenusOperacionesUpdate(this.editedItemMenuOper.id, (this.editedItemMenuOper))
            .then((response) => {
              if (response.status === 200) {
                // this.people = response.data;
             //   Object.assign(this.people[this.editedIndex], this.editedItemMenuOper)

                console.log("rolMenusOperacionesUpdate  : ", response.status, response);
                this.rolList();

                toast.success('Rol operaciones modificado correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here

                });
                this.close()
              } else {
                console.log("rolMenusOperacionesUpdate  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error modificando Rol operaciones: ' + response.response.request.response, 'red');

                toast.info('Error modificando Rol operaciones: ' + 'Revise el rol de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error modificando Rol operaciones' + error, 'red');
              console.log('Log Error modificando Rol operaciones: ', error);
            });

          });

        } else {  // Add new person

       

        }

      } catch (error) {
        this.showSnackbar('Error creating Rol: ' + error, 'red');
      }


    },

    async rolList() {
      Rol.rolList()
        .then((response) => {
          console.log("rolList  : ", response.data, response.status);
          if (response.status === 200) {
            this.people = response.data;
          } else {
            this.showSnackbar('Error recuperando Rol ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },


    addNewPerson() {
      this.editedIndex = -1
      this.editedItemRol = Object.assign({}, this.defaultItemUsu)
      this.dialog = true


    },

    editItem(item) {
      this.editedIndex = this.people.indexOf(item)
      this.editedItemRol = Object.assign({}, item)
      this.dialog = true
      this.lockField = false
      this.perfilOperacionesList(item);
    },

    viewItem(item) {
      this.editedIndex =-2;// this.people.indexOf(item)
      this.editedItemRol = Object.assign({}, item)
      this.dialog = true
      this.lockField = true
      this.perfilOperacionesList(item);
    },

    deleteItem(item) {
      this.editedIndex = this.people.indexOf(item)
      this.editedItemRol = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.people.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItemRol = Object.assign({}, this.defaultItemUsu)
        this.editedIndex = -1
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItemRol = Object.assign({}, this.defaultItemUsu)
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
      this.editedItemRol = Object.assign({}, this.defaultItemUsu)
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
      return this.editedIndex === -1 ? 'Adicionar Rol' : (this.editedIndex === -2 ? 'Consultar perfiles de rol' : 'Modificar perfiles de Rol')
//      return this.editedIndex === -1 ? 'Adicionar Rol' : 'Modificar perfiles del Rol'
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

  // created() {
  // this.initialize()
  //this.listByFkRol () 
  //},




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

/*
.table-header {
  background:  #0c7e0f !important;
  color: var(--v-theme-on-primary); 
  justify-content: center; // Centers horizontally    class="text-center"
--toastify-color-dark
}

 */
</style>
