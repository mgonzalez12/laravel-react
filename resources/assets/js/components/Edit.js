import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Edit extends Component{
	constructor(){
		super();
		this.state={
			name:'',
			email:'',
			password:''
		}
	}

	componentWillMount(){
		let id= this.props.id

		axios.get('/api/users/'+id).then(response =>{
			var user = response.data;

			this.setState({
				name:user.name,
				email:user.email
			})

			console.log(response.data)
		}).catch(error =>{
			console.log(error)
		})
	}

	handleNameChange(e){
		this.setState({
			name:e.target.value
		})
	}

	handleEmailChange(e){
		this.setState({
			email:e.target.value
		})
	}

	handlePasswordChange(e){
		this.setState({
			password:e.target.value
		})
	}	

	handleSubmit(e){
		e.preventDefault();
		console.log(this.state)

		axios.post('/api/users',this.state).then(response=>{
			console.log(response)
		}).then(error=>{ console.log(error)})
 	}
	render(){
		return(
			<div> 
			<h2>Add New User</h2>

			  <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)} >
                        <div className="form-group">
                            <label  className="col-md-4 control-label">Name</label>

                            <div className="col-md-6">
                                <input id="name" type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleNameChange.bind(this)}/>     
                            </div>
                        </div>

                        <div className="form-group">
                            <label  className="col-md-4 control-label">E-Mail Address</label>

                            <div className="col-md-6">
                                <input id="email" type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleEmailChange.bind(this)} /> 
                            </div>
                        </div>

                        <div className="form-group{">
                            <label className="col-md-4 control-label">Password</label>
                            <div className="col-md-6">
                                <input id="password" type="password" className="form-control" name="password" value={this.state.password} onChange={this.handlePasswordChange.bind(this)} />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="col-md-6 col-md-offset-4">
                                <button type="submit" className="btn btn-primary">
                                    Edit
                                </button>
                            </div>
                        </div>
                    </form>
                  </div>
		)	
	}
}


if (document.getElementById('edit')) {
	var id = $("#edit").data("id");
    ReactDOM.render(<Edit id={id}/>, document.getElementById('edit'));
}

