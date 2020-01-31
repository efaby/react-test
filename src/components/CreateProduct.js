import React, { Component } from 'react';
import {Redirect} from "react-router-dom"
import axios from "axios";

import Global from "../Global"
import SimpleReactValidator from 'simple-react-validator';

class CreateProduct extends Component{

	nameRef = React.createRef();
	descriptionRef = React.createRef();
	categoryRef = React.createRef();

	constructor(props) {
	    super(props);
	    this.state = {item: {}, status: null};
	}

	componentWillMount() {
		this.validatorProduct = new SimpleReactValidator();
	}

	changeState = () => {
		this.setState({
			item: {
				name: this.nameRef.current.value,
				description: this.descriptionRef.current.value,
				category: this.categoryRef.current.value
			}
		})
	}

	saveProduct = (e) => {
		e.preventDefault();
		this.setState();
		if (this.validatorProduct.allValid()) {
			axios.defaults.headers.common['access-token'] = Global.token;
			axios.post(Global.url + "product", this.state.item)
				.then(res => {
					if (res.data.product) {
						this.setState({
							status: 'success'
						})
					}
					
				})	
		} else {
			this.validatorProduct.showMessages();
			this.forceUpdate();
		}
	}

	render () {
		if (this.state.status === "success") {
			return <Redirect to="/products" />
		}
this.validatorProduct.purgeFields();
			return (
				<div className="col-sm-6">
					<section id="content">
						<h3 className="subheader"> Crear Producto </h3>
						<form onSubmit={this.saveProduct}>
						<div className="form-group">
							<label>Nombre</label>
							<input type="text" className="form-control" name="name" ref={this.nameRef} onChange={this.changeState}/>
							{this.validatorProduct.message('name', this.state.item.name, 'required|alpha')}
						</div>
						<div className="form-group">
							<label>Categoria</label>
							<select name="categoria" className="form-control" ref={this.categoryRef}>
							  <option value="computers">Computadoras</option> 
							  <option value="phones">Telefonos</option>
							  <option value="accesories">Accesorios</option>
							</select>
						</div>
						<div className="form-group">
							<label>Descripcion </label>
							<textarea className="form-control" name="description" ref={this.descriptionRef} onChange={this.changeState} ></textarea>
							{this.validatorProduct.message('description', this.state.item.description, "required" )}
						</div>
						<input type="submit" value="Guardar" className="btn btn success" />
						<a href="/products" className="btn btn success">Cancelar</a>
						</form>
					</section>
			    </div>
			);
		
	}
}

export default CreateProduct;