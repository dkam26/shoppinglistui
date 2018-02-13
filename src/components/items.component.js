import React from 'react';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
import { Pagination,Button,List,Input, Menu ,Container,Segment,Popup} from 'semantic-ui-react';
class Items extends React.Component{
    constructor() {
        super();
        this.state = {
            items:[],
            shoplist:'',
            word:'',
            activePage: 1
        }
    }
    handlePaginationChange = (e, { activePage }) => {
        this.fetchItems();
        this.setState({ activePage } )}
    onChange = (e) => {
        this.setState({ word : e.target.value,}) 
    }   
    handleKeyup = (e)=>{
            if(this.state.word){
            axios.get('http://127.0.0.1:5000/searchProduct/?q='+this.state.word,
                {headers: {'x-access-token': localStorage.getItem('token'),
            }}  
            ).then( (response)=> {
                console.log(response.data['Searched product'])
                this.setState({items: response.data['Searched product']});
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
    }
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            const  history = createHistory();
            window.location.reload();
            history.push('/');

        }
        else{
             this.fetchItems();
        }
    }
    fetchItems = () => {
        let shoplist = this.props.match.params.name;
        this.setState({shoplist: shoplist});
        console.log(this.state.activePage)
        axios.get('http://127.0.0.1:5000/shoppinglist/'+shoplist+'?page_number='+this.state.activePage, {
            headers: {'x-access-token': localStorage.getItem('token'),
            
        }
          })
          .then((response) => {
            this.setState({items: response.data['Products']});
            
          })
          .catch(function (error) {
            console.log(error);
          });              
      
}
editItem =(shoppinglist)=>{
    
    let itemshoppinglist = this.state.shoplist;
    let amount = shoppinglist.Amountspent;
    let product = shoppinglist.Product;
    let quantity = shoppinglist.Quantity;
    const history = createHistory();
    window.location.reload();
    history.push('/editItem/'+itemshoppinglist+'/'+product+'/'+amount+'/'+quantity);
}
DeleteItem =(shoppinglist)=>{   
    let itemshoppinglist = this.state.shoplist;
    let product = shoppinglist.Product;
    axios.delete('http://127.0.0.1:5000/shoppinglist/'+itemshoppinglist+'/items/'+product,
    {
       headers: {'x-access-token': localStorage.getItem('token'),
   }
     })
     .then((response) => {
       const history = createHistory();
       window.location.reload();
       history.push('/items/'+itemshoppinglist); 
       
       
     })
     .catch(function (error) {
       console.log(error);
     });  
}
getLists =()=>{
    const  history = createHistory()
    window.location.reload();
    history.push('/shoppinglists')
}
addlists=()=>{
    const  history = createHistory();
    window.location.reload();
    history.push('/shoppinglists');
}
addItem =()=>{
    let shoplist = this.props.match.params.name;
    const history = createHistory();
    window.location.reload();
    let url = "/addItem/"+shoplist;
    history.push(url);
}
// componentWillMount(){
//     this.fetchList();
    
// }
render(){
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

                                        />
                                        </Menu.Item>
                                    </Menu.Menu>
                                    <Menu.Menu  >
                                        <Menu.Item >
                                        <h3 style={{marginLeft:"308px"}}>Items in {this.props.match.params.name} list</h3>
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
                                                <Button onClick={()=>this.editItem(listValue)}>EditItem</Button>
                                            </List.Content>
                                    </List.Item> 
                                </List>
                            </Segment>
                })}
                 <Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={50} style={{marginLeft:'318px'}}/>
                </Segment>
           
        )
        :<p>No items currently</p>
    }   

       </Container>
    </div>
    );
}
}
export default Items;


