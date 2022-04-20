import * as actionTypes from "./Types";

const products = [];
// const category = "";

const INITIAL_STATE = {
	data: products,
	cart: JSON.parse(localStorage.getItem("Cart")) || [],
	currentItem: null,
	currency: JSON.parse(localStorage.getItem("Currency")) || 'USD',
	// category: JSON.parse(localStorage.getItem("Category")) || "all",
	category: "",
};

const productReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART:
			const item = state.data.find((item) => item.id === action.payload.id);
			const inCart = state.cart.find((item) =>
				item.id === action.payload.id ? true : false
			);
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
						item.id === action.payload.id
							? { ...item, qty: item.qty + 1 }
							: item
					)
					: [...state.cart, { ...item, qty: 1 }]
			}

		case actionTypes.REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload.id),
			};

		case actionTypes.ADJUST_QTY:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id
						? { ...item, qty: action.payload.qty }
						: item
				),
			};

		case actionTypes.LOAD_CURRENT_ITEMS:
			return {
				...state,
				currentItem: action.payload,
			};

		case actionTypes.CHANGE_CURRENCY:
			return {
				...state,
				currency: action.payload,
			};

		case actionTypes.CHANGE_CATEGORY:
			return {
				...state,
				category: action.payload,
			};

		default:
			return state;
	}
};

export default productReducer;
