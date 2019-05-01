import React, { Component } from 'react';
import './Chat.css'
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button'



  class Chat extends Component{
    constructor(props){
      super(props)
      this.state = {
        id: this.props.id,

      }
      
    }

    
    componentDidUpdate() {
        this.chat.scrollTop = this.chat.scrollHeight;
      
    }
    render(){
      return(
        <div className = 'chatBox'  ref = {chat => this.chat = chat}>
               {this.props.data ? 
                  this.props.data.map(msg =>
                    (msg.RoomId == this.state.id) && msg.User && 
                      <div key={msg.id}>{msg.User.nick+" : "+msg.message}</div>):"loading"}
                  
        </div>
      )
    }
  }

export default connect (state => ({data: state.b.getMessage}))(Chat);





//{this.props.data ? this.props.data.map(msg => msg.User && <div>{msg.User.nick+" : "+msg.message}</div>) :"loading"}
// {this.props.data ? this.props.data.map(msg =>  <div>{msg.nick+" : "+msg.message}</div>) :"loading"}