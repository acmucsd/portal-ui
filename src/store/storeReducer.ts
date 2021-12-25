import { AnyAction } from 'redux';
import { CART_ADD, CART_EDIT, CART_REMOVE } from './storeTypes';
import { CartItem } from '../types';

const initialState = {
  error: false,
  cart: JSON.parse(localStorage.getItem('cart') || '{}') as { [uuid: string]: CartItem },
};

const StoreReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case CART_ADD: {
      const {
        option: { uuid },
        quantity,
      }: CartItem = action.payload;

      if (!uuid || quantity < 1) {
        return state;
      }

      const newCart = { ...state.cart };

      if (newCart[uuid]) {
        // Item exists, no need to save item data
        newCart[uuid].quantity += quantity;
      } else {
        // Item doesn't exist, need to save item data
        newCart[uuid] = action.payload;
      }

      localStorage.setItem('cart', JSON.stringify(newCart));

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_EDIT: {
      const {
        option: { uuid },
        quantity,
      }: CartItem = action.payload;

      if (!uuid) {
        return state;
      }

      const newCart = { ...state.cart };

      if (quantity > 0) {
        newCart[uuid].quantity = quantity;
      } else {
        delete newCart[uuid];
      }

      localStorage.setItem('cart', JSON.stringify(newCart));

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    case CART_REMOVE: {
      const {
        option: { uuid },
      }: CartItem = action.payload;

      if (!uuid) {
        return state;
      }

      const newCart = { ...state.cart };

      delete newCart[uuid];

      localStorage.setItem('cart', JSON.stringify(newCart));

      const newState = { ...initialState, cart: newCart };

      return newState;
    }
    default:
      return state;
  }
};

export default StoreReducer;
