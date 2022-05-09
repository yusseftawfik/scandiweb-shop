import * as actionTypes from "./Types";

export const setData = (data) => {
	return {
		type: actionTypes.SET_DATA,
		payload: {
			data: data,
		},
	};
};
export const setCategory = (value) => {
	return {
		type: actionTypes.SET_CATEGORY,
		payload: {
			data: value,
		},
	};
};
export const addToCart = (itemID, cartID, name, value) => {
	return {
		type: actionTypes.ADD_TO_CART,
		payload: {
			cartID: cartID,
			id: itemID,
			name: name,
			value: value,
		},
	};
};
export const removeFromCart = (cartID) => {
	return {
		type: actionTypes.REMOVE_FROM_CART,
		payload: {
			cartID: cartID,
		},
	};
};
export const adjustQty = (cartID, value) => {
	return {
		type: actionTypes.ADJUST_QTY,
		payload: {
			cartID: cartID,
			qty: value,
		},
	};
};
export const loadCurrentItems = (item) => {
	return {
		type: actionTypes.LOAD_CURRENT_ITEMS,
		payload: item,
	};
};
export const changeCurrency = (label) => {
	return {
		type: actionTypes.CHANGE_CURRENCY,
		payload: label,
	};
};
export const changeCategory = (name) => {
	return {
		type: actionTypes.CHANGE_CATEGORY,
		payload: name,
	};
};
