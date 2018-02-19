import React from 'react';
import axios from 'axios';
import Notifications, {notify} from 'react-notify-toast';
import {URL}  from '../config'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={redirect:false}
  }
  //Function to get inputs from the form and set the state
    onChange = (e) => {
            this.setState({[e.target.name] : e.target.value,})
        }
  //Function to validate user before redirecting them to the shoppinglists page
    onSubmit =() => {
            axios.post(URL+'auth/login/', {
                user:this.state.username,
                Password:this.state.password,
              })
              .then( (response) => {
                let myColor = { background: 'red', text: "#FFFFFF" };
                if(response.data.token){
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', response.data.Welcome)
                    this.setState({redirect:true})
                }if(response.data['Error'] === '401'){ 
                  
                  notify.show("Valid username or password", "custom", 5000, myColor)
                }if(response.data['Error'] === '404'){
                  notify.show("Missing information about the user", "custom", 5000, myColor)
                }

              })
              .catch((error) => {
                console.log(error);
              });
             
        }
    
    render(){
      if(this.state.redirect){
        return <Redirect to='/shoppinglists'/>
      }

      return(
      <div className='login-form'>
      <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='black' textAlign='center'>
            Shoppinglists-App
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input
                  fluid
                  name='username'
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={e =>this.onChange(e)}
                  id = 'username'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  id = 'password'
                  onChange={e =>this.onChange(e)}
                 />
    
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} >Login</Button>
              </Segment>
            </Form>
         
            <Notifications />
         
            <Message >
              New to us? <a href='/register'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
      
    }
 
};

export default Login;