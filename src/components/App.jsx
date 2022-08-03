import { useState, useEffect } from 'react';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { createRequest } from '../API/pixabay';

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  error: 'error',
  success: 'success',
};
const App = () => {
  const [image, setImage] = useState('');
  const [query, setQuery] = useState('');
  const [imageList, setImageList] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(STATUS.idle);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query && page === 1) {
      return;
    }
    setStatus(STATUS.loading);
    createRequest(query, page)
      .then(res => {
        const { data } = res;
        setImageList(prev => [...prev, ...data.hits]);
        setTotalHits(data.totalHits);
        setStatus(STATUS.success);
      })
      .catch(error => {
        console.log(error);
        setError(error.message);
        setStatus(STATUS.error);
      });
  }, [query, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handlerOpenModal = img => {
    setImage(img);
  };
  const handlerCloseModal = () => {
    setImage('');
  };

  const handlerForm = search => {
    if (search === query) {
      return;
    }
    setImageList([]);
    setQuery(search);
    setPage(1);
  };
  return (
    <div>
      <Searchbar onSubmit={handlerForm} />
      {status === STATUS.loading && <Loader />}
      {status === STATUS.error && <p>{error}</p>}
      {status === STATUS.idle && <p>{`Please, enter the search request`}</p>}
      {status === STATUS.success && (
        <ImageGallery
          imageList={imageList}
          handlerOpenModal={handlerOpenModal}
        />
      )}
      {image && <Modal image={image} onClose={handlerCloseModal} />}
      {status === STATUS.success && totalHits > 12 * page && (
        <Button onClick={loadMore} />
      )}
      <ToastContainer />
    </div>
  );
};

export { App };
