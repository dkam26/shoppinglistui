import React from 'react';
import { Input  } from 'antd';
import Button from 'antd/lib/button';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
class Editshoppinglist extends React.Component{
    constructor() {
        super();
        this.state = {
            shoppinglist:'',
            newName:''
        }
    }
    getshoppinglist =()=>{
        let shoplist = this.props.match.params.name;
        this.setState({shoppinglist: shoplist});
    }
    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value,})
    }
    onSubmit =() => {
        
        axios.put('http://127.0.0.1:5000/shoppinglists/'+this.state.shoppinglist,
        { newName:this.state.newName}, {
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
    componentDidMount(){
        if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
            const  history = createHistory();
            window.location.reload();
            history.push('/');

        }
    }
    componentWillMount(){
        this.getshoppinglist();
     }
    render(){
        return(
            <div>
            
               To edit {this.state.shoppinglist} shopping-list
              
               <form method ="POST" >
               <Input  name="newName" placeholder="New title" onChange={e =>this.onChange(e)} required/><br/>
                 <Button onClick={()=>this.onSubmit()} type="primary">Rename</Button><br/>
            </form>
            </div>
        );
    }
}
export default Editshoppinglist;