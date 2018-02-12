import React from 'react';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
class Login extends React.Component{
   
    onChange = (e) => {
            this.setState({[e.target.name] : e.target.value,})
        }

    onSubmit =() => {
            console.log(this.state.username)
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
             
        // <div className ="App">
        // <div className ="form">
        //         <Input  name="username" placeholder="Username" onChange={e =>this.onChange(e)}  style={style} id="xx" /><br/>
        //        <Input  name="password" placeholder="Password" type="password"  onChange={e =>this.onChange(e)} style={style} /><br/>
        //         <Button onClick={()=>this.onSubmit()} type="primary">Login</Button><br/>
        //         <a href="/register">signup</a> 
        // </div>
        //     <NotificationContainer/>
        // </div>
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
            <Header as='h2' color='teal' textAlign='center'>
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
            <div>
         <NotificationContainer/>
         <div class="ui red message">Red</div>
         </div>
            <Message>
              New to us? <a href='/register'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
      
    }
 
};

export default Login;