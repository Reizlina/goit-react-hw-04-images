import React, { Component } from 'react';

import ImageGallery from 'components/ImageGallery';
import { getPosts } from '../../Services/Api';
import Notiflix from 'notiflix';

import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import Button from 'components/Button';

class SearchSection extends Component {
  state = {
    pictures: [],
    value: '',
    page: 1,
    loading: false,
    error: null,

    modalUrl: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page, value } = this.state;
    // console.log('prevState.value', prevState.value);
    // console.log('value :>> ', value);

    if (value !== prevState.value || page > prevState.page) {
      // console.log('FETCH');
      this.fetchPosts();
    }
  }

  async fetchPosts() {
    this.setState({
      loading: true,
    });

    const { page, value } = this.state;

    try {
      // console.log('value', value);
      const data = await getPosts(value, page);

      if (!data.hits.length) {
        return Notiflix.Notify.failure('Enter your search query');
      }
      this.setState(({ pictures }) => {
        return {
          pictures: [...pictures, ...data.hits],
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({
        error: error,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  openModal = largeImageURL => {
    this.setState(() => ({
      modalUrl: largeImageURL,
    }));
  };

  closeModal = () => {
    this.setState(() => ({
      modalUrl: '',
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onFormSubmit = value => {
    if (value === this.state.value) {
      return;
    }
    this.setState({ value, pictures: [], page: 1 });
  };

  render() {
    const { pictures, loading, error, modalUrl } = this.state;
    const { onFormSubmit, openModal, closeModal, loadMore } = this;
    // console.log(pictures);
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
}

export default SearchSection;
