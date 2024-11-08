<template>
   <!-- Search Field -->
  <v-text-field v-model="search" class="pa-2" label="Buscar Usuario" append-icon="mdi-magnify" single-line
    hide-details></v-text-field>

     <!-- Data Table -->
  <v-data-table :headers="headers" :items="filteredItems"
    :sort-by="[{ key: 'num', order: 'asc' }, { key: 'apellido_pat', order: 'desc' }]" class="custom-table" :search="search"
    v-model:page="page" :items-per-page="itemsPerPage"   >


    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title >Usuarios del sistema</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>


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
    
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>

    </template>
  </v-data-table>

    <!-- Add New Person Button -->
    <v-btn
            class="custom-green-btn mt-4"
          
            @click="addNewPerson"
          >
            Adicionar Usuario
    </v-btn>
 
   

  <template>
    <!-- Edit Dialog -->
      <v-dialog v-model="dialog" max-width="500px">
     
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.nombres" :readonly="lockField" label="nombres" :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.apellido_pat"  :readonly="lockField" label="apellido pat"  :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.apellido_mat"  :readonly="lockField" label="apellido mat"  :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.ci_y_complemento"  :readonly="lockField" label="ci_y_complemento"  :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                  v-model="editedItem.ci_expedido"  :items="expedidoOptions"  :readonly="lockField" label="ci_expedido"  :rules="[v => !!v || 'Nombres es requerido']"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select 
                  v-model="editedItem.grados_sigla"  :items="gradoOptions" :readonly="lockField" label="grados" :rules="[v => !!v || 'grado es requerido']"
                   ></v-select>
                  </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.telefono"  :readonly="lockField" label="telefono" :rules="[v => !!v || 'telefono es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.email"  :readonly="lockField" label="email" :rules="[v => !!v || 'email es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                   v-model="editedItem.departamento"  :items="departOptions" :readonly="lockField" label="departamento" :rules="[v => !!v || 'departamento es requerido']"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select  
                      v-model="editedItem.ciudad"  :items="ciudadOptions" :readonly="lockField" label="ciudad" :rules="[v => !!v || 'ciudad es requerido']"
                  ></v-select>
                  </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.user_login"  :readonly="lockField" label="user_login" :rules="[v => !!v || 'user es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.password_hash"  :readonly="lockField" label="password_hash" :rules="[v => !!v || 'password es requerido']"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-select
                   v-model="editedItem.estado" :items="estadoOptions"  :readonly="lockField" label="Estado del usuario" :rules="[v => !!v || 'estado es requerido']"
                   ></v-select>  
              </v-col>


              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions v-if="lockField === false">
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
            <v-btn class="custom-green-btn" text @click="save"> Guardar </v-btn>
          </v-card-actions>
          <v-card-actions v-else-if="lockField === true">
            <v-spacer></v-spacer>
            <v-btn class="custom-green-btn" text  @click="close"> Cerrar </v-btn>
          </v-card-actions>


        </v-card>
      </v-dialog>

    </template>

    <template>
          <!-- Snackbar -->
        <v-snackbar v-model="snackbar.visible" :timeout="3000" :color="snackbar.color">
            {{ snackbar.message  }}
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar.visible = false"
              >
                Cerrar
              </v-btn>
            </template>
          </v-snackbar>
    </template> 

</template>


<script>
import Usuario from '@/services/Usuario';
import { toast } from 'vue3-toastify';


export default {

  data: () => ({
    page: 1,
    itemsPerPage: 5,
    search: '',
    dialog: false,
    dialogDelete: false,
    // sortBy: ['calories'], // Ensure this is an array or an object with a 'find' method
    username: null ,
    lockField: false,

    headers: [
      {
        title: 'Num',
        align: 'start',
        sortable: false,
        key: 'num',
      },
      { title: 'CI', key: 'ci_y_complemento' },
      { title: 'Grado', key: 'grados_sigla' },
      { title: 'Ap. Paterno', key: 'apellido_pat' },
      { title: 'Ap. Materno', key: 'apellido_mat' },
      { title: 'Nombres', key: 'nombres' },
      { title: 'Rol Asignado', key: 'roles_sigla' },
      { title: 'Estado', key: 'estado' },

      { title: 'Actions', value: 'actions', sortable: false },
    ],
    people: [],
    editedIndex: -1,
    
    // ... propiedades del formulario 
        editedItem: {
          nombres: '',
          apellido_pat: '',
          apellido_mat: '',
          ci_y_complemento: '', 
          ci_expedido: '',
          grados_sigla: '',          
          email: '',
          departamento: '',
          ciudad: '',
          user_login: '',
          roles_sigla: '',
          password_hash: '',
          telefono: '',
          estado: ''
        },  

        defaultItem: {
          nombres: '',
          apellido_pat: '',
          apellido_mat: '',
          ci_y_complemento: '', 
          ci_expedido: '',
          grados_sigla: '',          
          email: '',
          departamento: '',
          ciudad: '',
          user_login: '',
          roles_sigla: '',
          password_hash: '',
          telefono: '',
          estado: ''
        },
        viewedItem: {},
    

        viewDialog: false,
 
        snackbar: {
                    visible: false,
                    message: '',
                    color: '',
                  },
        expedidoOptions: ['LP', 'CH', 'SC', 'CBBA', 'OR'],
        gradoOptions: ['Capitan', 'Teniente', 'Sargento 1ro', 'Sin Grado'],
        departOptions: ['Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],
        ciudadOptions: ['El Alto','Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],
        estadoOptions: ['ACTIVO', 'INACTIVO'],
  }),

  mounted() {
   username : localStorage.getItem('username');
   this.listItem () ;
   
  },

  methods: {
 
      async listItem (){ 
        Usuario.listByFkUsuario(0)
        .then( (response) => {
            console.log("response  : ", response.data, response.status);
            if(response.status === 200){
              this.people = response.data;  
            } else {
                this.showSnackbar('Error recuperando Usuario ' + response, 'red');
            }
          })
        .catch(e => {
          console.log(e);
        });
      },

      addNewPerson () {
              this.editedIndex = -1
              this.editedItem = Object.assign({}, this.defaultItem)
              this.dialog = true


            },

      editItem (item) {
              this.editedIndex = this.people.indexOf(item)
              this.editedItem = Object.assign({}, item)
              this.dialog = true
              this.lockField= false
            },

      viewItem (item) {
        //this.editedIndex = this.people.indexOf(item)
              this.editedItem = Object.assign({}, item)
              this.dialog = true
              this.lockField= true
            },

   


      deleteItem(item) {
          this.editedIndex = this.people.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },

      deleteItemConfirm() {
          this.people.splice(this.editedIndex, 1)
          this.closeDelete()
      },



      closeDelete() {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },

      close () {
              this.dialog = false
              this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
              })
            },

      closeView () {
              this.viewDialog = false
              this.viewedItem = {}
        },

      cancelEdit() {
          this.resetForm();
        },
      resetForm() {
          this.editedItem =Object.assign({}, this.defaultItem)
          this.editedIndex = -1
          this.dialog = false
          //this.editingUserId = null;
        },
      save () {
        try {
            if (this.editedIndex > -1) {   // Update person
                Object.assign(this.people[this.editedIndex], this.editedItem)
                this.showSnackbar('Usuario modificado correctamente!', 'green')
                     this.close()
              } else {  // Add new person
              this.people.push(this.editedItem);

          /*   Usuario.usuarioCreate(this.editedItem)
              .then( (response) => {
                  console.log("response  : ",  response.status, response);
                  if(response.status === 200){
                    this.people = response.data;  
                    
                    this.showSnackbar('Usuario saved successfully!', 'green')
                     this.close()
                  } else {
                    this.showSnackbar('Error creating Usuario ' + response, 'red');
                      
                  }
                })
              .catch(e => {
                console.log(e);
              });
*/
this.showSnackbar('Usuario creado correctamente!', 'green')
                     this.close()
            }
            
        } catch (error) {
                this.showSnackbar('Error creating Usuario', 'red');
            }    
                   
      
      
      },

        /**
* @param {string} message
* @param {string} color
*/
        showSnackbar(message, color) {
          this.snackbar.message = message;
          this.snackbar.color = color;
          this.snackbar.visible = true;
        }
},

  computed: {
    formTitle () {
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

  created() {
   // this.initialize()
    //this.listByFkUsuario () 
  },

 
}
</script>


<style>
.custom-green-btn {
  background-color: #4CAF50; /* Verde */
  color: white; /* Texto en blanco */
}


.custom-table .header-cell  {
  background-color: #4CAF50; /* Cambia a tu color deseado */
  color: white; /* Cambia el color del texto a blanco si es necesario */
}

.custom-table .v-data-table-header th {
 font-weight: bold; /* Opcional, para hacer el texto más destacable */
}

</style>