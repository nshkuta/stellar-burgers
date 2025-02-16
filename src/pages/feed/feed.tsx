import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import {
  getFeeds,
  getIngredients,
  selectOrders
} from '../../services/slices/stellarBurgerSlice';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(getIngredients()), dispatch(getFeeds())]);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getIngredients());
        dispatch(getFeeds());
      }}
    />
  );
};
