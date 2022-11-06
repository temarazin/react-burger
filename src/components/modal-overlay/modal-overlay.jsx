import styles from './modal-overlay.module.css';

function ModalOverlay(props) {
  return (
    <div className={styles['modal-overlay']}>
      {props.children}
    </div>
  )
}

export default ModalOverlay;
