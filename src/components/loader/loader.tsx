import styles from './loader.module.css';
import PropTypes from 'prop-types';

type TLoaderProps = {
  extraClass?: string
}

function Loader({ extraClass = '' }: TLoaderProps): JSX.Element {
  return (
    <div className={`${styles.container} ${extraClass || ''}`}>
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
