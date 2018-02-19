import React from 'react';
import axios from 'axios';
import {URL}  from '../config'
import { Pagination,Button,List, Menu ,Container,Segment,Popup,Input} from 'semantic-ui-react';
import Notifications, {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom';
class Shoppinglists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shoppinglists:[],
            word:'',
            activePage: 1,
            totalPages:1,
            home:false,
            items:false,
            list:false,
            addshoppinglist:false,
            editshoppinglist:false,
            userlists:false
        };
        
    }
    //implementation of pagination
    handlePaginationChange = (e, { activePage }) => {
        this.fetchList();
        this.setState({ activePage } )}
     //Function to get inputs from the form and set the state
    onChange = (e) => {
        e.preventDefault();
        this.setState({ word : e.target.value,}) 
    }
    //Function ensures auto search
    handleKeyup = (e)=>{
        e.preventDefault();
        if(this.state.word){
        axios.get(URL+'search/?q='+this.state.word+'&page_number='+this.state.activePage,
            {headers: {'x-access-token': localStorage.getItem('token'),
        }}  
        ).then( (response)=> {
            this.setState({totalPages:response.data['pages']})
            this.setState({shoppinglists: response.data['Message']}); 
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
    //Function queries shoopinglists for a given user
    fetchList = () => {
            axios.get(URL+'shoppinglists/?user='+
            localStorage.getItem('user')+'&page_number='+this.state.activePage, {
                headers: {'x-access-token': localStorage.getItem('token'),
            }
              })
              .then((response) => {
                this.setState({totalPages:response.data['pages']})
                this.setState({shoppinglists: response.data['lists']});
                
              })
              .catch(function (error) {
                console.log(error);
              }); 
    }
    //Function called before component is rendered.It verifies if user is logged in
    componentWillMount(){
        if (!localStorage.getItem('token') && !localStorage.getItem('user'))
            this.setState({redirect:true})
        else
            this.fetchList();      
    }
    //Function redirects user to edit shoopinglist name
    editList =(shoppinglist)=>{
        this.setState({editshoppinglist:true})
        this.setState({list:shoppinglist})
    }
    //Function enables deleting a shoppinglist
    DeleteList =(shoppinglist)=>{ 
        if(localStorage.getItem('token') && localStorage.getItem('user')){
        axios.delete(URL+'shoppinglists/'+shoppinglist+'?user='+localStorage.getItem('user'),
         {
            headers: {'x-access-token': localStorage.getItem('token'),
        }
          })
          .then((response) => {
            let myColor = { background: 'red', text: "#FFFFFF" };
            notify.show("Shoppinglist deleted", "custom", 5000, myColor)
           
           
            
            
          })
          .catch(function (error) {
            console.log(error);
          }); 
        }   
         else {
            this.setState({redirect:true})
          } 
  
    }
    //Function redirects user to add a new shoopinglist
    addList =()=>{
        this.setState({addshoppinglist:true})
    }
    //Function returns the items of a shoppinglist
    getItems =(shoppinglist)=>{
        this.setState({list:shoppinglist})
        this.setState({items:true})
    }
    //Render function
    render(){
        if(this.state.home)
            return <Redirect to='/'/>
        if(this.state.items)
            return <Redirect to={'/items/'+this.state.list}/> 
        if(this.state.addshoppinglist)
            return <Redirect to='/addshoppinglist/'/> 
        if(this.state.editshoppinglist)
            return <Redirect to={'/editshoppinglist/'+this.state.list}/> 
       
        const { activePage } = this.state
        return (
        <div>  
            <Container>
                <Segment>
                    <Menu secondary style={{backgroundColor:"black"}}>
                        <Menu.Item name='SHOPPINGLIST' style={{color:"white"}}/>
                        <Menu.Menu position='right'>
                        </Menu.Menu>
                    </Menu>
                </Segment>
                <Segment>
                    <Menu secondary>
                        <Menu.Menu>
                            <Menu.Item>
                                <Popup
                                    trigger={<Button icon='add' onClick={()=>this.addList()} />}
                                    content='Add shoppinglist'
                                    id = 'addshoppinglist'
                                />
                            </Menu.Item>
                        </Menu.Menu>
                        <Menu.Menu>
                            <Menu.Item >
                                <h3 style={{marginLeft:"308px"}}>Your Shoppinglists</h3>
                            </Menu.Item>
                        </Menu.Menu>
                            <Menu.Menu position='right'>
                                <Menu.Item>
                                <Input name="word" icon='search' placeholder='Search by name...' onChange={this.onChange} onKeyUp={this.handleKeyup}/>
                                    </Menu.Item> 
                                
                                </Menu.Menu>
                    </Menu>
        
                </Segment>
        {
            
            this.state.shoppinglists.length
            ?(
                
                    <Segment>                        
                        { this.state.shoppinglists.map((listValue,index) => {     
                                        
                           return <Segment key={index}>
                                    <List divided verticalAlign='middle' key={index}>
                                            <List.Item>
                                            <List.Content floated='right'>
                                                <Button onClick={()=>this.DeleteList(listValue)} id ='delete'>Delete</Button>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={()=>this.editList(listValue)} id ='Editlist'>Editlist</Button>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={()=>this.getItems(listValue)} id = 'content'>Content</Button>
                                            </List.Content>
                                            <List.Content>
                                            {listValue}
                                            </List.Content>
                                            </List.Item> 
                                    </List>
                                    
                                </Segment>
                                
                    })}
                    <Pagination activePage={activePage} onPageChange={this.handlePaginationChange} totalPages={this.state.totalPages} style={{marginLeft:'318px'}}/>
                    </Segment>
               
            )
            :<p>No lists</p>
        }
        <Notifications id ='alert'/>
    </Container>
        </div>
       
        );
    }
   
    
}
export default Shoppinglists;