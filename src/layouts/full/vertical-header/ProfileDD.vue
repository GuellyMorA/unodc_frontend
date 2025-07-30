<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import { useRouter } from "vue-router";
const router = useRouter();

const nombre = localStorage.getItem('grados_sigla') +'. ' + localStorage.getItem('nombre');
const rol_desc=localStorage.getItem('rol_desc');
const logout = async (event: any) => {

    console.log("localStorage.removeItem(username)  : ",   localStorage.getItem('username'));
    localStorage.removeItem("username");    
   
    router.push('/auth/login');
};


</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
        <v-row>
            <v-col cols="10" class="p-0 py-0 px-2 mt-2">
                <v-row>
            <v-label class="pl-1 text-body-1">{{nombre}} </v-label>
        </v-row>
            <v-row>
            <v-label class="pl-1 text-body-1"> {{ rol_desc }}</v-label>
        </v-row>  
            </v-col>
            <v-col cols="2" class="p-0 py-0 px-2">
         
                <v-btn class="" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/cerrar.png" height="35" alt="username" />
                </v-avatar>
            </v-btn>
            </v-col>

        </v-row>
   
 
        </template>
        <v-sheet rounded="xl" width="300" elevation="10" class="mt-2">
          <!--   <v-list class="py-0" lines="one" density="compact">
                <v-list-item value="item1" color="primary" >
                    <template v-slot:prepend>
                        <UserIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title class="v-label pl-4 text-body-1">{{nombre}}</v-list-item-title>
                </v-list-item>
                <v-list-item value="item2" color="primary">
                    <template v-slot:prepend>
                        <MailIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title  class="pl-4 text-body-1">{{ rol_desc }}</v-list-item-title>
                </v-list-item>
           
            </v-list> -->
            <div class="pt-4 pb-4 px-5 text-center" >
                <v-btn  to="" color="primary" variant="outlined" class="rounded-pill" block @click="logout">Salir</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
<style scoped>
.v-label {
  color: white;
  font-size: 10px !important;
}
</style>