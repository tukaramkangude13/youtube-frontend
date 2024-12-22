import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import appRouter from './router'; // Import from router.js

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={appRouter} />
);
