import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import noteReducer, { setNotes } from './reducers/noteReducer';
import filterReducer, { filterChange } from './reducers/filterReducer';
import noteService from './services/notes';

const store = configureStore(
  {
    reducer: {
      notes: noteReducer,
      filter: filterReducer
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

noteService.getAll()
  .then(notes =>
    store.dispatch(setNotes(notes))
  );

store.subscribe(() => console.log(store.getState()));
// store.dispatch(filterChange('IMPORTANT'));
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
