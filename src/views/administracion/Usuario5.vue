<template>
  <!-- Search Field -->
 <v-text-field v-model="search" class="pa-2" label="Buscar" append-icon="mdi-magnify" single-line
   hide-details></v-text-field>

    <!-- Data Table -->
 <v-data-table :headers="headers" :items="filteredItems"
   :sort-by="[{ key: 'calories', order: 'asc' }, { key: 'fat', order: 'desc' }]" class="elevation-1" :search="search"
   v-model:page="page" :items-per-page="itemsPerPage">
   <template v-slot:top>
     <v-toolbar flat>
       <v-toolbar-title>My CRUD</v-toolbar-title>
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
     <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
     <v-icon small @click="viewItem(item)"> mdi-delete </v-icon>
   </template>
   
   <template v-slot:bottom>
     <div class="text-center pt-2">
       <v-pagination v-model="page" :length="pageCount"></v-pagination>
     </div>

   </template>
 </v-data-table>

   <!-- Add New Person Button -->
   <v-btn
           color="primary"
           class="mt-4"
           @click="addNewPerson"
         >
           Add New Person
         </v-btn>

  

 <template>
   <!-- Edit Dialog -->
     <v-dialog v-model="dialog" max-width="500px">
        <!--  <template v-slot:activator="{ on, attrs }">
         <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on:click="addNewPerson">
           New Item ok
         </v-btn>

       </template>  -->
       <v-card>
         <v-card-title>
           <span class="text-h5">{{ formTitle }}</span>
         </v-card-title>

         <v-card-text>
           <v-container>
             <v-row>
               <v-col cols="12" sm="6" md="4">
                 <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
               </v-col>
               <v-col cols="12" sm="6" md="4">
                 <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
               </v-col>
               <v-col cols="12" sm="6" md="4">
                 <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
               </v-col>
               <v-col cols="12" sm="6" md="4">
                 <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
               </v-col>
               <v-col cols="12" sm="6" md="4">
                 <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
               </v-col>
             </v-row>
           </v-container>
         </v-card-text>

         <v-card-actions>
           <v-spacer></v-spacer>
           <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
           <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
         </v-card-actions>
       </v-card>
     </v-dialog>

   </template>

   <template>
         <!-- Snackbar -->
       <v-snackbar v-model="snackbar" :timeout="3000">
           {{ snackbarText }}
           <template v-slot:action="{ attrs }">
             <v-btn
               color="blue"
               text
               v-bind="attrs"
               @click="snackbar = false"
             >
               Close
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
   people:  this.listByFkUsuario () ,
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
       departments: ['IT', 'HR', 'Finance', 'Marketing', 'Operations'],
       cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
   //formTitle: '',
       viewDialog: false,
       snackbar: false,
       snackbarText: '',
 }),

 onMounted: {
  // username : localStorage.getItem('username'),
  async listByFkUsuario (){ //async() => { 
     const res =  Usuario.listByFkUsuario(0);
       if(res.data && res.data.length > 0){
         this.people.value = res.data;  
       }
  
 },

 computed: {
   formTitle () {
         return this.editedIndex === -1 ? 'New Person' : 'Edit Person'
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

/* created() {
  // this.initialize()
   this.listByFkUsuario () 
 },*/

 methods: {
   /*  initialize() {
       this.people = [
         {
           name: 'Frozen Yogurt',
           calories: 159,
           fat: 6.0,
           carbs: 24,
           protein: 4.0,
         },
         {
           name: 'Ice cream sandwich',
           calories: 237,
           fat: 9.0,
           carbs: 37,
           protein: 4.3,
         },
         {
           name: 'Eclair',
           calories: 262,
           fat: 16.0,
           carbs: 23,
           protein: 6.0,
         },
         {
           name: 'Cupcake',
           calories: 305,
           fat: 3.7,
           carbs: 67,
           protein: 4.3,
         },
         {
           name: 'Gingerbread',
           calories: 356,
           fat: 16.0,
           carbs: 49,
           protein: 3.9,
         },
         {
           name: 'Jelly bean',
           calories: 375,
           fat: 0.0,
           carbs: 94,
           protein: 0.0,
         },
         {
           name: 'Lollipop',
           calories: 392,
           fat: 0.2,
           carbs: 98,
           protein: 0,
         },
         {
           name: 'Honeycomb',
           calories: 408,
           fat: 3.2,
           carbs: 87,
           protein: 6.5,
         },
         {
           name: 'Donut',
           calories: 452,
           fat: 25.0,
           carbs: 51,
           protein: 4.9,
         },
         {
           name: 'KitKat',
           calories: 518,
           fat: 26.0,
           carbs: 65,
           protein: 7,
         },
      ]
     },   */

      /* async listByFkUsuario (){ //async() => { 
     const res =  Usuario.listByFkUsuario(0);
       if(res.data && res.data.length > 0){
         this.people.value = res.data;  
       }
   
         const res = await Usuario.listByFkUsuario(0).then((data) => {
           console.log("data : ", data.data, data.status);
           if(data.status === 200){
            //this.people.value = data.data;  
            return data.data; 
           } else {
               toast.error('Indicadores no encontrados', {
                   autoClose: 3000,
                   position: toast.POSITION.TOP_RIGHT,
               });
           }
         });
  */
     },




     editItem (item) {
             this.editedIndex = this.people.indexOf(item)
             this.editedItem = Object.assign({}, item)
             this.dialog = true
           },

     viewItem (item) {
             this.viewedItem = Object.assign({}, item)
             this.viewDialog = true
           },

     addNewPerson () {
             this.editedIndex = -1
             this.editedItem = Object.assign({}, this.defaultItem)
             this.dialog = true
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

     save () {
             if (this.editedIndex > -1) {
               Object.assign(this.people[this.editedIndex], this.editedItem)
             } else {
               this.people.push(this.editedItem)
             }
             this.showSnackbar('Person saved successfully!')
             this.close()
       },

     showSnackbar (text) {
             this.snackbarText = text
             this.snackbar = true
       }
 },
}
</script>
