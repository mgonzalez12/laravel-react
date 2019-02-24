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

	deleteUser(user){
		console.log(user);

		var $this = this
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
				   		<tr>
						    <th scope="row">{user.id}</th>
						      <td>{user.name}</td>
						      <td>{user.email}</td>
						      <td>
						      <a href="" className="btn btn-primary">edit</a>
						      <a href="" className="btn btn-danger" onClick={this.deleteUser.bind(this,user)} >delete</a>
						      </td>
						</tr>
				   	)
				   )}
				   
				   
				  </tbody>
				</table>
			</div>
		)
	}
}


if (document.getElementById('app')) {
    ReactDOM.render(<User />, document.getElementById('app'));
}

