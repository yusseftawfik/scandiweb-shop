//  product listing page
import React from "react";
import { connect } from "react-redux";
import Navbar from "../Navbar/Navbar";
import useProducts from "../../Hooks/useProducts";
import Product from "./Product";
import Spinner from "./Spinner";
import "../../Styles/PLP.scss";

const PLP = ({ category }) => {
	const { data, error, loading } = useProducts();
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
export default connect(mapStateToProps)(PLP);
