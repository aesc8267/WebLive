// import {ref} from 'vue'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDialogStore=defineStore('dialog',()=>
{
  const loginDialog = ref(false)
  const userInfoDialog = ref(false)
  const updatePasswordDialog = ref(false)
  const changeLoginDialog = ()=>{
    loginDialog.value=!loginDialog.value
    console.log(loginDialog.value)
  }
  const changeUserInfoDialog = ()=>
  {
    userInfoDialog.value=!userInfoDialog.value
  }
  const changeUpdatePasswordDialog = ()=>
  {
    updatePasswordDialog.value=!updatePasswordDialog.value
  }
return {
  loginDialog,
  userInfoDialog,
  changeLoginDialog,
  changeUserInfoDialog,
  updatePasswordDialog,
  changeUpdatePasswordDialog
}
}
)
