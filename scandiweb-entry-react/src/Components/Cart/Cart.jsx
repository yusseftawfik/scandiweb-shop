import React, { Component } from 'react';
import { connect } from "react-redux";
import Navbar from '../Navbar/Navbar';
import CartItem from './CartItem';
import check from "../../Assets/check.svg";
import trash from "../../Assets/trash.svg";
import '../../Styles/Cart.scss';

class Cart extends Component {
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
		this.props.cart.forEach(item => {
			price += item.price.amount * item.qty
		})
		this.setState({
			cartTotalPrice: Math.ceil(price)
		})
	}
	clearCart = () => {
		localStorage.removeItem('Cart');
		window.location.reload()
	}
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
								<div key={index} style={{ width: '-webkit-fill-available' }}>
									<hr />
									<CartItem data={data} />
								</div>
							)
						})
					}
					<div className='cart-footer'>
						<button className='clear-btn' onClick={this.clearCart}>
							<img
								src={trash}
								alt="clear"
								width="20"
								height="20"
							/>
						</button>
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
						<button className='chekout-btn' onClick={this.clearCart}>
							<img
								src={check}
								alt="checkout"
								width="20"
								height="20"
							/>
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
