import React from 'react';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import { Button, Menu ,Container,Segment,Form, Grid} from 'semantic-ui-react';
class EditItem extends React.Component{
    constructor() {
        super();
        this.state = {
            shoplist:'',
            product:'',
            newamount:'',
            newquantity:''
        }
    }
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            const  history = createHistory();
            window.location.reload();
            history.push('/');

        }
    }
    getItem =()=>{
        this.setState({product: this.props.match.params.product});
        this.setState({shoplist: this.props.match.params.itemshoppinglist});
        this.setState({newamount:this.props.match.params.amount,})
        this.setState({newquantity:this.props.match.params.quantity,})
        console.log(this.state.shoplist)
    }
    onChange = (e) => {
        if(e.target.value)
        {
            this.setState({[e.target.name] : e.target.value,})
        }
        
    }
    getLists=(shoppinglist)=>{
        const history = createHistory();
        window.location.reload();
        let url = "/items/"+shoppinglist
        history.push(url);
    }
    componentWillMount(){
        this.getItem();
     }
     onSubmit =() => {
        console.log(this.state.newamount)
        axios.put('http://127.0.0.1:5000/shoppinglist/'+this.state.shoplist+'/items/'+this.state.product,
        { Quantity:this.state.newquantity,AmountSpent:this.state.newamount}, {
            headers: {'x-access-token': localStorage.getItem('token'),
        }
          })
          .then((response) => {
            const history = createHistory();
            window.location.reload();
            history.push('/items/'+this.state.shoplist); 
            
            
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
                      placeholder={this.props.match.params.quantity}
                      onChange={e =>this.onChange(e)}
                    />
                     Amount:<Form.Input
                      fluid
                    name='newamount'
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
                </div>
        );
    }
}
export default EditItem;