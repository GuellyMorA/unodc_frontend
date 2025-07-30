<template>
  <v-container>

    <v-alert v-if="loading" type="info" dismissible>
      Cargando datos...
    </v-alert>

    <v-row class="mb-4">
    <v-col cols="6" class="p-0 py-0 px-1">
   <!-- Search Field -->
    <v-text-field v-model="search" class="pa-2" label="Buscar Usuario" append-icon="mdi-magnify" single-line
      hide-details></v-text-field>
   
    </v-col>
    <v-col cols="6" class="p-0 py-0 px-1">
  </v-col>
  </v-row>
    <!-- Data Table --> <!-- v-model:page="page" -->
    <v-data-table :headers="headers" :items="filteredItems"
      :sort-by="[{ key: 'fila', order: 'asc' }, { key: 'apellido_pat', order: 'desc' }]" class="elevation-1"
      :search="search" :items-per-page="itemsPerPage" rows-per-page-text="Filas por página"
      no-data-text="No existen registros." no-results-text="Sin resultados" page-text="."
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
          <v-toolbar-title class="text-center">Usuarios del sistema</v-toolbar-title>
  


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
      Adicionar Usuario
    </v-btn>



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
                  <v-text-field v-model="editedItemUsuario.nombres" :readonly="lockField" label="Nombres"
                   :rules="[v => !!v || 'Nombres es requerido']"
                  @input="generateLoginAndPassword" ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.apellido_pat" :readonly="lockField" label="Ap. Paterno"
                   :rules="[v => !!v || 'Apellido es requerido']"
                  @input="generateLoginAndPassword" ></v-text-field>
                </v-col>
              <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.apellido_mat" :readonly="lockField" label="Ap. Materno"
                 ></v-text-field>
                </v-col> 
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.ci_y_complemento" :readonly="lockField" label="CI y complemento" 
                  placeholder="CI" :rules="[v => !!v || 'CI es requerido']"></v-text-field>
                </v-col>
               <!--   <v-col cols="12" sm="6" md="4">
                <v-select v-model="editedItemUsuario.ci_expedido" :items="expedidoOptions" :readonly="lockField" label="CI expedido"
                   :rules="[v => !!v || 'ci_expedido es requerido']"></v-select>
                </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.grado" :items="gradoOptions" :readonly="lockField" label="Grado"
                     item-title="grado"        item-value="grados_sigla"   @update:modelValue="onGradoChange"
                      :rules="[v => !!v || 'grado es requerido']"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.telefono" :readonly="lockField" label="Teléfono"
                   :rules="[v => !!v || 'telefono es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.email" :readonly="lockField" label="Correo electrónico"
                  type="email"  :rules="[v => !!v || 'email es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.departamento" :items="deptoOptions" :readonly="lockField" label="Departamento" 
                    item-title="depto"     item-value="depto_id"   @update:modelValue="onDepartChange"
                    placeholder="departamento" :rules="[v => !!v || 'departamento es requerido']"></v-select>

                </v-col>
                   <!-- <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.municipio" :items="munOptions" :readonly="lockField" label="Ciudad" 
                    item-title="mun" item-value="mun_id"   return-object
                    :rules="[v => !!v || 'Ciudad es requerido']"></v-select>
                </v-col> -->
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.user_login" :readonly="lockField" label="Usuario"
                   :rules="[v => !!v || 'usuario es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.password_hash" :readonly="lockField" label="Password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'" hint="Min. 8 caracteres" name="input-10-1" counter
                    @click:append="show1 = !show1"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.rol" :items="rolOptions" :readonly="lockField" label="Rol del usuario"
                     item-title="rol" item-value="roles_sigla"          @update:modelValue="onRolChange"
                      :rules="[v => !!v || 'Rol es requerido']"></v-select>

                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.estado" :items="estadoOptions" :readonly="lockField" label="Estado del usuario"
                      item-title="est"     item-value="transac"     @update:modelValue="onEstadoChange" 
                      placeholder="estado" :rules="[v => !!v || 'estado es requerido']"></v-select>
                </v-col>

              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions v-if="lockField === false">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
            <v-btn class="custom-green-btn" text @click="usuariosSave"> Guardar </v-btn>
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

import Usuario from '@/services/Usuario';
import NivelGeografico from '@/services/NivelGeografico';
import Grado from '@/services/Grado';
import Rol from '@/services/Rol';
import UsuariosRol from '@/services/UsuariosRol';



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
      required: value => !!value || 'Requerido.',
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
    // ... propiedades del formulario 
    editedItemUsuario: {
      fila: '',
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

    defaultItemUsu: {
      fila: '',
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
    /*depas: [{
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
    }],*/
    // departOptions: [{id:1,depto:'Chuquisaca'},{id:2 , depto:'La Paz'}, {id:3 , depto:'Santa Cruz'},{id:4 , depto: 'Cochabamba'}],


  }),

  mounted() {
    this.loading = true;
    //this.username= localStorage.getItem('username');
    this.usuarioList();
    this.deptoList();
    this.gradoList();
    this.loading = false;
    this.rolList();


  },

  /*computed: {
      // Opciones para el primer combo de países
      departOptions() {
        return this.departamentos
      },
    },*/

  methods: {
    generateLoginAndPassword() {
      // Generar el login de usuario
      this.editedItemUsuario.nombres =this.editedItemUsuario.nombres.trim();
      const firstLetter = this.editedItemUsuario.nombres.charAt(0).toLowerCase();
      const lastNameLowercase = this.editedItemUsuario.apellido_pat.toLowerCase();
      this.editedItemUsuario.user_login = `${firstLetter.trim()}${lastNameLowercase.trim()}`;
// Concatenar sin espacios
this.editedItemUsuario.user_login  = `${this.editedItemUsuario.user_login.replace(/\s+/g, '')}`;
      // Generar la contraseña
      this.editedItemUsuario.password_hash = `${this.editedItemUsuario.user_login}12345`;
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
          // console.log("response.data[0]  : ", response.data[0], response.status);
          if (response.status === 200) {

            this.rolOptions = Object.values(response.data);
            console.log("rolOptions  : ", this.rolOptions);
             const uniqueArray = this.removeRolesDuplicates(this.rolOptions);
              console.log("uniqueArray : ", uniqueArray);   
              this.rolOptions=uniqueArray;


          } else {
            this.showSnackbar('Error recuperando Usuario ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },

     removeRolesDuplicates(arr) {
           // Usamos un Set para mantener valores únicos
        const seen = new Set();
        return arr.filter(item => {
            if (!seen.has(item.roles_sigla)) {
                seen.add(item.roles_sigla);
                return true; // Mantiene el objeto en el array
            }
            return false; // Filtra el objeto si el 'roles_sigla' ya ha sido visto
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


    onDepartChange() {
      // Encuentra el depart seleccionado por su id
      const departMun = this.departamentos.find(c => c.depto_id === this.editedItemUsuario.departamento);
      // Actualiza las municip según el depart seleccionado
      this.munOptions = departMun ? departMun.municipios : [];
      console.log("munOptions  : ", this.munOptions);
      // Resetear la mun seleccionada al cambiar el país
      this.editedItemUsuario.municipio = '';

      this.editedItemUsuario.depto_id = this.editedItemUsuario.departamento;

    },

    onEstadoChange() {
      // Encuentra el depart seleccionado por su id
      const estado = this.estadoOptions.find(c => c.transac === this.editedItemUsuario.estado);
      // Actualiza las municip según el depart seleccionado

      this.editedItemUsuario.estado = estado.est;
      this.editedItemUsuario.transaccion = estado.transac;
    },

    onGradoChange() {
      // Encuentra el depart seleccionado por su id
      const grado = this.gradoOptions.find(c => c.grado === this.editedItemUsuario.grado);
      // Actualiza las municip según el depart seleccionado
      console.log("gradoOptions  : ", this.gradoOptions);
      this.editedItemUsuario.grados_sigla = grado.sigla;
      //this.editedItemUsuario.grado= grado.grado;
    },

    onRolChange() {
      // Encuentra el depart seleccionado por su id
      const rol = this.rolOptions.find(c => c.roles_sigla === this.editedItemUsuario.rol);
      // Actualiza las municip según el depart seleccionado
      console.log("rolOptions  : ", this.rolOptions);
      this.editedItemUsuario.roles_sigla = rol.roles_sigla;
      // this.editedItemUsuario.u_rol_id = rol.rol_id;
      //this.editedItemUsuario.grado= grado.grado;
    },



    /*const formulario = {
    nombre: {
        value: 'Juan'
    },
    apellido: {
        value: 'Pérez'
    },
    edad: {
        value: 30
    }
};*/
    validateForm() {
     
    //  || !this.editedItemUsuario.apellido_mat
      if (!this.editedItemUsuario.nombres || !this.editedItemUsuario.apellido_pat ) this.validationErrors.nombres = { value: true };
      else delete this.validationErrors.nombres;
   // || !this.editedItemUsuario.ci_expedido 
      if (!this.editedItemUsuario.ci_y_complemento || !this.editedItemUsuario.grado) this.validationErrors.grado = { value: true };
      else delete this.validationErrors.grado;

      if (!this.editedItemUsuario.telefono || !this.editedItemUsuario.email || !this.editedItemUsuario.departamento) this.validationErrors.telefono = { value: true };
      else delete this.validationErrors.telefono;
      //!this.editedItemUsuario.municipio || 
      if (!this.editedItemUsuario.user_login || !this.editedItemUsuario.password_hash) this.validationErrors.user_login = { value: true };
      else delete this.validationErrors.user_login;

      if (!this.editedItemUsuario.rol || !this.editedItemUsuario.estado) this.validationErrors.rol = { value: true };
      else delete this.validationErrors.rol;


      return !Object.keys(this.validationErrors).length;
    },

    usuariosRolUpdate() {
      this.editedItemRolUsu.id = this.editedItemUsuario.u_rol_id === '' ? this.editedItemRolUsu.id : this.editedItemUsuario.u_rol_id;
      this.editedItemRolUsu.usuarios_id = this.editedItemUsuario.id;
      this.editedItemRolUsu.roles_sigla = this.editedItemUsuario.roles_sigla;
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
      this.editedItemRolUsu.usuarios_id = this.editedItemUsuario.id;
      this.editedItemRolUsu.roles_sigla = this.editedItemUsuario.rol;
      this.editedItemRolUsu.descripcion = 'Asignacion de rol';
      this.editedItemRolUsu.estado = 'ACTIVO';
      this.editedItemRolUsu.transaccion = 'ACTIVAR';
      this.editedItemRolUsu.usu_cre = this.username;

      UsuariosRol.UsuariosRolCreate(JSON.stringify(this.editedItemRolUsu))
        .then((response) => {

          if (response.status === 201) {

            this.editedItemUsuario.u_rol_id = response.data.id;
            this.editedItemRolUsu.id = response.data.id;
            console.log("UsuariosRolCreate  : ", response.status, response);
           // this.showSnackbar('Usuario rol creado correctamente!', 'green')
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

    usuariosSave() {
      try {

        if (!this.validateForm()) {
          toast.info('Debe ingresar los datos requeridos', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
          //this.dialog = false;
          return false;
        }

        // if( this.editedItemUsuario && this.editedItemUsuario ){
        // const dateParts = (form.value.fecha || '').split("/");      
        // fec_ejecucion:   new Date(dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]).toISOString(), // form.value.fecha,        

    // 11/02/2025    this.editedItemUsuario.mun_id = this.editedItemUsuario.municipio.mun_id ? this.editedItemUsuario.municipio.mun_id : this.editedItemUsuario.mun_id;

        console.log('editedItemUsuario 2 : ', JSON.stringify(this.editedItemUsuario));

        if (this.editedIndex > -1) {   // Update person

          this.editedItemUsuario.reset_key = 'PENDIENTE';
          this.editedItemUsuario.reset_date = new Date();
          // this.editedItemUsuario.estado = 'ACTIVO';
          this.editedItemUsuario.transaccion = 'MODIFICAR';
          this.editedItemUsuario.usu_mod = this.username;
          this.editedItemUsuario.fec_mod = new Date();

          Usuario.usuarioUpdate(this.editedItemUsuario.id, JSON.stringify(this.editedItemUsuario))
            .then((response) => {
              if (response.status === 200) {
                // this.people = response.data;
                Object.assign(this.people[this.editedIndex], this.editedItemUsuario)

                console.log("usuarioUpdate  : ", response.status, response);
                // toast('Wow so easy !', { containerId: 'A' });
                this.usuariosRolUpdate();
              

                //  this.showSnackbar('Usuario modificado correctamente !', 'green')
                toast.success('Usuario modificado correctamente ! ', {
                  autoClose: 5000,
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

          this.editedItemUsuario.reset_key = 'PENDIENTE';
          this.editedItemUsuario.reset_date = new Date();

          this.editedItemUsuario.estado = 'ACTIVO';
          this.editedItemUsuario.transaccion = 'ACTIVAR';
          this.editedItemUsuario.usu_cre = this.username;


          Usuario.usuarioCreate(JSON.stringify(this.editedItemUsuario))
            .then((response) => {

              if (response.status === 201) {
                //  this.people = response.data;
                this.people.push(this.editedItemUsuario);

                this.editedItemUsuario.id = response.data.id;
                this.usuariosRolCreate();
                this.usuarioList();
                console.log("usuarioCreate  : ", response.status, response);
              //  this.showSnackbar('Usuario creado correctamente!', 'green')
                toast.success('Usuario creado correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here

                });
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

    async usuarioList() {
      Usuario.usuarioList()
        .then((response) => {
          console.log("usuarioList  : ", response.data, response.status);
          if (response.status === 200) {
            this.people = response.data;
          } else {
            this.showSnackbar('Error recuperando Usuario ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
    },


    addNewPerson() {
      this.editedIndex = -1
      this.editedItemUsuario = Object.assign({}, this.defaultItemUsu)
      this.dialog = true


    },

    editItem(item) {
      this.editedIndex = this.people.indexOf(item)
      this.editedItemUsuario = Object.assign({}, item)
      this.dialog = true
      this.lockField = false
    },

    viewItem(item) {
     this.editedIndex = -2; //this.people.indexOf(item)
      this.editedItemUsuario = Object.assign({}, item)
      this.dialog = true
      this.lockField = true
    },

    deleteItem(item) {
      this.editedIndex = this.people.indexOf(item)
      this.editedItemUsuario = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.people.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItemUsuario = Object.assign({}, this.defaultItemUsu)
        this.editedIndex = -1
      })
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItemUsuario = Object.assign({}, this.defaultItemUsu)
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
      this.editedItemUsuario = Object.assign({}, this.defaultItemUsu)
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
      return this.editedIndex === -1 ? 'Adicionar Usuario' : (this.editedIndex === -2 ? 'Consultar Usuario' : 'Modificar Usuario')
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
  //this.listByFkUsuario () 
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



/*
.table-header {
  background:  #0c7e0f !important;
  color: var(--v-theme-on-primary); 
  justify-content: center; // Centers horizontally    class="text-center"
--toastify-color-dark
}

 */
</style>
