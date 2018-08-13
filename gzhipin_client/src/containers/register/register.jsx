import React,{Component} from 'react'
import {NavBar,WingBlank,WhiteSpace,InputItem,Radio,Button,List} from 'antd-mobile'

import Logo from '../../components/logo/logo'
import {reqRegister} from '../../api'

export default class Register extends Component{
  state={
    username:'',
    password:'',
    rePassword:'',
    type:'dashen'
  }
  handleClick = ()=>{
    this.props.history.replace('/login')
  }
  handleChange = (name,val)=>{
    this.setState({
      [name]:val
    })
  }
  toRegister = ()=>{
    reqRegister(this.state).then(response => {
      console.log(response.data)
    })
  }
  render(){
    return (
      <div>
        <NavBar>用户注册</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem type='text' placeholder='请输入用户名'
                       onChange={(val)=>this.handleChange('username',val)}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码'
                       onChange={(val)=>this.handleChange('password',val)}>密码：</InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入确认密码'
                       onChange={(val)=>this.handleChange('rePassword',val)}>确认密码：</InputItem>
            <WhiteSpace/>
            <List.Item>
              <span>选择类型：</span>&nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.type==='dashen'} onChange={()=>{this.handleChange('type','dashen')}}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={this.state.type==='laoban'} onChange={()=>{this.handleChange('type','laoban')}}>老板</Radio>
            </List.Item>
            <WhiteSpace/>
            <Button type='primary' onClick={this.toRegister}>注册</Button>
            <WhiteSpace/>
            <Button onClick={this.handleClick}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}