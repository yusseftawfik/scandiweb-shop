import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCategory, setData } from "../../Redux/products/Actions";
import { Link } from "react-router-dom";
import withCategory from "../../HOC/withCategory";
import cart from "../../Assets/cart.svg";
import arrowdown from "../../Assets/arrowdown.svg";
import arrowup from "../../Assets/arrowup.svg";
import logo from "../../Assets/logo.svg";
import CurrencyList from "./CurrencyList";
import MiniCart from "../Cart/MiniCart";
import "../../Styles/Navbar.scss";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openCart: false,
			openCurrency: false,
		};
	}
	componentDidUpdate (prevProps) {
		localStorage.setItem("Category", JSON.stringify(this.props.category));
		if (prevProps.currency !== this.props.currency) {
			this.closeCurrency();
		}
	}
	handleCurrency = (currencyFromChildern) => {
		this.setState({
			openCurrency: currencyFromChildern,
			openCart: false,
		});
	};
	handleCategory = (cartFromChildern) => {
		this.setState({
			openCart: cartFromChildern,
			openCurrency: false,
		});
	};
	closeCurrency = () => {
		this.setState({ openCurrency: false });
	};
	selectedCategory = {
		color: "var(--primary-color)",
		fontWeight: "700",
		borderBottomColor: "var(--primary-color)",
		borderBottomWidth: 2,
		transitionDuration: ".3s",
	};
	switchCategory = (name, products) => {
		this.props.changeCategory(name);
		this.props.setData(products);
	}
	render () {
		return (
			<>
				<div className="nav-bar">
					<div className="categories">
						{this.props.data.loading
							? null
							: this.props.data.categories.map((cat, index) => {
								return (<span
									style={
										this.props.category === cat.name
											? this.selectedCategory
											: null
									}
									key={index}
									onClick={() => this.switchCategory(cat.name, cat.products)}
								>
									{cat.name}
								</span>)
							})}
					</div>
					<div className="logo">
						<Link to="/">
							<img src={logo} alt="logo" width="41" height="41" />
						</Link>
					</div>
					<div className="buttons">
						<button className="currency" onClick={this.handleCurrency}>
							<span>$</span>
							<img
								src={this.state.openCurrency ? arrowup : arrowdown}
								alt="arrow-down"
								width="10"
								height="10"
							/>
						</button>
						{this.state.openCurrency && (
							<CurrencyList handleCurrency={this.handleCurrency} />
						)}
						<button
							disabled={this.props.cart.length === 0 ? "disabled" : null}
							className="cart-btn"
							onClick={this.handleCategory}
						>
							{this.props.cart.length > 0 ? (
								<div className="cart-counter">{this.props.cart.length}</div>
							) : null}
							<img src={cart} alt="cart" width="20" height="auto" />
						</button>
						{this.state.openCart && (
							<>
								<MiniCart handleCategory={this.handleCategory} />
							</>
						)}
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		cart: state.products.cart,
		category: state.products.category,
		currency: state.products.currency,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		changeCategory: (name) => dispatch(changeCategory(name)),
		setData: (data) => dispatch(setData(data))
	};
};
export default withCategory(
	connect(mapStateToProps, mapDispatchToProps)(Navbar)
);
