<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import { useRouter } from "vue-router";
const router = useRouter();

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
            <v-btn class="" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/cerrar.png" height="35" alt="username" />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="xl" width="200" elevation="10" class="mt-2">
             <v-list class="py-0" lines="one" density="compact">
                <v-list-item value="item1" color="primary" >
                    <template v-slot:prepend>
                        <UserIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">Sbtte. Patricia Lopez</v-list-item-title>
                </v-list-item>
                <v-list-item value="item2" color="primary">
                    <template v-slot:prepend>
                        <MailIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title  class="pl-4 text-body-1">Adm. del Sistema</v-list-item-title>
                </v-list-item>
           
            </v-list> 
            <div class="pt-4 pb-4 px-5 text-center" >
                <v-btn  to="" color="primary" variant="outlined" class="rounded-pill" block @click="logout">Salir</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
