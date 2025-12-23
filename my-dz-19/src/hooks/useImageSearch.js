import { useReducer, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_KEY = '51211284-4e80cfdc6f219d5336120707e'; 
const BASE_URL = 'https://pixabay.com/api/';

const initialState = {
  images: [],
  query: '',
  page: 1,
  isLoading: false,
  error: null,
  totalHits: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload, page: 1, images: [] };
    case 'FETCH_START':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        images: state.page === 1 ? action.payload.images : [...state.images, ...action.payload.images],
        totalHits: action.payload.totalHits,
        isLoading: false,
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOAD_MORE':
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
}

export function useImageSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchImages = useCallback(async () => {
    if (!state.query) return;

    dispatch({ type: 'FETCH_START' });

    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: state.query,
          page: state.page,
          key: API_KEY,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      });

      const images = response.data.hits.map(({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      }));

      dispatch({
        type: 'FETCH_SUCCESS',
        payload: { images, totalHits: response.data.totalHits },
      });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, [state.query, state.page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const searchImages = useCallback((newQuery) => {
    dispatch({ type: 'SET_QUERY', payload: newQuery });
  }, []);

  const loadMore = useCallback(() => {
    dispatch({ type: 'LOAD_MORE' });
  }, []);

  const hasMore = state.images.length > 0 && state.images.length < state.totalHits;

  return {
    ...state,
    searchImages,
    loadMore,
    hasMore,
  };
}