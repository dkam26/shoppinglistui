import React from 'react';
import Button from 'antd/lib/button';
import { Input  } from 'antd';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
class AddItem extends React.Component{
    state = {
        item: '',
        Quantity: '',
        Amountspent: ''
        }
    onChange = (e) => {
            this.setState({[e.target.name] : e.target.value,})
        }
    onSubmit =() => {
            // console.log(localStorage.getItem('token'))
            console.log(this.state.shoppinglist)
            console.log(localStorage.getItem('user'))
            let additem={product:this.state.item,Quantity:this.state.Quantity,Amountspent:this.state.Amountspent}
            console.log(shoplist)
            axios.post('http://127.0.0.1:5000/addshoppinglists/?user='+localStorage.getItem('user'),
           { newlist:this.state.shoppinglist},
            {headers: {'x-access-token': localStorage.getItem('token'),
           }}
            
         )
              .then(function (response) {
                  console.log(response);
                    const history = createHistory();
                    window.location.reload();
                    history.push('/shoppinglists');  
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    render(){
        
        return(
            <div>
              add list
              <form method ="POST" >
                <Input  name="item" placeholder="Item" onChange={e =>this.onChange(e)} required/><br/>
                <Input  name="Quantity" placeholder="Quantity" onChange={e =>this.onChange(e)} required/><br/>
                <Input  name="Amountspent" placeholder="Amount spent" onChange={e =>this.onChange(e)} required/><br/>
                 <Button onClick={()=>this.onSubmit()} type="primary">Add</Button><br/>
            </form>
            </div>
        );        
    }

}
export default AddItem;