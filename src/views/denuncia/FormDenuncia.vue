<template>
  
  
  <v-alert
          v-if="loading"
          type="info"
          dismissible
        >
          Cargando datos...
  </v-alert>
  <h1>Formulario de denuncias</h1>
<v-container>
  <v-text-field  label="EL PRESENTE FORMULARIO RECIBE DENUNCIAS DE CORRUPCION, MALOS TRATOS Y OTROS COMETIDOS POR FUNCIONARIOS POLICIALES Y SERA REVISADO POR EL DEPARTAMENTO NACIONAL DE TRANSPARENCIA DE LA POLICIA BOLIVIANA."></v-text-field>

  <v-card class="mx-auto" max-width="700" >
    <v-card-title>
            <span class="text-h5"> Datos del Denunciante </span>
      </v-card-title>
        <v-card-text>
          <v-container>  
          
        
                <v-text-field v-model="editedItemUsuario.nombres" :readonly="lockField" label="nombres"
                  :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
             
             
                <v-text-field v-model="editedItemUsuario.apellido_pat" :readonly="lockField" label="apellido pat"
                  :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
             
             
                <v-text-field v-model="editedItemUsuario.apellido_mat" :readonly="lockField" label="apellido mat"
                  :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
                       
                <v-text-field v-model="editedItemUsuario.email" :readonly="lockField" label="email"
                  :rules="[v => !!v || 'email es requerido']"></v-text-field>
             
                  <v-text-field v-model="editedItemUsuario.genero_sexo" :readonly="lockField" label="genero_sexo"
                  :rules="[v => !!v || 'genero_sexo es requerido']"></v-text-field>
                         
             
                <v-text-field v-model="editedItemUsuario.telefono" :readonly="lockField" label="telefono"
                  :rules="[v => !!v || 'telefono es requerido']"></v-text-field>
                
                  <v-text-field v-model="editedItemUsuario.direccion" :readonly="lockField" label="Donde se encuentra"
                  :rules="[v => !!v || 'Ubicacion es requerido']"></v-text-field>
             
                
          </v-container>
      </v-card-text>
    <v-divider></v-divider>

  </v-card>

  <v-card class="mx-auto  mt-4" max-width="700" >
    <v-card-title>
            <span class="text-h5"> Datos del Denunciado </span>
      </v-card-title>
        <v-card-text>
          <v-container>           
                <v-select v-model="editedItemUsuario.grado" :items="gradoOptions" 
                          item-title="grado" item-value="grados_sigla" :readonly="lockField" label="grados"  @update:modelValue="onGradoChange" 
                          :rules="[v => !!v || 'grado es requerido']"></v-select>
            

                <v-text-field v-model="editedItemUsuario.nombres" :readonly="lockField" label="nombres"
                  :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
             
             
                <v-text-field v-model="editedItemUsuario.apellido_pat" :readonly="lockField" label="apellido pat"
                  :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
             
             
                <v-text-field v-model="editedItemUsuario.apellido_mat" :readonly="lockField" label="apellido mat"
                  :rules="[v => !!v || 'Apellido es requerido']"></v-text-field>
                  <v-text-field v-model="editedItemUsuario.genero_sexo" :readonly="lockField" label="genero_sexo"
                  :rules="[v => !!v || 'genero_sexo es requerido']"></v-text-field>
                                     
                <v-text-field v-model="editedItemUsuario.puesto_cargo_funcion" :readonly="lockField" label="Cargo-funcion"
                  :rules="[v => !!v || 'Cargo-funcion es requerido']"></v-text-field>
             
                          
             
                <v-text-field v-model="editedItemUsuario.unidad_policial_desc" :readonly="lockField" label="unidad_policial"
                  :rules="[v => !!v || 'unidad_policial es requerido']"></v-text-field>
                
                  <v-text-field v-model="editedItemUsuario.lugar_hecho" :readonly="lockField" label="lugar del hecho"
                  :rules="[v => !!v || 'lugar del hecho es requerido']"></v-text-field>                            

                <v-select v-model="editedItemUsuario.departamento"  :items="deptoOptions"
                         item-title="depto" item-value="depto_id" :readonly="lockField" label="departamento" @update:modelValue="onDepartChange" 
                        :rules="[v => !!v || 'departamento es requerido']"></v-select>                               
             
                <v-select v-model="editedItemUsuario.municipio" :items="munOptions" 
                  item-title="mun" item-value="mun_id" :readonly="lockField" label="Ciudad" return-object
                  :rules="[v => !!v || 'Ciudad es requerido']"></v-select>                          

          </v-container>
        </v-card-text>


    <v-divider></v-divider>

  </v-card>

  <v-card class="mx-auto  mt-4" max-width="700" >
    <v-card-title>
            <span class="text-h5"> Detalles del hecho </span>
      </v-card-title>
        <v-card-text>
          <v-container>     
            

            <v-text-field
          label="Selecciona una fecha"
          v-model="formattedDate"
          @focus="showDatePicker = true"
          readonly
        ></v-text-field>

        <v-date-picker
          v-if="showDatePicker"
          v-model="selectedDate"
          @input="updateDate"
          @blur="showDatePicker = false"
        ></v-date-picker>   
      

                <v-textarea v-model="editedItemUsuario.detalle_hecho" :readonly="lockField" label="detalle_hecho"
                  :rules="[v => !!v || 'detalle_hecho es requerido']"></v-textarea>
           

       <label>Adjuntar documentacion en formato PDF:</label>
      <input type="file" @change="cargarArchivo" />
      <br />
      <label>Adjuntar documentacion en formato Video:</label>
      <input type="file" @change="cargarArchivo" />
      <br />
      <label>Adjuntar documentacion en formato Audio:</label>
      <input type="file" @change="cargarArchivo" />
      <br />
   <v-checkbox

      label="Reserva de identidad ?"      required  
    ></v-checkbox>
             
    
     
    <v-checkbox
     
      label="Estoy de acuerdo que todos mis datos seran tratados con absoluta reserva y confidencialidad por la Inspectoria General y Departamento Nacional de Transparencia de la Policia Boliviana."      required  
    ></v-checkbox>
    <v-checkbox
      
      label="Declaro conocer el ARTICULO 166° (Código Penal).- (ACUSACION Y DENUNCIA FALSA). El que a sabiendas acusare o denunciare como autor o partícipe de un delito de acción pública a una persona que no lo cometió, dando lugar a que se inicie el proceso criminal correspondiente, será sancionado con privación de libertad de uno a tres años. Si como consecuencia sobreviniere la condena de la persona denunciada o acusada, la pena será de privación de libertad de dos a seis años"      required  
    ></v-checkbox>


  </v-container>
        </v-card-text>


    <v-divider></v-divider>



  </v-card>
</v-container>


<v-container>


    <!-- Add New Person Button -->
    <v-btn class="custom-green-btn mt-4" @click="addNewPerson">
      Enviar Denuncia
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
                  <v-text-field v-model="editedItemUsuario.nombres" :readonly="lockField" label="nombres"
                    :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.apellido_pat" :readonly="lockField" label="apellido pat"
                    :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.apellido_mat" :readonly="lockField" label="apellido mat"
                    :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.ci_y_complemento" :readonly="lockField" label="ci_y_complemento"
                    :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.ci_expedido" :items="expedidoOptions" :readonly="lockField"
                    label="ci_expedido" :rules="[v => !!v || 'Nombres es requerido']"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.grado" :items="gradoOptions" 
                            item-title="grado" item-value="grados_sigla" :readonly="lockField" label="grados"  @update:modelValue="onGradoChange" 
                            :rules="[v => !!v || 'grado es requerido']"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.telefono" :readonly="lockField" label="telefono"
                    :rules="[v => !!v || 'telefono es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.email" :readonly="lockField" label="email"
                    :rules="[v => !!v || 'email es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.departamento"  :items="deptoOptions"
                           item-title="depto" item-value="depto_id" :readonly="lockField" label="departamento" @update:modelValue="onDepartChange" 
                          :rules="[v => !!v || 'departamento es requerido']"></v-select>
                    
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.municipio" :items="munOptions" 
                    item-title="mun" item-value="mun_id" :readonly="lockField" label="Ciudad" return-object
                    :rules="[v => !!v || 'Ciudad es requerido']"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.user_login" :readonly="lockField" label="usuario"
                     :rules="[v => !!v || 'usuario es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItemUsuario.password_hash" :readonly="lockField" label="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              hint="Min. 8 caracteres"
            
              name="input-10-1"
              counter
              @click:append="show1 = !show1"
                    
                    
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
              
                  <v-select v-model="editedItemUsuario.rol" :items="rolOptions" 
                  item-title="rol" item-value="roles_sigla" :readonly="lockField" label="rol del usuario" @update:modelValue="onRolChange" 
                  :rules="[v => !!v || 'estado es requerido']"></v-select>
               
  
  
  
  
  
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select v-model="editedItemUsuario.estado" :items="estadoOptions" 
                  item-title="est" item-value="transac" :readonly="lockField" label="Estado del usuario" @update:modelValue="onEstadoChange" 
                  :rules="[v => !!v || 'estado es requerido']"></v-select>
                </v-col>
  
  
              </v-row>
            </v-container>
          </v-card-text>
  
          <v-card-actions v-if="lockField === false">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
            <v-btn class="custom-green-btn" text @click="saveUsuarios"> Guardar </v-btn>
          </v-card-actions>
          <v-card-actions v-else-if="lockField === true">
            <v-spacer></v-spacer>
            <v-btn class="custom-green-btn" text @click="close"> Cerrar </v-btn>
          </v-card-actions>
  
  
        </v-card>
      </v-dialog>
  
    </template>
  
    <template>
  
      <v-snackbar v-model="snackbar.visible" :timeout="2000" :color="snackbar.color"
         :top="'top'"    :vertical="snackbar.mode === 'vertical'"
        :right="'right'"  :multi-line="snackbar.mode === 'multi-line'"
      >
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
      date: new Date('2018-03-02'),
      picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      selectedDate: null, // Para almacenar la fecha seleccionada
      showDatePicker: false, // Para controlar la visibilidad del selector de fecha
  


      page: 1,
      itemsPerPage: 5,
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
      editedItemRolUsu: {
        id:null,
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
          u_rol_id:'',
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
          u_rol_id:'',
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
      this.loading = true;
      //this.username= localStorage.getItem('username');
      this.usuarioList();
      this.deptoList();
      this.gradoList();
      this.loading = false;
      this.rolList();
      this.formattedDate();
    },
  
/*    computed: {
      formattedDate() {
      // Formato de la fecha
      return this.selectedDate ? this.selectedDate.substring(0, 10) : '';
    },
    <v-date-picker elevation="24"  color="primary"  
            v-model="picker"
                :allowed-dates="allowedDates"
                max="2025-03-20"
                min="2016-06-15"></v-date-picker>
      },
      
      
    <vue-recaptcha
        sitekey="TU_SITE_KEY" 
        @verify="onVerify"
        @expired="onExpired"
      ></vue-recaptcha>

      <v-btn type="submit" :disabled="!isCaptchaVerified" color="primary">Registrar</v-btn>

      
      
      */
  
    methods: {
      onVerify(response) {
      this.isCaptchaVerified = true; // CAPTCHA verificado
      console.log("CAPTCHA verificado:", response);
    },
    onExpired() {
      this.isCaptchaVerified = false; // CAPTCHA expirado
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




      formattedDate() {
      // Formato de la fecha
      return this.selectedDate ? this.selectedDate.substring(0, 10) : '';
    },
      updateDate(date) {
      this.selectedDate = date; // Actualiza la fecha seleccionada
      this.showDatePicker = false; // Cierra el selector de fecha
    },

      allowedDates: val => {
        return (
          parseInt(this.$vuetify.date.toISO(val).split('-')[2], 10) % 2 === 0
        )
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
        //this.validationErrors = {};
  
        if (!this.editedItemUsuario.nombres || !this.editedItemUsuario.apellido_pat || !this.editedItemUsuario.apellido_mat) this.validationErrors.nombres = { value: true };
        else delete this.validationErrors.nombres;
  
        if (!this.editedItemUsuario.ci_y_complemento || !this.editedItemUsuario.ci_expedido || !this.editedItemUsuario.grado) this.validationErrors.ci_y_complemento = { value: true };
        else delete this.validationErrors.ci_y_complemento;
  
        if (!this.editedItemUsuario.telefono || !this.editedItemUsuario.email || !this.editedItemUsuario.departamento) this.validationErrors.telefono = { value: true };
        else delete this.validationErrors.telefono;
  
        if (!this.editedItemUsuario.municipio || !this.editedItemUsuario.user_login || !this.editedItemUsuario.password_hash) this.validationErrors.municipio = { value: true };
        else delete this.validationErrors.municipio;
  
        if (!this.editedItemUsuario.rol || !this.editedItemUsuario.estado) this.validationErrors.rol = { value: true };
        else delete this.validationErrors.rol;
  
  
        return !Object.keys(this.validationErrors).length;
      },
  
      usuariosRolUpdate(){
            this.editedItemRolUsu.id = this.editedItemUsuario.u_rol_id==='' ? this.editedItemRolUsu.id  : this.editedItemUsuario.u_rol_id;
            this.editedItemRolUsu.usuarios_id = this.editedItemUsuario.id;
            this.editedItemRolUsu.roles_sigla = this.editedItemUsuario.roles_sigla;
            this.editedItemRolUsu.descripcion = 'Cambio de rol';
            this.editedItemRolUsu.estado = 'ACTIVO';
            this.editedItemRolUsu.transaccion = 'MODIFICAR';
            this.editedItemRolUsu.usu_mod = this.username;
            this.editedItemRolUsu.fec_mod = new Date();
  
          
            UsuariosRol.UsuariosRolUpdate(this.editedItemRolUsu.id , JSON.stringify(this.editedItemRolUsu))
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
            this.editedItemRolUsu.descripcion = 'Asignaion de rol';
            this.editedItemRolUsu.estado = 'ACTIVO';
            this.editedItemRolUsu.transaccion = 'ACTIVAR';
            this.editedItemRolUsu.usu_cre = this.username;
  
          UsuariosRol.UsuariosRolCreate(JSON.stringify(this.editedItemRolUsu))
              .then((response) => {
  
                if (response.status === 201) {
                
                  this.editedItemUsuario.u_rol_id= response.data.id;
                  this.editedItemRolUsu.id= response.data.id;
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
         } ,
  
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
  
          // if( this.editedItemUsuario && this.editedItemUsuario ){
          // const dateParts = (form.value.fecha || '').split("/");      
          // fec_ejecucion:   new Date(dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]).toISOString(), // form.value.fecha,        
  
          this.editedItemUsuario.mun_id = this.editedItemUsuario.municipio.mun_id ? this.editedItemUsuario.municipio.mun_id : this.editedItemUsuario.mun_id;
  
          console.log('editedItemUsuario 2 : ', JSON.stringify(this.editedItemUsuario));
  
          if (this.editedIndex > -1) {   // Update person
  
     
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
  
                  this.editedItemUsuario.id= response.data.id;
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
        this.editedItemUsuario = Object.assign({}, this.defaultItem)
        this.dialog = true
  
  
      },
  
      editItem(item) {
        this.editedIndex = this.people.indexOf(item)
        this.editedItemUsuario = Object.assign({}, item)
        this.dialog = true
        this.lockField = false
      },
  
      viewItem(item) {
        //this.editedIndex = this.people.indexOf(item)
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
          this.editedItemUsuario = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItemUsuario = Object.assign({}, this.defaultItem)
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
        this.editedItemUsuario = Object.assign({}, this.defaultItem)
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
    background-color: #849C58;   /* #073d09    cambio a color verde oscuro  */
    /* Verde */
    color: white;
    /* Texto en blanco */
  }
  
  
  .v-data-table .v-table__wrapper>table>thead>tr>td,
  .v-data-table .v-table__wrapper>table>thead>tr th,
  .v-data-table .v-table__wrapper>table tbody>tr>td,
  .v-data-table .v-table__wrapper>table tbody>tr th {
    background: #849C58 !important;   /* #073d09    cambio a color verde oscuro  */
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
  
   */</style>