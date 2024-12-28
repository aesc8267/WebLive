import axios from "axios";

function apiAddCollection(rid:string,cname:string)
{
  return axios.post('api/collections/add',{},{
    params:{
      rid:rid,
      cname:cname
    }
  }).catch(error=>{
    console.log(error);
})
}
function apiGetCollectionList()
{
  return axios.get('api/collections/').catch(error=>{
    console.log(error);
})
}
export {apiAddCollection,apiGetCollectionList}
