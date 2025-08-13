<template>
  <!--  Data Table -->
  <v-alert v-if="loading" type="info" dismissible>
    Cargando datos...
  </v-alert>

  <v-row >
    <v-col cols="6" class="p-0 py-0 px-1">
     <!-- Search Field -->
      <v-text-field v-model="search" class="pa-2" label="Buscar Denuncia" append-icon="mdi-magnify" single-line
        hide-details></v-text-field>
 
    </v-col>
    <v-col cols="6" class="p-0 py-0 px-1">
    </v-col>
  </v-row>
  <v-row class="mb-4">
            <span class="ml-3 text-h7"> (*) Días de retraso: Se toma en cuenta desde la fecha de derivación de la denuncia mas 45 dias de plazo</span>
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

    <template v-slot:item.fila2="{ index }">
      <td class="sin-borde text-center">{{ index + 1 }}</td>
    </template>

    <template v-slot:top>
      <v-toolbar flat>

        <v-toolbar-title class="text-center">Derivación de denuncias registradas en sistema</v-toolbar-title>
       
     
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
    <template v-slot:item.color_semaforo="{ item }">
        <!-- Icono del semáforo {{item.color_semaforo}} -->
      
        <i v-if="item.color_semaforo == 'green' && item.estado != 'CONCLUSION'"   :class="['fa', 'fa-circle']"    :style="{'color': item.color_semaforo}"  ></i>
        <i v-if="item.color_semaforo == 'yellow' && item.estado != 'CONCLUSION'"  :class="['fa', 'fa-circle']"    :style="{'color': item.color_semaforo}"  ></i>
        <i v-if="item.color_semaforo == 'red' && item.estado != 'CONCLUSION'"     :class="['fa', 'fa-circle']"    :style="{'color': item.color_semaforo}"  ></i>

       
      </template>
    <!-- Action Buttons Column -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="viewItemDenunciaPrint(item)"> mdi-printer </v-icon>

      <v-icon small @click="viewItem(item)"> mdi-eye</v-icon>
      <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
      <v-icon small @click="addNewSeguimiento(item)"> mdi-account-multiple-plus </v-icon>

    </template>



    <!--   <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>    

    </template>-->
  </v-data-table>

  <template>

            <!-- view Dialog denuncia   reporte denuncia-->
   <v-dialog v-model="dialogPrint" max-width="1000px">
  
  <v-card class="mx-auto  mt-4" >
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
           <v-col class="p-0 py-0 px-0 mb-3" cols="4">
           <label class="text-h5">Datos del Denunciante  </label>
       
         </v-col>    
         </v-row>
         <!-- Datos del denunciante -->
         <v-row>
       
             
             
             <h3 class="p-0 py-3 px-2 ">Nombres y apellidos:</h3>
             <v-text-field
             v-model="denPerDnte.den_nombre_completo " 
               
               placeholder="Nombre del denunciante"
               outlined
             ></v-text-field>
         
         </v-row>
         <v-row>
             
             <h3 class="p-0 py-3 px-2 ">Carnet de identidad:</h3>
      
             <v-text-field
               
               placeholder="CI"
               outlined
             ></v-text-field>
    
             
             <h3 class="p-0 py-3 px-2 ml-4">Ciudad:</h3>
     
             <v-text-field

               
               placeholder="Extención"
               outlined
             ></v-text-field>
         </v-row>

         <v-row>
                  
             <h3  class="p-0 py-3 px-2">Correo electrónico:</h3>
       
             <v-text-field
             v-model="denPerDnte.email" 
             
               placeholder="Correo electrónico"
               outlined
             ></v-text-field>        
             
             <h3 class="p-0 py-3 px-2 ml-4">Teléfono:</h3>
           
             <v-text-field
             v-model="denPerDnte.telefono" 
             
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
               <v-checkbox  v-model="denPerDnte.denuncia_anonima" 
                 label="Si"></v-checkbox>
             </v-col>
             <v-col class="p-0 py-0 px-0" cols="2">
               <v-checkbox  v-model="denPerDnte.denuncia_anonima_no"
                 label="No"></v-checkbox>
             </v-col>
         </v-row>
         <v-row>
         <v-col class="p-0 py-4 px-0" cols="4">
               <!-- Primera columna -->
               <h3>Solicita reserva de identidad :</h3>
             </v-col>
             <v-col class="p-0 py-0 px-0" cols="1">
               <v-checkbox  v-model="denPerDnte.reserva_identidad_si" 
                 label="Si"></v-checkbox>
             </v-col>
             <v-col class="p-0 py-0 px-0" cols="2">
               <v-checkbox  v-model="denPerDnte.reserva_identidad_no" 
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
             v-model="denunciado.dnado_nombre_completo_concat" 
             
               placeholder="Nombres del denunciado"
               outlined
             ></v-text-field>
           </v-col>
         </v-row>
         <v-row>
           <h3 class="p-0 py-3 px-0 ">Lugar del hecho:</h3>
             <v-text-field
             v-model="denPerDnte.lugar_hecho" 
              
               placeholder="Dirección General"
               outlined
             ></v-text-field>
           
             <h3 class="p-0 py-3 px-2 ml-4">Unidad:</h3>
             <v-text-field   
             v-model="denunciado.unidad_policial_desc" 
              
               placeholder="Unidad"
               outlined
             ></v-text-field>
           </v-row>
         <v-row>
             <h3 class="p-0 py-3 px-0">Cargo que ocupa:</h3>
             <v-text-field
             v-model="denunciado.puesto_cargo_funcion" 
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
             v-model="denPerDnte.detalle_hecho" 
            
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
               <v-checkbox  v-model="docsPath_adj_si" 
                 label="Si"></v-checkbox>
             </v-col>
             <v-col class="p-0 py-0 px-0" cols="2">
               <v-checkbox  v-model="docsPath_adj_no" 
                 label="No"></v-checkbox>
             </v-col>
           </v-row>
         <v-row>
           <h3 class="p-0 py-3 px-2 ">Número de hojas:</h3>
           
   <v-text-field
       outlined
        
       style="max-width: 100px;"
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

        
               outlined   rows="2" cols="1" 
             ></v-textarea>
           </v-row>

               <v-row class="mb-4"   >      
             <div v-for="file in docsPath" :key="file.descripcion">
               <a @click="downloadArch(file.descripcion)" href="#" class="download-link">{{ file.descripcion }}
               </a>
               <v-icon v-if="isLoading">mdi-loader mdi-spin</v-icon>

             </div>
         </v-row>

         <!-- Firma y fecha -->
         <v-row>
           <h3 class="p-0 py-3 px-0">Firma:</h3>
             <v-text-field
              
               outlined
             ></v-text-field>
             <h3 class="p-0 py-3 px-2 ml-4">Fecha:</h3>
             <v-text-field
          
               outlined
             ></v-text-field>
    
         </v-row>

         <!-- Responsable de admisión -->
         <v-row>
          
             <h3 class="p-0 py-3 px-0">Responsable de admisión:</h3>
             <v-text-field
              
              
               outlined
             ></v-text-field>
    
         </v-row>
       </v-container>
     </v-card-text>

    
   </v-card>
   </div>
<!-- Botón de Enviar -->
     <v-card-actions >
         <v-spacer></v-spacer>
                <v-btn  class="custom-green-btn"  @click="downloadPDF">Exportar  PDF</v-btn>
     
         <v-btn class="custom-green-btn" text @click="close"> Cerrar </v-btn>
     
       </v-card-actions>

  </v-card>
</v-dialog>


    <!-- view Dialog denuncia-->
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card class="mx-auto  mt-4" max-width="700">

        <v-card-title class="mt-4">
          <v-container>
            <v-row>
                 <h2>    Formulario de denuncias</h2>
            </v-row>

            <v-row class="mt-8" >    
              <v-col cols="4" class="p-0 py-0 px-1">
                <v-text-field v-model="denPerDnte.cod_denuncia" :readonly="lockField" label="Codigo Denuncia"
                  :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
              </v-col>


              <v-col class="p-0 py-4 px-4" cols="4">
                <!-- Primera columna -->
                <label for="file3">Reserva de identidad ? : </label>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="1">
                <v-checkbox  v-model="denPerDnte.reserva_identidad_si" :readonly="lockField"
                  label="Si"></v-checkbox>
              </v-col>
              <v-col class="p-0 py-0 px-0" cols="2">
                <v-checkbox v-model="denPerDnte.reserva_identidad_no" :readonly="lockField"
                  label="No"></v-checkbox>
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
              <v-text-field v-model="denunciado.puesto_cargo_funcion" :readonly="lockField" label="Cargo y función"
                :rules="[v => !!v || 'cargo y funcion es requerido']"></v-text-field>
            </v-col>

            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denunciado.unidad_policial_desc" :readonly="lockField" label="Unidad policial"
                :rules="[v => !!v || 'unidad policial es requerido']"></v-text-field>
            </v-col>
          </v-row>

          <div>
            <v-container>
            <span class="text-h5"> Lista Denunciados </span>
          </v-container>
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

                    <v-icon small class="mr-2" @click="cargarPersona(denunciado.fila)"> mdi-eye</v-icon>
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
                :rules="[v => !!v || 'Departamento es requerido']"></v-select>
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


              <div v-for="file in docsPath" :key="file.descripcion">
                <a @click="downloadArch(file.descripcion)" href="#" class="download-link">{{ file.descripcion }}
                </a>
                <v-icon v-if="isLoading">mdi-loader mdi-spin</v-icon>

              </div>


            </v-col>
          </v-row>

          <v-row class="p-0 py-4 px-0  ">

            <v-col cols="4" class="p-0 py-0 px-1">
              <v-select v-model="denPerDnte.estado" :items="estadoOptions" item-title="est" item-value="transac"
                :readonly="lockField2" label="Estado Seguimiento" @update:modelValue="onEstadoChange"
                :rules="[v => !!v || 'Estado es requerido']"></v-select>
            </v-col>

            <v-col cols="8" class="p-0 py-0 px-1">
              <v-select v-model="denPerDnte.gestor_id" :items="gestorOptions" item-title="nombre_completo" item-value="id"
                :readonly="lockField2" label="Gestor Seguimiento" placeholder="Personal Asignado"
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
          <v-btn class="custom-green-btn" text @click=""> Guardar </v-btn>
        </v-card-actions>
        <v-card-actions v-else-if="lockField === true">
          <v-spacer></v-spacer>
          <v-btn class="custom-green-btn" text @click="close"> Cerrar </v-btn>
        </v-card-actions>


      </v-card>
    </v-dialog>

    <!-- derivar Dialog -->
    <v-dialog v-model="dialog2" max-width="1000px">
      <v-card class="mx-auto  mt-4" max-width="700">

        <v-card-title  class="mb-2" >
          <v-container>
            <span class="text-h5"> Derivar una denuncia </span>
          </v-container>
        </v-card-title>

        <v-card-text class="p-0 py-0 px-7  mb-2">
          <v-row>
            <v-col cols="4" class="p-0 py-0 px-1">
              <v-text-field v-model="denPerDnte.cod_denuncia" :readonly="lockField" label="Codigo Denuncia"
                :rules="[v => !!v || 'Nombres es requerido']"></v-text-field>
            </v-col>
            <v-col cols="4" class="p-0 py-0 px-1">
              <!--      <div class="d-flex align-center">    style="width: 400px;" -->
              <v-text-field v-model="denPerDnte.fec_registro" :readonly="lockField2" label="Fecha seguimiento"  @input="handleInputDate"
                placeholder="DD/MM/AAAA" required  :rules="[v => !!v || 'Fecha es requerida']"></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="8" class="p-0 py-0 px-1">
              <v-select v-model="denPerDnte.gestor_id" :items="gestorOptions" item-title="nombre_completo" item-value="id"
                :readonly="lockField2" label="Gestor Seguimiento" placeholder="Personal Asignado"
                @update:modelValue="onGestorChange" :rules="[v => !!v || 'Gestor es requerido']"></v-select>
            </v-col>
          </v-row>

          <v-row class="p-0 py-4 px-0  ">
            <v-col class="p-0 py-0 px-1">
              <v-textarea v-model="denPerDnte.observacion" :readonly="lockField2" label="Registre una comentario para derivar la denuncia"
                :rules="[v => !!v || 'Observacion es requerida']" placeholder="Observaciones/recomendaciones"></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions v-if="lockField2 === false">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
          <v-btn class="custom-green-btn" text @click="seguimientoSave"> Guardar </v-btn>
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
import Denunciado from '@/services/Denunciado';

import { downloadFile } from '../../utils/fileDownloader';
import DocumentosPath from '@/services/DocumentosPath';
import Usuario from '@/services/Usuario';
import Seguimiento from '@/services/Seguimiento';
import Actividad from '@/services/Actividad';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import 'font-awesome/css/font-awesome.css';
export default {

  data: () => ({

    loading: true,
    isLoading: false,
    files1: [{ id: 1, name: 'archivo1.pdf' }, { id: 2, name: 'imagen.jpg' }],



    page: 1,
    itemsPerPage: 10,
    search: '',
    dialog: false,
    dialog2: false,
    dialog3: false,

    dialogPrint:false,

    
    dialogDelete: false,
    // sortBy: ['calories'], // Ensure this is an array or an object with a 'find' method
    username: localStorage.getItem('username'),
    rol: localStorage.getItem('rol'),
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

   // color: "red",
iconColor: "fas fa-circle",

    headers: [
      {
        title: 'Num.', key: 'fila2', class: 'background',
        align: 'start', sortable: true,
      },
      { title: 'Cod. Denuncia', key: 'cod_denuncia' },

      { title: 'Ap. Paterno', key: 'apellido_pat' },
      { title: 'Ap. Materno', key: 'apellido_mat' },
      { title: 'Nombres', key: 'nombres' },

      { title: 'Fecha', key: 'fec_cre' },
      { title: 'Gestor Seguimiento', key: 'gestor_seguimiento' },
      { title: 'Tipo Denuncia', key: 'tipo_denuncia' },
      { title: 'Plazo', key: 'color_semaforo' },
      { title: '(*) Dias retraso', key: 'dias_retraso' },
      { title: 'Estado', key: 'estado' },
      { title: 'Acciones', value: 'actions', sortable: false },
    ],

   // color_semaforo:'';
    people: [],
    editedIndex: -1,
    codDenuncia: '',

    // propiedades del formulario 
    denPerDnteUpd: {
      estado: '',
      transaccion: '',

      usu_mod: null,
      fec_mod: null
    },
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
      denuncia_anonima_no: '',
      reserva_identidad: '',
      reserva_identidad_si: '',
      reserva_identidad_no: '',
      dnte_id: null,
      apellido_pat: '',
      apellido_mat: '',
      nombres: '',
      den_nombre_completo: '',

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
      denuncia_anonima: '',
      denuncia_anonima_no: '',
      
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
      dias_retraso: '',



      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: null,
      fec_mod: null,
    },
    seguimientosArray: [],

    semaforoArray: [],
    semaforoArray2: [],
    semaforoArray3: [],
    semaforoEstado:'',

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
      dnado_nombre_completo: '',
      dnado_nombre_completo_concat: '',
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
      dnado_nombre_completo: '',
      dnado_nombre_completo_concat: '',
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
    docsPath_adj_si:false,
  docsPath_adj_no:false,

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

  }),

  mounted() {
    this.loading = true;
    //this.username= localStorage.getItem('username');
    this.denunciaList();
    //this.denunciaAddEstado();


    this.deptoList();
    this.gradoList();

    // this.denunciadoListByCod();
    //this.documentosPathListByCod();
    //this.agregarPersona();

    this.rolList();
    this.gestorList();
    this.loading = false;
  },



  methods: {
    async denunciaPersonasGetByCod(cod_denuncia) {
          Denuncia.denunciaPersonasGetByCod(cod_denuncia) //  
        .then((response) => {
          console.log("denunciaPersonasGetByCod  : ",cod_denuncia, response.data, response.status);
          if (response.status === 200) {
            this.denPerDnte = response.data[0];
          } else {
            this.showSnackbar('Error recuperando denunciaPersonasGetByCod ' + response, 'red');
          }
        })
        .catch(error => {
           this.showSnackbar('Error recuperando denunciaPersonasGetByCod ' + error, 'red'); 
        });
    },
    downloadPDF() {
      const popupContent = this.$refs.popupContent;
     // console.log('this.toPrint :',  this.toPrint   );
     // this.toPrint= false;

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

        pdf.save('denuncia.pdf'); // Nombre del archivo PDF
      });


    },

    denunciaAddEstado(){
      // filtrar solo los roles-modulos  en estado activo
       // Convertir cada elemento de la propiedad 'operaciones_concat' en un objeto separado
      
// Copiar el array A a B (copia profunda utilizando map y el operador de propagación)
       this.semaforoArray = this.people.map(denuncia => ({ ...denuncia }));

       this.people.forEach(async denuncia => {
          await Denuncia.getByCodEstado(denuncia.cod_denuncia, denuncia.estado)
        .then((response) => {
          // console.log("response.data[0]  : ", response.data[0], response.status);
          if (response.status === 200) {

            this.semaforoEstado = (response.data[0].color_semaforo);
            const denun = this.semaforoArray.find(p => p.cod_denuncia === denuncia.cod_denuncia); // Buscar la persona por id

            if (denun) {
              denun.color_semaforo = this.semaforoEstado; // Nuevo valor para la propiedad estado
             // denun.estado = estado; // Actualizar la estado
                console.log(`cod_denuncia para el id ${denuncia.cod_denuncia}: ${denun.estado}`, ' semaforoEstado: ' ,  this.semaforoEstado );
            } else {
                console.log(`No se encontró ninguna cod_denuncia con el id ${denuncia.cod_denuncia}`);
            }

           // console.log("this.people  : ", this.people);
          } else {
            this.showSnackbar('Error recuperando Denuncia ' + response, 'red');
          }
        })
        .catch(e => {
          console.log(e);
        });
        this.people =  this.semaforoArray 

       });

      },

      
    cargarPersona(item) {
      const denunciadoIndex = this.denunciadosArray.find(dndo => dndo.fila === item);
      this.denunciado = Object.assign({}, denunciadoIndex);
      console.log('this.denPerDnte :', this.denPerDnte);
    },

    downloadURL(fileId) {
      console.log('Archivos descargados correctament3');
      // Replace with the logic to generate the download URL based on fileId
      return `your-api-endpoint/download/${fileId}`;
    },



    async downloadArch(fileName) {
      this.isLoading = true;
      this.snackbar.visible = false;

      try {//  en utils
        // await downloadFile('/archivo', 'archivo_descargado.ext'); // Cambia el nombre y la ruta específica del archivo
        await downloadFile(fileName); // Cambia el nombre y la ruta específica del archivo
        this.dialog3 = true; // vuelve a abrir el popup cerrado por la llamda previa a axios

        this.snackbar.message = 'Archivo descargado exitosamente!';
        this.snackbar.color = 'success';
        console.log('Archivos descargados correctamente1');
        this.isLoading = false;
      } catch (error) {
        this.snackbar.message = 'Ocurrió un error al descargar el archivo.';
        this.snackbar.color = 'error';
        alert('Error al descargar el archivo: ' + error);

      } finally {
        this.isLoading = false;
        this.snackbar.visible = true;
      }
    },
    downloadFile1(file1) {
      console.log('Archivos descargados correctamente2');
      // Aquí puedes implementar la lógica para descargar el archivo
      // Por ejemplo, creando un enlace temporal y haciendo clic en él:
      const link = document.createElement('a');
      link.href = `/api/files/${file1.id}/download`; // Ajusta la ruta según tu backend
      link.download = file1.name;
      document.body.appendChild(link);
      // link.click();
      document.body.removeChild(link);
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
            console.log('this.deptoId' ,this.deptoId, ',this.rol: ',this.rol );
            this.gestorOptions = Object.values(response.data);
            if(this.deptoId>0){ // caso bol nacional
              this.gestorOptions = this.gestorOptions.filter(item => item.nivel_geografico_id === this.deptoId);
            }
         

       /*     this.gestorOptions.sort(function(a, b){
                if(a.nombres.toLowerCase() < b.nombres.toLowerCase()) { return -1; }
                if(a.nombres.toLowerCase() > b.nombres.toLowerCase()) { return 1; }
                return 0;
            })*/
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
      console.log('this.deptoId' ,this.deptoId, ',this.rol: ',this.rol );
      await Denuncia.denunciaPersonasGetByNivelGeo(this.deptoId, this.rol)
        .then((response) => {
          console.log("denunciaPersonasGetByNivelGeo  : ", response.data, response.status);
          if (response.status === 200) {
            this.people = response.data;
            this.denunciaAddEstado();
          } else {
            this.showSnackbar('Error recuperando denunciaPersonasGetByNivelGeo ' + response, 'red');
          }
        })
        .catch(error => {
          this.showSnackbar('Error recuperando denunciaPersonasGetByNivelGeo ' + error, 'red');

        });
    },
    async denunciadoListByCod(cod_denuncia) {
      await Denunciado.denunciadoListByCod(cod_denuncia)
        .then((response) => {
          if (response.status === 200) {
          console.log("denunciadoListByCod 1  : ", response.data, response.status);

            this.denunciadosArray = response.data;
            this.loading = false;

    /*        
      const concatenado = this.denunciadosArray.map(denunciado => denunciado.dnado_nombre_completo).join(', ');
      //this.denunciado.dnado_nombre_completo_concat  =  concatenado;
    // Reemplazar la propiedad 'completo' en todos los objetos
      this.denunciadosArray.forEach(denunciados => {
        denunciados.dnado_nombre_completo_concat = concatenado;
      });
      console.log("concatenado 1  : ", concatenado);
*/
          } else {
            this.showSnackbar('Error recuperando denunciadoListByCod ' + response, 'red');
          }
        })
        .catch(error => {
          this.showSnackbar('Error recuperando denunciadoListByCod ' + error, 'red');
        });
    },
    async documentosPathListByCod(cod_denuncia) {
      await DocumentosPath.documentosPathListByCod(cod_denuncia) //  this.denPerDnte.id
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

      if (!this.denPerDnte.fec_registro) this.validationErrors.fec_registro = { value: true };
      else delete this.validationErrors.fec_registro;

      if (!this.denPerDnte.gestor_seguimiento) this.validationErrors.gestor_seguimiento = { value: true };
      else delete this.validationErrors.gestor_seguimiento;

      if (!this.denPerDnte.observacion) this.validationErrors.observacion = { value: true };
      else delete this.validationErrors.observacion;

      return !Object.keys(this.validationErrors).length;
    },


    handleInputDate(event) {  //  @input="handleInputDate"
      // Limitar la entrada a números y el separador de fecha
      this.denPerDnte.fec_registro = this.formatDate(event.target.value) ;//.replace(/^[0-9-]*$/, '').slice(0, 10);
     // console.log("handleInputDate fecha del hecho:", this.denPerDnte.fec_registro);  ///[^0-9]/g
    },
    // Función para formatear la fecha// Aplica la máscara de fecha  dd/mm/yyyy
    formatDate(inputValue) {
        inputValue = this.eliminarUltimoCaracterNoNumerico(inputValue);
      // Ejemplo: formato DD/MM/AAAA
     // console.log("formatDate:", inputValue);
      
      if (inputValue.length == 2) {
        inputValue = `${inputValue.slice(0, 2)}/`;
      }
      if (inputValue.length > 3 && inputValue.length < 5) {
        inputValue = `${inputValue.slice(0, 2)}${inputValue.slice(2, 4)}`;
      }
      if (inputValue.length == 5) {
        inputValue = `${inputValue.slice(0, 5)}/`;
      }
      if (inputValue.length > 5) {
        inputValue = `${inputValue.slice(0, 10)}`;
      }

      // Actualiza rawDate con la fecha formateada
      // this.rawDate = inputValue;
     // console.log("formatDate:", inputValue);

      return inputValue; //value.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
    },
    eliminarUltimoCaracterNoNumerico(str) {
      // Verificamos si el string no está vacío
      if (str.length === 0) {
        return str; // Devuelve el string sin cambios si está vacío
      }

      // Obtenemos el último carácter
      const ultimoCaracter = str.charAt(str.length - 1);

      // Comprobamos si es un carácter numérico
      if (!/\d/.test(ultimoCaracter)) {
        // Si no es numérico, eliminamos el último carácter
        return str.slice(0, -1);
      }

      // Si es un carácter numérico, devolvemos el string sin cambios
      return str;
    },
    seguimientoSave() {
      try {

        if (!this.validateForm()) {
          toast.info('Debe ingresar los datos requeridos.', {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
          });
        
          return false;
        }

        this.denPerDnte.mun_id = this.denPerDnte.municipio.mun_id ? this.denPerDnte.municipio.mun_id : this.denPerDnte.mun_id;

        console.log('denPerDnte 2 : ', JSON.stringify(this.denPerDnte));

        if (this.editedIndex > -1) {   // Update seguimiento  no hacer nada

        
           
        }
        else {  // Add new seguimiento
   
        this.seguimiento.denuncia_personas_id = this.denPerDnte.id;
        this.seguimiento.usuarios_id = this.denPerDnte.gestor_id;

        const dateParts =   this.denPerDnte.fec_registro.split("/"); //// "2024-05-17".split("/");  //
        this.seguimiento.fec_registro = new Date(dateParts[2] +'-'+ dateParts[1] +'-'+ dateParts[0]); //.toISOString(),  
        this.seguimiento.observacion = this.denPerDnte.observacion;
        this.seguimiento.actividades_id = 7; //this.denPerDnte.actividades_id;

        
        this.seguimiento.estado = 'ASIGNADO';
          this.seguimiento.transaccion = 'DEN_DERIVAR';
          this.seguimiento.usu_cre = this.username;

          Seguimiento.seguimientoCreate(this.seguimiento)
            .then((response) => {

              if (response.status === 201) {
               // this.people.push(this.denPerDnte); 
                console.log("seguimientoCreate  : ", response.status, response);
                toast.success('seguimiento creado correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here
                });
//  aki adicionar un upd a denuncia personas  y cambiar el estado a derivado

          this.denPerDnteUpd.estado = 'ASIGNADO';
          this.denPerDnteUpd.transaccion = 'DEN_DERIVAR';
          this.denPerDnteUpd.usu_mod = this.username;
          this.denPerDnteUpd.fec_mod = new Date();

          this.denunciaUpdate(this.seguimiento.denuncia_personas_id, JSON.stringify(this.denPerDnteUpd))

                this.denunciaList();//  new
                this.close()
              } 
              else {
                console.log("seguimientoCreate  : ", response.status, "error:   : ", response.response.request.response);
                this.showSnackbar('Error creando seguimiento: ' + response.response.request.response, 'red');
                toast.info('Error creando seguimiento: ' + 'Revise seguimiento de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
              this.showSnackbar('Log Error creando seguimiento: ' + error, 'red');
              console.log('Log Error creando seguimiento: ', error);
            });
        
        }

      } catch (error) {
        this.showSnackbar('Error creating Denuncia: ' + error, 'red');
      }

    },

    async denunciaUpdate(seguimiento_id,seguimiento_data)  {                  

      await Denuncia.denunciaUpdate(seguimiento_id, seguimiento_data)
        .then((response) => {
          if (response.status === 200) {
        
            // Object.assign(this.people[this.editedIndex], this.editedItemseguimiento)

            console.log("denunciaUpdate  : ", response.status, response);

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
      this.documentosPathListByCod(this.denPerDnte.cod_denuncia);


    },
    editItem2(item) {

      this.editedIndex = this.people.indexOf(item);
      this.denPerDnte = Object.assign({}, item);
      this.dialog2 = true;
      this.lockField = true;
      this.lockField2 = false;


    },

    viewItemDenunciaPrint(item) {
      //this.editedIndex = this.people.indexOf(item)
      //this.denPerDnte = Object.assign({}, item);
      this.dialogPrint = true;
      this.lockField = true;
      this.lockField2 = true;

      this.denunciaPersonasGetByCod(item.cod_denuncia) 
      this.denunciadoListByCod(item.cod_denuncia);

      const concatenado = this.denunciadosArray.map(denunciado => denunciado.dnado_nombre_completo).join(', ');
    
    // Reemplazar la propiedad 'completo' en todos los objetos
      this.denunciadosArray.forEach(denunciados => {
       // denunciados.dnado_nombre_completo_concat = concatenado;
       this.denunciado.dnado_nombre_completo_concat  =  concatenado;
      this.denunciado.unidad_policial_desc  =  denunciados.unidad_policial_desc;
      this.denunciado.puesto_cargo_funcion  =  denunciados.puesto_cargo_funcion;


      });
       console.log("concatenado 1  : ", concatenado);

      this.documentosPathListByCod(item.cod_denuncia);
      this.docsPath_adj_si = this.docsPath.length =0  ? false : true
          this.docsPath_adj_no = this.docsPath.length =0  ? true : false

    },


    dateToYMD(date) {
    var strArray=['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    var d = date.getDate();
    var m = strArray[date.getMonth()];
    var y = date.getFullYear();
    return '' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
},
    addNewSeguimiento(item) {

      this.editedIndex = -1
      this.seguimiento = Object.assign({}, null)   //  this.defaultItemSeguimiento
      
      this.denPerDnte = Object.assign({}, item);
         this.denPerDnte.fec_registro= this.dateToYMD(new Date()), // Nov 5
console.log("this.denPerDnte.fec_registro: "+  this.denPerDnte.fec_registro)
      this.denPerDnte.observacion= '' ;
      this.denPerDnte.gestor_id='';

      this.dialog2 = true;
      this.lockField = true;
      this.lockField2 = false;


},
    viewItem(item) {
      //this.editedIndex = this.people.indexOf(item)
      this.denPerDnte = Object.assign({}, item);
      this.dialog = true;
      this.lockField = true;
      this.lockField2 = true;
      this.denunciadoListByCod(this.denPerDnte.cod_denuncia);
      this.documentosPathListByCod(this.denPerDnte.cod_denuncia);


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
      this.dialog2 = false
      this.dialog3 = false
      this.dialogPrint = false;

      this.$nextTick(() => {
        this.denPerDnte = Object.assign({}, this.defaultItemUsu)
        this.denunciado = Object.assign({}, this.defaultItemDenunciado)
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
      this.dialog2 = false
      this.dialog3 = false
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
    dialog2(val) {
      val || this.close()
    },
    dialog3(val) {
      val || this.close()
    },
  },




}
</script>



<style scoped>
i {
  font-size: 24px; /* Ajusta el tamaño del icono */
  vertical-align: middle; /* Para centrar el icono verticalmente */
}


/* Estilos para el enlace que actúa como un botón */

.download-link {
  display: block;
  margin: 5px 0;
}


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

td.sin-borde {
    border: none; /* Quitar borde solo para celdas con esta clase */
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
