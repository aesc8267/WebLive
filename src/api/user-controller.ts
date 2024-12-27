import axios from "axios";

function changePassword(oldPassword: string, newPassword: string,confirmPassword:string) {
  if (newPassword !== confirmPassword) {
    ElMessage.error("两次密码不一致");
    return;
  }
 return axios.post("/api/users/change_password", {
  },{
    params:{
      oldPassword,
      newPassword,
    }
  }).then(res=>{
    if(res.data.state===200)
    {
      ElMessage.success("修改密码成功");
      window.location.reload();
    }
    else{
      ElMessage.error(res.data.message);
    }
});
}
function get_rid(){
  return axios.get('api/users/rid').catch(error=>{
    console.log("请求失败！"+error);
})

}
function apiChangeAvatar(url:string)
{
  return axios.post('api/users/change_avatar',{},{
    params:{
      avatarUrl:url
    }
  }).catch(
    error=>{
      console.log("请求失败！"+error);
    }
  )
}
export {changePassword,get_rid,apiChangeAvatar};
