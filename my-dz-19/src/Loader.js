import React from 'react';
import { Rings } from 'react-loader-spinner'; // Припускаємо імпорт з react-loader-spinner

function Loader() {
  return (
    <div className="loader">
      <Rings color="#3f51b5" height={80} width={80} />
    </div>
  );
}

export default Loader;