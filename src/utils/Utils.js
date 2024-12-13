

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
    

}
export default new UtilsTools();



