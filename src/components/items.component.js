import React from 'react';
import axios from 'axios';
import {URL,history}  from '../config'
import Notifications, {notify} from 'react-notify-toast';
import { Pagination,Button,List,Input, Menu ,Container,Segment,Popup} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
class Items extends React.Component{
    constructor() {
        super();
        this.state = {
            items:[],
            shoplist:'',
            word:'',
            activePage: 1,
            totalPages:1,
            home:false,
        }
    }
     //implementation of pagination
    handlePaginationChange = (e, { activePage }) => {
        this.fetchItems();
        this.setState({ activePage } )}
     //Function to get inputs from the form and set the state
    onChange = (e) => {
        this.setState({ word : e.target.value,}) 
    }  
     //Function ensures auto search 
    handleKeyup = (e)=>{
            if(this.state.word){
            axios.get(URL+'searchProduct/?q='+this.state.word,
                {headers: {'x-access-token': localStorage.getItem('token'),
            }}  
            ).then( (response)=> {
                console.log(response.data['Searched product'])
                this.setState({items: response.data['Searched product']});
                this.setState({totalPages:response.data['pages']})
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
    }
    //Function called before component is rendered.It verifies if user is login
    componentWillMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            this.setState({redirect:true})

        }
        else{
             this.fetchItems();
        }
    }
      //Function queries items for a given shoppinglist
    fetchItems = () => {
       
        this.setState({shoplist: shoplist});
        axios.get(URL+'shoppinglist/'+shoplist+'?page_number='+this.state.activePage, {
            headers: {'x-access-token': localStorage.getItem('token'),
            
        }
          })
          .then((response) => {
            console.log(response.data['pages'])
            this.setState({totalPages:response.data['pages']})
            this.setState({items: response.data['Products']});
            
          })
          .catch(function (error) {
            console.log(error);
          });              
      
}
//Function redirects user to edit shoopinglist item
editItem =(shoppinglist)=>{
    history.push('/editItem/'+this.state.shoplist+
                '/'+shoppinglist.Product+
                '/'+shoppinglist.Amountspent+
                '/'+shoppinglist.Quantity);
}
 //Function enables deleting a shoppinglist item
DeleteItem =(shoppinglist)=>{   
    axios.delete(URL+'shoppinglist/'
                +this.state.shoplist+
                '/items/'+shoppinglist.Product,
    {
       headers: {'x-access-token': localStorage.getItem('token'),
   }
     })
     .then((response) => {
        let myColor = { background: 'red', text: "#FFFFFF" };
        notify.show("Item deleted ", "custom", 5000, myColor)
       history.push('/items/'+ this.state.shoplist); 
       
       
     })
     .catch(function (error) {
       console.log(error);
     });  
}
//Returns user to shoppinglists page
getLists =()=>{
    history.push('/shoppinglists')
}
//Enables user to add items
addItem =()=>{
    let url = "/addItem/"+this.props.match.params.name;
    history.push(url);
}
render(){
    if(this.state.home)
        return <Redirect to='/'/>
    const { activePage } = this.state
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
                                        <Menu.Item>
                                        <Popup
                                            trigger={<Button icon='add' onClick={()=>this.addItem()} />}
                                            content='Add item'
                                            id='addItem'

                                        />
                                        </Menu.Item>
                                    </Menu.Menu>
                                    <Menu.Menu  >
                                        <Menu.Item >
                                        <h3 style={{marginLeft:"308px"}}>Items in {this.state.shoplist} list</h3>
                                        </Menu.Item>
                                    </Menu.Menu>
                                    <Menu.Menu position='right'>
                                    <Menu.Item>
                                    <Input name="word" icon='search' placeholder='Search by name...' onChange={this.onChange} onKeyUp={this.handleKeyup}/>
                                        </Menu.Item> 
                                    
                                    </Menu.Menu>
                        </Menu>
                       
                    </Segment>
                    <Segment>
                    <Menu secondary >
                                        <Menu.Menu position='right'>
                                        <Menu.Item>
                                           <Button labelPosition='left' icon='left chevron' content='Back'  onClick={()=>this.getLists()} />
                                        </Menu.Item> 
                                        
                                        </Menu.Menu>
                        </Menu>
                    </Segment>
                    { this.state.items.length
                     ? (
            
                <Segment>                        
                    { this.state.items.map((listValue,index) => {     
                       return <Segment key={index}>
                       
                                <List divided verticalAlign='middle' key={index}>
                                    <List.Item>
                                        <List.Content  floated ='left'>
                                       Item: {listValue.Product}
                                       </List.Content>
                                            <List.Content floated ='left'>
                                                Price:{listValue.Amountspent}
                                                </List.Content>
                                            <List.Content floated ='left'>
                                            Quantity:  {listValue.Quantity}
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={()=>this.DeleteItem(listValue)}>Delete</Button>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={()=>this.editItem(listValue)} id ='EditItem'>EditItem</Button>
                                            </List.Content>
                                    </List.Item> 
                                </List>
                            </Segment>
                })}
                 <Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={this.state.totalPages} style={{marginLeft:'318px'}}/>
                </Segment>
           
        )
        :<p>No items currently</p>
    }   
     <Notifications />
       </Container>
    </div>
    );
}
}
export default Items;


