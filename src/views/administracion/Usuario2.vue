<template>
  <v-app>
    <v-container>
      <h1>Lista de Personas</h1>
      <v-text-field
        v-model="search"
        label="Buscar"
        append-icon="mdi-magnify"
        single-line
        hide-details
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="filteredItems"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="viewItem(item)"
          >
            mdi-eye
          </v-icon>
        </template>

        <template v-slot:item.departamento="{ item }">
            <v-select :items="departamentos" v-model="item.departamento" />
          </template>
          <template v-slot:item.ciudad="{ item }">
            <v-select :items="ciudades" v-model="item.ciudad" />
          </template>

      </v-data-table>
      <v-pagination
          v-model="page"
          :length="totalPages"
        ></v-pagination>

      <v-btn @click="addItem">Agregar Persona</v-btn>

      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Cancelar
            </v-btn>
            <v-btn color="blue darken-1" text @click="save">
              Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Apellido Paterno', value: 'apellidoPaterno' },
        // ... otros encabezados
      ],
      items: [ {apellidoPaterno:'Burgos'},{apellidoPaterno:'Cuellar'}        // ... tus datos
      ],
      dialog: false,
      formTitle: '',
      editedItem: {
        // ... propiedades del formulario
      },
      // ... otros datos
      page: 1,
      
      departamentos: ['Lima', 'Arequipa', 'Trujillo'],
      ciudades: ['Miraflores', 'San Isidro', 'Pueblo Libre'],
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        return Object.keys(item).some((key) => {
          return String(item[key]).toLowerCase().includes(this.search.toLowerCase());
        });
      });
    },
    paginatedItems() {
        const start = (this.page - 1) * 5;
        return 1; //this.filteredItems.slice(start, start + 5);
      },
      totalPages() {
        return 1; // Math.ceil(this.filteredItems.length / 5);
      }
  },
  methods: {
    editItem(item) {
      this.editedItem = { ...item };
      this.formTitle = 'Editar Persona';
      this.dialog = true;
    },
    viewItem(item) {
      // ... mostrar modal de consulta
    },
    addItem() {
      this.editedItem = {};
      this.formTitle = 'Agregar Persona';
      this.dialog = true;
    },
    save() {
      // ... lógica para guardar o actualizar la persona
      this.dialog = false;
    }
  }
}
</script>