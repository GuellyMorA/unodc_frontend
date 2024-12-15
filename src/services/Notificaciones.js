import http from 'axios';
///import http2 from 'axios';


class NotificacionesService {


  notificacionesList() {
    return http.get(`/notificacionesList`,).catch((error) => {
      return error;
    });

  }

  notificacionesListByFk(data) {
    return http.get(`/notificacionesListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  notificacionesCreate(data) {
    return http.post(`/notificaciones`, data).catch((error) => {
      return error;
    });
  }

  notificacionesUpdate(id) {
    return http.put(`/notificaciones/${id}`).catch((error) => {
      return error;
    });
  }


  notificacionesDelLogico(id) {
    return http.put(`/notificacionesDel/${id}`).catch((error) => {
      return error;
    });
  }

  notificacionesDelete(id) {
    return http.delete(`/notificaciones/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new NotificacionesService();
