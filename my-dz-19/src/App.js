import React from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import { useImageSearch } from './hooks/useImageSearch';
import  useModal  from './hooks/useModal';
import './styles.css';

function App() {
  const {
    images,
    isLoading,
    error,
    hasMore,
    searchImages,
    loadMore,
  } = useImageSearch();

  const { isOpen, imageUrl, openModal, closeModal } = useModal();

  return (
    <div className="app">
      <Searchbar onSubmit={searchImages} />
      {error && <p className="error">Помилка: {error}</p>}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {hasMore && !isLoading && <Button onClick={loadMore}>Load more</Button>}
      {isOpen && <Modal largeImageURL={imageUrl} onClose={closeModal} />}
    </div>
  );
}

export default App;