import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

import { PublicOrder } from '../../../types';
import StoreHeader from '../StoreHeader';

import './style.less';

interface OrdersPageProps {
  orders: PublicOrder[] | undefined;
}

const OrdersPage: React.FC<OrdersPageProps> = (props) => {
  const { orders } = props;

  return (
    <>
      <StoreHeader />
      {orders?.map((order) => {
        return (
          <div className="order-thing">
            <Link to={`./order/${order.uuid}`}>
              <h1>Order (Status Unknown)</h1>
            </Link>
            <h3>Purchase Date: {moment(order.orderedAt).format('MMMM Do, YYYY')}</h3>
            <h3>Pickup Date: {moment(order.pickupEvent.start).format('MMMM Do, YYYY')}</h3>
          </div>
        );
      })}
    </>
  );
};

export default OrdersPage;
