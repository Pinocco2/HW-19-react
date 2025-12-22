import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="gallery">
      {images.map((image) => (
        <ImageGalleryItem
          key={image.id}
          src={image.webformatURL}
          alt=""
          onClick={() => onImageClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
}

export default ImageGallery;