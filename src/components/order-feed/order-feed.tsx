import FeedItem from '../feed-item/feed-item';
import styles from './order-feed.module.css';
import { useSelector } from '../../services/hooks';
import { RootState } from '../../utils/types';

function OrderFeed() {

  const { wsConnected, orders } = useSelector(
    (store:RootState) => store.wsFeed
  );

  return (
    <section>
      <h1 className='text text_type_main-large mt-5 mb-5'>
        Лента заказов
      </h1>
      <div className={`${styles.content} pr-2`}>
        {wsConnected && (
          <ul className={styles['order-list']}>
          {orders.map(item => (
            <FeedItem data={item} key={item._id} />
          ))}
        </ul>
        )}
      </div>

    </section>
  )
}

export default OrderFeed;
