import React from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import createHistory from 'history/createBrowserHistory';
class Items extends React.Component{
    constructor() {
        super();
        this.state = {
            items:[]
        }
    }
    fetchItems = () => {
        let shoplist = this.props.match.params.name;
        console.log(shoplist);
        axios.get('http://127.0.0.1:5000/shoppinglist/'+shoplist, {
            headers: {'x-access-token': localStorage.getItem('token'),
        }
          })
          .then((response) => {
            console.log(response);
            
          })
          .catch(function (error) {
            console.log(error);
          });              
      
}
editItem =(shoppinglist)=>{
    console.log('edititem');
    // const history = createHistory();
    // window.location.reload();
    // history.push('/editshoppinglist/'+shoppinglist);
}
DeleteItem =(shoppinglist)=>{ 
    console.log('Deleteitem');   
    // const history = createHistory();
    // window.location.reload();
    // let url = "/deleteshoppinglist/"+shoppinglist
    // history.push(url);
}
addItem =()=>{
    console.log('AddItem'); 
    // const history = createHistory();
    // window.location.reload();
    // let url = "/addshoppinglist/"
    // history.push(url);
}
componentWillMount(){
    this.fetchItems();
}
render(){
    console.log(this.props.match.params.name);
    return(
        
        <div>
            
            <ul>
                {this.state.items.map((listValue,index) => {
                    return <li key={index}>{listValue}<Button onClick={()=>this.editItem(listValue)} type="primary">Edit Item</Button><Button onClick={()=>this.DeleteItem(listValue)} type="primary">Delete Item</Button> </li>
                })}
            </ul>
            <ul>
                <li><Button onClick={()=>this.addItem()} type="primary">Add Item</Button></li>
            </ul>
        </div>
    );
}
}
export default Items;