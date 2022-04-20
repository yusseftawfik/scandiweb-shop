import React, { Component } from 'react';
import { connect } from "react-redux";
import { removeFromCart, adjustQty, loadCurrentItems } from "../../Redux/products/Actions";
import logo from '../../Assets/logo.svg';
import remove from '../../Assets/remove.svg';
import '../../Styles/CartItem.scss';


class CartItem extends Component {
	render () {
		return (
			<div className='mini-cart-item'>
				<div className='item-data'>
					<span>Apollo Running  Short</span>
					<span>$50.00</span>
					<div className='item-data-attributes'>
						<div>S</div>
						<div>M</div>
					</div>
				</div>
				<div className='qty-btns'>
					<div>+</div>
					<span>1</span>
					<img src={remove} alt='' width='28' height='28' />
					{/* <div>-</div> */}
				</div>
				<div className='item-image'>
					<img src={logo} alt='' width='100%' height='100%' />
				</div>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		cart: state.products.cart,
		currentItem: state.products.currentItem
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		removeFromCart: (id) => dispatch(removeFromCart(id)),
		adjustQty: (id, qty) => dispatch(adjustQty(id, qty)),
		loadCurrentItems: (item) => dispatch(loadCurrentItems(item)),

	};
};
export default connect(mapStateToProps, mapDispatchToProps())(CartItem);
