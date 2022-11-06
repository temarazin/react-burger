import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';

function BurgerConstructor(props) {

  const [isModalOpened, setIsModalOpened] = useState(false);

  const closeModal = () => {
    setIsModalOpened(false);
  }

  const showOrder = () => {
    setIsModalOpened(true);
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  )

  return (
    <>
      <section className="mt-25" aria-label="Конструктор">
        <ul className={`${styles.constructor} pr-4 pl-4`}>
          <li className={`${styles.constructor__item}`}>
            <span className={`${styles['icon-wrapper']} pr-2`}></span>
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i (верх)"
              price={200}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
          <li className={`${styles.constructor__item}`}>
            <span className={`${styles['icon-wrapper']} pr-2`}>
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
          <li className={`${styles.constructor__item}`}>
            <span className={`${styles['icon-wrapper']} pr-2`}>
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
          <li className={`${styles.constructor__item}`}>
            <span className={`${styles['icon-wrapper']} pr-2`}>
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
          <li className={`${styles.constructor__item}`}>
            <span className={`${styles['icon-wrapper']} pr-2`}>
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
          <li className={`${styles.constructor__item}`}>
            <span className={`${styles['icon-wrapper']} pr-2`}>
              <DragIcon type="primary" />
            </span>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
          <li className={`${styles.constructor__item}`}>
            <span className={`${styles['icon-wrapper']} pr-2`}></span>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
              thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
            />
          </li>
        </ul>
        <div className={`${styles['order-submit']} mt-10`}>
          <p className="text text_type_digits-medium mr-10">3200 <CurrencyIcon type="primary" /></p>
          <Button type="primary" htmlType="button" size="large" onClick={showOrder}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {isModalOpened && modal}
    </>
  )
}
BurgerConstructor.propType = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes()).isRequired,
}

export default BurgerConstructor;
