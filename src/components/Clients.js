import React, { Component } from 'react';
import axios from "axios";

import Global from "../Global"

class Clients extends Component{

	state = {
		items: [],
		status: null
	}

	componentWillMount() {
		this.getClients();
	}

	getClients = () => {
		axios.defaults.headers.common['access-token'] = Global.token;
		axios.get(Global.url + "client")
			.then(res => {
				console.log("llego", res)
				this.setState({
					items: res.data.clients,
					status: 'success'
				})
			})		

	}

	render () {
		if (this.state.items.length >= 1) {
			return (
				<div id="content">
				<div className="link">
					<a href="/client">Nuevo</a>
				</div>
				{this.state.status === "success" &&
					this.state.items.map((item) => {
						return (<div className="card" key={item._id}>
					      <div className="card-body">
					        <h5 className="card-title">{item.name}</h5>
					        <h6 className="card-subtitle mb-2 text-muted">{item.age} Años</h6>
					      </div>
				    	</div>)
					})
				}
			    </div>
			);
		} else {
			return (
				<div>no hay clientes</div>
			)
		}
		
	}
}

export default Clients;