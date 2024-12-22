import axios from "axios";
interface room {
  category_id:number;
  item_type: string;
  title: string;
  sell_point: string;
  price: number;
  num: number;
  images: string;
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
export { apiRoomsInsert,apiRoomsHotList,apiRoomDetail};
