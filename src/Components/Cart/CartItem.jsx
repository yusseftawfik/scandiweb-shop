import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { removeFromCart, adjustQty } from "../../Redux/products/Actions";
import remove from "../../Assets/remove.svg";
import "../../Styles/CartItem.scss";

class CartItem extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			qty: this.props.data.qty,
			imgIndex: 0,
		};
	}
	increaseQty = () => {
		let currentQty = this.state.qty;
		this.props.adjustQty(this.props.data.cartID, currentQty);
		this.setState({ qty: currentQty + 1 });
	};
	decreaseQty = () => {
		let currentQty = this.state.qty;
		this.props.adjustQty(this.props.data.cartID, currentQty);
		this.setState({ qty: currentQty - 1 });
	};
	nextImg = () => {
		if (this.state.imgIndex < this.props.data.gallery.length - 1) {
			this.setState((prevState) => ({ imgIndex: prevState.imgIndex + 1 }));
		}
	};
	prevImg = () => {
		if (this.state.imgIndex > 0) {
			this.setState((prevState) => ({ imgIndex: prevState.imgIndex - 1 }));
		}
	};
	render () {
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
										<div className="attribute-name">{attribute.name}: </div>
										<div className="attribute-values-container">
											{attribute.type === "swatch"
												? attribute.items.map((item, index2) => {
													return (
														<div className="button-color" key={index2}>
															<input
																checked={this.props.data.selectedAttribute.find(
																	(att) =>
																		att[
																		`${this.props.data.name}-${attribute.name}`
																		] === item.value
																)}
																disabled
																type="radio"
																className="attributes-value"
															/>
															<label
																key={index}
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
																checked={this.props.data.selectedAttribute.find(
																	(att) =>
																		att[
																		`${this.props.data.name}-${attribute.name}`
																		] === item.value
																)}
																disabled
																type="radio"
																className="attributes-value"
															/>
															<label
																className="attributes-label"
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
								onClick={() =>
									this.props.removeFromCart(this.props.data.cartID)
								}
							/>
						) : (
							<button onClick={this.decreaseQty}>-</button>
						)}
					</div>
					<div className="image-container">
						<img
							src={this.props.data.gallery[this.state.imgIndex]}
							alt={this.props.data.name}
							width="120"
							height="auto"
						/>
						{this.props.data.gallery.length > 1 ? (
							<div className="img-btn">
								<button onClick={this.prevImg}>&lt;</button>
								<button onClick={this.nextImg}>&gt;</button>
							</div>
						) : null}
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
		removeFromCart: (cartID) => dispatch(removeFromCart(cartID)),
		adjustQty: (id, qty) => dispatch(adjustQty(id, qty)),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
