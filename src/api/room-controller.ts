import axios from "axios";
interface room {
  category_id?:number;
  identifier: string;
  title: string;
  sell_point?: string;
  price?: number;
  num?: number;
  images?: Array<string>;
}
function apiRoomsInsert(params:room) {
  return axios.post(
    "api/rooms/insert",
    {},
    {
      params: params,
    }
  ).catch(error=>{
    console.log(error);
  });
}
function apiRoomsHotList(){
  return axios.patch('api/rooms/hot_list').catch(error=>{
    console.log(error);
  })
}
function apiRoomDetail(rid:number){

  return axios.get(`api/rooms/${rid}/detail`).catch(error=>{
    console.log("请求失败！"+error);
})
}
function apiSetSatus(status:number){
  return axios.post('api/rooms/set_status',{},{
    params:{
      status
    }
  }).catch(
    error=>{
      console.log("请求失败！"+error);
    }
  )
}
export { apiRoomsInsert,apiRoomsHotList,apiRoomDetail,apiSetSatus};
