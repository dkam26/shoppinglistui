import React from 'react';
import axios from 'axios';
import {URL,history}  from '../config'
import { Button, Menu ,Container,Segment,Form, Grid} from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
class Editshoppinglist extends React.Component{
    constructor() {
        super();
        this.state = {
            shoppinglist:'',
            newName:'',
        }
    }
    //Sets the state of the shoppinglist
    getshoppinglist =()=>{
        this.setState({shoppinglist: this.props.match.params.name});
    }
    onChange = (e) => {
        if(e.target.value){
            this.setState({[e.target.name] : e.target.value,})
        }else{
            this.setState({[e.target.name] : this.state.shoppinglist})
        }
        
    }
    //Enables the editing of a shoppinglist name
    onSubmit =() => {
        axios.put(URL+'shoppinglists/'+this.state.shoppinglist,
        { newName:this.state.newName}, 
            {
                headers: {'x-access-token': localStorage.getItem('token'),
            }
          })
          .then((response) => {
            let myColor = { background: 'red', text: "#FFFFFF" };
            if(response.data['Message'] === 'Missing information')
            {
              notify.show("Missing information ", "custom", 5000, myColor)
            }else{
            
                history.push('/shoppinglists');
            }
            
            
            
          })
          .catch(function (error) {
            console.log(error);
          });              
      
        
    }
    //Function called before component is rendered.It verifies if user is login
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            history.push('/');

        }else{
            this.getshoppinglist();
        }
    }
    //Returns user to shoppinglists page
    getLists=()=>{
        history.push('/shoppinglists');
    }


    render(){
        return(
                  
        <div>
        <Container>
                    <Segment>
                        <Menu secondary style={{backgroundColor:"black"}}>
                            <Menu.Item name='SHOPPINGLIST' style={{color:"white"}} onClick={this.handleItemClick} />
                            <Menu.Menu position='right'>
                                <Menu.Item name='logout' style={{color:"white"}} onClick={this.handleItemClick} />
                            </Menu.Menu>
                        </Menu>
                    </Segment>
                    <Segment>
                        <Menu secondary >
                                    <Menu.Menu >
                                       
                                        <Menu.Menu position='right'>
                                        <Menu.Item>
                                           <Button labelPosition='left' icon='left chevron' content='Back'  onClick={()=>this.getLists()} />
                                        </Menu.Item> 
                                        </Menu.Menu>
                                    </Menu.Menu>
                                    <Menu.Menu  >
                                        <Menu.Item >
                                        <h3 style={{marginLeft:"308px"}}>Edit  {this.props.match.params.name} list</h3>
                                        </Menu.Item>
                                    </Menu.Menu>
                                   
                        </Menu>
                       
                    </Segment>
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
            <Form size='large'>
              <Segment stacked>
              <Form.Input
                  fluid
                name='newName'
                  placeholder={this.state.shoppinglist}
                  onChange={e =>this.onChange(e)}
                />
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} >Rename shoppinglist</Button>
              </Segment>
            </Form>
  
          </Grid.Column>
        </Grid>
        </div>
                </Container>
                <Notifications />
            </div>
        );
    }
}
export default Editshoppinglist;