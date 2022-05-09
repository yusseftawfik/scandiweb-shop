import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import "../../Styles/MiniCart.scss";
class MiniCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartTotalPrice: 0,
			cartToggle: true,
		};
		this.ctg = React.createRef();
		this.outsideCategory = this.outsideCategory.bind(this);
	}
	componentDidMount () {
		this.setPrice();
		document.addEventListener("mousedown", this.outsideCategory);
	}
	componentWillUnmount () {
		document.removeEventListener("mousedown", this.outsideCategory);
	}
	componentWillReceiveProps (previousState) {
		if (previousState.cartTotalPrice !== this.state.cartTotalPrice) {
			this.setPrice();
		}
	}
	outsideCategory (event) {
		if (this.ctg && !this.ctg.current.contains(event.target)) {
			this.cartToggle();
		}
	}
	cartToggle = () => {
		this.props.handleCategory(!this.state.cartToggle);
	};
	setPrice () {
		let price = 0;
		let currentPrice = 0;
		this.props.cart.forEach((item) => {
			currentPrice = item.prices.find(
				(item) => item.currency.label === this.props.currency
			);
			price += currentPrice.amount * item.qty;
			this.setState(() => {
				return { cartTotalPrice: Math.ceil(price) };
			});
		});
	}
	render () {
		return (
			<>
				{this.props.cart.length > 0 ? (
					<div className="mini-cart" ref={this.ctg}>
						{this.props.cart.map((data, index) => {
							return (
								<div key={index} style={{ width: "-webkit-fill-available" }}>
									<CartItem data={data} key={index} />
								</div>
							);
						})}
						<div className="mini-cart-summary">
							<div className="price-container">
								<span>Total</span>
								<span>
									{this.state.cartTotalPrice.toLocaleString("en-US", {
										style: "currency",
										currency: this.props.currency,
									})}
								</span>
							</div>
							<div className="btn-container">
								<div>
									<Link to="/cart">view bag</Link>
								</div>
								<div className="checkout-btn">
									<Link to="/checkout">checkout</Link>
								</div>
							</div>
						</div>
					</div>
				) : null}
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		cart: state.products.cart,
		currency: state.products.currency,
	};
};
export default connect(mapStateToProps)(MiniCart);
