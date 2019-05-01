import React, {Component} from 'react';
import ChatRoomList from './ChatRoomList.js';
import {Switch,  Route, Redirect} from 'react-router-dom';
import {ConnectedNewChatRoom} from './reducers.js';
import ChatNew from './ChatNew.js';


export class NewChatRoom extends Component{
    constructor(props){
        super(props)
        this.state = {
            room: ''
        }
        this.onChangeChat = this.onChangeChat.bind(this)
    }
    
    onChangeChat(event){
        let chatVal = event.target.value
        this.setState({room: chatVal})
    }
    render(){
        return(
            <div className = 'newChatRoom' >
                <input type  = 'text'  placeholder = 'Enter Chatroom name'
                 value = {this.state.room} onChange = {this.onChangeChat} />
                 <button type = 'submit' onClick = {() => this.state.room ? this.props.onSendRoom(this.state.room)
                  && this.props.history.push("/chatrooms"): null } > Create </button>   
            </div>
        )
    }
}

class ChatRooms extends Component {
    render(){
        return (
                <div >
                    <Switch>
                            <Route exact path = "/chatrooms" component = {ChatRoomList} />       
                            <Route path = "/chatrooms/newChatroom" component = {ConnectedNewChatRoom} />
                            <Route path = "/chatrooms/:id"  component = {ChatNew} /> 
                    </Switch>
                </div>
        )
    }
} 

export default ChatRooms;