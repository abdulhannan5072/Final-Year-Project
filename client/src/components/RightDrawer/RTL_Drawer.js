import React, { Component } from 'react'
import { Drawer, Button } from 'antd';
import {connect} from 'react-redux';
import {msgDrawer} from '../../store/actions'
// import Chat from '../../Chatting/Chat/Chat'

class RTL_Drawer extends Component {
  state = { visible: false };

  // showDrawer = () => {
    
  // };


  onClose = () => {
    this.setState({visible: 'false'})
  };

  render() {
    // if(this.props.visible) this.setState({visible: this.props.visible})
  

    return (
      <div className="">
        <Drawer
          title="Chat App"
          placement="right"
          width={350}
          // visible={this.props.visible}
          getContainer={false}
          style={{ position: 'absolute' }}
        >
          {/* <Chat /> */}
        </Drawer>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    visible: state.reducer.msgDrawerState
  }
} 
const mapDispatchToProps = dispatch => {
  return{
    msgDrawerS: (data) => dispatch(msgDrawer(data))
  }
} 
export default connect(mapStateToProps,mapDispatchToProps)(RTL_Drawer)