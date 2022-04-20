import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeCurrency } from '../../Redux/products/Actions'
import useCurrency from '../../Hooks/useCurrency';
import Spinner from '../Products/Spinner';
import '../../Styles/CurrencyList.scss';

const CurrencyList = (props) => {
	const { data, error, loading } = useCurrency();
	useEffect(() => {
		localStorage.setItem("Currency", JSON.stringify(props.currency))
	}, [props.currency])
	return (
		<div className='currency-list'>
			{
				loading ? (
					<div className='loading'>
						<Spinner />
					</div>
				) : data ? (
					<div className='currencies-data'>
						{
							data.currencies.map((item, index) => {
								return (
									<div key={index} className="currency-item" onClick={() => props.changeCurrency(item.label)}>
										{
											item.label === props.currency
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
				) : (
					<div className='errors'>
						{error.name}
					</div>
				)
			}
		</div>
	)
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);

