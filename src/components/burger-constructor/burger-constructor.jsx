import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor(props) {
  return (
    <div className="mt-25">
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
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}

export default BurgerConstructor;
