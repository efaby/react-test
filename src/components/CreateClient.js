import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import axios from "axios";

import Global from "../Global";
import SimpleReactValidator from "simple-react-validator";

class CreateClient extends Component{

	nameRef = React.createRef();
	ageRef = React.createRef();
	constructor(props) {
	    super(props);
	    this.state = {item: {}, status: null};
	}

	componentWillMount() {
		this.validator = new SimpleReactValidator();
	}

	changeState = () => {
		this.setState({
			item: {
				name: this.nameRef.current.value,
				age: this.ageRef.current.value
			}
		})
	}

	saveClient = (e) => {
		e.preventDefault();
		this.setState();
		if (this.validator.allValid()) {
			axios.defaults.headers.common['access-token'] = Global.token;
			axios.post(Global.url + "client", this.state.item)
				.then(res => {
					console.log(res);
					if (res.data.client) {
						this.setState({
							status: 'success'
						})
					}
					
				})	
			} else {
				this.validator.showMessages();
				this.forceUpdate();
			}
		
	}

	render () {
		if (this.state.status === "success") {
			return <Redirect to="/clients" />
		}
this.validator.purgeFields();
			return (
				<div className="col-sm-6">
					<section id="content">
						<h3 className="subheader"> Crear Cliente </h3>
						<form onSubmit={this.saveClient}>
						<div className="form-group">
							<label>Nombre</label>
							<input type="text" className="form-control" name="name" ref={this.nameRef} onChange={this.changeState}/>
							{this.validator.message('name', this.state.item.name, "required|alpha" )}
						</div>
						<div className="form-group">
							<label>Edad</label>
							<input type="text" className="form-control" name="age" ref={this.ageRef} onChange={this.changeState}/>
							{this.validator.message('age', this.state.item.age, "required|numeric" )}
						</div>
						<input type="submit" value="Guardar" className="btn btn success" />
						<a href="/clients" className="btn btn success">Cancelar</a>
						</form>
					</section>
			    </div>
			);
		
	}
}

export default CreateClient;