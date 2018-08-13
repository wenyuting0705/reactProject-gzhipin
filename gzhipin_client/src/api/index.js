import ajax from './ajax';
export const reqRegister = ({username,password,type}) => ajax('/register',{username,password,type},'POST');
export const reqLogin = ({username,password}) => ajax('/login',{username,password},'POST');
