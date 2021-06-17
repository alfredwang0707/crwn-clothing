import CartActionTypes from './cart.types'

export const toggleCartHidden = () => ({
    type: CartActionTypes.toggleCartHidden
})

export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
})