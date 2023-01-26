import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import BurgerConstructorItem from '../burger-constructor-item/burger-constructor-item';
import { burgerConstructorActions } from '../../services/actionCreators/burgerConstructor';
import { getOrder } from '../../services/actions/order';
import { v4 as uuidv4 } from 'uuid';

function BurgerConstructor() {

  const {
    addIngredient,
    removeIngredient,
    addBun
  } = burgerConstructorActions;
  const dispatch = useDispatch();

  const history = useHistory();

  const { ingredients } = useSelector(store => store.burgerConstructor);
  const { isAuth } = useSelector(store => store.user);
  const [ canOrder, setCanOrder ] = useState(false);
  const { order } = useSelector(store => store.order.order);

  const onDropHandler = (item) => {
    if (ingredients[1]?.uuid === 'placeholder_ingredient') {
      dispatch(removeIngredient('placeholder_ingredient'))
    }
    item = {...item, uuid: uuidv4()}
    if (item.type === 'bun') {
      dispatch(addBun(item));
    } else {
      dispatch(addIngredient(item));
    }
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

  const totalPrice = useMemo(() => ingredients.reduce((sum, item) => {
    let price = item.price;
    if (item.type === 'bun') {
      price *= 2;
    }
    return sum += price;
  }, 0), [ingredients]);

  useEffect(() => {
    if (ingredients[0]?.uuid === 'placeholder_bun') {
      setCanOrder(false);
    } else {
      setCanOrder(true);
    }
  }, [ingredients])

  useEffect(() => {
    if (order.number > 0) {
      setIsModalOpened(true);
    }
  }, [order.number])

  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => {
    setIsModalOpened(false);
  }

  const createOrder = () => {
    if (!isAuth) {
      history.push("/login");
      return;
    }
    const orderAr = ingredients.map(item => item._id);
    orderAr.push(orderAr[0]);
    dispatch(getOrder(ingredients.map(item => item._id)));
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  )

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
          <Button type="primary" htmlType="button" size="large" onClick={createOrder} disabled={!canOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpened && modal}
    </>
  )
}

export default BurgerConstructor;