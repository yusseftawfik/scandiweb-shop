import React, { Component } from "react";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/products/Actions";
import { loadCurrentItems } from "../../Redux/products/Actions";
import { Link } from "react-router-dom";
import cart from "../../Assets/cart-white.svg";
import "../../Styles/Product.scss";

class Product extends Component {
	componentDidUpdate () {
		localStorage.setItem("Cart", JSON.stringify(this.props.cart));
	}
	render () {
		return (
			<>
				{this.props.category
					? this.props.data.category.products
						.filter((item) => item.category === this.props.category)
						.map((product) => {
							let price = product.prices.find(
								(item) => item.currency.label === this.props.currency
							);
							return (
								<div>
									<div className="prd-container">
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
												<div
													className="add-to-cart"
													onClick={() => this.props.addToCart(product.id)}
												>
													<img
														width="25"
														height="25"
														src={cart}
														alt={product.id}
													/>
												</div>
											</div>
											<div className="product-name">
												<Link to={`/product/${product.id}`}>
													<span onClick={() => loadCurrentItems(product)}>
														{product.name}
													</span>
												</Link>
											</div>
											<div className="product-price">
												<span>{price.currency.symbol}</span>
												<span>{price.amount}</span>
											</div>
										</div>
									</div>
								</div>
							);
						})
					: this.props.data.category.products.map((product, index) => {
						let price = product.prices.find(
							(item) => item.currency.label === this.props.currency
						);
						return (
							<div>
								<div className="prd-container">
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
											<div
												className="add-to-cart"
												onClick={() => this.props.addToCart(product.id)}
											>
												<img
													width="25"
													height="25"
													src={cart}
													alt={product.id}
												/>
											</div>
										</div>
										<div className="product-name">
											<Link to={`/product/${product.id}`}>
												<span onClick={() => this.props.loadCurrentItems({...product,price})}>
													{product.name}
												</span>
											</Link>
										</div>
										<div className="product-price">
											<span>{price.currency.symbol}</span>
											<span>{price.amount}</span>
										</div>
									</div>
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
		addToCart: (id) => dispatch(addToCart(id)),
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
