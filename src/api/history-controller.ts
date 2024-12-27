import { get_rid } from "./user-controller";

 function  roomHistoryInsert()
{ get_rid().then(
  (res)=>{
    console.log(res)
  }
);
}
export {roomHistoryInsert}
