/*global localStorage */
import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import SampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		// initialize the state
		this.state = {
			fishes : {},
			order : {}
		};
	}

	componentWillMount() {

		// Initialize the fish state from FireBase
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
			context : this,
			state : 'fishes' 
		});

		//Initialize the order state from localStorage
		const order = localStorage.getItem(`order-${this.props.params.storeId}`);

		if(order) {
			this.setState({order: JSON.parse(order)});
		}

	}

	componentWillUnMount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order));
	}


	addFish(fish) {
		// deep copy the fish
		const fishes = {...this.state.fishes};

		// Update the fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;

		// Set the state
		this.setState({ fishes });
	}

	updateFish(key, updatedFish) {
		// deep copy the state
		const fishes = {...this.state.fishes};

		// Update the fish
		fishes[key] = updatedFish;

		// Set the state
		this.setState({fishes});
	}

	removeFish(key) {

		//deep copy the state
		const fishes = {...this.state.fishes};

		fishes[key] = null;

		this.setState({fishes});
	}

	addToOrder(key) {
		//deep copy the order
		const order = {...this.state.order};

		//update the order
		order[key] = order[key] ? order[key] + 1 : 1;

		//Set the state
		this.setState({order});
	}

	removeFromOrder(key) {
		// deep copy the order

		const order = {...this.state.order};

		//update the order
		delete order[key];

		//set the order
		this.setState({order});
	}

	loadSamples() {
		this.setState({fishes: SampleFishes});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh seafood market"/>
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
					</ul>
				</div>
				<Order order={this.state.order}
					fishes={this.state.fishes}
					params={this.props.params}
					removeFromOrder={this.removeFromOrder} />
				<Inventory
					addFish={this.addFish}
					loadSamples={this.loadSamples}
					fishes={this.state.fishes}
					updateFish={this.updateFish}
					removeFish={this.removeFish}
					storeId={this.props.params.storeId} />
			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object.isRequired
};
export default App;