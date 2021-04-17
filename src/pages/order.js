import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import OrderListItem from '../components/OrderListItem';
import SEO from '../components/SEO';
import CartPageStyles from '../styles/CartPageStyles';
const CheckoutPageWrapper = styled.div`
  font-family: monospace;
`;
export default function orderPage({ location }) {
  console.log('location', location.state);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (location.state) {
      setOrder(location.state.res.order);
    } else return;
  }, []);
  // const payment = location.state.orderRes.charge

  return (
    <CheckoutPageWrapper>
      <SEO title={'Order Summary'} />
      <CartPageStyles>
        <h1>Your Order</h1>
        <ul>
          {order.map((orderItem, i) => (
            <OrderListItem item={orderItem} key={`${orderItem.coffee}-`} />
          ))}
        </ul>
      </CartPageStyles>
    </CheckoutPageWrapper>
  );
}