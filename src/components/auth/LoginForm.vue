<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { toast } from 'vue3-toastify';

import Auth from '@/services/Auth';
import Usuario from '@/services/Usuario';
import SesionLog from '@/services/SesionLog';

import { useRouter } from 'vue-router';
const router = useRouter();

//const sendPinToEmail = require('../../utils/Mailer').sendPinToEmail;;
//const verifyPin = require('../../utils/Mailer').verifyPin;

const showPinDialog = ref(false);
const loginError = ref(null);
const pin = ref('');

const checkbox = ref(false);
const form = ref({
  user_login: '',  //  acrespo34534
  password_hash: '' , //'123456',
  email: '',
  nombre: '',
  pin: '',
  pin_hora_expiracion: '',
  // rol: 'TRANSP_NAL'
});
const primeraVez = ref('');

let dialog = ref('');
const password_hash_equals = ref('');

const editedItemSesionLog = {
  id: 0,
  pin: ''
}

const editedItemUsuario = {
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



  form.value.user_login = form.value.user_login.trim();
  const respuesta = await Auth.login(form.value).then((res) => {
    if (res.status === 200) {

      if (res.data.codigo_s) {
        //localStorage.setItem('user', JSON.stringify(res.data));
       // localStorage.setItem('username', form.value.user_login);
        console.log('**1 Auth.login: ', res.data);
        router.push('/');
        return res;
      }
      else {
        //  localStorage.setItem('username', JSON.stringify({codigo_s: 80730460, token: res.data.token}));
        //localStorage.setItem('userJson',JSON.stringify(res.data ));

        localStorage.setItem('username', form.value.user_login);
        localStorage.setItem('nombre', res.data.nombre);
        form.value.nombre = res.data.grados_sigla + '. ' + res.data.nombre;
        localStorage.setItem('rol', res.data.roles);
        localStorage.setItem('rol_desc', res.data.rol_desc);
        localStorage.setItem('depto_id', res.data.depto_id);
        localStorage.setItem('cambio_clave', res.data.cambio_clave);
        localStorage.setItem('usuario_id', res.data.usuario_id);
        localStorage.setItem('grados_sigla', res.data.grados_sigla);
        localStorage.setItem('email', res.data.email);
        form.value.email = res.data.email;

        localStorage.setItem('menu_operaciones', JSON.stringify(res.data.menu_operaciones));
      /*  console.log('**2 usuario_id: ', res.data.usuario_id);
        console.log('**2 Auth.login: ', res.data);
        console.log('**2 username: ', form.value.user_login);
        console.log('**2 nombre_completo: ', res.data.nombre);
        console.log('**2 email: ', res.data.email);
        console.log('**2 rol: ', res.data.roles);
        console.log('**2 rol_desc: ', res.data.rol_desc);
        console.log('**2 depto_id: ', res.data.depto_id);

        console.log('**2 grados_sigla: ', res.data.grados_sigla);
        console.log('**2 menu_operaciones: ', res.data.menu_operaciones);
*/
        console.log('**2 cambio_clave: ', res.data.cambio_clave);
        primeraVez.value = res.data.cambio_clave == 'PENDIENTE' ? true : false;
        console.log('primeraVez : ', primeraVez.value);

        if( primeraVez.value){  //CON PIN ERA:  !primeraVez.value
          dialog.value = true; 
          //showPinDialog.value = true; // Mostramos el cuadro de diálogo para ingresar el PIN
            // Si la autenticación es exitosa, enviamos un PIN al correo
           // enviarPin();         // this.close()
        }
        else{ // actualizar la hora de envio de pin para el caso de un primer ingreso lugo del reseto de clave
         // editedItemSesionLog.pin_hora_expiracion = new Date().toLocaleTimeString();
       //  form.value.password_hash = '';
       router.push('/'); 
        }
        
          //router.push('/'); // CON PIN ERA:   return res; // AQUI validar el error cuando se envia el pin al correo

      }
    }
    else {
      toast.error('Usuario y/o contraseña no válido', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT
      });
      localStorage.removeItem('username');
      return res;
    }

  });
};
const verificarPin = async () => {    //  hacer update sesion log
  //comparar el pin introducido y cambiar el estado del pin a USADO en la BD
  const validar5minutos = !primeraVez.value ? tiempoPasado(editedItemSesionLog.pin_hora_expiracion): false ;  //form.pin_hora_expiracion
  console.log('form.pin  ', form.value.pin);
  // aki reucperar el pin con el usu , el reg debe tar en estado activo no utiliizado
  if (form.value.pin != editedItemSesionLog.pin) {
    toast.info('El pin no es correcto: ' + 'Revise el Pin ingresado', {
      autoClose: 5000,
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  else if (validar5minutos) {
    toast.info('El PIN esta vencido: ' + 'Revise el Pin ingresado o regrese a la pagina de ingreso de usuario', {
      autoClose: 5000,
      position: toast.POSITION.TOP_RIGHT,

    });
    editedItemSesionLog.pin_estado = 'EXPIRADO';
    editedItemSesionLog.estado = 'INACTIVO';
    editedItemSesionLog.transaccion = 'INACTIVAR';
    editedItemSesionLog.usu_mod = form.value.user_login;
    editedItemSesionLog.fec_mod = new Date();

    await SesionLog.sesionLogUpdate(editedItemSesionLog.id, editedItemSesionLog)
      .then((response) => {
        if (response.status === 200) {

          console.log("sesionLogUpdate  : ", response.status, response);

        } 
        else {
          console.log("sesionLogUpdate  : ", response.status, "error:   : ", response.response.request.response);

          toast.info('Error modificando sesionLog: ' + 'Revise el pin de logueo', {
            autoClose: 5000,
            position: toast.POSITION.TOP_RIGHT,

          });
        }
      })
      .catch(error => {
        toast.info('Error modificando sesionLog: ' + 'Revise el pin de logueo', {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,

        });
        console.log('Log Error modificando sesionLogUpdate: ', error);
      });

  }
  else {
    // PIN  es correcto
    //  hacer update sesion log
    sesionLogUpdate(editedItemSesionLog.id);
   // showPinDialog.close();
   // pin correcto entonces redigir al dash del sistema
   router.push('/');
           //     return res;  
  }

};

const sesionLogUpdate = async (sesion_id) => {

  // else  {  

  editedItemSesionLog.pin_estado = 'UTILIZADO';
  // editedItemSesionLog.estado = 'INACTIVO';
  //   editedItemSesionLog.transaccion = 'INACTIVAR';
  editedItemSesionLog.usu_mod = form.value.user_login;
  editedItemSesionLog.fec_mod = new Date();

  await SesionLog.sesionLogUpdate(sesion_id, editedItemSesionLog)
    .then((response) => {
      if (response.status === 200) {

        console.log("sesionLogUpdate  : ", response.status, response);
        // toast('Wow so easy !', { containerId: 'A' });
        toast.success('Usuario sera monitoreado ! ', {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
          // toastClassName: 'custom-toast', // Add your custom class name here

        });
      //  close()
      } else {
        console.log("sesionLogUpdate  : ", response.status, "error:   : ", response);

        toast.info('Error monitoreando Usuario: ' + 'Revise el pin de logueo', {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,

        });
      }
    })
    .catch(error => {
      toast.info('Error en  envio de correo: ' + 'Consulte al administrador del servidor de correo', {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,

      });
      console.log('Log Error envio de correo en sesionLogUpdate: ', error);
    });
  //      }
};

// Ejemplo de uso
//const tiempoInput = "12:30:45"; // Cambia esto al tiempo que quieras comprobar
//const resultado = tiempoPasado(tiempoInput);
const tiempoPasado = (tiempoDado) => {
  // Obtiene el tiempo actual
  const ahora = new Date();

  // Divide el tiempo dado en horas, minutos y segundos
  const partes = tiempoDado.split(':');
  const horas = parseInt(partes[0], 10);
  const minutos = parseInt(partes[1], 10);
  const segundos = parseInt(partes[2], 10);

  // Crea un objeto Date para el tiempo dado. Usamos la fecha actual para mantener la misma fecha.
  const fechaDada = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), horas, minutos, segundos);

  // Calcula la diferencia en milisegundos
  const diferencia = ahora - fechaDada; // Diferencia en milisegundos
  const minutosPasados = diferencia / (1000 * 60); // Convertimos a minutos

  // Retorna true si han pasado más de 5 minutos, de lo contrario false
  return minutosPasados > 5;
};


const enviarPin = () => {
  //let editedItemSesionLog= {};
  editedItemSesionLog.user_login_sigla = form.value.user_login;
  editedItemSesionLog.email = form.value.email;
  editedItemSesionLog.nombre = form.value.nombre;
  editedItemSesionLog.pin = Math.floor(100000 + Math.random() * 900000);  // 123456   Generar un PIN de 6 dígitos
  //form.value.pin = editedItemSesionLog.pin ;
  editedItemSesionLog.pin_hora_expiracion = new Date().toLocaleTimeString("en-US", { hour12: false });
  form.value.pin_hora_expiracion = new Date().toLocaleTimeString();
  editedItemSesionLog.pin_estado = 'PENDIENTE';
  editedItemSesionLog.estado = 'ACTIVO';
  editedItemSesionLog.transaccion = 'ACTIVAR';
  editedItemSesionLog.usu_cre = form.value.user_login;
  // Endpoint para enviar el PIN
  SesionLog.sesionLogCreate(editedItemSesionLog)
    .then((res) => {

      if (res.status === 201) {
        console.log("sesionLogCreate res : ", res.status, res);

        editedItemSesionLog.id = res.data.id;
        // return response.data.id ; 

        console.log(`PIN enviado correctamente a ${form.value.email}.`);

        toast.success(`PIN enviado correctamente a ${form.value.email}`, {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
        });
        // this.close()
        //  hacer update sesion log

      } else {
        console.error(`sesionLogCreate-Error al enviar correo electrónico a ${form.value.email}:`, res.response);

        toast.error(`Error al enviar correo electrónico a: ${form.value.email}. Revise su correo con el adminitrador y vuelva a intentar`, {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT
        });
        localStorage.removeItem('username');
      }
      //  console.log("sesionLogCreate  : ", res.status, "error:   : ", res);
      return false;

    })
    .catch(error => {
      console.log('sesionLogCreate- Log Error creando sesionLogCreate : ', error);

      return false;
      // this.showSnackbar('Log Error creando Usuario rol: ' + error, 'red');
    })
};






const close = () => {
  dialog.value = false;

  nextTick(() => {
    router.push('/auth/login');
  })
};

const closeDialog = () => {
  showPinDialog.value = false;


  nextTick(() => {
    router.push('/auth/login');
  })
};

const usuarioUpdate = async () => {
  if (password_hash_equals.value != form.value.password_hash) {
    toast.info('Las contraseñas no son iguales: ' + 'Revise las contraseñas ingresadas', {
      autoClose: 5000,
      position: toast.POSITION.TOP_RIGHT,

    });

  }
  else {
    editedItemUsuario.password_hash = form.value.password_hash;
    editedItemUsuario.reset_key = 'CAMBIADO';
    editedItemUsuario.reset_date = new Date();
    editedItemUsuario.transaccion = 'MODIFICAR';
    editedItemUsuario.usu_mod = form.value.user_login;
    editedItemUsuario.fec_mod = new Date();

    await Usuario.usuarioUpdate(localStorage.getItem('usuario_id'), JSON.stringify(editedItemUsuario))
      .then((response) => {
        if (response.status === 200) {
          // this.people = response.data;
          //Object.assign(this.people[this.editedIndex], this.editedItemUsuario)

          console.log("usuarioUpdate  : ", response.status, response);
          // toast('Wow so easy !', { containerId: 'A' });
          toast.success('Contraseña modificada correctamente !. ', {
            autoClose: 5000,
            position: toast.POSITION.TOP_RIGHT,
            // toastClassName: 'custom-toast', // Add your custom class name here

          });
          //close()
          dialog.value = false; // ocultar el popup de cambio de contraseña
          
        //02/02/2025  enviarPin() ; // enviar pin al correo
                router.push('/auth/login');  // redigir al login nuevamente para q se refresque el nuevo PIN generado y almacenado en cache
         
          //02/02/2025    showPinDialog.value = true; // Mostrar el cuadro de diálogo para ingresar el PIN
            // Si la autenticación es exitosa, enviamos un PIN al correo
           //xxxxx enviarPin();
        } else {
          console.log("usuarioUpdate  : ", response.status, "error:   : ", response.response.request.response);

          toast.info('Error modificando contraseña: ' + 'Revise el usuario de logueo', {
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
        <v-text-field variant="outlined" class="pwdInput" hide-details color="primary"
          v-model="form.user_login"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-medium mb-1">Contraseña</v-label>
        <v-text-field variant="outlined" class="border-borderColor" type="password" hide-details color="primary"
          v-model="form.password_hash"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn size="large" rounded="pill" class="custom-green-btn rounded-pill" block type="submit" flat
          @click="submit">Ingresar</v-btn>
      </v-col>
      
      <v-label class="font-weight-medium">_-Ver.3.2.0</v-label>
    </v-row>
  </div>
  <template v-if="primeraVez">
    <v-dialog v-model="dialog">
      <v-card class="mx-auto  mt-4" max-width="300">

        <v-card-title>
          <v-container>
            <span class="text-h5"> Cambio de contraseña </span>
          </v-container>
        </v-card-title>
        <v-card-text class="p-0 py-0 px-7  mb-2">

          <v-row class="mb-3">
            <v-col cols="12">
              <v-label class="font-weight-medium mb-1">Nueva contraseña</v-label>
              <v-text-field variant="outlined" class="pwdInput" type="password"  hide-details color="primary"
                v-model="form.password_hash"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-label class="font-weight-medium mb-1">Repita su contraseña</v-label>
              <v-text-field variant="outlined" class="border-borderColor" type="password" hide-details color="primary"
                v-model="password_hash_equals"></v-text-field>
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
    <v-dialog v-model="showPinDialog">
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
              <v-text-field variant="outlined" class="border-borderColor" type="password" hide-details color="primary"
                v-model="form.pin"></v-text-field>
            </v-col>

          </v-row>
        </v-card-text>
        <v-card-actions class="mt-4 ">
          <v-btn class="custom-green-btn p-0 py-0 px-10" text @click="verificarPin"> Verificar PIN </v-btn>
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