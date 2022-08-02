import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onTap);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onTap);
  }

  onTap = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handkerBackDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.backdrop} onClick={this.handkerBackDrop}>
        <div className={css.modal}>
          <img className={css.modalImg} src={this.props.image} alt="" />
        </div>
      </div>
    );
  }
}

export { Modal };
