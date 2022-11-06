import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalPlace = document.getElementById('modal');

function Modal(props) {

  const {children, onClose, title} = props;

  return ReactDOM.createPortal(
    <ModalOverlay>
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`}>
        <div className={styles.modal__header}>
          <h3 className={`${styles.modal__title} text text_type_main-medium`}>{title}</h3>
          <button className={styles['modal__close-btn']} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.modal__body}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    modalPlace
  );
}
Modal.propType = {
  title: PropTypes.string,
  onClose: PropTypes.func,
}

export default Modal;
