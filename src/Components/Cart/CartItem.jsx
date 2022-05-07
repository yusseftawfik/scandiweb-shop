import React, { Component } from "react";
import { connect } from "react-redux";
import {
	removeFromCart,
	adjustQty,
	// selectAttribute,
} from "../../Redux/products/Actions";
import remove from "../../Assets/remove.svg";
import "../../Styles/CartItem.scss";
class CartItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qty: props.data.qty,
		};
	}
	increaseQty = (e) => {
		let currentQty = this.state.qty;
		this.props.adjustQty(this.props.data.id, currentQty);
		this.setState({ qty: currentQty + 1 });
	};
	decreaseQty = (e) => {
		let currentQty = this.state.qty;
		this.props.adjustQty(this.props.data.id, currentQty);
		this.setState({ qty: currentQty - 1 });
	};
	render () {
		console.log(this.props.data.selectedAttribute);
		return (
			<div className="cart-item">
				<div className="item-data">
					<div className="item-brand">{this.props.data.brand}</div>
					<div className="item-name">{this.props.data.name}</div>
					{this.props.data.prices.map((item, index) => {
						return item.currency.label === this.props.currency ? (
							<div className="item-price" key={index}>
								{item.amount.toLocaleString("en-US", {
									style: "currency",
									currency: this.props.currency,
								})}
							</div>
						) : null;
					})}
					{this.props.data.attributes ? (
						<div className="item-attributes">
							{this.props.data.attributes.map((attribute, index) => {
								return (
									<div className="single-attribute" key={index}>
										<div className="attribute-name">{attribute.name}</div>
										<div className="attribute-values-container">
											{attribute.type === "swatch"
												? attribute.items.map((item, index5) => {
													return (
														<div className="button-color" key={index5}>
															<input
																defaultChecked={this.props.data.selectedAttribute.map(
																	(item) =>
																		item[attribute.name] === item.value
																)}
																disabled
																type="radio"
																name={`${this.props.data.name}-${attribute.name}-${index}`}
																value={item.value}
																className="attributes-value"
															/>
															<label
																key={index}
																htmlFor={`${this.props.data.name}-${attribute.name}-${index}`}
																className="attribute-color"
																style={{ background: `${item.value}` }}
															></label>
														</div>
													);
												})
												: attribute.items.map((item, index3) => {
													return (
														<div className="button" key={index3}>
															<input
																defaultChecked={this.props.data.selectedAttribute.map(
																	(item) =>
																		item[attribute.name] === item.value
																)}
																disabled
																type="radio"
																name={`${this.props.data.name}-${attribute.name}-${index}`}
																value={item.value}
																className="attributes-value"
															/>
															<label
																className="attributes-label"
																htmlFor={`${this.props.data.name}-${attribute.name}-${index}`}
															>
																{item.value}
															</label>
														</div>
													);
												})}
										</div>
									</div>
								);
							})}
						</div>
					) : null}
				</div>
				<div className="right">
					<div className="qty-btns">
						<button onClick={this.increaseQty}>+</button>
						<input
							className="counter-output"
							readOnly
							min="1"
							onChange={this.qtyChange}
							value={this.props.data.qty}
						/>
						{this.props.data.qty === 1 ? (
							<img
								src={remove}
								alt=""
								width="27"
								height="27"
								onClick={() => this.props.removeFromCart(this.props.data.id)}
							/>
						) : (
							<button onClick={this.decreaseQty}>-</button>
						)}
					</div>
					<div className="image-container">
						<img
							src={this.props.data.gallery[0]}
							alt={this.props.data.name}
							width="120"
							height="auto"
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.products.cart,
		currentItem: state.products.currentItem,
		currency: state.products.currency,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		removeFromCart: (id) => dispatch(removeFromCart(id)),
		adjustQty: (id, qty) => dispatch(adjustQty(id, qty)),
		// selectAttribute: (id, attribute, value) =>
		// 	dispatch(selectAttribute(id, attribute, value)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
