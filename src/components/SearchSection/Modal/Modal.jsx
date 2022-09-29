import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

export default function Modal({ modalImg, onClose }) {
  useEffect(() => {
    const handeleClickDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handeleClickDown);
    return () => {
      window.removeEventListener('keydown', handeleClickDown);
    };
    // eslint-disable-next-line
  }, []);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <img src={modalImg} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.shape({
      modalImg: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
    })
  ),
};
