import React from 'react';
import { Input  } from 'antd';
import Button from 'antd/lib/button';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
class EditItem extends React.Component{
    constructor() {
        super();
        this.state = {
            shoplist:'',
            product:'',
            newamount:'',
            newquantity:''
        }
    }
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            const  history = createHistory();
            window.location.reload();
            history.push('/');

        }
    }
    getItem =()=>{
        let item = this.props.match.params.product;
        let shoplist = this.props.match.params.itemshoppinglist;
        this.setState({product: item});
        this.setState({shoplist: shoplist});
        console.log(this.state.shoplist)
    }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value,})
    }
    componentWillMount(){
        this.getItem();
     }
     onSubmit =() => {
        
        axios.put('http://127.0.0.1:5000/shoppinglist/'+this.state.shoplist+'/items/'+this.state.product,
        { Quantity:this.state.newquantity,AmountSpent:this.state.newamount}, {
            headers: {'x-access-token': localStorage.getItem('token'),
        }
          })
          .then((response) => {
            const history = createHistory();
            window.location.reload();
            history.push('/items/'+this.state.shoplist); 
            
            
          })
          .catch(function (error) {
            console.log(error);
          });              
      
        
    }
    render(){
        return(
            <div>
               editItem
               <form method ="POST" >
               <Input  name="newamount" placeholder="New Amount" onChange={e =>this.onChange(e)} required/><br/>
               <Input  name="newquantity" placeholder="New Quantity" onChange={e =>this.onChange(e)} required/><br/>
                 <Button onClick={()=>this.onSubmit()} type="primary">Change Info</Button><br/>
            </form>
               
            </div>
        );
    }
}
export default EditItem;