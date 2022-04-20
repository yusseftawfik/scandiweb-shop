// product description page
import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/products/Actions";
import "../../Styles/PDP.scss";

class PDP extends Component {
	state = {
		index: 0
	}
	render () {
		console.log(this.props.currentItem.gallery);
		return (
			<>
				<Navbar />
				<div className="pdp">
					<div className="gallery">
						<div className="mini">
							{this.props.currentItem.gallery.map((item, index) => (
								<img src={item} height="75" width="auto" alt="product" onClick={() => this.setState({ index: index })} />
							))}
						</div>
						<div className="main">
							<img src={this.props.currentItem.gallery[this.state.index]} height="550" width="500" alt="product" />
						</div>
					</div>
					<div className="data-container">
						<div className="product-name">
							<p>{this.props.currentItem.name}</p>
						</div>
						<div className="product-size">
							<span>{this.props.currentItem.attributes[0].name}</span>
							<div>
								{this.props.currentItem.attributes[0].items.map((item) => {
									return (
										<div className="attributes-value">{item.displayValue}</div>
									);
								})}
							</div>
						</div>
						<div className="product-price">
							<span>price:</span>
							<div>
								<span>{this.props.currentItem.price.currency.symbol}</span>
								<span>{this.props.currentItem.price.amount}</span>
							</div>
						</div>
						<div>
							<button
								onClick={() => this.props.addToCart(this.props.currentItem.id)}
							>
								add to cart
							</button>
						</div>
						<div className="description">
							{this.props.currentItem.description.replace(
								new RegExp("<[^>]*>", "g"),
								""
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (id) => dispatch(addToCart(id)),
	};
};

const mapStateToProps = (state) => {
	return {
		currentItem: state.products.currentItem,
		cart: state.products.cart,
		currency: state.products.currency,
		category: state.products.category,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PDP);
