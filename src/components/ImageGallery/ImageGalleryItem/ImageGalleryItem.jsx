import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImg, largeImg, handlerOpenModal }) => {
  return (
    <li>
      <img
        className={css.img}
        src={smallImg}
        alt=""
        onClick={() => handlerOpenModal(largeImg)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  handlerOpenModal: PropTypes.func.isRequired,
};
export { ImageGalleryItem };
