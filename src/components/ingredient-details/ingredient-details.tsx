import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useNavigate, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (!params.id) {
      navigate('/', { replace: true });
    }
  }, []);

  const ingredients = useSelector((state) => state.const).ingredients;
  const ingredientData = ingredients.find((item) => item._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
