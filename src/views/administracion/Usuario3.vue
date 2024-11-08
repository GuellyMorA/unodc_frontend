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
      <v-btn @click="openCreateModal" color="primary">Adicionar Persona</v-btn>
      <person-table
        :people="filteredPeople"
        @edit="openEditModal"
        @view="openViewModal"
        :page.sync="page"
        :items-per-page.sync="itemsPerPage"
      ></person-table>
      <edit-modal v-if="editModalVisible" :person="selectedPerson" @close="closeEditModal" @success="showToast"></edit-modal>
      <view-modal v-if="viewModalVisible" :person="selectedPerson" @close="closeViewModal"></view-modal>
      <create-modal v-if="createModalVisible" @close="closeCreateModal" @success="showToast"></create-modal>
      <toast-notification v-if="toastVisible" :message="toastMessage" @close="toastVisible = false"></toast-notification>
    </v-container>
  </v-app>
</template>

<script>
import PersonTable from './PersonTable.vue';
import EditModal from './EditModal.vue';
import ViewModal from './ViewModal.vue';
import CreateModal from './CreateModal.vue';
import ToastNotification from './ToastNotification.vue';

export default {
  components: {
    PersonTable,
    EditModal,
    ViewModal,
    CreateModal,
    ToastNotification,
  },
  data() {
    return {
      people: this.generatePeople(20),
      selectedPerson: null,
      search: '',
      page: 1,
      itemsPerPage: 5,
      editModalVisible: false,
      viewModalVisible: false,
      createModalVisible: false,
      toastVisible: false,
      toastMessage: '',
    };
  },
  computed: {
    filteredPeople() {
      return this.people.filter((/** @type {any} */ person) => {
        // @ts-ignore
        return Object.values(person).some((/** @type {any} */ val) =>
          String(val).toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {

    /**
* @param {number} count
*/
    generatePeople(count) {
      const data = [];
      for (let i = 1; i <= count; i++) {
        data.push({
          id: i,
          apellidoPaterno: `ApellidoPaterno${i}`,
          apellidoMaterno: `ApellidoMaterno${i}`,
          nombres: `Nombre${i}`,
          estado: 'Activo',
          rol: 'User',
          dni: `1234567${i}`,
          grado: 'Licenciado',
          mail: `usuario${i}@mail.com`,
          departamento: 'IT',
          ciudad: 'Lima',
          usuario: `usuario${i}`,
          contraseña: `contraseña${i}`,
        });
      }
      return data;
    },
    /**
* @param {null} person
*/
    openEditModal(person) {
      this.selectedPerson = person;
      this.editModalVisible = true;
    },
    closeEditModal() {
      this.editModalVisible = false;
    },
    /**
* @param {null} person
*/
    openViewModal(person) {
      this.selectedPerson = person;
      this.viewModalVisible = true;
    },
    closeViewModal() {
      this.viewModalVisible = false;
    },
    openCreateModal() {
      this.createModalVisible = true;
    },
    closeCreateModal() {
      this.createModalVisible = false;
    },
    /**
* @param {string} message
*/
    showToast(message) {
      this.toastMessage = message;
      this.toastVisible = true;
    },
  },
};
</script>

<style>
</style>
