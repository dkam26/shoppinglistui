import React from 'react';
import Button from 'antd/lib/button';
import { Input  } from 'antd';
import axios from 'axios';
import createHistory from 'history/createBrowserHistory';
class Addshoppinglist extends React.Component{
    state = {
        shoppinglist: '',
        }
    componentDidMount(){
            if(!localStorage.getItem('token')&& !localStorage.getItem('user')){
                const  history = createHistory();
                window.location.reload();
                history.push('/');
    
            }
        }
    onChange = (e) => {
            this.setState({shoppinglist : e.target.value,})
        }
    onSubmit =() => {
            // console.log(localStorage.getItem('token'))
            console.log(this.state.shoppinglist)
            console.log(localStorage.getItem('user'))
            let shoplist={newlist:this.state.shoppinglist}
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
                <Input  name="shoppinglist" placeholder="Add shoppinglist" onChange={e =>this.onChange(e)} required/><br/>
                
                 <Button onClick={()=>this.onSubmit()} type="primary">Add</Button><br/>
            </form>
            </div>
        );        
    }

}
export default Addshoppinglist;