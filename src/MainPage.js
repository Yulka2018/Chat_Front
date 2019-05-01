import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store, ConnectedNewUser} from './reducers.js';
import HeaderMP from './HeaderMP.js';

class MainPage extends Component {
    render(){
        return (
            <Provider store = {store}> 
                <div className="App">
                    <HeaderMP/>
                    <ConnectedNewUser />
                </div>
            </Provider>
        )
    }
} 

export default MainPage;