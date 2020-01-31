import React, { Component } from 'react';
import axios from "axios";

import Global from "../Global";
import SimpleReactValidator from "simple-react-validator";

class Register extends Component{

	nameRef = React.createRef();
	emailRef = React.createRef();
	passwordRef = React.createRef();

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
				email: this.emailRef.current.value,
				password: this.passwordRef.current.value
			}
		})
	}

	saveRegister = (e) => {
		e.preventDefault();
		this.setState();
		if (this.validator.allValid()) {
			axios.post(Global.url + "register", this.state.item)
				.then(res => {
					if (res.data.status) {
						this.setState({
							save: "ok"
						})
					}
					
				})	
			} else {
				this.validator.showMessages();
				this.forceUpdate();
			}
		
	}

	render () {
this.validator.purgeFields();
			return (
				<div className="col-sm-6">
					<section id="content">
						<h3 className="subheader"> Registro Cliente API </h3>
						{this.state.save === "ok" &&
							<div className="message"> Usuario API registrado </div>
						}
						<form onSubmit={this.saveRegister}>
						<div className="form-group">
							<label>Nombre</label>
							<input type="text" className="form-control" name="name" ref={this.nameRef} onChange={this.changeState}/>
							{this.validator.message('name', this.state.item.name, "required|alpha" )}
						</div>
						<div className="form-group">
							<label>Email</label>
							<input type="text" className="form-control" name="email" ref={this.emailRef} onChange={this.changeState} />
							{this.validator.message('email', this.state.item.email, "required|email" )}
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" name="password" ref={this.passwordRef} onChange={this.changeState}/>
							{this.validator.message('password', this.state.item.password, "required" )}
						</div>
						<input type="submit" value="Guardar" className="btn btn success" />
						<a href="/" className="btn btn success">Cancelar</a>
						</form>
					</section>
			    </div>
			);
		
	}
}

export default Register;