import React, { lazy, Suspense } from 'react';

// Create a function that returns a promise after a 5-second delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Use the lazy function to load PokemonDetails after the delay
const LazyPokemonDetails = lazy(() =>
  delay(5000).then(() => import('./PokemonDetails'))
);

const LoadingFallback = () => {
  // You can customize the loading fallback here
  return <div>Loading Pokemon details...</div>;
};

const DetailsLazyLoading = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyPokemonDetails />
    </Suspense>
  );
};

export default DetailsLazyLoading;
