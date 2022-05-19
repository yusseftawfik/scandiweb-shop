import React, { Component } from "react";
import parse from "html-react-parser";
import { connect } from "react-redux";
import { addToCart } from "../../Redux/products/Actions";
import Navbar from "../Navbar/Navbar";
import "../../Styles/PDP.scss";

class PDP extends Component {
	componentDidUpdate () {
		localStorage.setItem("Cart", JSON.stringify(this.props.cart));
	}
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			selectedAttribute: [],
			value: '',
			name: ''
		};
	}
	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState((prevState) => ({
			selectedAttribute: [...prevState.selectedAttribute, { attribute: name, value: value }],
			value: value,
			name: name
		}));
	};
	handleSubmit = (e) => {
		let cartID = this.props.currentItem.attributes
			?.map(
				(att) => `${this.props.currentItem.id}-${att.name}-${this.state.value}`
			)
			.join(" ", "-");
		this.props.addToCart(
			this.props.currentItem.id,
			cartID,
			this.state.selectedAttribute,
		);
		e.preventDefault();
	};
	render () {
		// let exsist = this.state.selectedAttribute.find(att => this.state.name === att.attribute)
		// console.log(exsist)
		return (
			<>
				<Navbar />
				<div className="pdp">
					<div className="gallery">
						{this.props.currentItem.gallery.length === 1 ? null : (
							<div className="mini">
								{this.props.currentItem.gallery.map((item, index) => (
									<img
										src={item}
										height="auto"
										width="50"
										alt="product"
										key={index}
										onClick={() => this.setState({ index: index })}
									/>
								))}
							</div>
						)}
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
							<span>{this.props.currentItem.brand}</span>
							<p>{this.props.currentItem.name}</p>
						</div>
						<form onSubmit={this.handleSubmit}>
							{this.props.currentItem.attributes ? (
								<div className="item-attributes">
									{this.props.currentItem.attributes.map((attribute, index) => {
										return (
											<div className="single-attribute" key={index}>
												<div className="attribute-name">{attribute.name}: </div>
												<div className="attribute-values-container">
													{attribute.type === "swatch"
														? attribute.items.map((item, index2) => {
															return (
																<div className="button-color" key={index2}>
																	<input
																		onChange={this.handleChange}
																		disabled={!this.props.currentItem.inStock}
																		type="radio"
																		name={`${this.props.currentItem.name}-${attribute.name}`}
																		value={item.value}
																		className="attributes-value"
																	/>
																	<label
																		key={index}
																		htmlFor={`${this.props.currentItem.name}-${attribute.name}`}
																		className="attribute-color"
																		style={{ background: `${item.value}` }}
																	></label>
																</div>
															);
														})
														: attribute.items.map((item, index2) => {
															return (
																<div className="button" key={index2}>
																	<input
																		onChange={this.handleChange}
																		type="radio"
																		disabled={!this.props.currentItem.inStock}
																		name={`${this.props.currentItem.name}-${attribute.name}`}
																		value={item.value}
																		className="attributes-value"
																	/>
																	<label
																		className="attributes-label"
																		htmlFor={`${this.props.currentItem.name}-${attribute.name}`}
																	>
																		{item.value}
																	</label>
																</div>
															);
														})}
												</div>
											</div>
										);
									})}
								</div>
							) : null}
							<div className="product-price">
								{this.props.currentItem.prices.map((item, index) => {
									return item.currency.label === this.props.currency ? (
										<span className="item-price" key={index}>
											{item.amount.toLocaleString("en-US", {
												style: "currency",
												currency: this.props.currency,
											})}
										</span>
									) : null;
								})}
							</div>
							<div>
								{this.props.currentItem.inStock ? (
									<button
										className="addtocart-btn"
										type="submit"
										disabled={
											this.props.currentItem.attributes.length ===
												this.state.selectedAttribute.length
												? false
												: true
										}
									>
										add to cart
									</button>
								) : (
									<button disabled={true} className="outofstock-btn">
										out of stock
									</button>
								)}
							</div>
						</form>
						<div className="description">
							{parse(this.props.currentItem.description)}
						</div>
					</div>
				</div>
			</>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		addToCart: (id, cartID, selectedAttribute) =>
			dispatch(addToCart(id, cartID, selectedAttribute)),
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
