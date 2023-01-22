import OrderFeed from '../../components/order-feed/order-feed';
import { wsFeedCloseConnection, wsFeedConnect } from '../../services/actions/wsFeed';
import { wsFeedUrl } from '../../utils/constants';
import { useEffect } from 'react';
import styles from './feed.module.css';
import { useDispatch } from '../../services/hooks';

function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsFeedConnect(wsFeedUrl));
    return () => {dispatch(wsFeedCloseConnection())};
  }, []);

  return (
    <div className={styles.container}>
      <OrderFeed />
    </div>
  )
}

export default Feed;
