import React, { Component } from 'react';
import axios from "axios";

import Global from "../Global"

class Products extends Component{

	state = {
		items: [],
		status: null
	}

	componentWillMount() {
		this.getProducts();
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

	render () {
		if (this.state.items.length >= 1) {
			return (
				<div id="content">
				<div className="link">
					<a href="/product">Nuevo</a>
				</div>
				{this.state.status === "success" &&
					this.state.items.map((item) => {
						return (<div className="card" key={item._id}>
					      <div className="card-body">
					        <h5 className="card-title">{item.name}</h5>
					        <h6 className="card-subtitle mb-2 text-muted">{item.category}</h6>
					        <p className="card-text">{item.description}</p>
					      </div>
				    	</div>)
					})
				}
			    </div>
			);
		} else {
			return (
				<div>no hay productos</div>
			)
		}
		
	}
}

export default Products;