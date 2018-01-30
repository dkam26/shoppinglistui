import React from 'react';
import Button from 'antd/lib/button';
import { Input  } from 'antd';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';


class Register extends React.Component{
    state = {
        username: '',
        email: '',
        password: '',
        surname: '',
        firstname: ''
        }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value,})
    }

    onSubmit =() => {
        
        axios.post('http://127.0.0.1:5000/auth/register/', {
            Firstname: this.state.firstname,
            Surname: this.state.surname,
            user:this.state.username,
            Password:this.state.password,
            Email:this.state.email
          })
          .then(function (response) {
              if(response.data.message==='User created')
              {
                const history = createHistory();
                window.location.reload();
                history.push('/');  
              }else{
                console.log(response);
              }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    render(){
        return(
        <div>
            <form method ="POST" >
                <Input  name="firstname" placeholder="First name" onChange={e =>this.onChange(e)} required/><br/>
                <Input  name="surname" placeholder="Second name"  onChange={e =>this.onChange(e)}/><br/>
                <Input  name="username" placeholder="Username" onChange={e =>this.onChange(e)} /><br/>
                <Input  name="password" placeholder="Password" type="password"  onChange={e =>this.onChange(e)}/><br/>
                <Input  name="email" placeholder="E-mail" onChange={e =>this.onChange(e)}/><br/>
                 <Button onClick={()=>this.onSubmit()} type="primary">Signup</Button><br/>
            </form>
            
        </div>);
    }
};

export default Register;