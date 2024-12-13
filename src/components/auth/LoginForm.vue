<script setup lang="ts">
import { ref,nextTick   } from 'vue';
import { toast } from 'vue3-toastify';

import Auth from '@/services/Auth';
import Usuario from '@/services/Usuario';

import { useRouter } from 'vue-router';
const router = useRouter();


const pin= ref('');
let showPinDialog= ref(false);
      const      loginError= ref(null);


const checkbox = ref(false);
const form = ref({
    user_login: 'acrespo',
    password_hash: '123456',
    pin: '',
   // rol: 'TRANSP_NAL'
});
const primeraVez = ref(false);
let dialog= ref('');
const password_hash_equals= ref('');





const editedItemUsuario= {
      fila: null,
      id: null,
      nombres: null,
      apellido_pat: null,
      apellido_mat: null,
      ci_y_complemento: null,
      ci_expedido: null,
      grado: null,
      grados_sigla: null,
      telefono: null,
      email: null,
      departamento: null,
      depto_id: null,
      municipio: null,
      mun_id: null,
      user_login: null,
      password_hash: null,
      u_rol_id: null,
      roles_sigla: null,
      rol: null,
      reset_key: '',
      reset_date: '',

      estado: '',
      transaccion: '',
      usu_cre: null,
      fec_cre: null,
      usu_mod: '',
      fec_mod: ''


    };


const submit = async (event: any) => {
    // localStorage.setItem('username', JSON.stringify({}));
    // router.push('/');
    // return true;
    form.value.user_login = form.value.user_login.trim();
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
              localStorage.setItem('nombre',res.data.nombre ); 
              localStorage.setItem('rol',res.data.roles); 
              localStorage.setItem('rol_desc',res.data.rol_desc); 
              localStorage.setItem('depto_id',res.data.depto_id); 
              localStorage.setItem('cambio_clave',res.data.cambio_clave ); 
              localStorage.setItem('usuario_id',res.data.usuario_id); 
              localStorage.setItem('grados_sigla',res.data.grados_sigla); 
//              localStorage.setItem('menu_operaciones',res.data.menu_operaciones); 
              localStorage.setItem('menu_operaciones', JSON.stringify(res.data.menu_operaciones));

              console.log('**2 Auth.login: ', res.data);  
              console.log('**2 username: ', form.value.user_login);
               console.log('**2 rol: ', res.data.roles);
               console.log('**2 rol_desc: ', res.data.rol_desc);
                console.log('**2 depto_id: ', res.data.depto_id);
              console.log('**2 cambio_clave: ', res.data.cambio_clave);
              console.log('**2 usuario_id: ', res.data.usuario_id);             
              console.log('**2 grados_sigla: ', res.data.grados_sigla); 
             
              console.log('**2 menu_operaciones: ', res.data.menu_operaciones);             

              primeraVez.value = res.data.cambio_clave == 'PENDIENTE' ? true: false;
              console.log('primeraVez : ',primeraVez.value); 
                    if(primeraVez.value){
                        //  mostrar dialog alert('Cambie su contraseña');
                       // usuarioUpdate();
         
                    }
                    else{

                       // Si la autenticación es exitosa, enviamos un PIN al correo
                       sendPinToEmail(form.value.user_login);

                       //   router.push('/');  
                    }

                return res;                           

            }
        }
        else {
            toast.error('Usuario y contraseña no válido', {
                autoClose: 3000,
                position: toast.POSITION.TOP_RIGHT
            });
            localStorage.removeItem('username');
            return res;
        }
    });
};

const sendPinToEmail=(username)=> {
      // Simulamos enviar un correo con un PIN al usuario
//      Auth.login(username).then((res) => {
     
          showPinDialog.value = true; // Mostramos el cuadro de diálogo para ingresar el PIN

};
 const   verifyPin=async ()=> {
      // Aquí deberías validar el PIN proporcionado
      //this.$axios.post('/api/validate-pin', { username: this.username, pin: this.pin })
      const respuesta = await Auth.login(form.value).then((res) => {
        if (res.status === 200) {
            // El PIN es válido, permite el acceso al sistema
            router.push('/');  //this.loginSuccess();
            return true;
          } else {
            //this.loginError = 'PIN inválido';
            return false;
          }
        })
        .catch((error) => {
          loginError = 'Error al validar el PIN';
        });
    };
const close =  () => {
      dialog.value = false;    
     

      nextTick(() => {
        router.push('/auth/login');  
      })
    };
    
    const closeDialog =  () => {
      showPinDialog.value = false;    
     

      nextTick(() => {
        router.push('/auth/login');  
      })
    };

const usuarioUpdate = async () => {
    if(password_hash_equals.value != form.value.password_hash){
        toast.info('Las contraseñas no son iguales: ' + 'Revise las contraseñas ingresadas', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });

    }  
    else  {  
          editedItemUsuario.password_hash = form.value.password_hash;
          editedItemUsuario.reset_key='CAMBIADO';
          editedItemUsuario.reset_date= new Date();
          editedItemUsuario.transaccion = 'MODIFICAR';
          editedItemUsuario.usu_mod = form.value.user_login;
          editedItemUsuario.fec_mod = new Date();

          await Usuario.usuarioUpdate(  localStorage.getItem('usuario_id') , JSON.stringify(editedItemUsuario))
            .then((response) => {
              if (response.status === 200) {
                // this.people = response.data;
                //Object.assign(this.people[this.editedIndex], this.editedItemUsuario)

                console.log("usuarioUpdate  : ", response.status, response);
                // toast('Wow so easy !', { containerId: 'A' });
                toast.success('Usuario modificado correctamente ! ', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,
                  // toastClassName: 'custom-toast', // Add your custom class name here

                });
                close()
              } else {
                console.log("usuarioUpdate  : ", response.status, "error:   : ", response.response.request.response);

                toast.info('Error modificando Usuario: ' + 'Revise el usuario de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });
              }
            })
            .catch(error => {
                toast.info('Error modificando Usuario: ' + 'Revise el usuario de logueo', {
                  autoClose: 5000,
                  position: toast.POSITION.TOP_RIGHT,

                });                
              console.log('Log Error modificando Usuario: ', error);
            });
        }
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
                <v-btn size="large" rounded="pill"  class="custom-green-btn rounded-pill" block type="submit" flat @click="submit"
                    >Ingresar</v-btn
                >
            </v-col>
        </v-row>
    </div>
    <template v-if="primeraVez">
        <v-dialog v-model="dialog" >
            <v-card class="mx-auto  mt-4" max-width="300">

              <v-card-title >
                <v-container>
                    <span class="text-h5"> Cambio de contraseña </span>
                </v-container>
              </v-card-title>
              <v-card-text class="p-0 py-0 px-7  mb-2">

        <v-row class="mb-3">
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Nueva contraseña</v-label>
                <v-text-field variant="outlined" class="pwdInput" hide-details color="primary"
                 v-model="form.password_hash"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-medium mb-1">Repita su contraseña</v-label>
                <v-text-field
                    variant="outlined"
                    class="border-borderColor"
                    type="password"
                    hide-details
                    color="primary"
                    v-model="password_hash_equals"
                ></v-text-field>
            </v-col>      
        </v-row>
   
                </v-card-text>
                <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancelar </v-btn>
          <v-btn class="custom-green-btn" text @click="usuarioUpdate"> Guardar </v-btn>
        </v-card-actions>
            
                </v-card>
    </v-dialog>

  </template>
<template>
  <v-dialog v-model="showPinDialog" >
    <v-card class="mx-auto  mt-4" max-width="330">

        <v-card-title>
          <span>PIN de Identificación</span>
        </v-card-title>
        <v-card-text>
          <p>Se ha enviado un PIN a su correo. Por favor ingréselo aquí.</p>
          <v-row class="mt-3">
            <v-col cols="4" class="p-0 py-2 px-10">
                <v-label class="font-weight-medium mb-1">PIN:</v-label>

              </v-col>
              <v-col cols="4" class="p-0 py-0 px-0">
                <v-text-field
                   
                    variant="outlined"
                    class="border-borderColor"
                    type="password"
                    hide-details
                    color="primary"
                    v-model="form.pin"
                ></v-text-field>
            </v-col>
               
        </v-row>   
        </v-card-text>
        <v-card-actions class="mt-4 ">
          <v-btn class="custom-green-btn p-0 py-0 px-10" text @click="verifyPin"> Verificar PIN </v-btn>
          <v-btn class="custom-green-btn " text @click="closeDialog"> Cancelar </v-btn>
      
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>


</template>

<style scoped>
.custom-green-btn {
  background-color: #849C58;
  /* #073d09    cambio a color verde oscuro  */
  /* Verde */
  color: white;
  /* Texto en blanco */
}
</style>