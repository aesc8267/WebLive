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

export {changePassword};
