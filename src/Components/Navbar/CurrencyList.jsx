import React, { Component } from "react";
import { connect } from "react-redux";
import { changeCurrency } from "../../Redux/products/Actions";
import withCurrency from "../../HOC/withCurrency";
import "../../Styles/CurrencyList.scss";

class CurrencyList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currencyToggle: true,
		};
		this.crny = React.createRef();
		this.outsideCurrency = this.outsideCurrency.bind(this);
	}
	componentDidMount () {
		document.addEventListener("mousedown", this.outsideCurrency);
	}
	componentDidUpdate () {
		localStorage.setItem("Currency", JSON.stringify(this.props.currency));
	}
	componentWillUnmount () {
		document.removeEventListener("mousedown", this.outsideCurrency);
	}
	outsideCurrency (event) {
		if (this.crny && !this.crny.current.contains(event.target)) {
			this.currencyToggle();
		}
	}
	currencyToggle = () => {
		this.props.handleCurrency(!this.state.currencyToggle);
	};
	render () {
		console.log('props',this.props);
		return (
			<div className="currency-list" ref={this.crny}>
				{this.props.data.loading
					? null
					: this.props.data.currencies
						? this.props.data.currencies.map((item, index) => {
							return (
								<div
									key={index}
									className="currency-item"
									onClick={() => this.props.changeCurrency(item.label)}
								>
									{item.label === this.props.currency ? (
										<>
											<span className="selected-currency">{item.symbol}</span>
											<span className="selected-currency">{item.label}</span>
										</>
									) : (
										<>
											<span>{item.symbol}</span>
											<span>{item.label}</span>
										</>
									)}
								</div>
							);
						})
						: null}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		currency: state.products.currency,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		changeCurrency: (label) => dispatch(changeCurrency(label)),
	};
};
export default withCurrency(
	connect(mapStateToProps, mapDispatchToProps)(CurrencyList)
);
