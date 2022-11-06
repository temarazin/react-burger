import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props) {

  function handleClick(e) {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  }

  return (
    <div className={styles['modal-overlay']} onClick={handleClick}>
      {props.children}
    </div>
  )
}
ModalOverlay.propType = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;
