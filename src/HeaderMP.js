import React, {Component} from 'react';
import './Header.css'
import {Link} from 'react-router-dom';

class HeaderMP extends Component{
    render(){
        return(
            <div className = 'header'>
                <ul>
                    <li className = 'logIn'> <Link to = '/LogIn'> Login </Link></li>
                </ul>
            </div>
        )
    }
}

export default HeaderMP;