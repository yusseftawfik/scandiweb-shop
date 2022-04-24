//  product listing page
import React from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import Product from "./Product";
import Spinner from "./Spinner";
import "../../Styles/PLP.scss";
import { useQuery, gql } from "@apollo/client";
import { setData } from '../../Redux/products/Actions';

const PRODDUCT_QUERY = gql`
{
    category {
    products {
        id
        name
        inStock
        gallery
        category
        brand
        description
        prices {
        	amount
        	currency {
            	label
            	symbol
        }
        }
        attributes {
        	name
        	items {
            	displayValue
        }
        }
    }
    }
}
`;

const PLP = ({ category, setData }) => {
	const { data, error, loading } = useQuery(PRODDUCT_QUERY, {
		onCompleted: (data) => setData(data.category.products)
	});
	return (
		<>
			<Navbar />
			<div className="products-page">
				<h1>{category}</h1>
				{loading ? (
					<div className="loading">
						<Spinner />
					</div>
				) : data ? (
					<div className="data">
						<Product data={data} />
					</div>
				) : (
					<div className="errors">{error.name}</div>
				)}
			</div>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		category: state.products.category,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setData: (data) => dispatch(setData(data))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(PLP);
