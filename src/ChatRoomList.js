import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';



class ChatRoomList extends Component {
    render(){
        return(
                <div>
                    <h2> Chatrooms List</h2>
                    {this.props.data ? this.props.data.map(room => room.title && <li key = {room.id}>
                    <Link to = {`/chatrooms/${room.id}`}>{room.title}</Link>
                    </li>):"loading"}
                    <div className = 'NewChatRoom'>
                        <Link to = "/chatrooms/newChatroom"> Create new chatroom </Link>
                    </div>
                </div>
        )
    }
}    

export default connect (state => ({data: state.b.getRooms}))(ChatRoomList);
