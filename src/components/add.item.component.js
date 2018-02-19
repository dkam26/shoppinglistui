import React from 'react';
import axios from 'axios';
import {URL}  from '../config'
import { Button, Menu ,Container,Segment,Form, Grid} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
class AddItem extends React.Component{
    constructor(){
    super();
    this.state = {
        item: '',
        Quantity: '',
        Amountspent: '',
        home:false,
        shoplist:'',
        shoppinglists:false,
        items:false,
        }
    
    }
    //Function called before component is rendered.It verifies if user is login
    componentDidMount(){
            if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
                this.setState({home:true})
    
            }else{
                this.setState({shoplist:this.props.match.params.name })  
            }
        }
    onChange = (e) => {
            this.setState({[e.target.name] : e.target.value,})
        }
         //Returns user to the shoppinglist page
    getLists =()=>{
        this.setState({shoppinglists:true})
    }
//Function enables user to add a shoppinglist
    onSubmit =() => {
            
            
            axios.post(URL+'shoppinglist/'
                    +this.state.shoplist+'/items/',
                {product:this.state.item,
                Quantity:this.state.Quantity,
                Amountspent:this.state.Amountspent 
                },
                    {headers: {'x-access-token': localStorage.getItem('token'),
                }}
           
         )
              .then( (response)=> {
                this.setState({items:true})
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    render(){
        if(this.state.home)
            return<div> 
                    <Redirect to='/'/>
                    </div>
        if(this.state.shoppinglists)
            return <Redirect to='/shoppinglists'/>
        if(this.state.items)
            return <Redirect to={'/items/'+this.state.shoplist}/>
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
                                            <h3 style={{marginLeft:"308px"}}>Add new item</h3>
                                            </Menu.Item>
                                        </Menu.Menu>
                                        <Menu.Menu position='right'>
                                        <Menu.Item>
                                            <Button labelPosition='left' icon='left chevron' content='Back' onClick={()=>this.getLists()} />
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
                  name='item'
                  placeholder='item'
                  onChange={e =>this.onChange(e)}
                  id = 'item'
                  type='text'
                />
                <Form.Input
                  fluid
                  name='Quantity'
                  placeholder='Quantity'
                  onChange={e =>this.onChange(e)}
                  id = 'Quantity'
                  type='number'
                />
                <Form.Input
                  fluid
                  name='Amountspent'
                  placeholder='Amount spent'
                  onChange={e =>this.onChange(e)}
                  id = 'Amountspent'
                  type='number'
                />
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} id ='add'>Add Item</Button>
              </Segment>
            </Form>
  
          </Grid.Column>
        </Grid>
        </div>
             </Container>
            </div>
        );        
    }

}
export default AddItem;