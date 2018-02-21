import React from 'react';
import axios from 'axios';
import {URL}  from '../config'
import { Input} from 'semantic-ui-react';
import {notify} from 'react-notify-toast';
class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            shoppinglists:[],
            word:'',
            totalPages:1,
            home:false,
            items:false,
            list:'',
            addshoppinglist:false,
            editshoppinglist:false,
            userlists:false,
           
        };
        
    }
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
        console.log(response)
        this.setState({totalPages:response.data['pages']})
        this.setState({shoppinglists: response.data['Message']}); 
        })
        .catch(function (error) {
            console.log(error);
         })
         }
    }
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
render(){
    return(<div>
        <Input name="word" icon='search' placeholder='Search by name...'  onChange={this.onChange} onKeyUp={this.handleKeyup}/>
        </div>);
    }
}
export default Search;
