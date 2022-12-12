import styles from './loader.module.css';

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

export default Loader;
