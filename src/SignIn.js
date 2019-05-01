import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import './SignIn.css'

class SignIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            nick: '',
            email: '',
            pass:'',
        }
       this.onChangeNickName = this.onChangeNickName.bind(this) 
       this.onChangeEmail = this.onChangeEmail.bind(this) 
       this.onChangePass = this.onChangePass.bind(this) 
    }
    

    onChangeNickName(event){
        let newNickName = event.target.value
        this.setState({nick: newNickName})
    }
    onChangeEmail(event){
        let newEmail = event.target.value
        this.setState({email: newEmail})
    }
    onChangePass(event){
        let newPass = event.target.value
        this.setState({pass: newPass})
    }

    render(){
        let user = JSON.parse(localStorage.getItem('user'))
        if (!user){
        if(!this.props.data.signIn)
            return(
                <div className = 'signInn'>
                        <h1> Sign in! </h1>
                        <input type = 'text' placeholder = 'Nick' value = {this.state.nick} onChange = {this.onChangeNickName} />
                        <input type = 'email' placeholder = 'E-mail' value = {this.state.email} onChange = {this.onChangeEmail} />
                        <input type = 'password' placeholder = 'Pass' value = {this.state.pass} onChange = {this.onChangePass} />
                        <button onClick = {() => this.props.onSendUser(this.state.nick, this.state.email,this.state.pass)}>Save</button>
                         <h3>{this.props.data.signInMessage.message}</h3>
                </div>
            )}
         return (<Redirect to="/logIn" />)
    }
}

export default connect (state => ({data: state.c}))(SignIn);