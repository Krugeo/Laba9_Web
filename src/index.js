import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ErrorPage from './pages/Error.jsx'; 
import MainPage from './pages/mainpage.jsx';
import ContactsList from './pages/ContactsList.jsx';
import AdminArea from './pages/AdminArea.jsx';
import ContactPage, { contactLoader, ContactHistory } from './pages/Contact.jsx'; 

const router = createHashRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      
      <Route index element={<MainPage />} />

      <Route 
        path="contacts" 
        element={<ContactsList />} 
      />

      <Route 
        path="contact/:contactId" 
        element={<ContactPage />} 
        loader={contactLoader}
        errorElement={<ErrorPage />}
      >
          <Route path="history" element={<ContactHistory />} />
      </Route>

      <Route path="admin" element={<AdminArea />} />
      
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);