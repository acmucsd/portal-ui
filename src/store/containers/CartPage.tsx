import React from 'react';
import { connect } from 'react-redux';

import PageLayout from '../../layout/containers/PageLayout';
import CartPage from '../components/CartPage';

import Config from '../../config';
import { history } from '../../redux_store';
import { CartItem } from '../../types';
import { fetchService, notify } from '../../utils';

type CartPageContainerProps = {
  cart: CartItem[];
};

const CartPageContainer: React.FC<CartPageContainerProps> = ({ cart }) => {
  const verifyCart = async (onFailCallback: () => void) => {
    try {
      const url = `${Config.API_URL}${Config.routes.store.verification}`;
      const payload = cart.map(({ option: { uuid }, quantity }) => ({ option: uuid, quantity }));
      await fetchService(url, 'POST', 'json', {
        requiresAuthorization: true,
        payload: JSON.stringify({ order: payload }),
      });
      history.push('/store/checkout');
    } catch (error) {
      onFailCallback();
      notify('Cart Error', error.message);
    }
  };

  return (
    <PageLayout>
      <CartPage cart={cart} verifyCart={verifyCart} />
    </PageLayout>
  );
};

const mapStateToProps = (state: { [key: string]: any }) => ({ cart: Object.values(state.store.cart) as CartItem[] });

export default connect(mapStateToProps)(CartPageContainer);
