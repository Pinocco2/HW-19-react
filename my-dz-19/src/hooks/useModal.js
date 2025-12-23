import { useState, useEffect, useCallback } from 'react';

function useModal() {  
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const openModal = useCallback((url) => {
    setImageUrl(url);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setImageUrl('');
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.code === 'Escape' && isOpen) closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeModal]);

  return { isOpen, imageUrl, openModal, closeModal };
}

export default useModal; 