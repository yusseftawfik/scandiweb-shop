import * as actionTypes from './Types';

export const addToCart = (itemID) => {
	return {
		type: actionTypes.ADD_TO_CART,
		payload: {
			id: itemID
		}
	}
}

export const removeFromCart = (itemID) => {
	return {
		type: actionTypes.REMOVE_FROM_CART,
		payload: {
			id: itemID
		}
	}
}

export const adjustQty = (itemID, value) => {
	return {
		type: actionTypes.ADJUST_QTY,
		payload: {
			id: itemID,
			qty: value
		}
	}
}

export const loadCurrentItems = (item) => {
	return {
		type: actionTypes.LOAD_CURRENT_ITEMS,
		payload: item
	}
}

export const changeCurrency = (label) => {
	return {
		type: actionTypes.CHANGE_CURRENCY,
		payload: label
	}
}
export const changeCategory = (name) => {
	return {
		type: actionTypes.CHANGE_CATEGORY,
		payload: name
	}
}
