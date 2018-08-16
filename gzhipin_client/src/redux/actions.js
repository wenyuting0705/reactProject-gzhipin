import {reqRegister,
        reqLogin,
        reqUpdateUser,
        reqUser,
        reqUserList} from '../api'
import io from 'socket.io-client'
import {AUTH_SUCCESS,
         ERROR_MSG,
         RECEIVE_USER,
         RESET_USER,
         RECEIVE_USER_LIST} from './action-types'

const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user});
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
const receiveUser = (user) => ({type:RECEIVE_USER,data:user});
export const resetUser = (msg)=>({type:RESET_USER,data:msg});
const receiveUserList = (userList)=>({type:RECEIVE_USER_LIST,data:userList})

export function register({username,password,rePassword,type}) {
  if(!username){
    return errorMsg('用户名必须指定')
  }else if(!password) {
    return errorMsg('密码必须指定')
  } else if(rePassword!==password) {
    return errorMsg('2次密码必须一致')
  } else if(!type) {
    return errorMsg('类型必须指定')
  }
  return async dispatch =>{
    const response = await reqRegister({username,password,type})
      const result = response.data;
      if(result.code===0){
        const user = result.data;
        dispatch(authSuccess(user))
      }else {
        const msg=result.msg;
        dispatch(errorMsg(msg))
      }
  }
}
export function login({username,password}) {
  return async dispatch =>{
    if(!username) {
      return dispatch(errorMsg('用户名必须指定'))
    } else if(!password) {
      return dispatch(errorMsg('密码必须指定'))
    }
    const response = await reqLogin(username,password)
      const result = response.data;
      if(result.code===0){
        const user = result.data;
        dispatch(authSuccess(user))
      }else {
        const msg=result.msg;
        dispatch(errorMsg(msg))
      }
  }
}
export function updateUser(user) {
  return async dispatch =>{
    const response = await reqUpdateUser(user)
    const result = response.data;
    if(result.code===0){
      dispatch(receiveUser(result.data))
    }else {
      dispatch(resetUser(result.msg))
    }
  }
}
export function getUser() {
  return async dispatch =>{
    const response = await reqUser()
    const result = response.data;
    if(result.code===0){
      dispatch(receiveUser(result.data))
    }else {
      dispatch(resetUser(result.msg))
    }
  }
}
export function getUserList(type) {
  return async dispatch=>{
    const response = await reqUserList(type)
    const result = response.data;
    if(result.code===0){
      dispatch(receiveUserList(result.data))
    }
  }
}

const socket = io('ws://localhost:5000')
socket.on('receiveMsg',(chatMsg)=>{
  console.log('浏览器接收到服务发送的消息', chatMsg)
})
export function sendMsg({content,from,to}) {
  return dispatch =>{
    socket.emit('sendMsg',{content,from,to})
    console.log('浏览器向服务器发消息', {content, from, to})
  }
}
