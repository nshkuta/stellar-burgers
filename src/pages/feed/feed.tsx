import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';

import { useSelector, useDispatch } from '../../services/store';
import { getFeeds } from '../../services/slices/ordersSlice';
import { getIngredients } from '../../services/slices/constructorSlice';

export const Feed: FC = () => {
  const orders = useSelector((state) => state.orders).orders;
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
