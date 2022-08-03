import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const onTap = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onTap);

    return () => {
      window.removeEventListener('keydown', onTap);
    };
  }, [onClose]);

  const handkerBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div className={css.backdrop} onClick={handkerBackDrop}>
      <div className={css.modal}>
        <img className={css.modalImg} src={image} alt="" />
      </div>
    </div>
  );
};
Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { Modal };
