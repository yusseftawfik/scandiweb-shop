import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadCurrentItems, addToCart } from "../../Redux/products/Actions";
import cart from "../../Assets/cart-white.svg";
import "../../Styles/Product.scss";

class Product extends Component {
	componentDidUpdate () {
		localStorage.setItem("Cart", JSON.stringify(this.props.cart));
	}
	render () {
		return (
			<>
				{this.props.data.categories?.map((cat) =>
					cat.name === this.props.category
						? cat.products.map((product, index) => {
							let price = product.prices.find(
								(item) => item.currency.label === this.props.currency
							);
							let specialValue;
							let cartID = product.attributes
								?.map((att) => {
									specialValue = att.items[0].value;
									return `${product.id}-${att.name}-${specialValue}`;
								})
								.join("-");
							let selectedAttribute = product.attributes.map((att) => ({
								[`${product.name}-${att.name}`]: att.items[0].value,
							}));
							return (
								<div key={index} className="page">
									<div key={index}>
										<Link
											to={`/scandiweb-shop/${cat.name}/product/${product.id}`}
											onClick={() =>
												this.props.loadCurrentItems({ ...product, price })
											}
										>
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
															src={
																product.gallery ? product.gallery[0] : null
															}
															alt={product.id}
														/>
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
											</div>
										</Link>
									</div>
									{product.inStock ? (
										<div
											className="add-to-cart"
											onClick={() =>
												this.props.addToCart(
													product.id,
													cartID,
													selectedAttribute,
													specialValue
												)
											}
										>
											<img
												width="20"
												height="20"
												src={cart}
												alt={product.id}
											/>
										</div>
									) : null}
								</div>
							);
						})
						: null
				)}
			</>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		loadCurrentItems: (item) => dispatch(loadCurrentItems(item)),
		addToCart: (id, cartID, selectedAttribute, specialValue) =>
			dispatch(addToCart(id, cartID, selectedAttribute, specialValue)),
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
