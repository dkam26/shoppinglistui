import React from 'react';
import axios from 'axios';
import {URL}  from '../config'
import { Button, Menu ,Container,Segment,Form, Grid} from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';
class Addshoppinglist extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shoppinglist: '',
            home:false,
            shoppinglists:false,
            shop:false,
        }
    }
    //Function called before component is rendered.It verifies if user is login
    componentWillMount(){
            if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
                this.setState({redirect:true})
    
            }
        }
    //Returns user to the shoppinglist page
    getLists =()=>{
            this.setState({shoppinglists:true})
        }
    onChange = (e) => {
            this.setState({shoppinglist : e.target.value,})
        }
    //Function enables user to add a shoppinglist
    onSubmit =() => {
            axios.post(URL+'addshoppinglists/?user='+localStorage.getItem('user'),
           { newlist:this.state.shoppinglist},
            {headers: {'x-access-token': localStorage.getItem('token'),
           }}
            
         )
              .then((response)=> {
                let myColor = { background: 'red', text: "#FFFFFF" };
                if(response.data['Error'] === '404')
                    notify.show("No new list name included", "custom", 5000, myColor)
                if(response.data['Error'] === '403')
                    notify.show("lists exists", "custom", 5000, myColor)
                if(response.data['Success'] === '200')
                    this.setState({shop:true})       
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    render(){
        if(this.state.home)
            return <Redirect to='/'/>
        if(this.state.shoppinglists)
            return <Redirect to='/shoppinglists'/>
        if(this.state.shop)
            return <Redirect to='/shoppinglists'/>
        return(
            <div >
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
                                            <Menu.Item>
                                            </Menu.Item>
                                        </Menu.Menu>
                                        <Menu.Menu  >
                                            <Menu.Item >
                                            <h3 style={{marginLeft:"308px"}}>Add new Shoppinglist</h3>
                                            </Menu.Item>
                                        </Menu.Menu>
                                        <Menu.Menu position='right'>
                                        <Menu.Item>
                                            <Button labelPosition='left' icon='left chevron' content='Back' onClick={()=>this.getLists()} id ='addShoppinglist'/>
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
                  name='shoppinglist'
                  placeholder='shoppinglist'
                  onChange={e =>this.onChange(e)}
                  id = 'shoppingst' 
                />
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} >Create shoppinglist</Button>
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
export default Addshoppinglist;