import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from './CartItem';
import '../../Styles/MiniCart.scss';

class MiniCart extends Component {
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
							$500
						</span>
					</div>
					<div className='btn-container'>
						<button>
							<Link to='/cart'>view bag</Link>
						</button>
						<button>
							<Link to='/checkout'>checkout</Link>
						</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.products.cart,
	};
};
export default connect(mapStateToProps)(MiniCart);
