import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalPlace = document.getElementById('modal')!;

export type TModalProps = {
  children: JSX.Element,
  onClose: () => void,
  title?: string,
}

function Modal({ children, onClose, title = '' }: TModalProps): JSX.Element {

  const handleEsc = (e:KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} pt-10 pr-10 pb-15 pl-10`} data-test-id="modal">
        <div className={styles.modal__header}>
          <h3 className={`${styles.modal__title} text text_type_main-medium`}>{title}</h3>
          <button className={styles['modal__close-btn']} onClick={onClose} data-test-id="modal-close-btn">
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={styles.modal__body}>
          {children}
        </div>
      </div>
    </>
    ,
    modalPlace
  );
}
Modal.propType = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

export default Modal;
