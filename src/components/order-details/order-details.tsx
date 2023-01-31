import styles from './order-details.module.css';
import imageDone from '../../images/done.png';
import { useSelector } from '../../services/hooks';

function OrderDetails(): JSX.Element {
  const { order } = useSelector((store) => store.order);

  return (
    <div className={`${styles.order} mt-4 mb-8`}>
      <p className={`${styles.order__number} text text_type_digits-large`} data-test-id="order-number">{order.order.number}</p>
      <p className={`text text_type_main-default`}>идентификатор заказа</p>
      <img src={imageDone} alt="Иконка успешно" className="mt-15 mb-15" />
      <p className={`text text_type_main-small`}>Ваш заказ начали готовить</p>
      <p className={`text text_type_main-small text_color_inactive mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;
