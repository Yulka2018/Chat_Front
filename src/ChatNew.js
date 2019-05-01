import React, {Component} from 'react';
import Chat from './Chat.js';
import {Provider} from 'react-redux';
import {store, ConnectedInputs} from './reducers.js';
import Header from './Header.js';


class ChatNew extends Component {
    render(){
        const roomid= this.props.match.params.id;
        return (
            <Provider store = {store}> 
                <div>
                    <Header />
                    <Chat id = {roomid} />
                    <ConnectedInputs id = {roomid} />
                </div>
            </Provider>
        )
    }
} 

export default ChatNew;