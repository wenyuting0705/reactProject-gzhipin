export function getRedirectPath(type,header) {
  let path=''
  if(type==='dashen'){
    path = '/dashen'
  }else {
    path = '/laoban'
  }

  if(!header){
    path += 'info'
  }
  return path;
}