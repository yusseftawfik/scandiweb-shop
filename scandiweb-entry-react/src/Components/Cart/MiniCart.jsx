import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from './CartItem';
import '../../Styles/MiniCart.scss';

class MiniCart extends Component {
	state = {
		cartTotalPrice: 0,
	}

	componentDidMount () {
		let price = 0;
		this.props.cart.forEach(item => {
			price += item.price.amount * item.qty
		})
		this.setState({
			cartTotalPrice: Math.ceil(price)
		})
	}

	render () {
		return (
			<div className='mini-cart'>
				{
					this.props.cart.map((data, index) => {
						return (
							<div key={index}>
								<CartItem data={data} />
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
						<Link to='/cart'>
							<div>
								view bag
							</div>
						</Link>
						<Link to='/checkout'>
							<div className='checkout-btn'>
								checkout
							</div>
						</Link>
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
