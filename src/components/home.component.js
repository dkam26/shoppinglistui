import React from 'react';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
class Login extends React.Component{
   
    onChange = (e) => {
            this.setState({[e.target.name] : e.target.value,})
        }

    onSubmit =() => {
            console.log(localStorage.getItem('user'))
            console.log(localStorage.getItem('token'))
            axios.post('http://127.0.0.1:5000/auth/login/', {
                user:this.state.username,
                Password:this.state.password,
              })
              .then( (response) => {
                
                if(response.data.token){
                    const  history = createHistory()
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('user', response.data.Welcome)
                    console.log(localStorage.getItem('user'))
                    window.location.reload();
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
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={e =>this.onChange(e)}
                 />
    
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} >Login</Button>
              </Segment>
            </Form>
         
         <NotificationContainer className="ui red message"/>
         
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