import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/actions/order';
import { useDispatch, useSelector } from '../../services/hooks';
import { RootState, TIngredient } from '../../utils/types';
import styles from './order-info.module.css';

interface IOrderInfoParams {
  orderId: string;
}

export function OrderInfo() {
  const { orderId } = useParams<IOrderInfoParams>();

  const dispatch = useDispatch();
  const { orderFull } = useSelector(
    (store: RootState) => store.order
  );
  const { ingredients } = useSelector(
    (store: RootState) => store.ingredients
  );
  useEffect(() => {
    dispatch<any>(getOrderById(parseInt(orderId)));
  }, [orderId, dispatch]);

  let status;
  switch (orderFull?.status) {
    case 'done':
      status = 'Выполнен'
      break;
    case 'pending':
      status = 'Готовится'
      break;
    case 'created':
      status = 'Создан'
      break;
    default:
      status = 'н/д'
  }

  type TIngredientsPrepared = {
    ingredient: TIngredient | undefined,
    count?: number
  }

  const ingredientsPrepared: Array<TIngredientsPrepared> | undefined = useMemo(() => {
    if (orderFull === null) {
      return undefined;
    }

    const ids = Array.from(new Set(orderFull.ingredients));

    return ids.map(id => ({
      ingredient: ingredients.find(item => item._id === id),
      count: orderFull.ingredients.filter(item => item === id).length
    }));
  }, [orderFull, ingredients]);

  const totalPrice = useMemo(() => {
    if (ingredientsPrepared === undefined)
      {
        return 0;
      }

    return ingredientsPrepared.reduce((sum, item) => sum + (item.ingredient?.price || 0) * (item.count || 0), 0 )
  }, [ingredientsPrepared])
  // if (orderFull !== null) {
  //   const ids = Array.from(new Set(orderFull.ingredients));

  //   ingredientsPrepared = ids.map(id => ({
  //     ingredient: ingredients.find(item => item._id === id),
  //     count: orderFull.ingredients.filter(item => item === id).length
  //   }));
  // }

  return (<>
    {orderFull !== null && (
      <div className={`${styles.container}`}>
      <p className={`${styles.number} text text_type_digits-default`}>#{orderFull.number}</p>
      <h4 className={`${styles.name} text text_type_main-medium mt-10`}>{orderFull.name}</h4>
      <p className={`${styles.status} text text_type_main-small mt-3`}>{status}</p>
      <p className="text text_type_main-medium mt-15">Состав:</p>
      <ul className={`${styles['ingredients-list']} mt-6`}>
        {ingredientsPrepared && ingredientsPrepared.map((item, index) => (
          <li className={`${styles['ingredients-list__item']}`} key={index}>
            <img src={item?.ingredient?.image_mobile} alt={item?.ingredient?.name} className={`${styles['ingredients-list__image']}`} />
            <p className={`${styles['ingredients-list__name']} text text_type_main-default`}>{item?.ingredient?.name}</p>
            <p className={`${styles['ingredients-list__price']} text text_type_digits-default`}>{item.count} x {item?.ingredient?.price} <CurrencyIcon type="primary" /></p>
          </li>
        ))}

      </ul>
      <div className={`${styles.bottom} mt-10`}>
        <p className={`${styles.date} text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(orderFull.createdAt)} />
        </p>
        <p className={`${styles.price} text text_type_digits-default`}>
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
    )}
    </>
  )
}
