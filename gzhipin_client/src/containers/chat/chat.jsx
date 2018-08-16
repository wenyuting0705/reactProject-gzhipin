import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem} from 'antd-mobile'
import {sendMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component{
  state = {
    content:''
  }
  send = () =>{
    const {content} = this.state;
    const from = this.props.user._id;
    const to = this.props.match.params.userid;
    this.props.sendMsg({content,from,to})
  }
  render(){
    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          <Item
            thumb={require('../../assets/imgs/头像1.png')}
          >
            你好
          </Item>
          <Item
            thumb={require('../../assets/imgs/头像1.png')}
          >
            你好2
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好
          </Item>
          <Item
            className='chat-me'
            extra='我'
          >
            很好2
          </Item>
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            onChange={val => {this.setState({content: val})}}
            extra={
              <span onClick={this.send}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state=>({user : state.user}),
  {sendMsg}
)(Chat)