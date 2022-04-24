// product description page
import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import { addToCart, selectAttribute } from "../../Redux/products/Actions";
import "../../Styles/PDP.scss";

class PDP extends Component {
	state = {
		index: 0,
	};
	render () {
		console.log(this.props.currentItem.attributes)
		return (
			<>
				<Navbar />
				<div className="pdp">
					<div className="gallery">
						<div className="mini">
							{this.props.currentItem.gallery.map((item, index) => (
								<img
									src={item}
									height="auto"
									width="50"
									alt="product"
									onClick={() => this.setState({ index: index })}
								/>
							))}
						</div>
						<div className="main">
							<img
								src={this.props.currentItem.gallery[this.state.index]}
								height="auto"
								width="350"
								alt="product"
							/>
						</div>
					</div>
					<div className="data-container">
						<div className="product-name">
							<p>{this.props.currentItem.name}</p>
							<span>{this.props.currentItem.brand}</span>
						</div>
						<div className="product-attributes">
							{
								this.props.currentItem.attributes ?
									this.props.currentItem.attributes.map((item, index) => {
										return (
											<>
												<span className="attribute-name">{item.name}</span>
												<div key={index}>
													{
														item.items.map((item) => {
															return (
																item.displayValue[0] ?
																	(<>
																		<label htmlFor={`attributes-${index}`}>
																			{item.displayValue}
																			<input
																				checked
																				type='radio'
																				name={`attributes-${index}`}
																				value={item.displayValue}
																				className="attributes-value"
																				onClick={() => this.props.selectAttribute(
																					this.props.currentItem.attributes.items.value,
																					this.props.currentItem.id
																				)} />
																		</label>
																	</>) :
																	(<>
																		<label htmlFor={`attributes-${index}`}>
																			{item.displayValue}
																			<input
																				type='radio'
																				name={`attributes-${index}`}
																				value={item.displayValue}
																				className="attributes-value"
																				onClick={() => this.props.selectAttribute(
																					this.props.currentItem.attributes.items.value,
																					this.props.currentItem.id
																				)} />
																		</label>
																	</>)
															)
														}
														)
													}
												</div>
											</>
										)
									}) : null
							}
						</div>
						<div className="product-price">
							{/* <span>price:</span>
							<div>
								<span>{this.props.currentItem.prices.currency.symbol}</span>
								<span>{this.props.currentItem.prices.amount}</span>
							</div> */}
						</div>
						<div>
							{this.props.currentItem.inStock ? (
								<button
									className="addtocart-btn"
									onClick={() => this.props.addToCart(this.props.currentItem.id)}
								>
									add to cart
								</button>
							) : (
								<button disabled={true} className="outofstock-btn">
									out of stock
								</button>
							)}
						</div>
						<div className="description" dangerouslySetInnerHTML={{ __html: this.props.currentItem.description }}>
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (id) => dispatch(addToCart(id)),
		selectAttribute: (id, value) => dispatch(selectAttribute(id, value)),
	};
};
const mapStateToProps = (state) => {
	return {
		currentItem: state.products.currentItem,
		cart: state.products.cart,
		currency: state.products.currency,
		category: state.products.category,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(PDP);