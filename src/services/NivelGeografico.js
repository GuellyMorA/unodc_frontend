import http from 'axios';
///import http2 from 'axios';


class NivelGeograficoService {


  nivelGeograficoList() {
    return http.get(`/nivelGeograficoList`,).catch((error) => {
      return error;
    });

  }

  nivelGeograficoListByFk(data) {
    return http.get(`/nivelGeograficoListByFk/${data}`,).catch((error) => {
      return error;
    });

  }
  
  nivelGeograficoCreate(data) {
    return http.post(`/nivelGeografico`, data).catch((error) => {
      return error;
    });
  }

  nivelGeograficoUpdate(id) {
    return http.put(`/nivelGeografico/${id}`).catch((error) => {
      return error;
    });
  }


  nivelGeograficoDelLogico(id) {
    return http.put(`/nivelGeograficoDel/${id}`).catch((error) => {
      return error;
    });
  }

  nivelGeograficoDelete(id) {
    return http.delete(`/nivelGeografico/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new NivelGeograficoService();
