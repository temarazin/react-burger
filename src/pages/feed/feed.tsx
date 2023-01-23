import OrderFeed from '../../components/order-feed/order-feed';
import { wsFeedCloseConnection, wsFeedConnect } from '../../services/actions/wsFeed';
import { wsFeedUrl } from '../../utils/constants';
import { useEffect } from 'react';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { FeedScreen } from '../../components/feed-screen/feed-screen';
import { RootState } from '../../utils/types';

function Feed() {
  const dispatch = useDispatch();

  const { orders } = useSelector(
    (store: RootState) => store.wsFeed
  );

  useEffect(() => {
    dispatch(wsFeedConnect(wsFeedUrl));
    return () => {dispatch(wsFeedCloseConnection())};
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <OrderFeed type='all' orders={orders} />
      <FeedScreen />
    </div>
  )
}

export default Feed;
