<template>
    <v-data-table
      :headers="headers"
      :items="people"
      class="elevation-1"
      item-key="id"
      :pagination.sync="pagination"
      :items-per-page="itemsPerPage"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Lista de Personas</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
       
      </template>
    </v-data-table>
  </template>
  
  <script>
  export default {
    props: ['people', 'itemsPerPage', 'page'],
    data() {
      return {
        headers: [
          { text: 'Apellido Paterno', value: 'apellidoPaterno' },
          { text: 'Apellido Materno', value: 'apellidoMaterno' },
          { text: 'Nombres', value: 'nombres' },
          { text: 'Estado', value: 'estado' },
          { text: 'Rol', value: 'rol' },
          { text: 'DNI', value: 'dni' },
          { text: 'Grado', value: 'grado' },
          { text: 'Mail', value: 'mail' },
          { text: 'Departamento', value: 'departamento' },
          { text: 'Ciudad', value: 'ciudad' },
          { text: 'Usuario', value: 'usuario' },
          { text: 'Contraseña', value: 'contraseña' },
          { text: 'Acciones', value: 'actions', sortable: false },
        ],
        pagination: {
          page: this.page,
          rowsPerPage: this.itemsPerPage,
        },
      };
    },
    watch: {
      page(newPage) {
        this.pagination.page = newPage;
      },
      itemsPerPage(newItemsPerPage) {
        this.pagination.rowsPerPage = newItemsPerPage;
      },
    },
  };
  </script>
  