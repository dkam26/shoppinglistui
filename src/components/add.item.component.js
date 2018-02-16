import React from 'react';
import axios from 'axios';
import {URL,history}  from '../config'
import { Button, Menu ,Container,Segment,Form, Grid} from 'semantic-ui-react';
class AddItem extends React.Component{
    constructor(){
    super();
    this.state = {
        item: '',
        Quantity: '',
        Amountspent: '',
        }
    
    }
    componentDidMount(){
            if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
                history.push('/');
    
            }
        }
    onChange = (e) => {
            this.setState({[e.target.name] : e.target.value,})
        }
    getLists =()=>{
        history.push('/shoppinglists')
    }
    onSubmit =() => {
            let shoplst=this.props.match.params.name   
            axios.post(URL+'shoppinglist/'
                    +this.props.match.params.name+'/items/',
                {product:this.state.item,
                Quantity:this.state.Quantity,
                Amountspent:this.state.Amountspent 
                },
                    {headers: {'x-access-token': localStorage.getItem('token'),
                }}
           
         )
              .then(function (response) {
                let url = '/items/'+shoplst;
                 history.push(url);  
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    render(){
        
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
                />
                <Form.Input
                  fluid
                  name='Quantity'
                  placeholder='Quantity'
                  onChange={e =>this.onChange(e)}
                />
                <Form.Input
                  fluid
                  name='Amountspent'
                  placeholder='Amount spent'
                  onChange={e =>this.onChange(e)}
                />
                <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} >Add Item</Button>
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