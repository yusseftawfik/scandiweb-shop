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
						this.props.cart.map((data, index) => {
							return (
								<div key={index}>
									<CartItem data={data} />
								</div>
							)
						})
					}
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
