import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart, adjustQty } from "../../Redux/products/Actions";
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
		this.setState({ qty: currentQty + 1 });
		this.props.adjustQty(this.props.data.id, currentQty);
	};
	decreaseQty = (e) => {
		let currentQty = this.state.qty;
		this.setState({ qty: currentQty - 1 });
		this.props.adjustQty(this.props.data.id, currentQty);
	};
	render () {
		let price = 0;
		return (
			<div className="cart-item">
				<div className="item-data">
					<span>{this.props.data.name}</span>
					{/* {
						price = this.props.data.prices.find((item) => item.currency.label === this.props.currency)
						// item.currency.label === this.props.currency)
						// ?
						// 	<>
						// 		<span>{price.currency.symbol}</span>
						// 		<span>{price.amount}</span> 
						// 	</>
						// 	:
						// 	null
					}
					{
						console.log('return', price)
					} */}
					<div className="item-data-attributes">
						{this.props.data.attributes
							? this.props.data.attributes.map((item, index) => {
								return (
									<>
										<div key={index}>
											{item.items.map((item) => {
												return item.displayValue[0] ? (
													<>
														<label htmlFor={`attributes-${index}`}>
															{item.displayValue}
															<input
																defaultChecked
																type="radio"
																name={`attributes-${index}`}
																value={item.displayValue}
																className="attributes-value"
																onClick={() =>
																	this.props.selectAttribute(
																		this.props.currentItem.attributes.items
																			.value,
																		this.props.currentItem.id
																	)
																}
															/>
														</label>
													</>
												) : (
													<>
														<label htmlFor={`attributes-${index}`}>
															{item.displayValue}
															<input
																type="radio"
																name={`attributes-${index}`}
																value={item.displayValue}
																className="attributes-value"
																onClick={() =>
																	this.props.selectAttribute(
																		this.props.currentItem.attributes.items
																			.value,
																		this.props.currentItem.id
																	)
																}
															/>
														</label>
													</>
												);
											})}
										</div>
									</>
								);
							})
							: null}
					</div>
				</div>
				<div className="qty-btns">
					<button onClick={this.increaseQty}>+</button>
					<input
						className="counter-output"
						readOnly
						onChange={this.qtyChange}
						value={this.state.qty}
					/>
					{this.props.data.qty === 1 ? (
						<img
							src={remove}
							alt=""
							width="25"
							height="25"
							onClick={() => this.props.removeFromCart(this.props.data.id)}
						/>
					) : (
						<button onClick={this.decreaseQty}>-</button>
					)}
				</div>
				<div className="end">
					<div className="item-image">
						<img
							src={this.props.data.gallery[0]}
							alt={this.props.data.name}
							height="100"
							width="100"
						/>
					</div>
				</div>
			</div >
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

// (<>

// </>) : null