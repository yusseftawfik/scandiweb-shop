import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../Navbar/Navbar';
import CartItem from './CartItem';
import '../../Styles/Cart.scss';

class Cart extends Component {
	render () {
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
							<span></span>
						</div>
						<div>
							<span>Total Price:</span>
							<span></span>
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
	};
};
export default connect(mapStateToProps)(Cart);
