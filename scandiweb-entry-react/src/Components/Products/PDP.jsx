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
		return (
			<>
				<Navbar />
				<div className="pdp">
					<div className="gallery">
						{
							this.props.currentItem.gallery.length === 1 ? null :
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
						}
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
									this.props.currentItem.attributes.map((attribute, index) => {
										return (
											<>
												<span className='attribute-name'>{attribute.name}:</span>
												<div className="item-data-attributes-section" key={index}>
													{attribute.type === "swatch" ?
														<div className="item-data-attributes-section" key={index}>
															{
																attribute.items.map((item, index) => {
																	return (
																		<div key={index} className="attribute-color" style={{ background: `${item.value}` }}>
																		</div>
																	)
																})
															}
														</div>
														: attribute.items.map((item) => {
															return (
																<>
																	<label htmlFor={`attributes-${attribute.name}`}>
																		{item.displayValue}
																		<input
																			defaultChecked={item.displayValue[0] ? true : false}
																			type="radio"
																			name={`attributes-${attribute.name}`}
																			value={item.displayValue}
																			className="attributes-value"
																			onClick={() =>
																				this.props.selectAttribute(
																					this.props.currentItem.id,
																					attribute.name,
																					item.value
																				)
																			}
																		/>
																	</label>
																</>
															)
														})
													}
												</div>
											</>
										)
									}) : null
							}
						</div>
						<div className="product-price">
							{
								this.props.currentItem.prices.map((item, index) => {
									return (
										item.currency.label === this.props.currency ?
											(<span className='item-price' key={index}>
												{item.currency.symbol}
												{' '}
												{item.amount}
											</span>)
											: null
									)
								})
							}
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
		selectAttribute: (id, attribute, value) => dispatch(selectAttribute(id, attribute, value)),
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