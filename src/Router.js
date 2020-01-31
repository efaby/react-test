import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Products from './components/Products'
import Error from './components/Error'
import Home from './components/Home'
import CreateProduct from './components/CreateProduct'
import Clients from './components/Clients'
import CreateClient from './components/CreateClient'
import Chart from './components/Chart'
import Sales from './components/Sales'


class Router extends Component {
	render(){
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route exact path="/products" component={Products}/>
					<Route exact path="/product" component={CreateProduct}/>
					<Route exact path="/clients" component={Clients}/>
					<Route exact path="/client" component={CreateClient}/>
					<Route exact path="/sales" component={Sales}/>
					<Route exact path="/report" component={Chart}/>
					<Route component={Error}/>
				</Switch>
			</BrowserRouter>
		)
	}
}


export default Router;