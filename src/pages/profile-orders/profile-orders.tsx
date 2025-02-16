import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  getOrders,
  selectUserOrders
} from '../../services/slices/stellarBurgerSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([dispatch(getOrders()), dispatch(getIngredients())]);
  }, []);

  const orders = useSelector(selectUserOrders) || [];

  return <ProfileOrdersUI orders={orders} />;
};
