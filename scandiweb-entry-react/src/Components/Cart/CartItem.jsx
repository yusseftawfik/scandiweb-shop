import React, { Component } from 'react';
import { connect } from "react-redux";
import { removeFromCart, adjustQty, loadCurrentItems } from "../../Redux/products/Actions";
import logo from '../../Assets/logo.svg';
import remove from '../../Assets/remove.svg';
import '../../Styles/CartItem.scss';

class CartItem extends Component {
	render () {
		console.log()
		return (
			<div className='cart-item'>
				<div className='item-data'>
					<span>Apollo Running  Short</span>
					<span>$50.00</span>
					<div className='item-data-attributes'>
						<div>S</div>
						<div>M</div>
					</div>
				</div>
				<div className='qty-btns'>
					<div onClick={() => adjustQty()}>+</div>
					<span>{this.props.data.qty}</span>
					<img src={remove} alt='' width='25' height='25' onClick={() => removeFromCart()} />
					{/* <div onClick={() => adjustQty()}>-</div> */}
				</div>
				<div className='end'>
					<div className='item-image'>
						<img src={logo} alt='item' height='100' width='100' />
					</div>
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
