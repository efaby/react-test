import React from 'react';
import './App.css';

import Router from "./Router"

function App() {
  return (
  	<div className="center">
  		<h1>test React </h1>
  		<nav id="menu">
				<ul>
					<li>
						<a href="/">Inicio</a>
					</li>
					<li>
						<a href="/products">Productos</a>
					</li>
					<li>
						<a href="/clients">Clientes</a>
					</li>
					<li>
						<a href="/sales">Ventas</a>
					</li>
					<li>
						<a href="/report">Reporte</a>
					</li>
				</ul>
			</nav>
    	<Router />
    </div>
  );
}

export default App;
