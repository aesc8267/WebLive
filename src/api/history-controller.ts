import axios from "axios";

 function  roomHistoryInsert(rid:string)
{
  return axios.post('api/RoomHistory/insert',{},{
    params:{
      rid:rid
    }
  }).catch(error=>{
    console.log(error);
})
}

export {roomHistoryInsert}