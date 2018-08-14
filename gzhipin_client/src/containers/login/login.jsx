import React,{Component} from 'react'
import {NavBar,WingBlank,WhiteSpace,InputItem,Button,List} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo'

class Login extends Component{
  state={
    username:'',
    password:''
  }
  handleClick = ()=>{
    this.props.history.replace('/register')
  }
  handleChange = (name,val)=>{
    this.setState({
      [name]:val
    })
  }
  toLogin = ()=>{
    this.props.login(this.state)
  }
  render(){
    const {msg,redirectTo}=this.props.user;
    if(redirectTo){
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>用户登录</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <p className='error-msg'>{msg}</p>
            <InputItem type='text' placeholder='请输入用户名' onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码' onChange={(val)=>this.handleChange('password',val)}>密码：</InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.toLogin}>登录</Button>
            <WhiteSpace/>
            <Button onClick={this.handleClick}>没有账户，去注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {login}
)(Login)