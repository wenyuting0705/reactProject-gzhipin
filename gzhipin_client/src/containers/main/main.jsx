import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import {getUser} from '../../redux/actions'
import DashenInfo from '../dashen-info/dashen-info'
import LaobanInfo from '../laoban-info/laoban-info'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'

import {getRedirectPath} from "../../utils";

class Main extends Component{
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]
  componentDidMount(){
    const userid=Cookies.get('userid');
    const {user} = this.props;
    if(userid && !user._id){
      this.props.getUser()
    }
  }
  render(){
    const userid=Cookies.get('userid');
    if(!userid){
      return <Redirect to='/login'/>
    }

    const {user} = this.props;
    if(!user._id){
      return <div>loading...</div>
    }
    const path = this.props.location.pathname;
    if(path==='/'){
        const path=getRedirectPath(user.type,user.header)
        return <Redirect to={path}/>
    }

    const currentNav = this.navList.find((nav,index)=>nav.path===path)
    return (
     <div>
       {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
       <Switch>
         <Route path='/dasheninfo' component={DashenInfo}/>
         <Route path='/laobaninfo' component={LaobanInfo}/>

         <Route path='/dashen' component={Dashen}/>
         <Route path='/laoban' component={Laoban}/>
         <Route path='/message' component={Message}/>
         <Route path='/personal' component={Personal}/>
       </Switch>
     </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {getUser}
)(Main)