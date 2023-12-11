// index.js

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import loadingImage from './loading.gif'; // Import your loading image here

const LazyApp = React.lazy(() => {
  // Simulate a delay before loading the lazy component (e.g., 5 seconds delay)
  return new Promise((resolve) => setTimeout(resolve, 5000)).then(() => import('./App'));
});

const LoadingFallback = () => {
  // Customize the loading fallback with just the gif image centered
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <img className="lazy" src={loadingImage} alt="Loading..." />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <Router>
        <LazyApp />
      </Router>
    </Suspense>
    <PokemonDetails />
  </React.StrictMode>,
  document.getElementById('root')
);
