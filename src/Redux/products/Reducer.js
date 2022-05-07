import * as actionTypes from "./Types";

const INITIAL_STATE = {
	data: [],
	currentItem: null,
	cart: JSON.parse(localStorage.getItem("Cart")) || [],
	currency: JSON.parse(localStorage.getItem("Currency")) || "USD",
	category: JSON.parse(localStorage.getItem("Category")) || "",
};

const productReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.SET_DATA:
			return {
				...state,
				data: action.payload.data,
			};
		case actionTypes.SET_CATEGORY:
			return {
				...state,
				category: action.payload.value,
			};
		case actionTypes.ADD_TO_CART:
			const item = state.data.find((item) => item.id === action.payload.id);
			const inCart = state.cart.find((item) =>
				item.id === action.payload.id ? true : false
			);
			let selectedAttribute = item.attributes?.map((item) => {
				return { [item.name]: item.items[0].value }
			})
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
						item.id === action.payload.id
							? {
								...item,
								qty: item.qty + 1,
								selectedAttribute
							}
							: item
					)
					: [...state.cart, {
						...item, qty: 1,
						selectedAttribute
					}],
			};
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
		// case actionTypes.ADJUST_ATTRIBUTES:
		// 	let selectedAttributes = [];
		// 	return {
		// 		...state,
		// 		cart: state.data.map((item) =>
		// 			item.id === action.id
		// 				? {
		// 					...item,
		// 					selectedAttributes: { [action.selectedAttributes.name]: action.selectedAttributes.value }
		// 				}
		// 				: item
		// 		),
		// 	};
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
