import React from 'react';
import axios from 'axios';
import {URL,history}  from '../config'
import Notifications, {notify} from 'react-notify-toast';
import { Icon,Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
export class Register extends React.Component{
    constructor() {
        super();
    this.state = {
        username: '',
        email: '',
        password: '',
        surname: '',
        firstname: ''
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
     //Function to get inputs from the form and set the state
    onChange =(e)=> {
        this.setState({[e.target.name] : e.target.value,})
    }
    //Function redirects user to the login page
    home=()=>{
      history.push('/');
    }
    //Function registers user
    onSubmit = () => {
        
        axios.post(URL+'auth/register/', {
            Firstname: this.state.firstname,
            Surname: this.state.surname,
            user:this.state.username,
            Password:this.state.password,
            Email:this.state.email
          })
          .then(function (response) {
            let myColor = { background: 'red', text: "#FFFFFF" };
              if(response.data['Success']==='200')
              {
                history.push('/');  
              }if(response.data['Error'] ==='403'){
                notify.show("User exists", "custom", 5000, myColor)
              }if(response.data['Error'] ==='404'){
                notify.show("Invalid email", "custom", 5000, myColor)
              }if(response.data['Error'] === '401'){
                notify.show("firstname or surname cant be numbers ", "custom", 5000, myColor)
              }if(response.data['Error'] ==='400'){
                notify.show("Missing information about the user ", "custom", 5000, myColor)
              }
          })
          .catch(function (error) {
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
            <Header as='h2' color='teal' textAlign='center'>
            Register
            </Header>
            <Form size='large'>
              <Segment stacked>
              <Form.Input
                  fluid
                  name='surname'
                  icon='user'
                  iconPosition='left'
                  placeholder='Surname'
                  onChange={e =>this.onChange(e)}
                />
                <Form.Input
                  fluid
                  name='firstname'
                  icon='user'
                  iconPosition='left'
                  placeholder='First name'
                  onChange={e =>this.onChange(e)}
                />
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
                <Form.Input
                  fluid
                  name='email'
                  icon='user'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={e =>this.onChange(e)}
                />
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} >Create Account</Button>
                <div style={{padding:"17px"}}>
                <Icon name="arrow circle outline left" size="large" onClick={()=>this.home()}/>Back
                </div>
                {/* <Button labelPosition='left' icon='left chevron' content='Back'  onClick={()=>this.home()} /> */}
              </Segment>
            </Form>
      
          </Grid.Column>
        </Grid>
        <Notifications />
        </div>
    );
    }
};

export default Register;