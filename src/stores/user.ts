import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
export const useUserStore = defineStore("user", () => {
  const username = ref<string|null>(localStorage.getItem("username"));
  const password = ref<string|null>(localStorage.getItem("password"));
  const isLogIn =ref<boolean>(false);// 这个表示后端系统是否已经登录
  const avatar = ref(localStorage.getItem("avatar"));
  // 这个登录用于后端系统登录
 const  signIn = async() => {
     // console.log(username.value, password.value);
    await axios
      .post(
        "/api/users/login",
        {},
        {
          params: {
            username: username.value,
            password: password.value,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.state == 200) {
          isLogIn.value = true;
        }
        else{
          ElMessage.error("后端:"+res.data.message)
          isLogIn.value = false;
        }
      });
      return isLogIn.value;
  };
  const signout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return { username, password, isLogIn, avatar, signIn,signout };
});
