import React from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import createHistory from 'history/createBrowserHistory';
import {NotificationContainer,NotificationManager} from 'react-notifications';
import logo from '../static/Login.jpg';

class Shoppinglists extends React.Component{
    constructor() {
        super();
        this.state = {
            shoppinglists:[]
        }
    }

    fetchList = () => {
       
            axios.get('http://127.0.0.1:5000/shoppinglists/?user='+localStorage.getItem('user'), {
                headers: {'x-access-token': localStorage.getItem('token'),
            }
              })
              .then((response) => {
                console.log(response.data);
                console.log(localStorage.getItem('user'));
                this.setState({shoppinglists: response.data['lists']});
              })
              .catch(function (error) {
                console.log(error);
              }); 
    }
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            const  history = createHistory();
            window.location.reload();
            history.push('/');

        }
    }
    editList =(shoppinglist)=>{
        const history = createHistory();
        window.location.reload();
        history.push('/editshoppinglist/'+shoppinglist);
    }
    DeleteList =(shoppinglist)=>{ 
        if(localStorage.getItem('token') && localStorage.getItem('user')){
        axios.delete('http://127.0.0.1:5000/shoppinglists/'+shoppinglist+'?user='+localStorage.getItem('user'),
         {
            headers: {'x-access-token': localStorage.getItem('token'),
        }
          })
          .then((response) => {
            const history = createHistory();
            window.location.reload();
            history.push('/shoppinglists'); 
            
            
          })
          .catch(function (error) {
            console.log(error);
          }); 
        }   
         else {
            NotificationManager.error('Token')
          } 
  
    }
    addList =()=>{
        const history = createHistory();
        window.location.reload();
        let url = "/addshoppinglist/"
        history.push(url);
    }
    getItems =(shoppinglist)=>{
        const history = createHistory();
        window.location.reload();
        let url = "/items/"+shoppinglist
        history.push(url);
    }
    componentWillMount(){
        this.fetchList();
    }

    render(){
        return(
            <div className="shoppinglists">
                <img src={logo}/><br/>
                {
                    this.state.shoppinglists.length
               ?(
                   
                <ul>
                    {this.state.shoppinglists.map((listValue,index) => {
                        return <li key={index}>{listValue}<Button onClick={()=>this.getItems(listValue)} type="primary">Contents</Button><Button onClick={()=>this.editList(listValue)} type="primary">Edit list</Button><Button onClick={()=>this.DeleteList(listValue)} type="primary">Delete list</Button> </li>
                    })}
                </ul>)
                :null}
                <ul>
                    <li><Button onClick={()=>this.addList()} type="primary">Add list</Button></li>
                </ul>
                <NotificationContainer/>
                
            </div>
        );
    }
   
    
}
export default Shoppinglists;