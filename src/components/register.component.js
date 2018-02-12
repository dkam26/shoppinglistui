import React from 'react';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
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
    onChange (e) {
        this.setState({[e.target.name] : e.target.value,})
    }

    onSubmit () {
        
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
              </Segment>
            </Form>
  
          </Grid.Column>
        </Grid>
        </div>
    );
    }
};

export default Register;