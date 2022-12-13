import styles from './loader.module.css';
import PropTypes from 'prop-types';

function Loader({ extraClass = '' }) {
  return (
    <div className={`${styles.container} ${extraClass}`}>
      <div className={styles.loader}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

Loader.propTypes = {
  extraClass: PropTypes.string,
}

export default Loader;
