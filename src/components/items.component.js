import React from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import createHistory from 'history/createBrowserHistory';
class Items extends React.Component{
    constructor() {
        super();
        this.state = {
            items:[],
            shoplist:''
        }
    }
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            const  history = createHistory();
            window.location.reload();
            history.push('/');

        }
    }
    fetchItems = () => {
        let shoplist = this.props.match.params.name;
        this.setState({shoplist: shoplist});
        console.log(shoplist);
        axios.get('http://127.0.0.1:5000/shoppinglist/'+shoplist, {
            headers: {'x-access-token': localStorage.getItem('token'),
        }
          })
          .then((response) => {
            console.log(response.data['Products']);
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
    console.log(shoppinglist);   
    let itemshoppinglist = this.state.shoplist;
    let product = shoppinglist.Product;
    // const history = createHistory();
    // window.location.reload();
    // let url = "/deleteshoppinglist/"+shoppinglist
    // history.push(url);
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
addItem =()=>{
    let shoplist = this.props.match.params.name;
    console.log(shoplist); 
    const history = createHistory();
    window.location.reload();
    let url = "/addItem/"+shoplist;
    history.push(url);
}
componentWillMount(){
    this.fetchItems();
}
render(){
    
    
    return(
        
        <div>
            {
            this.state.items.length
               ?(<ul>
                    {this.state.items.map((listValue,index) => {
                        console.log(listValue)
                        return <li key={index}>{listValue.Product}:{listValue.Amountspent}:{listValue.Quantity}<Button onClick={()=>this.editItem(listValue)} type="primary">Edit Item</Button><Button onClick={()=>this.DeleteItem(listValue)} type="primary">Delete Item</Button> </li>
                    
                    })}
                </ul>)
                :null
            }
             <ul>
                <li><Button onClick={()=>this.addItem()} type="primary">Add Item</Button></li>
            </ul> 
        </div>
    );
}
}
export default Items;


