import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component{
  static propTypes ={
    setHeader:PropTypes.func.isRequired
  }
  state = {
    icon:null
  }
  constructor(props){
    super(props)
    this.headerList=[]
    for (let i = 0; i < 20; i++) {
      const text=`头像${i+1}`
      const icon=require(`../../assets/imgs/${text}.png`)
      this.headerList.push({icon,text})
    }
  }
  selectHeader = ({icon,text})=>{
    this.setState({icon});
    this.props.setHeader(text)
  }
  render(){
    const {icon}=this.state
    const head = icon ?<div>'已选择头像'&nbsp;<img src={icon} alt='header'/></div> : '请选择头像'
    return (
      <List renderHeader={() =>head }>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.selectHeader}/>
      </List>
    )
  }
}