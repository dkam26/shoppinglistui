import React from 'react';
import axios from 'axios';
import {URL,history}  from '../config'
import { Button, Menu ,Container,Segment,Form, Grid} from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';
class Editshoppinglist extends React.Component{
    constructor() {
        super();
        this.state = {
            shoppinglist:'',
            prevName:'',
            home:false,
        }
    }
    //Sets the state of the shoppinglist
    getshoppinglist =()=>{
        this.setState({
            prevName: this.props.match.params.name,
            shoppinglist:this.props.match.params.name

        });
        console.log(this.state.prevName)
    }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value,})
    }
    //Enables the editing of a shoppinglist name
    onSubmit =() => {
        
        axios.put(URL+'shoppinglists/'+this.state.prevName,
        { newName:this.state.shoppinglist}, 
            {
                headers: {'x-access-token': localStorage.getItem('token'),
            }
          })
          .then((response) => {
            let myColor = { background: 'red', text: "#FFFFFF" };
            if(response.data['Error'] === '404')
            {
              notify.show("Missing information ", "custom", 5000, myColor)
            }if(response.data['Success']==='200'){
                let myColor = { background: 'red', text: "#FFFFFF" };
                notify.show("Shoppinglist updated", "custom", 5000, myColor)
                history.push('/shoppinglists');
            }
            
            
            
          })
          .catch(function (error) {
            console.log(error);
          });              
      
        
    }
    //Function called before component is rendered.It verifies if user is login
    componentDidMount(){
        if(!localStorage.getItem('token') && !localStorage.getItem('user')){
            this.setState({redirect:true})

        }else{
            this.getshoppinglist();
        }
    }
    //Returns user to shoppinglists page
    getLists=()=>{
        history.push('/shoppinglists');
    }


    render(){
        if(this.state.home)
            return <Redirect to='/'/>
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
                                        <h3 style={{marginLeft:"308px"}}>Edit  {this.state.prevName} list</h3>
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
                type='text'
                name='shoppinglist'
                value={this.state.shoppinglist}
                onChange={e =>this.onChange(e)}
                  required
                />
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} id ='EditShoppinglist'>Rename shoppinglist</Button>
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