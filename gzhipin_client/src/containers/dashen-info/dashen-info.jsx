import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,List,InputItem,WingBlank,TextareaItem,Button} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class DashenInfo extends Component{
  state={
    header: '', // 头像名称
    info: '', // 个人简介
    post: '', // 求职岗位
  }
  handleChange = (name,val) =>{
    this.setState({
      [name]:val
    })
  }
  setHeader = (header)=>{
    this.setState({header})
  }
  save = ()=>{
    this.props.updateUser(this.state)
  }
  render(){
    const {user} = this.props;
    if(user.header){
      return <Redirect to='/dashen'/>
    }
    return (
      <div>
        <NavBar>大神信息完善</NavBar>
        <WingBlank>
          <HeaderSelector setHeader={this.setHeader}/>
          <List>
            <InputItem onChange={val => {this.handleChange('post',val)}}>求职岗位：</InputItem>
            <TextareaItem title='个人简介：'
                          rows={3}  onChange={val => {this.handleChange('info',val)}}/>
          </List>
          <Button type='primary' onClick={this.save}>保存</Button>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {updateUser}
)(DashenInfo)