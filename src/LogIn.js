import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './LogIn.css';


class LogIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            nick: '',
            pass:'',
        }
       this.onChangeNickName = this.onChangeNickName.bind(this) 
       this.onChangePass = this.onChangePass.bind(this) 
    }

    onChangeNickName(event){
        let newNickName = event.target.value
        this.setState({nick: newNickName})
    }
    onChangePass(event){
        let newPass = event.target.value
        this.setState({pass: newPass})
    }

    render(){
        console.log(this.props.data)
        let userS = JSON.parse(localStorage.getItem('user'))
        console.log(userS)
        if(!userS)
        return(
            <div className = 'logInn'>
                    <h1> Log in</h1>
                    <input  type = 'text' placeholder = 'Nick' value = {this.state.nick} onChange = {this.onChangeNickName} />
                    <input  type = 'password' placeholder = 'Pass' value = {this.state.pass} onChange = {this.onChangePass} />
                    <button  onClick = {() => this.props.onSendLogin(this.state.nick, this.state.pass)}>Log in</button>
                    <h3>{this.props.data.logInMessage.message}</h3> 
            </div>
            
        )
    // localStorage.setItem('user',JSON.stringify (this.props.data.logInMessage))
    return <Redirect to= {`/home/${userS.nick}`} /> 
    }
}

export default connect (state => ({data: state.c}))(LogIn) ;