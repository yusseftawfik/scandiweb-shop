import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../Navbar/Navbar';
import CartItem from './CartItem';
import '../../Styles/Cart.scss';

class Cart extends Component {
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
		console.log(this.props.cart)
		return (
			<>
				<Navbar />
				<div className='cart-page'>
					<h1>
						Cart
					</h1>
					{
						this.props.cart.map((data) => {
							return (
								<>
									<hr />
									<CartItem data={data} />
								</>
							)
						})
					}
					<div className='cart-footer'>
						<div>
							<span>Total Items:</span>
							<span>
								{this.props.cart.length}
							</span>
						</div>
						<div>
							<span>Total Price:</span>
							<span>
								{this.props.currency}{" "}{this.state.cartTotalPrice}
							</span>
						</div>
						<button>
							clear cart
						</button>
					</div>
				</div>
			</>
		)
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
