import React, { Component } from 'react';
import axios from "axios";

import Global from "../Global"

class Sales extends Component{

	state = {
		items: [],
		clients: [],
		status: null,
		save: null
	}

	productRef = React.createRef();
	clientRef = React.createRef();

	componentWillMount() {
		this.getProducts();
		this.getClients();
	}

	getProducts = () => {
		axios.defaults.headers.common['access-token'] = Global.token;
		axios.get(Global.url + "product")
			.then(res => {
				this.setState({
					items: res.data.products,
					status: 'success'
				})
			})		

	}

	getClients = () => {
		axios.defaults.headers.common['access-token'] = Global.token;
		axios.get(Global.url + "client")
			.then(res => {
				console.log("llego", res)
				this.setState({
					clients: res.data.clients,
					status: 'success'
				})
			})		

	}

	saveSales = (e) => {
		e.preventDefault();
		axios.defaults.headers.common['access-token'] = Global.token;
		axios.put(Global.url + "product/sale/" + this.productRef.current.value, {clientId: this.clientRef.current.value})
			.then(res => {
				if (res.data.product) {
					this.setState({
						save: "ok"
					})
					this.getProducts();
					this.getClients();
				}
				
			})
	}

	render () {
		
		if (this.state.items.length >= 1) {
			return (

				<div className="col-sm-6">
				<h3 className="subheader"> Ventas </h3>
				{this.state.save === "ok" &&
					<div className="message"> Venta Almacenada </div>
				}
				<div className="form-group">
				<label>Producto</label>
				<select name="product" className="form-control" ref={this.productRef}>
				{this.state.status === "success" &&
					this.state.items.map((item) => {
						return (
						<option value={item._id}  key={item._id}>{item.name}</option>
						)
					})
				}
				</select>
			    </div>
			    <div className="form-group">
				<label>Clientes</label>
				<select name="client" className="form-control" ref={this.clientRef}>
				{this.state.status === "success" &&
					this.state.clients.map((item) => {
						return (
						<option value={item._id}  key={item._id}>{item.name}</option>
						)
					})
				}
				</select>
			    </div>
			    <form onSubmit={this.saveSales}>
			    <input type="submit" value="Guardar" className="btn btn success" />
				<a href="/" className="btn btn success">Cancelar</a>
				</form>
			    </div>
			);
		} else {
			return (
				<div>no hay productos</div>
			)
		}
		
	}
}

export default Sales;