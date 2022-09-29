import React, { useState, useEffect } from 'react';

import { getPosts } from '../../Services/Api';
import Notiflix from 'notiflix';

import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Modal from './Modal';
import Button from './Button';

export default function SearchSection() {
  const [pictures, setPictures] = useState([]);
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalUrl, setModalUrl] = useState('');

  useEffect(() => {
    if (value) {
      const fetchPosts = async () => {
        setLoading(true);
        try {
          const data = await getPosts(value, page);
          if (!data.hits.length) {
            return Notiflix.Notify.failure('Enter your search query');
          }
          setPictures(prev => [...prev, ...data.hits]);
        } catch (error) {
          console.log(error);
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchPosts();
    }
  }, [value, page]);

  const onFormSubmit = formValue => {
    if (formValue === value) {
      return;
    }
    setValue(formValue);
    setPictures([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(s => s + 1);
  };

  const openModal = largeImageURL => {
    setModalUrl(largeImageURL);
  };

  const closeModal = () => {
    setModalUrl('');
  };

  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />

      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} onClick={openModal} />
      )}
      {loading && <Loader />}
      {error && <h2>Oops, something went wrong...</h2>}
      {pictures.length > 0 && <Button onClick={loadMore} />}
      {modalUrl && <Modal modalImg={modalUrl} onClose={closeModal} />}
    </>
  );
}
