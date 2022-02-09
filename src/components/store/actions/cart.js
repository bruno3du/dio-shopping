/** @format */

const add = (cart, product) => {
	return {
		type: 'ADD_TO_CART',
		cart,
		product,
	};
};

const addItem = (cart, product) => {
	return {
		type: 'ADD_ITEM',
		cart,
		product,
	};
};

const removeItem = (cart, product) => {
	return {
		type: 'REMOVE_ITEM',
		cart,
		product,
	};
};

const deleteItem = (cart, product) => {
	return {
		type: 'DELETE_ITEM',
		cart,
		product,
	};
};

const changeCart = (localCart) => {
	return {
		type: 'CHANGE_CART',
		localCart,
	};
};

export { add, addItem, removeItem, deleteItem, changeCart };
