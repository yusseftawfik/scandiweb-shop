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
		this.props.adjustQty(this.props.data.id, currentQty);
		this.setState({ qty: currentQty + 1 });
	};
	decreaseQty = (e) => {
		let currentQty = this.state.qty;
		this.props.adjustQty(this.props.data.id, currentQty);
		this.setState({ qty: currentQty - 1 });
	};
	render () {
		return (
			<div className="cart-item">
				<div className="item-data">
					<span className="item-brand">{this.props.data.brand}</span>
					<span className="item-name">{this.props.data.name}</span>
					{this.props.data.prices.map((item, index) => {
						return item.currency.label === this.props.currency ? (
							<span className="item-price" key={index}>
								{item.currency.symbol} {item.amount}
							</span>
						) : null;
					})}
					<div className="item-data-attributes">
						{this.props.data.attributes
							? this.props.data.attributes.map((attribute, index) => {
								return (
									<>
										<span className="attribute-name">{attribute.name}</span>
										<div className="item-data-attributes-section" key={index}>
											{attribute.type === "swatch" ? (
												<div
													className="item-data-attributes-section"
													key={index}
												>
													{attribute.items.map((item, index) => {
														return (
															<div
																key={index}
																className="attribute-color"
																style={{ background: `${item.value}` }}
															>
															</div>
														);
													})}
												</div>
											) : (
												attribute.items.map((item) => {
													return (
														<div key={index}>
															<label
																htmlFor={`${this.props.data.name}-${attribute.name}-${index}`}
															>
																{item.displayValue}
																<input
																	defaultChecked={
																		item.displayValue[0] ? true : false
																	}
																	type="radio"
																	name={`${this.props.data.name}-${attribute.name}-${index}`}
																	value={item.displayValue}
																	className="attributes-value"
																	onClick={() =>
																		this.props.selectAttribute(
																			this.props.currentItem.id,
																			attribute.name,
																			item.value
																		)
																	}
																/>
															</label>
														</div>
													);
												})
											)}
										</div>
									</>
								);
							})
							: null}
					</div>
				</div>
				<div className="right">
					<div className="qty-btns">
						<button onClick={this.increaseQty}>+</button>
						<input
							className="counter-output"
							readOnly
							min="1"
							onChange={this.qtyChange}
							value={this.state.qty}
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
