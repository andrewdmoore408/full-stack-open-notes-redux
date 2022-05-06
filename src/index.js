import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';

import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => console.log(store.getState()));
store.dispatch(filterChange('IMPORTANT'));
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
