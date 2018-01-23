import React from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import createHistory from 'history/createBrowserHistory';
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
                console.log(response.data['lists']);
                console.log(localStorage.getItem('user'));
                this.setState({shoppinglists: response.data['lists']});
              })
              .catch(function (error) {
                console.log(error);
              });              
          
    }
    editList =(shoppinglist)=>{
        const history = createHistory();
        window.location.reload();
        history.push('/editshoppinglist/'+shoppinglist);
    }
    DeleteList =(shoppinglist)=>{    
        const history = createHistory();
        window.location.reload();
        let url = "/deleteshoppinglist/"+shoppinglist
        history.push(url);
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
            <div>
                <ul>
                    {this.state.shoppinglists.map((listValue,index) => {
                        return <li key={index}>{listValue}<Button onClick={()=>this.getItems(listValue)} type="primary">Contents</Button><Button onClick={()=>this.editList(listValue)} type="primary">Edit list</Button><Button onClick={()=>this.DeleteList(listValue)} type="primary">Delete list</Button> </li>
                    })}
                </ul>
                <ul>
                    <li><Button onClick={()=>this.addList()} type="primary">Add list</Button></li>
                </ul>
            </div>
        );
    }
    
    
}
export default Shoppinglists;