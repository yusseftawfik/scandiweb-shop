import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import trash from "../../Assets/trash.svg";
import "../../Styles/Cart.scss";

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartTotalPrice: 0,
		};
	}
	componentDidMount () {
		this.setPrice();
	}
	componentWillReceiveProps (previousState) {
		if (previousState.cartTotalPrice !== this.state.cartTotalPrice) {
			this.setPrice();
		}
	}
	setPrice () {
		let price = 0;
		let currentPrice;
		this.props.cart.forEach((item) => {
			currentPrice = item.prices.find(
				(item) => item.currency.label === this.props.currency
			);
			price += currentPrice.amount * item.qty;
			this.setState({
				cartTotalPrice: Math.ceil(price),
			});
		});
	}
	clearCart = () => {
		localStorage.removeItem("Cart");
		window.location.reload();
	};
	render () {
		return (
			<>
				<Navbar />
				<div className="cart-page">
					<div className="cart-header">
						<h1>Cart</h1>
						<button className="clear-btn" onClick={this.clearCart}>
							<img src={trash} alt="clear" width="10" height="10" />
							<span>EMPTY CART!</span>
						</button>
					</div>
					{this.props.cart.map((data, index) => {
						return (
							<div key={index} className='cart-item-holder'>
								<CartItem data={data} />
							</div>
						);
					})}
					<div className="cart-footer">
						<div>
							<span>Total Items:</span>
							<span>
								{this.props.cart.length === 1
									? `${this.props.cart.length} item in cart`
									: `${this.props.cart.length} items in cart`}
							</span>
						</div>
						<div>
							<span>Total Price:</span>
							<span>
								{this.state.cartTotalPrice.toLocaleString("en-US", {
									style: "currency",
									currency: this.props.currency,
								})}
							</span>
						</div>
						<div>
							<span>Tax:</span>
							<span>
								(15%){" "}
								{Math.ceil(this.state.cartTotalPrice * 0.015).toLocaleString(
									"en-US",
									{
										style: "currency",
										currency: this.props.currency,
									}
								)}
							</span>
						</div>
						<div>
							<span>Total:</span>
							<span>
								{Math.ceil(
									this.state.cartTotalPrice + this.state.cartTotalPrice * 0.015
								).toLocaleString("en-US", {
									style: "currency",
									currency: this.props.currency,
								})}{" "}
							</span>
						</div>
						<button className="chekout-btn">
							<Link to="/checkout">order</Link>
						</button>
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currentItem: state.products.currentItem,
		cart: state.products.cart,
		currency: state.products.currency,
	};
};
export default connect(mapStateToProps)(Cart);
