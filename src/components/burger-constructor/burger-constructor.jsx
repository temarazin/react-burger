import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { ADD_BUN, ADD_INGREDIENT, REMOVE_INGREDIENT, COUNT_TOTAL_PRICE } from '../../services/actions/burgerConstructor';
import { getOrder } from '../../services/actions/order';
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {

  const dispatch = useDispatch();
  const { ingredients, totalPrice } = useSelector(store => store.burgerConstructor);

  const onDropHandler = (item) => {
    if (ingredients[1]?.uuid === 'placeholder_ingredient') {
      dispatch({ type: REMOVE_INGREDIENT, uuid: 'placeholder_ingredient' })
    }
    item = {...item, uuid: uuidv4()}
    const action = item.type === 'bun' ? ADD_BUN : ADD_INGREDIENT;
    dispatch({ type: action, ingredient: item });
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
        onDropHandler(item);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
});

  useEffect(() => {
    dispatch({ type: COUNT_TOTAL_PRICE });
  }, [dispatch, ingredients]);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => {
    setIsModalOpened(false);
  }

  const showOrder = () => {
    dispatch(getOrder(ingredients.map(item => item._id)));
    setIsModalOpened(true);
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  )

  // const burgerIngredients = ingredients.reduce((acc, item) => {
  //   if (!acc.includes(item._id)) {
  //     acc.push(item._id);
  //   }
  //   return acc;
  // }, [])

  return (
    <>
      <section className="mt-25" aria-label="Конструктор">
        <ul className={`${styles.constructor} ${isHover && styles.isHover} pr-4 pl-4`} ref={dropTarget}>
          {ingredients.map((item, i) => {
            return (
              <BurgerConstructorItem
                item={item}
                key={item.uuid}
                isLocked={i === 0}
                type={i === 0 ? 'top' : undefined}
              />
              )
          }

          )}
          <BurgerConstructorItem
              item={ingredients[0]}
              key={'bottom-bun'}
              isLocked={true}
              type="bottom"
            />
        </ul>
        <div className={`${styles['order-submit']} mt-10`}>
          <p className="text text_type_digits-medium mr-10">{totalPrice} <CurrencyIcon type="primary" /></p>
          <Button type="primary" htmlType="button" size="large" onClick={showOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpened && modal}
    </>
  )
}

export default BurgerConstructor;
