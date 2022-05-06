import React, { Component } from "react";
import { connect } from "react-redux";
import { loadCurrentItems } from "../../Redux/products/Actions";
import { Link } from "react-router-dom";
import cart from "../../Assets/cart-white.svg";
import "../../Styles/Product.scss";

class Product extends Component {
	render () {
		return (
			<>
				{!this.props.category
					? this.props.data.category.products.map((product, index) => {
						let price = product.prices.find(
							(item) => item.currency.label === this.props.currency
						);
						return (
							<div key={index}>
								<div
									className="prd-container"
									onClick={() =>
										this.props.loadCurrentItems({ ...product, price })
									}
								>
									<Link to={`/product/${product.id}`}>
										{product.inStock ? null : (
											<div className="out-of-stock">
												<span>out of stock</span>
											</div>
										)}
										<div
											className="product"
											style={{ opacity: product.inStock ? "1" : "0.25" }}
										>
											<div className="product-image">
												<img
													width="300"
													height="auto"
													src={product.gallery[0]}
													alt={product.id}
												/>
												{product.inStock ? (
													<div className="add-to-cart">
														<img
															width="25"
															height="25"
															src={cart}
															alt={product.id}
														/>
													</div>
												) : null}
											</div>
											<div className="product-name">
												<span>{product.brand}</span>
												<span>{product.name}</span>
											</div>
											<div className="product-price">
												<span>{price.currency.symbol}</span>
												<span>{price.amount}</span>
											</div>
										</div>
									</Link>
								</div>
							</div>
						);
					})
					: this.props.data.category.products
						.filter((item) => item.category === this.props.category)
						.map((product, index) => {
							let price = product.prices.find(
								(item) => item.currency.label === this.props.currency
							);
							return (
								<div key={index}>
									<div
										className="prd-container"
										onClick={() =>
											this.props.loadCurrentItems({
												...product,
												price,
											})
										}
									>
										<Link to={`/product/${product.id}`}>
											{product.inStock ? null : (
												<div className="out-of-stock">
													<span>out of stock</span>
												</div>
											)}
											<div
												className="product"
												style={{ opacity: product.inStock ? "1" : "0.25" }}
											>
												<div className="product-image">
													<img
														width="300"
														height="auto"
														src={product.gallery[0]}
														alt={product.id}
													/>
													{product.inStock ? (
														<div className="add-to-cart">
															<img
																width="25"
																height="25"
																src={cart}
																alt={product.id}
															/>
														</div>
													) : null}
												</div>
												<div className="product-name">
													<span>{product.brand}</span>
													<span>{product.name}</span>
												</div>
												<div className="product-price">
													<span>{price.currency.symbol}</span>
													<span>{price.amount}</span>
												</div>
											</div>
										</Link>
									</div>
								</div>
							);
						})}
			</>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		loadCurrentItems: (item) => dispatch(loadCurrentItems(item)),
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
export default connect(mapStateToProps, mapDispatchToProps)(Product);
