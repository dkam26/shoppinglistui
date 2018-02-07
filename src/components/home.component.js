import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import axios from 'axios';

import createHistory from 'history/createBrowserHistory';
import {NotificationContainer,NotificationManager} from 'react-notifications';

class Login extends React.Component{
   
    onChange = (e) => {
            this.setState({[e.target.name] : e.target.value,})
        }

    onSubmit =() => {
            
            axios.post('http://127.0.0.1:5000/auth/login/', {
                user:this.state.username,
                Password:this.state.password,
              })
              .then( (response) => {
                
                if(response.data.token){
                    const  history = createHistory()
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', response.data.Welcome)
                    window.location.reload()
                    history.push('/shoppinglists')
                }if(response.data.message === 'Wrong credentials'){ 
                    NotificationManager.error(response.data.message )
                }

              })
              .catch((error) => {
                console.log(error);
              });
             
        }
    
    render(){
        return(
             
        <div className ="App" >
        
                <Input  name="username" placeholder="Username" onChange={e =>this.onChange(e)}  id="xx" /><br/>
               <Input  name="password" placeholder="Password" type="password"  onChange={e =>this.onChange(e)} id="xx" /><br/>
                <Button onClick={()=>this.onSubmit()} type="primary" id="xx" >Login</Button><br/>
                <a href="/register" id="x">signup</a> 
          
            <NotificationContainer/>
           
        </div>);
      
    }
 
};


export default Login;