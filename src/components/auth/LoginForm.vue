<script setup lang="ts">
import { ref } from 'vue';
import { toast } from 'vue3-toastify';

import Auth from '@/services/Auth';

import { useRouter } from 'vue-router';
const router = useRouter();

const checkbox = ref(false);
const form = ref({
    user_login: 'a.crespo',
    password_hash: '123456',
    sistema: 'DENUN'
});

const submit = async (event: any) => {
    // localStorage.setItem('username', JSON.stringify({}));
    // router.push('/');
    // return true;
    const respuesta = await Auth.login(form.value).then((res) => {
        if (res.status === 200) {
           
            if (res.data.codigo_sie) {
                //localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('username', form.value.user_login);
                console.log('**1 Auth.login: ', res.data);     
                router.push('/');
                return res;
            } else {
              //  localStorage.setItem('username', JSON.stringify({codigo_sie: 80730460, token: res.data.token}));
              //localStorage.setItem('userJson',JSON.stringify(res.data ));

              localStorage.setItem('username',form.value.user_login ); 
              localStorage.setItem('rol_desc',res.data.rol_desc); 
              localStorage.setItem('depto_id',res.data.depto_id); 
              localStorage.setItem('cambio_clave',res.data.cambio_clave ); 
              localStorage.setItem('usuario_id',res.data.usuario_id); 
              localStorage.setItem('grado_sigla',res.data.grado_sigla); 

              console.log('**2 username: ', form.value.user_login);
               console.log('**2 rol_desc: ', res.data.rol_desc);
                console.log('**2 depto_id: ', res.data.depto_id);
              console.log('**2 cambio_clave: ', res.data.cambio_clave);
              console.log('**2 usuario_id: ', res.data.usuario_id);             
              console.log('**2 grado_sigla: ', res.data.grado_sigla); 
                
                router.push('/');  
                return res;                
           

            }
        } else {
            toast.error('Usuario y contraseña no válido', {
                autoClose: 3000,
                position: toast.POSITION.TOP_RIGHT
            });
            localStorage.removeItem('username');
            localStorage.removeItem('username');
            return res;
        }
    });
};
</script>

<template>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <!-- <span class="bg-surface px-5 py-3 position-relative text-subtitle-1 text-grey100">Your Social Campaigns</span> -->
        </div>
    </div>
    <div>
        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Usuario</v-label>
                <v-text-field variant="outlined" class="pwdInput" hide-details color="primary" v-model="form.user_login"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Contraseña</v-label>
                <v-text-field
                    variant="outlined"
                    class="border-borderColor"
                    type="password"
                    hide-details
                    color="primary"
                    v-model="form.password_hash"
                ></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-btn size="large" rounded="pill" color="primary" class="rounded-pill" block type="submit" flat @click="submit"
                    >Ingresar</v-btn
                >
            </v-col>
        </v-row>
    </div>
</template>
