import http from 'axios';
///import http2 from 'axios';


class SesionLogService {


  sesionLogList() {
    return http.get(`/sesionLogList`,).catch((error) => {
      return error;
    });

  }

  sesionLogListByFk(data) {
    return http.get(`/sesionLogListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  sesionLogCreate(data) {
    return http.post(`/sesionLog`, data).catch((error) => {
      return error;
    });
  }

  sesionLogUpdate(id,data) {
    return http.put(`/sesionLog/${id}`, data).catch((error) => {
      return error;
    });
  }


  sesionLogDelLogico(id) {
    return http.put(`/sesionLogDel/${id}`).catch((error) => {
      return error;
    });
  }

  sesionLogDelete(id) {
    return http.delete(`/sesionLog/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new SesionLogService();
