import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { createRequest } from '../../API/pixabay';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const ImageGallery = ({ search, handlerOpenModal }) => {
  const [imageList, setImageList] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoader(true);
    createRequest(search)
      .then(response => {
        const { data } = response;
        if (data.hits.length === 0) {
          toast.error('Image not found');
          return;
        }
        setImageList([...data.hits]);
        setPage(2);
        setTotalHits(data.totalHits);
      })
      .finally(() => setLoader(false));
  }, [search]);

  const loadMore = () => {
    createRequest(search, page)
      .then(response => {
        const { hits } = response.data;
        setImageList(prev => [...prev, ...hits]);
        setPage(page + 1);
      })
      .catch(error => {
        toast.error('Ooops...something went wrong.');
      });
  };

  if (!imageList.length) {
    return (
      <p
        style={{
          fontSize: '24px',
          margin: '150px auto',
        }}
      >
        {'Search an image'}
      </p>
    );
  }

  return (
    <>
      <ul className={css.ul}>
        {loader && <Loader className={css.loader} />}
        {imageList.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              smallImg={webformatURL}
              largeImg={largeImageURL}
              handlerOpenModal={handlerOpenModal}
            />
          );
        })}
      </ul>
      {totalHits >= 12 * page && <Button onClick={loadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  handlerOpenModal: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};
