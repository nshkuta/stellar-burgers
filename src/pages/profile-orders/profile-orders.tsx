import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/slices/ordersSlice';
import { getIngredients } from '../../services/slices/constructorSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([dispatch(getOrders()), dispatch(getIngredients())]);
  }, []);

  const orders = useSelector((state) => state.orders).orders || [];

  return <ProfileOrdersUI orders={orders} />;
};
