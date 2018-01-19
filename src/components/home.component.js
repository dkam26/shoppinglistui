import React from 'react';
import Button from 'antd/lib/button';
import { Input } from 'antd';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
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
                console.log(response);
                const history = createHistory();
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.Welcome);
                window.location.reload();
                history.push('/shoppinglists'); 
                console.log(response.data);
                
              })
              .catch((error) => {
                console.log(error);
              });
             
        }
    
    render(){
        return(
        <div>
            <form method ="POST" action="">
                <Input  name="username" placeholder="Username" onChange={e =>this.onChange(e)} /><br/>
                <Input  name="password" placeholder="Password" type="password"  onChange={e =>this.onChange(e)}/><br/>
                 <Button onClick={()=>this.onSubmit()} type="primary">Login</Button><br/>
                <a href="/register">signup</a> 
            </form>

        </div>);
    }
    componentDidMount(){
        console.log('hello')
    }
};

export default Login;