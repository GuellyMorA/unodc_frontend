<template>
  <v-container class="pa-5" >
    <div ref="popupContent"> 
    <v-card>
      <v-card-title class="text-center">
        <v-container>
        <h3>FORMULARIO DE DENUNCIA MG-UTLCC No. {{ denPerDnte.cod_denuncia }}</h3>
      
          </v-container>
      </v-card-title>

      <v-card-text>
        <v-container>
           
          <v-row>
            <v-col class="p-0 py-0 px-0" cols="4">
          </v-col>  
            <v-col class="p-0 py-0 px-0 mb-2" cols="4">
            <label class="text-h5">Datos del Denunciante  </label>
        
          </v-col>    
          </v-row>
          <!-- Datos del denunciante -->
          <v-row>
        
              
              
              <h3 class="p-0 py-3 px-2 ">Nombres y apellidos:</h3>
              <v-text-field
                label="Nombres y apellidos"
                placeholder="Nombre del denunciante"
                outlined
              ></v-text-field>
          
          </v-row>
          <v-row>
              
              <h3 class="p-0 py-3 px-2 ">Carnet de identidad:</h3>
       
              <v-text-field
                label="Carnet de identidad"
                placeholder="CI"
                outlined
              ></v-text-field>
     
              
              <h3 class="p-0 py-3 px-2 ml-4">Ciudad:</h3>
      
              <v-text-field
                label="Ciudad"
                placeholder="Ciudad"
                outlined
              ></v-text-field>
          </v-row>

          <v-row>
                   
              <h3  class="p-0 py-3 px-2">Correo electrónico:</h3>
        
              <v-text-field
                label="Correo electrónico"
                placeholder="Correo electrónico"
                outlined
              ></v-text-field>        
              
              <h3 class="p-0 py-3 px-2 ml-4">Teléfono:</h3>
            
              <v-text-field
                label="Teléfono"
                placeholder="Teléfono"
                outlined
              ></v-text-field>
         
          </v-row>

          <!-- Checkbox: Denuncia anónima -->
          <v-row>
            <v-col class="p-0 py-4 px-0" cols="4">
                <!-- Primera columna -->
                <h3 class="p-0 py-0 px-0 ml-16">Denuncia anónima :</h3>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="1">
                <v-checkbox  v-model="denPerDnte.reserva_identidad_si" :readonly="lockField"
                  label="Si"></v-checkbox>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="2">
                <v-checkbox  v-model="denPerDnte.reserva_identidad_no" :readonly="lockField"
                  label="No"></v-checkbox>
              </v-col>
          </v-row>
          <v-row>
          <v-col class="p-0 py-4 px-0" cols="4">
                <!-- Primera columna -->
                <h3>Solicita reserva de identidad :</h3>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="1">
                <v-checkbox  v-model="denPerDnte.reserva_identidad_si" :readonly="lockField"
                  label="Si"></v-checkbox>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="2">
                <v-checkbox  v-model="denPerDnte.reserva_identidad_no" :readonly="lockField"
                  label="No"></v-checkbox>
              </v-col>

            </v-row>
      
          <!-- Datos del denunciado -->
          <v-row>
            <v-col class="p-0 py-0 px-0" cols="4">
          </v-col>  
            <v-col class="p-0 py-0 px-0 mb-2" cols="4">
            <label class="text-h5 ">Datos del Denunciado(s)  </label>
          </v-col>    
          </v-row>
          <v-row>
            <v-col class="p-0 py-3 px-0" cols="4">
              
              <h3>Nombres y apellidos denunciado(s):</h3>
                </v-col>
            <v-col cols="8" class="p-0 py-0 px-0">
              <v-text-field
                label="Nombres y apellidos del denunciado"
                placeholder="Nombres del denunciado"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <h3 class="p-0 py-3 px-0 ">Dirección General:</h3>
              <v-text-field
                label="Dirección General"
                placeholder="Dirección General"
                outlined
              ></v-text-field>
              <h3 class="p-0 py-3 px-2 ml-4">Unidad:</h3>
              <v-text-field
                label="Unidad"
                placeholder="Unidad"
                outlined
              ></v-text-field>
            </v-row>
          <v-row>
              <h3 class="p-0 py-3 px-0">Cargo que ocupa:</h3>
              <v-text-field
                label="Cargo que ocupa"
                placeholder="Cargo que ocupa"
                outlined
              ></v-text-field>
        
          </v-row>

          <!-- Hechos en los que se basa la denuncia -->
          <v-row>
            <v-col class="p-0 py-0 px-0" cols="4">
          </v-col> 
            <v-col class="p-0 py-0 px-0 mb-4" cols="8">
            <label class="text-h5">Hechos en los que se basa la denuncia  </label>
        
          </v-col>    
          </v-row>
          <v-row>
            <h3 class="p-0 py-3 px-0">¿Quién o quienes habrían incurrido?:</h3>
              <v-textarea
                label="¿Quién o quienes habrían incurrido?"
                placeholder="Describa los hechos"
                outlined    rows="2" cols="1" 
              ></v-textarea>
          
          </v-row>

          <!-- Documentos adjuntos -->
          <v-row>
                 <v-col class="p-0 py-0 px-0" cols="4">
          </v-col> 
            <v-col class="p-0 py-0 px-0" cols="8">
            <label class="text-h5">Documentación adjunta acompaña pruebas
                   </label>
        
          </v-col>    
          </v-row>
          <v-row>
            <v-col class="p-0 py-4 px-0" cols="4">
              
            <h3>Documentos adjuntos:</h3>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="1">
                <v-checkbox  v-model="denPerDnte.reserva_identidad_si" :readonly="lockField"
                  label="Si"></v-checkbox>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="2">
                <v-checkbox  v-model="denPerDnte.reserva_identidad_no" :readonly="lockField"
                  label="No"></v-checkbox>
              </v-col>
            </v-row>
          <v-row>
            <h3 class="p-0 py-3 px-2 ">Número de hojas:</h3>
              <v-text-field
                label="Número de hojas"
                placeholder="Número de hojas"
                outlined
              ></v-text-field>
         
          </v-row>
          <v-row>

            <v-col class="p-0 py-4 px-0" cols="4">
              
              <h3>Clase de documentos:</h3>
                </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-checkbox label="Fotocopia" />
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-0">
              <v-checkbox label="Original" />
            </v-col>
          </v-row>

          <!-- Otro tipo de pruebas -->
          <v-row>
            <h3 class="p-0 py-3 px-0">Otro tipo de pruebas:</h3>
              <v-textarea
                label="Otro tipo de pruebas"
                placeholder="Detalles de pruebas adicionales"
                outlined   rows="2" cols="1" 
              ></v-textarea>
           
          </v-row>

          <!-- Firma y fecha -->
          <v-row>
            <h3 class="p-0 py-3 px-0">Firma:</h3>
              <v-text-field
                label="Firma"
                placeholder="Firma"
                outlined
              ></v-text-field>
              <h3 class="p-0 py-3 px-2 ml-4">Fecha:</h3>
              <v-text-field
                label="Fecha"
                placeholder="Fecha"
                outlined
              ></v-text-field>
     
          </v-row>

          <!-- Responsable de admisión -->
          <v-row>
           
              <h3 class="p-0 py-3 px-0">Responsable de admisión:</h3>
              <v-text-field
                label="Responsable de admisión"
             s
                outlined
              ></v-text-field>
     
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Botón de Enviar -->
      <v-card-actions >
          <v-spacer></v-spacer>
                 <v-btn class="custom-green-btn"  @click="downloadPDF">Exportar a PDF</v-btn>
      
          <v-btn class="custom-green-btn" text @click="close"> Cerrar </v-btn>
      
        </v-card-actions>
    </v-card>
    </div>
 </v-container>
</template>

<script>
import { toast } from 'vue3-toastify';
import Denuncia from '@/services/Denuncia';
import NivelGeografico from '@/services/NivelGeografico';
import Grado from '@/services/Grado';
import Rol from '@/services/Rol';
import Denunciado from '@/services/Denunciado';
import { downloadFile } from '../../utils/fileDownloader';
import DocumentosPath from '@/services/DocumentosPath';
import Usuario from '@/services/Usuario';
import Seguimiento from '@/services/Seguimiento';
import Actividad from '@/services/Actividad';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default {
  name: "FormularioDenuncia",
  data: () => ({

loading: true,
isLoading: false,
files1: [{ id: 1, name: 'archivo1.pdf' }, { id: 2, name: 'imagen.jpg' }],

files:[], 
fileTypes: [
    { label: 'Cargar Fotos (JPEG/PNG)', accept: 'image/jpeg,image/png,image/bmp' },
    { label: 'Cargar PDF', accept: 'application/pdf' },
   // { label: 'Cargar Texto (TXT)', accept: 'text/plain' },
  //  { label: 'Cargar Archivo de Word', accept: '.doc,.docx' },
    //{ label: 'Cargar Archivo de Excel', accept: '.xls,.xlsx' },
    { label: 'Cargar Archivo de Video', accept: 'video/*' },
    { label: 'Cargar Archivo de Audio', accept:  'audio/*' },
],
multipleFiles: [],




page: 1,
itemsPerPage:10,
search: '',
dialog: false,
dialog2: false,
dialog3: false,

dialogDelete: false,
// sortBy: ['calories'], // Ensure this is an array or an object with a 'find' method
username: localStorage.getItem('username'),
userId: localStorage.getItem('usuario_id'),
rol: localStorage.getItem('rol'),
deptoId: localStorage.getItem('depto_id'),
//  arrayOper:  JSON.parse(localStorage.getItem('menu_operaciones')),

//    this.arrayOper,this.menuModulo, this.moduloOperaciones) 
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



people: [],
editedIndex: -1,
codDenuncia: '',

// propiedades del formulario 
denPerDnte: {
  fila: '',
  id: null,
  denuncia_personas_id:0,
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
  seg_id: '', //  seguimiento id
  gestor_id: null,  //  usuarios_id

  apellido_pat_gestor: '',
  apellido_mat_gestor: '',
  nombres_gestor: '',
  gestor_seguimiento: '',
observacion: '',
  fec_registro: '',

  actividades_id: '',
  actividad: '',
  actividad_sigla: '',
  
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
    
seguimiento: {
  fila: '',
  denuncia_personas_id: 0,
  usuarios_id: null,  
  gestor_id:null,
  cod_denuncia: '',
  tipo_personas: '',
  sigla: '',
  lugar_hecho: '',
  depto_id: '',
  departamento: '',
  mun_id: '',
  municipio: '',

  fec_registro_hecho: '',
  hora_registro_hecho: '',
  detalle_hecho: '',
  reserva_identidad: '',
  reserva_identidad_si: '',
  reserva_identidad_no: '',
  denuncia_anonima: '',

  seg_id: '',
  observacion: '',
  fec_registro: '',
  
  apellido_pat_gestor: '',
  apellido_mat_gestor: '',
  nombres_gestor: '',
  gestor_seguimiento: '',

  
  actividades_id: '',
  actividad: '',
  actividad_sigla: '',
  descripcion: '',
  actividad_tipo: '',
  tiempo_respuesta: '',

  estado: '',
  transaccion: '',
  usu_cre: null,
  fec_cre: null,
  usu_mod: null,
  fec_mod: null,
},
seguimientosArray: [],




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
denunciadosArray: [],
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
  { sexo: 'FEMENINO', sexo_sigla: 'F' },
  { sexo: 'OTRO', sexo_sigla: 'O' }
],

expedidoOptions: ['LP', 'CH', 'SC', 'CBBA', 'OR'],
gradoOptions: [], // ['Capitan', 'Teniente', 'Sargento 1ro', 'Sin Grado'],
rolOptions: [],
validationErrors: {},

selectedDeptoId: null,    // Código del país seleccionado
selectedProvinceCode: 0,    // Código de la provincia seleccionada
departamentos: [{}],
deptoOptions: [{}],
munOptions: [{}], //['El Alto', 'Chuquisaca', 'La Paz', 'Santa Cruz', 'Cochabamba'],


estadoOptions: [{ est: 'SOLICITADO', transac: 'CREAR' }, { est: 'ASIGNADO', transac: 'DERIVAR' }
  , { est: 'ACEPTADO', transac: 'ACEPTAR' }, { est: 'RECHAZADO', transac: 'RECHAZAR' }
  , { est: 'ABSUELTO', transac: 'ABSOLVER' }, { est: 'SANCIONADO', transac: 'SANCIONAR' }],

gestorOptions: [],
actividadOptions: [],

}),

  methods: {
  
    downloadPDF() {
      const popupContent = this.$refs.popupContent;

      html2canvas(popupContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190; // Ajusta el ancho de la imagen, si es necesario
        const pageHeight = pdf.internal.pageSize.height;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Añade la imagen al PDF
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Si la imagen es más larga que una página, hay que añadir más en páginas nuevas
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('download.pdf'); // Nombre del archivo PDF
      });
    },
    close() {
      this.dialog = false;
      this.dialog2 = false;
      this.dialog3 = false;
     

      this.$nextTick(() => {
        this.denPerDnte = Object.assign({}, this.defaultItemUsu)
        this.editedIndex = -1
      })
    },
  }
};
</script>

<style scoped>
/* Estilos personalizados si son necesarios */
</style>
