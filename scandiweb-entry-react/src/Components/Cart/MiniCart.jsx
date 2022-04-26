import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from './CartItem';
import '../../Styles/MiniCart.scss';
class MiniCart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cartTotalPrice: 0,
		}
	}
	componentDidMount () {
		this.setPrice();
	}
	componentWillReceiveProps (previousState) {
		if (previousState.cartTotalPrice !== this.state.cartTotalPrice) {
			this.setPrice()
		}
	}
	setPrice () {
		let price = 0;
		let currentPrice;
		this.props.cart.forEach(item => {
			currentPrice = item.prices.find((item) => item.currency.label === this.props.currency);
			price += currentPrice.amount * item.qty
			this.setState({
				cartTotalPrice: Math.ceil(price)
			})
		})
	}
	render () {
		return (
			<div className='mini-cart'>
				{
					this.props.cart.map((data, index) => {
						return (
							<div key={index} style={{ width: '-webkit-fill-available' }}>
								<CartItem data={data} key={index} />
							</div>
						)
					})
				}
				<div className='mini-cart-summary'>
					<div className='price-container'>
						<span>
							Total
						</span>
						<span>
							{this.props.currency}{" "}{this.state.cartTotalPrice}
						</span>
					</div>
					<div className='btn-container'>
						<div>
							<Link to='/cart'>
								vew bag
							</Link>
						</div>
						<div className='checkout-btn'>
							<Link to='/checkout'>
								checkout
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		cart: state.products.cart,
		currency: state.products.currency,
	};
};
export default connect(mapStateToProps)(MiniCart);