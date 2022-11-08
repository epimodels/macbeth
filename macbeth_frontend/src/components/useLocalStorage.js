import React, { useEffect } from 'react';

/*
 * Custom hook
 * Unique key required
 * Allows for use of persistant local browser storage variables
 */
export default function useLocalStorage(key, defaultState) {
  // using the stored state as the initial state, if no value default to true
  const [value, setValue] = React.useState(
    localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : (typeof defaultState == 'string' ? defaultState : JSON.stringify(defaultState))
  );

  // this hook prevents potential breakage so value is always saved upon change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};