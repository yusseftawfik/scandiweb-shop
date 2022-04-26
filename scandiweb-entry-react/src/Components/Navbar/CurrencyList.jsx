import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeCurrency } from '../../Redux/products/Actions';
import { graphql } from '@apollo/client/react/hoc';
import { gql } from "@apollo/client";
import '../../Styles/CurrencyList.scss';

const CURRENCY_QUERY = gql`
    {
    currencies {
            label
            symbol
    }
    }
`;
class CurrencyList extends Component {
	componentDidUpdate () {
		localStorage.setItem("Currency", JSON.stringify(this.props.currency))
	}
	render () {
		return (
			<div className='currency-list' >
				{
					this.props.data.loading ? null :
						this.props.data.currencies ? (
							<div className='currencies-data'>
								{
									this.props.data.currencies.map((item, index) => {
										return (
											<div key={index} className="currency-item" onClick={() => this.props.changeCurrency(item.label)}>
												{
													item.label === this.props.currency
														?
														<>
															<span className='selected-currency'>{item.symbol}</span>
															<span className='selected-currency'>{item.label}</span>
														</>
														:
														<>
															<span>{item.symbol}</span>
															<span>{item.label}</span>
														</>
												}
											</div>
										)
									})}
							</div>
						) : null
				}
			</div >
		)
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
export default graphql(CURRENCY_QUERY)(connect(mapStateToProps, mapDispatchToProps)(CurrencyList));