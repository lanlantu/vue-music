import axios from 'axios'
const request=axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL
})

request.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data.code ===200){
            return response.data;
        }
        return Promise.reject(response)
      },
      error=>{
          return Promise.reject(error);
      }

)
export default request;