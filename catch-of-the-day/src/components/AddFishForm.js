import React from 'react';

class AddFishForm extends React.Component {
	constructor(props) {
		super(props);
		this.createFish = this.createFish.bind(this);
	}

	createFish(event) {
		event.preventDefault();
		console.log(this);
		const fish = {
			name: this.name.value,
			price: this.price.value,
			status: this.status.value,
			desc : this.desc.value,
			image: this.image.value
		};
		console.log(fish);
		this.props.addFish(fish);
		this.form.reset();
	}

	render() {
		return (
			<form className="fish-edit" ref={(input) => this.form = input} onSubmit={this.createFish}>
				<input ref={(input) => this.name = input} type="text" placeholder="Fish Name" />
				<input ref={(input) => this.price = input} type="text" placeholder="Fish Price" />
				<select ref={(input) => this.status = input} >
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea ref={(input) => this.desc = input} placeholder="Fish Desc" ></textarea>
				<input ref={(input) => this.image = input} type="text" placeholder="Fish Image" />
				<button type="submit">+ Add Item</button>
			</form>
		);
	}
}

AddFishForm.propTypes = {
	addFish: React.PropTypes.func.isRequired
};

export default AddFishForm;