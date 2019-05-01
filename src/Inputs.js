import React, { Component } from 'react';
import './Inputs.css';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/Button'


class Inputs extends Component {
    constructor(props){
        super(props)
        this.state = {
          // nick: '',
          message: '',
        }
        //console.log(this.state.nick, this.state.message)
        //this.onSend = this.onSend.bind(this)
        //this.onChangeNick = this.onChangeNick.bind(this)
        this.onChangeMsg = this.onChangeMsg.bind(this)
    }
    // onChangeNick(event){
    //   let nickVal = event.target.value
    //   //console.log(nickVal)
    //   this.setState({nick: nickVal})
    // }
   
    onChangeMsg(event){
      let msgVal = event.target.value
      //console.log(msgVal)
     this.setState({message: msgVal})
    }


  
    render(){
      let nick = JSON.parse(localStorage.getItem('user')).nick
      //console.log(nick)
      return (
        <div className = 'input'>
              <input type="text" id = 'message' placeholder = 'Enter your message' 
                value = {this.state.message} onChange = {this.onChangeMsg}/>
                <Button variant="success" onClick = {() => this.state.message ? this.props.onSend(nick, this.state.message, this.props.id) 
                && this.setState({message: ''}) : null}> Send </Button>
        </div>
      )
    }
  }

  export default connect (state => ({data: state.c.logInMessage}))(Inputs);