import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { TModalProps } from '../modal/modal';



function ModalOverlay({ onClose }: Pick<TModalProps, "onClose">) {

  function handleClick(e:React.SyntheticEvent) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={styles['modal-overlay']} onClick={handleClick} data-test-id="modal-overlay">
    </div>
  )
}
ModalOverlay.propType = {
  onClose: PropTypes.func.isRequired,
}

export default ModalOverlay;
