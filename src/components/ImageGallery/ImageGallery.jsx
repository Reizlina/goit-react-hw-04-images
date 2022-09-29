import ImageGalleryItem from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

const ImageGallery = props => {
  const { pictures, onClick } = props;

  const galleryItems = pictures.map(
    ({ id, webformatURL, tags, largeImageURL }) => {
      return (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      );
    }
  );

  return <ul className={s.list}>{galleryItems}</ul>;
};

export default ImageGallery;

ImageGallery.propTypes = {
  props: PropTypes.objectOf(
    PropTypes.shape({
      pictures: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          webformatURL: PropTypes.string.isRequired,
          tags: PropTypes.string.isRequired,
          largeImageURL: PropTypes.string.isRequired,
        })
      ).isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
};
