import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handeleClickDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handeleClickDown);
  }

  handeleClickDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg } = this.props;

    return (
      <div className={s.overlay} onClick={this.handleBackdropClick}>
        <div className={s.modal}>
          <img src={modalImg} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.shape({
      modalImg: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
    })
  ),
};
