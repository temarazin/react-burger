import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/hooks';
import { TOrderFull } from '../../utils/types';
import styles from './feed-item.module.css';

type TFeedItemProps = {
  data: TOrderFull
}

function FeedItem({ data }: TFeedItemProps ) {

  const { ingredients } = useSelector((store) => store.ingredients);
  const location = useLocation();

  const price: number = useMemo(
    () =>
      data.ingredients.reduce((sum: number, id: string) => {
        const item = ingredients.find(item => item._id === id);
        const price = item?.price || 0;
        return (sum += price);
      }, 0),
    [ingredients, data.ingredients]
  );

  return (
    <li className={`${styles.item} p-6`}>
      <Link
        to={{
          pathname: `${location.pathname}/${data.number}`,
          state: { background: location }
        }}
        className={styles.boxlink}
      >
        <div className={styles.top}>
          <p className={`${styles.number} text text_type_digits-default`}>#{data.number}</p>
          <p className={`${styles.date} text text_type_main-default`}>
            <FormattedDate date={new Date(data.createdAt)} />
          </p>
        </div>
        <h3 className={`text text_type_main-medium mt-6`}>{data.name}</h3>
        <div className={`${styles.bottom} mt-6`}>
          <ul className={`${styles['ingredient-list']}`}>
            {data.ingredients.map((item, index) => (
              <React.Fragment key={index}>
                {index < 5 && (
                  <li key={index} className={styles['ingredient-item']} >
                    <img
                      style={{zIndex: 20 - index}}
                      className={`${styles.ingredient}`}
                      src={ingredients.find(ingredient => ingredient._id === item)?.image_mobile}
                      alt={ingredients.find(ingredient => ingredient._id === item)?.name}
                    />
                  </li>
                )}

              </React.Fragment>

            ))}
          </ul>
          <p className={`${styles.price} text text_type_digits-default`}>
            {price} <CurrencyIcon type="primary" />
          </p>
        </div>
      </Link>
    </li>
  )
}

export default FeedItem;
