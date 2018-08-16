import React,{Component} from 'react'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Header=Card.Header;
const Body = Card.Body;
class UserList extends Component{
  static propTypes = {
    userList:PropTypes.array.isRequired
  }
  render(){
    const userList = this.props.userList.filter(user=>user.header)
    return (
      <WingBlank style={{marginBottom: 50, marginTop:50}}>
        {
          userList.map((user, index) => (
            <div key={index}>
              <WhiteSpace/>
              <Card onClick={()=> this.props.history.push(`/chat/${user._id}`)}>
                <Header
                  thumb={require(`../../assets/imgs/${user.header}.png`)}
                  extra={user.username}
                />
                <Body>
                <div>职位: {user.post}</div>
                <div>公司: {user.company}</div>
                <div>月薪: {user.salary}</div>
                <div>描述: {user.info}</div>
                </Body>
              </Card>
            </div>
          ))
        }

      </WingBlank>
    )
  }
}
export default withRouter(UserList)