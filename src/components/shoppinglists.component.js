import React from 'react';
import axios from 'axios';
class Shoppinglists extends React.Component{
    constructor() {
        super();
        this.state = {shoppinglists:''};
    }

    fetchList = () => {
            axios.get('http://127.0.0.1:5000/shoppinglists/?user='+localStorage.getItem('user'), {
                headers: {'x-access-token': localStorage.getItem('token'),
            }
              })
              .then((response) => {
                console.log(response);
                console.log(localStorage.getItem('user'));
              })
              .catch(function (error) {
                console.log(error);
              });              
          
    }

    componentWillMount(){
        this.fetchList();
    }

    render(){
        return(
        <div>
            <h1>hello</h1>

        </div>);
    }
}
export default Shoppinglists;