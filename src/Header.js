import React, {Component} from 'react';
import './Header.css'
import {Link} from 'react-router-dom';
import {logOut} from './reducers.js';


class Header extends Component{
    render(){
        let nick = JSON.parse(localStorage.getItem('user')).nick
        return(
            <div className = 'header'>
                <ul>
                    <li className = 'chatrooms'><Link to = '/chatrooms'>Chatrooms</Link> </li>
                    <li className = 'homepage'><Link to = {`/home/${nick}`}>Home</Link> </li>
                    <li className = 'logIn' onClick = {logOut}> <Link to = '/'> Log out </Link></li>
                </ul>
            </div>
        )
    }
}

export default Header;