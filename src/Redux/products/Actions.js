import * as actionTypes from './Types';

export const setData = (data) => {
	return {
		type: actionTypes.SET_DATA,
		payload: {
			data: data
		}
	}
}

export const setCategory = (value) => {
	return {
		type: actionTypes.SET_CATEGORY,
		payload: {
			data: value
		}
	}
}

// export const addToCart = (itemID) => {
// 	return {
// 		type: actionTypes.ADD_TO_CART,
// 		payload: {
// 			id: itemID
// 		}
// 	}
// }

export const addToCart = (itemID, name, value) => {
	return {
		type: actionTypes.ADD_TO_CART,
		payload: {
			id: itemID
		},
		selectedAttributes: {
			[name]: value,
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

// export const selectAttribute = (itemID, name, value) => {
// 	return {
// 		type: actionTypes.ADJUST_ATTRIBUTES,
// 		id: itemID,
// 		selectedAttributes: {
// 			[name]: value,
// 		}
// 	}
// }

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