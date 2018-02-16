import React from 'react';
import axios from 'axios';
import {URL,history}  from '../config'
import { Button, Menu ,Container,Segment,Form, Grid} from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
class EditItem extends React.Component{
    constructor() {
        super();
        this.state = {
            shoplist:'',
            product:'',
            newamount:'',
            newquantity:'',
        }
    }
     //Function called before component is rendered.It verifies if user is login
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            history.push('/');

        }else{
            this.getItem();
        }
    }
     //Sets the state of the product,newamount,newquantity
    getItem =()=>{
        this.setState({
            product: this.props.match.params.product,
            shoplist: this.props.match.params.itemshoppinglist,
            newamount:this.props.match.params.amount,
            newquantity:this.props.match.params.quantity
        });

    }
    onChange = (e) => {
        if(e.target.value)
        {
            this.setState({[e.target.name] : e.target.value,})
        }
        
    }
    //Returns user to the items page
    getLists=(shoppinglist)=>{
        let url = "/items/"+shoppinglist
        history.push(url);
    }
     //Enables the editing of a item name
     onSubmit =() => {
        axios.put(URL+'shoppinglist/'+this.state.shoplist+'/items/'+this.state.product,
        { Quantity:this.state.newquantity,AmountSpent:this.state.newamount}, {
            headers: {'x-access-token': localStorage.getItem('token'),
        }
          })
          .then((response) => {
              console.log(response)
            if(response.data["Message"]==="Quantity or Amountspent cant be negative values"){
                let myColor = { background: 'red', text: "#FFFFFF" };
                notify.show("Quantity or Amountspent cant be negative values", "custom", 5000, myColor)
            }if(response.data["Message"]==="Invalid Input"){
                let myColor = { background: 'red', text: "#FFFFFF" };
                notify.show("Invalid Input", "custom", 5000, myColor)
            }else{
                console.log(response)
                history.push('/items/'+this.state.shoplist); 
            }
          })
          .catch(function (error) {
            console.log(error);
          });              
      
        
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
                                               <Button labelPosition='left' icon='left chevron' content='Back'  onClick={()=>this.getLists(this.state.shoplist)} />
                                            </Menu.Item> 
                                            </Menu.Menu>
                                        </Menu.Menu>
                                        <Menu.Menu  >
                                            <Menu.Item >
                                            <h3 style={{marginLeft:"308px"}}>Edit  {this.props.match.params.product} item</h3>
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
                Quantity: <Form.Input
                      fluid
                    name='newquantity'
                    type='integer'
                    value='static'
                      placeholder={this.props.match.params.quantity}
                      onChange={e =>this.onChange(e)}
                    />
                     Amount:<Form.Input
                      fluid
                    name='newamount'
                    type='integer'
                      placeholder={this.props.match.params.amount}
                      onChange={e =>this.onChange(e)}
                    />
                    <Button color='blue' fluid size='large' onClick={()=>this.onSubmit()} >Edit Item</Button>
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
export default EditItem;