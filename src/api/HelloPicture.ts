import axios from "axios";

function apiUpload(file:File){
  const headers={
    'Authorization':'Bearer 731|E38s62wz6oTlLW8qFPTutaYIY4iOPyRPeHwSu7qA',
    'Accept':'application/json',
    'Content-Type':'multipart/form-data'
  }
  return axios.post('https://www.helloimg.com/api/v1/upload',{
    file
  },{
    headers
  }).catch((error)=>{
    console.log(error);
})
}
export {apiUpload}
