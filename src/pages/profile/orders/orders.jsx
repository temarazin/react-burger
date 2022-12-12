import styles from './orders.module.css';
import ProfileMenu from '../../../components/profile-menu/profile-menu';

function Orders() {
  return (
    <div className={styles.container}>
      <div className="pr-15">
        <ProfileMenu />
      </div>
    </div>
  )
}

export default Orders;
