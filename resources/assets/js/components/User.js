import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class User extends Component{
	constructor(){
		super();
		this.state={
			data:[]
		}
	}

	componentWillMount(){
		let $this = this;

		axios.get('api/users').then(response=>{
			$this.setState({
				data:response.data
			})
		}).catch(error =>{
			console.log(error)
		}) 
	}

	
	render(){
		return(
			<div> 
			<h2> User Listing</h2>
			<a href="/users/create" className="btn btn-primary">Add New User</a>
				
				<table className="table table-bordered">
				  <thead>
				    <tr>
				      <th scope="col">#</th>
				      <th scope="col">First</th>
				      <th scope="col">Last</th>
				      <th scope="col">Action</th>
				    </tr>
				  </thead>
				  <tbody>
				   { this.state.data.map((user, i)=>(
				   		<UserRow key={i} i={i} user={user} object={this} />
				   	)
				   )}
				   
				   
				  </tbody>
				</table>
			</div>
		)
	}
}


 class UserRow extends Component{
 	deleteUser(user,object){
		console.log(user);

		var $this = object
		axios.delete('/api/users/'+user.id).then(response=>{
			console.log(response)

			const newState = $this.state.data.slice();
			newState.splice(newState.indexOf(user),l)
			$this.setState({
				data:newState
			})
		}).catch(error => {
			console.log(error)
		})

	}
		render(){
			return(
				
		<tr>
			<th scope="row">{this.props.user.id}</th>
			<td>{this.props.user.name}</td>
			<td>{this.props.user.email}</td>
			<td>
				<a href={"/users/"+this.props.user.id+"/edit"} className="btn btn-primary">edit</a>
				<a href="javascript:;" className="btn btn-danger"  onClick={this.deleteUser.bind(this,this.props.user, this.props.object)}>delete</a>
			</td>
		</tr>

		
		)
	}
}

if (document.getElementById('app')) {
    ReactDOM.render(<User />, document.getElementById('app'));
}

