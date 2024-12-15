import SesionLog from '@/services/SesionLog';
import { toast } from 'vue3-toastify';

//import nodemailer from "nodemailer";
const dotenv = import.meta.env;
//require('dotenv').config();
//const nodemailer = require('nodemailer');
 //   implementación del método sendPinToEmail() utilizando Node.js y el servicio de correo electrónico Nodemailer:
 import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: dotenv.SMTP_HOST,
  port: dotenv.SMTP_PORT,
  secure: dotenv.SMTP_SECURE === 'true', // true o false según tu configuración
  auth: {  // "type":"login", 
    user: dotenv.SMTP_USER,
    pass: dotenv.SMTP_PASS,
  },
});
const sendMail= async (mailOptions)=> {
  await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          throw new Error('Error al enviar el correo'); //res.status(500).send('Error al enviar el correo');
      }
          console.log('Correo enviado: ' + mailOptions);
          return { success: true, info}; //res.status(200).send({ success: true, pin }); // Devolver el PIN aquí solo para pruebas
  });
};
//verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


const sendPinToEmail = async (nombre_completo, user_login,  email) => {
        const htmlTemplate = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Your Awesome Email</title>
          </head>
          <body>
              <h1>Sr(a). ${nombre_completo}!</h1>
              <p>En respuesta a su solicitud con el usuario ${user_login} , para acceder al SISTEMA DE DENUNCIAS de TRANSPARENCIA de la  POLICIA BOLIVIANA se le envia este PIN de un solo uso y que caducara en 5 min</p>
              <img src="cid:uniqueImageCID" alt="Embedded Image" />
              <p>No comparta este PIN con ninguna persona: <strong>${pin}</strong></p>
              <p>Atentamente TRANSPARENCIA POLICIA BOLIVIANA</p>
          </body>
          </html>`;

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: email,
         subject: `SISTEMA DE DENUNCIAS- Envio de PIN para ${nombre_completo}. TRANSPARENCIA POLICIA BOLIVIANA`,
          //text: `Su PIN de identificación es: ${pin}`,
          html: htmlTemplate,
          attachments: [
            {
                filename: 'image.png', // Cambia esto al nombre de tu imagen
                path: 'path/to/your/image.png', // Cambia a la ruta de tu imagen
                cid: 'uniqueImageCID' // El mismo CID que se utiliza en el HTML
            }
        ]
        };

  try {
    transporter.verify();
      //.then(() => this.mailerLogger.error(Transporter${transporterName} is ready))
    const resp =  sendMail(mailOptions);
   // console.log(`Correo electrónico enviado correctamente a ${email}. Info: ${resp}`);
    sesionLogCreate(user_login);// // Endpoint para enviar el PIN

    return true;  

  } 
  catch (error) {
    console.error(`Error al enviar correo electrónico a ${mailOptions}:`, error);
    // Podrías lanzar el error si necesitas manejarlo en otro lugar
    return mailOptions;  // throw new Error('Error al enviar el correo electrónico:' + mailOptions);
  }
};


// 
  async function verifyPin () {
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
        loginError.value = 'Error al validar el PIN'; 
      });
  };
   // Endpoint para enviar el PIN
  function sesionLogCreate(user_login) {
        let editedItemSesionLog= {};
        editedItemSesionLog.user_login =user_login;
        editedItemSesionLog.pin = Math.floor(100000 + Math.random() * 900000); // Generar un PIN de 6 dígitos
        editedItemSesionLog.pin_estado = 'PENDIENTE';
        editedItemSesionLog.pin_hora_expiracion = (new Date()).toLocaleTimeString() + '5';
        editedItemSesionLog.pin_estado = new Date();
       // editedItemSesionLog.estado = 'ACTIVO';
       // editedItemSesionLog.transaccion = 'ACTIVAR';
        editedItemSesionLog.usu_cre =user_login;
        // Endpoint para enviar el PIN
        SesionLog.sesionLogCreate(JSON.stringify(editedItemSesionLog))
          .then((response) => {

            if (response.status === 201) {
              console.log("sesionLogCreate  : ", response.status, response);
          
              //editedItemSesionLog.id = response.data.id;
            return response.data.id ; 

            } else {

              console.log("sesionLogCreate  : ", response.status, "error:   : ", response.response.request.response);
              return false;
            }
          })
          .catch(error => {
            console.log('Log Error creando Usuario rol: ', error);

            return false;
            // this.showSnackbar('Log Error creando Usuario rol: ' + error, 'red');
          })
  };

  export default sendPinToEmail;
  //exports.verifyPin;


// module.exports.verifyPin=verifyPin;
//module.exports.sendPinToEmail = sendPinToEmail;

//function sendMailxx(mailOptions) {
  //  throw new Error('Function not implemented.');
//}


const resp = sesionLogCreate(form.value.user_login) ;
if(resp ){
     showPinDialog.value = true; // Mostramos el cuadro de diálogo para ingresar el PIN
  //const pin = Math.floor(100000 + Math.random() * 900000); // Generar un PIN de 6 dígitos
     
 console.log(`Correo electrónico enviado correctamente a ${res.data.email }. id: ${resp}`);

 toast.success(`Correo electrónico enviado correctamente a ${res.data.email }. id: ${resp}`, {
  autoClose: 5000,
  position: toast.POSITION.TOP_RIGHT,
});
 // this.close()
router.push('/');  
}
else{  
  console.error(`Error al enviar correo electrónico a ${res.data.email}:`);

  toast.error(`Error al enviar correo electrónico a: ${res.data.email}. Revise su correo con el adminitrador y vuelva a intentar`, {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT
  });
  localStorage.removeItem('username');
}