import http from 'axios';
import http2 from 'axios';
const apiUrl = import.meta.env;

class RolService {
  
  
  rolListActivos() {
    return http2({
     method:'get',
     url: `/auth/rolListActivos`,
     baseURL: apiUrl.VITE_API_URL_AUTH,
     headers: {
       "Content-Type": "application/json",
       'Authorization': apiUrl.VITE_API_URL_TOKEN
     },
   })
   .catch((error) => {
       return error;
   });

 }
  
  rolList() {
     return http2({
      method:'get',
      url: `/auth/rolList`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },
    })
    .catch((error) => {
        return error;
    });

  }

  findByIdRol(data) {
    return http.get(`/rolFindById/${data}`,).catch((error) => {
      return error;
    });

  }

  listByFkRol(data) {
     
    return http2({
      method:'get',
      url: `/auth/rolListByFk/${data}`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },
    })
    .catch((error) => {
        return error;
    });

  }

     
  rolCreate(data) {
    return http2({
      method:'post',
      url: `/auth/rol`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },
      data:`${data}`
    })
    .catch((error) => {
      console.log("rolCreate  : ", error);

        return error;
    });

  }




  rolUpdate(id, data) {
    return http2({
      method:'put',
      url: `/auth/rol/${id}`,
      baseURL: apiUrl.VITE_API_URL_AUTH,
      headers: {
        "Content-Type": "application/json",
        'Authorization': apiUrl.VITE_API_URL_TOKEN
      },      
    data:`${data}`
    })
    .catch((error) => {
        return error;
    });

  }



  rolDelLogico(id) {
    return http.put(`/rolDel/${id}`).catch((error) => {
      return error;
    });
  }

  rolDelete(id) {
    return http.delete(`/rol/${id}`).catch((error) => {
      return error;
    });
  }




}

export default new RolService();
