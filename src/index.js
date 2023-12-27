import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './routes/1_App.js'
import Welcome from './routes/1.1_Welcome.js'
import Pokedex from './routes/1.2_Pokedex.js'
import PokeList from './routes/1.2.1_PokeList.js'
import PokeDetail from './routes/1.2.2_PokeDetail.js'
import PokeDetailPlus from './routes/1.2.3_PokeDetailPlus.js'
import PokeFight from './routes/1.3_PokeFight.js'
import Winner from './routes/1.4_Winner.js'

import About from './routes/1.6_About.js'

import reportWebVitals from './reportWebVitals.js'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/pokedex",
        element: <Pokedex />,
        children: [
          {
            path: "/pokedex",
            element: <PokeList />,
          },
          {
            path: "/pokedex/:id",
            element: <PokeDetail />,
          },
          {
            path: "/pokedex/:id/:info",
            element: <PokeDetailPlus />,
          }
        ]
      },
      {
        path: "/pokefight",
        element: <PokeFight />,
      },
      {
        path: "/winner",
        element: <Winner />,
      },
 
      {
        path: "/about",
        element: <About />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
