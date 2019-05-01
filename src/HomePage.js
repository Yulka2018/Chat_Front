import React, {Component} from 'react';
import Header from './Header.js';
import './HomePage.css'



class HomePage extends Component{
    
    render(){
        let nick = JSON.parse(localStorage.getItem('user')).nick
        let email = JSON.parse(localStorage.getItem('user')).email
        return(
            <div className = 'HomePage'> 
                <Header />
                <div className = "home">
                <h1>WELCOME {nick}</h1> 
                <h3> E-mail: {email} </h3>
                </div>
            </div> 
        )
    }
}

export default HomePage;