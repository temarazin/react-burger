import styles from './orders.module.css';
import ProfileMenu from '../../../components/profile-menu/profile-menu';
import { useDispatch, useSelector } from '../../../services/hooks';
import { useEffect } from 'react';
import { wsProfileOrdersUrl } from '../../../utils/constants';
import { getAccessToken } from '../../../utils/utils';
import { wsProfileOrdersCloseConnection, wsProfileOrdersConnect } from '../../../services/actions/wsProfileOrders';
import { RootState } from '../../../utils/types';
import OrderFeed from '../../../components/order-feed/order-feed';

function Orders() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = getAccessToken() || '';
    dispatch(wsProfileOrdersConnect(`${wsProfileOrdersUrl}?token=${token.split('Bearer ')[1]}`));
    return () => {
      dispatch(wsProfileOrdersCloseConnection())
    }
  }, [dispatch]);

  const { orders } = useSelector(
    (store: RootState) => store.wsOrderHistory
  );

  return (
    <div className={styles.container}>
      <div className="pr-15">
        <ProfileMenu />
      </div>
      <div className={`${styles.orderfeed}`}>
        <OrderFeed type='profile' orders={orders} />
      </div>
    </div>
  )
}

export default Orders;
