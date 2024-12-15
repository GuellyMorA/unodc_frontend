

class UtilsTools {


  operationExist(menus_sigla, operaciones_sigla) {
   const arrayOper= JSON.parse(localStorage.getItem('menu_operaciones'));

    // Encuentra el depart seleccionado por su id
    const menuModulo = arrayOper.find(c => c.menus_sigla === menus_sigla &&  c.operaciones_sigla === operaciones_sigla);
    // Actualiza las municip según el depart seleccionado
    console.log("menus_sigla  : ", menus_sigla, 'operaciones_sigla', operaciones_sigla);
    let menuModExist= false;
    let  operExist=false;
    if(menuModulo){
      menuModExist= menuModulo.menus_sigla ? true : false ;
      operExist= menuModulo.operaciones_sigla ? true : false ;
      console.log("menuModExist  : ", menuModExist, 'operExist', operExist);
    }
    else {
      console.log("menuModExist  : ", menuModExist, 'operExist', operExist);

    }
    return {'menuModExist':menuModExist, 'operExist': operExist};
  }

  operacionModulo(menus_sigla) {
    const operAlta=this.operationExist(menus_sigla, 'ALTA') ;
    const operEdicion=this.operationExist(menus_sigla, 'EDICION') ;
    const  operConsulta=this.operationExist(menus_sigla, 'CONSULTA') ;
    console.log('menus_sigla: ', menus_sigla);
    console.log('operAlta.operExist', operAlta.operExist);
    console.log('operEdicion.operExist', operEdicion.operExist);
    console.log('operConsulta.operExist', operConsulta.operExist);

    const permisosMod= {'menuMod':menus_sigla,
              'operAlta':operAlta,
              'operEdicion':operEdicion,
              'operConsulta':operConsulta } ;
 

     return permisosMod;
   }

  // para enviar un correo electrónico con el PIN de identificación al usuario. Se debe reemplazar tu-correo-electronico@gmail.com y tu-contraseña con tus propias credenciales de correo electrónico.
/*
   const nodemailer = require('nodemailer');
   
   const transporter = nodemailer.createTransport({
     host: 'smtp.policia.bo',
     port: 587,
     secure: false, // o true si se utiliza SSL
     auth: {
       user: 'transparencia.prueba@policia.bo',
       pass: 'N1Wc1xF4KH',
     },
   });
 //   implementación del método sendPinToEmail() utilizando Node.js y el servicio de correo electrónico Nodemailer:
  
   const sendPinToEmail = async (email, pin) => {
     try {
       const mailOptions = {
         from: 'tu-correo-electronico@gmail.com',
         to: email,
         subject: 'PIN de identificación',
         text: `Su PIN de identificación es: ${pin}`,
       };
   
       await transporter.sendMail(mailOptions);
       console.log('Correo electrónico enviado correctamente');
     } catch (error) {
       console.error('Error al enviar correo electrónico:', error);
     }
   };
   
   module.exports = sendPinToEmail;
   
*/


    

}
export default new UtilsTools();



