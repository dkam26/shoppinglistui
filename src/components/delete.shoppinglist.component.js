import React from 'react';

class Deleteshoppinglist extends React.Component{
    render(){
        console.log(this.props.match.params.name);
        return(
            <div>
               deleteshoppinglists
               {this.props.match.params.name}
            </div>
        );        
    }

}
export default Deleteshoppinglist;