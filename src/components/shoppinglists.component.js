import React from 'react';
import axios from 'axios';
import {URL,history}  from '../config'
import { Pagination,Button,List, Menu ,Container,Segment,Popup,Input} from 'semantic-ui-react';
class Shoppinglists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shoppinglists:[],
            word:'',
            activePage: 1,
            totalPages:1,
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
        axios.get(URL+'search/?q='+this.state.word,
            {headers: {'x-access-token': localStorage.getItem('token'),
        }}  
        ).then( (response)=> {
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
    //Function called before component is rendered.It verifies if user is login
    componentDidMount(){
         if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
        history.push('/');

        }else{
            this.fetchList();
        }
    
   
    }
    //Function redirects user to edit shoopinglist name
    editList =(shoppinglist)=>{
        history.push('/editshoppinglist/'+shoppinglist);
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
            history.push('/shoppinglists'); 
            
            
          })
          .catch(function (error) {
            console.log(error);
          }); 
        }   
         else {
            history.push('/');
          } 
  
    }
    //Function redirects user to add a new shoopinglist
    addList =()=>{
        let url = "/addshoppinglist/"
        history.push(url);
    }
    //Function returns the items of a shoppinglist
    getItems =(shoppinglist)=>{
        let url = "/items/"+shoppinglist
        history.push(url);
    }
    //Render function
    render(){
        const { activePage } = this.state
       
        return(
        <div >
           
        <Container>
            <Segment>
                <Menu secondary style={{backgroundColor:"black"}}>
                    <Menu.Item name='SHOPPINGLIST' style={{color:"white"}}/>
                    <Menu.Menu position='right'>
                       
                    </Menu.Menu>
                </Menu>
             </Segment>
            <Segment>
                    <Menu secondary >
                                <Menu.Menu >
                                    <Menu.Item>
                                    <Popup
                                        trigger={<Button icon='add' onClick={()=>this.addList()} />}
                                         content='Add shoppinglist'

                                    />
                                    </Menu.Item>
                                </Menu.Menu>
                                <Menu.Menu  >
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
                                                <Button onClick={()=>this.DeleteList(listValue)}>Delete</Button>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={()=>this.editList(listValue)}>Editlist</Button>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Button onClick={()=>this.getItems(listValue)}>Content</Button>
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
    </Container>
        </div>
       
        );
    }
   
    
}
export default Shoppinglists;