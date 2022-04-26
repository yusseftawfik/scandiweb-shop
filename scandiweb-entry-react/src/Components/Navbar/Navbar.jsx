import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCategory } from "../../Redux/products/Actions";
import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import cart from "../../Assets/cart.svg";
import arrowdown from "../../Assets/arrowdown.svg";
import arrowup from "../../Assets/arrowup.svg";
import logo from "../../Assets/logo.svg";
import CurrencyList from "./CurrencyList";
import MiniCart from "../Cart/MiniCart";
import "../../Styles/Navbar.scss";

const CATEGOTY_QUERY = gql`
  {
    categories {
      name
    }
  }
`;

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openCart: false,
			openCurrency: false,
			backdrop: false,
		};
	}
	componentDidUpdate () {
		localStorage.setItem("Category", JSON.stringify(this.props.category));
	}
	openCart = (e) => {
		e.preventDefault();
		this.setState({
			openCart: true,
			openCurrency: false,
			backdrop: true,
		});
	};
	openCurrency = (e) => {
		e.preventDefault();
		this.setState({
			openCurrency: true,
			openCart: false,
		});
	};
	// closeCart = () => {
	// 	this.setState({
	// 		openCart: false,
	// 		backdrop: false,
	// 	});
	// };
	closeCurrency = () => {
		this.setState({ openCurrency: false });
	};
	selectedCategory = {
		color: "var(--primary-color)",
		fontWeight: "700",
		borderBottomColor: 'var(--primary-color)',
		borderBottomWidth: 2,
		transitionDuration: ".3s",
	};
	render () {
		return (
			<>
				<div className="nav-bar">
					<div className="categories">
						{this.props.data.loading
							? null
							: this.props.data.categories.map((item, index) => {
								return item.name === "all" ? (
									<span
										style={
											!this.props.category ? this.selectedCategory : null
										}
										key={index}
										onClick={() => {
											this.props.changeCategory("");
										}}
									>
										{item.name}
									</span>
								) : (
									<span
										style={
											this.props.category === item.name
												? this.selectedCategory
												: null
										}
										key={index}
										onClick={() => {
											this.props.changeCategory(item.name);
										}}
									>
										{item.name}
									</span>
								);
							})}
					</div>
					<div className="logo">
						<Link to="/">
							<img src={logo} alt="logo" width="41" height="41" />
						</Link>
					</div>
					<div className="buttons">
						<button
							className="currency"
							onMouseEnter={this.openCurrency}
							onBlur={this.closeCurrency}
						>
							<span>$</span>
							<img
								src={this.state.openCurrency ? arrowup : arrowdown}
								alt="arrow-down"
								width="10"
								height="10"
							/>
							{this.state.openCurrency && <CurrencyList />}
						</button>
						<button
							disabled={this.props.cart.length === 0 ? "disabled" : null}
							className="cart-btn"
							onMouseEnter={this.openCart}
							onBlur={this.closeCart}
						>
							{this.props.cart.length > 0 ? (
								<div className="cart-counter">{this.props.cart.length}</div>
							) : null}
							<img src={cart} alt="cart" width="20" height="auto" />
							{this.state.openCart && (
								<>
									<MiniCart />
									<div className="backdrop"></div>
								</>
							)}
						</button>
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
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		changeCategory: (name) => dispatch(changeCategory(name)),
	};
};
export default graphql(CATEGOTY_QUERY)(
	connect(mapStateToProps, mapDispatchToProps)(Navbar)
);
