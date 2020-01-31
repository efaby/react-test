import React, { Component } from 'react';
import axios from "axios";

import Global from "../Global"
import AnyChart from 'anychart-react'

class Chart extends Component{

	state = {
		items: [],
		status: null,
		data: []
	}

	productRef = React.createRef();
	constructor(props) {
	  super(props)
	  // ...
	  this.getData = this.getData.bind(this)
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

	getData(event) {
		axios.defaults.headers.common['access-token'] = Global.token;
		axios.get(Global.url + "product/sale/" + event.target.value)
			.then(res => {
				let newdata = []
				res.data.product.salesData.forEach(item => {
					newdata[item.age] = item.times
				});
				this.setState({
					data: newdata
				})
				console.log("llego", res.data)
			})
	}

	render () {

			return (
				<div id="content">
				<div className="col-sm-6">
				<h3 className="subheader"> Reporte </h3>
				<div className="form-group">
				<label>Producto</label>
				<select name="product" className="form-control" ref={this.productRef} onChange={this.getData}>
				{this.state.status === "success" &&
					this.state.items.map((item) => {
						return (
						<option value={item._id}  key={item._id}>{item.name}</option>
						)
					})
				}
				</select>
			    </div>
			    </div>


				<AnyChart
				    type="column"
				    data={this.state.data}
				    title="Ventas por Edad"
				/>
			    </div>
				
			);

		
	}
}

export default Chart;