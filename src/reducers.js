import Inputs from './Inputs.js';
import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {connect} from 'react-redux'
import { NewChatRoom } from './ChatRooms.js';
import SignIn from './SignIn.js';
import LogIn from './LogIn.js';


let sendReducer = (state,action) => {
    if (state === undefined){
        return {sendStatus: ''}
    }
    if (action.type === "SEND_STATUS"){
        console.log(action.sendStatus)
        return {sendStatus: action.sendStatus}
    }
    return state
}

let getReducer = (state, action) => {
    if (state === undefined){
        return {getMessage: [], getRooms: []}
    }
    //console.log(action.status)
    if (action.type === "SET_STATUS"){
        let newMessage = action.payload
        if (action.status === "PENDING"){
          newMessage = state.getMessage
        }
        return {...state, getMessage:newMessage}
    } 
    if (action.type === "SET_ROOMSTATUS"){
       let newChat = action.payloadRoom
       if (action.status === "PENDING"){
        newChat = state.getRooms
      }
       return {...state, getRooms: newChat}
    }
    
    return state
}

let userReducer = (state, action) => {
  if (state === undefined){
    return { signInMessage: '', signIn: false, logInMessage: '', logIn: false}
  }
   let signedIn
  if(action.type === "SIGNIN_USER"){
    let userMessage = action.data || action.error
    if(action.status ==="PENDING"){
      userMessage = state.signInMessage
    }
    if(action.status === 'RESOLVED'){
      signedIn =  true
    }
    if(action.status === 'REJECTED'){
      signedIn =  false
    }
    
    return { ...state, signInMessage: userMessage, signIn: signedIn}
  }
  
  
  if(action.type === "LOGIN_USER"){
    let userMsg = action.data || action.error
    let loggedIn
    if( action.status === "PENDING"){
      userMsg = state.logInMessage
    }
    if(action.status === 'RESOLVED' ) {
      loggedIn =  true
    }
    if(action.status === 'REJECTED'){
      loggedIn =  false
    }
    console.log(userMsg)
    return { ...state, logInMessage: userMsg, logIn: loggedIn }
  }
  return state
}


const reducers = combineReducers({
    a: sendReducer,
    b: getReducer,
    c: userReducer
})

const store = createStore(reducers, applyMiddleware(thunk))

export {store}

store.subscribe(()=> console.log(store.getState()))



function sendMessage(nick,message,id){
    console.log(nick,message,id)
    //let timeStamp = new Date().toLocaleString()
    fetch("http://localhost:8000/message",
             {
            //      headers: { 
            //      'Accept': 'application/json',
            //      'Content-Type': 'application/json',
            //  },
            headers: authHeader(),
             method: "POST",
             body: JSON.stringify({nick: nick, message: message, room:id})
             })
             .then(() => {
               store.dispatch({type: "SEND_STATUS", sendStatus: 'RESOLVED'})
             })
             .catch(()=> {
               store.dispatch({type: "SEND_STATUS", sendStatus: 'REJECTED'})
             })
    return {type: "SEND_STATUS", sendStatus: 'PENDING'}
 }


const ConnectedInputs = connect (null, {onSend: sendMessage})(Inputs)

export {ConnectedInputs}

const actionPending     = () => ({ type: 'SET_STATUS', status: 'PENDING', payload: null, error: null })
const actionResolved    = payload => ({ type: 'SET_STATUS', status: 'RESOLVED', payload, error: null })
const actionRejected    = error => ({ type: 'SET_STATUS', status: 'REJECTED', payload: null, error })

const actionFetch   = () => {
  return dispatch => { 
      let promise = fetch("http://localhost:8000/message", {
        method: 'GET',
        headers:authHeader()
  })
            dispatch(actionPending())
               promise.then(res => res.json())
                .then(
                    data => dispatch(actionResolved(data)),
                    error => dispatch(actionRejected(error))
                )
        }
}

setInterval(
  () => store.dispatch(actionFetch()),
  3000
)

function createChat (room){
    fetch("http://localhost:8000/rooms",
             {
            //      headers: {
            //      'Accept': 'application/json',
            //      'Content-Type': 'application/json'
            //  },
            headers: authHeader(),
             method: "POST",
             body: JSON.stringify({room: room})
             })
             .then(() => {
               store.dispatch({type: "SEND_STATUS", sendStatus: 'RESOLVED'})
             })
             .catch(()=> {
               store.dispatch({type: "SEND_STATUS", sendStatus: 'REJECTED'})
             })
    return {type: "SEND_STATUS", sendStatus: 'PENDING'}
 }
 

 const ConnectedNewChatRoom = connect (null, {onSendRoom: createChat})(NewChatRoom)
 export {ConnectedNewChatRoom}

 const actionPendingRoom     = () => ({ type: 'SET_ROOMSTATUS', status: 'PENDING', payloadRoom: null, error: null })
 const actionResolvedRoom    = payloadRoom => ({ type: 'SET_ROOMSTATUS', status: 'RESOLVED', payloadRoom, error: null })
 const actionRejectedRoom    = error => ({ type: 'SET_ROOMSTATUS', status: 'REJECTED', payload: null, error })


 const actionFetchRooms   = () => {
    return dispatch => { 
        let promise = fetch("http://localhost:8000/rooms", {
          method: 'GET',
          headers: authHeader()
        })
              dispatch(actionPendingRoom())
               promise.then(res => res.json())
                        .then(
                            data => dispatch(actionResolvedRoom(data)),
                            error => dispatch(actionRejectedRoom(error))
                        )
                      
                  
          }
  }

  setInterval(
    () => store.dispatch(actionFetchRooms()),
    3000
 )

 const actionPendingUser     = () => ({ type: 'SIGNIN_USER', status: 'PENDING', data: null, error: null })
 const actionResolvedUser    = data => ({ type: 'SIGNIN_USER', status: 'RESOLVED', data, error: null })
 const actionRejectedUser    = error => ({ type: 'SIGNIN_USER', status: 'REJECTED', data: null, error })

 function createUser (nick, email, pass){
   return dispatch => {
     let promise = fetch("http://localhost:8000/users",
                {
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({nick: nick, email: email, pass: pass})
                })
      dispatch(actionPendingUser())
      promise.then(res =>
        {
          return res.json().then(data => {
            //console.log(data)
              if (!res.ok) {
                 return dispatch(actionRejectedUser(data));
              }
              return  dispatch(actionResolvedUser(data));
          })})              
  }
}

const ConnectedNewUser = connect (null, {onSendUser: createUser})(SignIn)
export {ConnectedNewUser}

const actionPendingUserLogin     = () => ({ type: 'LOGIN_USER', status: 'PENDING', data: null, error: null })
const actionResolvedUserLogin    = data => ({ type: 'LOGIN_USER', status: 'RESOLVED', data, error: null })
const actionRejectedUserLogin    = error => ({ type: 'LOGIN_USER', status: 'REJECTED', data:null, error })

function userLogin(nick, pass){
  return dispatch => {
    let promise = fetch('http://localhost:8000/authenticate', {
                              method: 'POST',
                              headers: {

                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              body: JSON.stringify({nick: nick, pass: pass}) 
                            }
            )
    dispatch(actionPendingUserLogin())
    promise.then (res =>
      {
        return res.json().then(data => {
          console.log(data)
            if (!res.ok) {
               return dispatch(actionRejectedUserLogin(data));
            }
            localStorage.setItem('user', JSON.stringify (data))
            return  dispatch(actionResolvedUserLogin(data));
        })})                    
    }
}

const ConnectedLogin = connect (null, {onSendLogin: userLogin})(LogIn)
export {ConnectedLogin}




function authHeader(){
  let user =  JSON.parse(localStorage.getItem('user'))
  if (user && user.token){ return { 'Authorization': 'Bearer ' + user.token, 
    'Accept': 'application/json',
    'Content-Type': 'application/json' }} else {return {}}
}

export function logOut(){
  localStorage.clear()
}




