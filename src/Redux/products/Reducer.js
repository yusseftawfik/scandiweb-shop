import * as actionTypes from "./Types";

const INITIAL_STATE = {
	data: [],
	currentItem: null,
	cart: JSON.parse(localStorage.getItem("Cart")) || [],
	currency: JSON.parse(localStorage.getItem("Currency")) || "USD",
	category: JSON.parse(localStorage.getItem("Category")) || "all",
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
				item.cartID === action.payload.cartID ? true : false
			);
			let selectedAttribute = [...action.payload.selectedAttribute];
			let cartID = item.attributes
				?.map((att) => `${item.id}-${att.name}-${action.payload.specialValue}`)
				.join("-");
			return {
				...state,
				cart: inCart
					? state.cart.map((item) =>
						item.cartID === action.payload.cartID
							? {
								...item,
								qty: item.qty + 1,
							}
							: item.id === action.payload.id
								? item
								: item
					)
					: [
						...state.cart,
						{
							...item,
							cartID,
							qty: 1,
							selectedAttribute,
						},
					],
			};
		case actionTypes.REMOVE_FROM_CART:
			return {
				...state,
				cart: state.cart.filter(
					(item) => item.cartID !== action.payload.cartID
				),
			};
		case actionTypes.ADJUST_QTY:
			return {
				...state,
				cart: state.cart.map((item) =>
					item.cartID === action.payload.cartID
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
