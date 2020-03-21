import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from "history";
import {ConnectedRouter, connectRouter, routerMiddleware} from "connected-react-router";

import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import postsReducer from "./store/reducers/postsReducer";
import usersReducer from "./store/reducers/usersReducer";
import commentsReducer from "./store/reducers/commentsReducer";

const saveToLocalStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state',serializedState)
  } catch (error) {
    console.log('Could not save state')
  }
};

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if(serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (error) {
    return undefined
  }
};

const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: connectRouter(history),
  posts: postsReducer,
  users: usersReducer,
  comments: commentsReducer,
});

const middleware = [
  thunkMiddleware,
  routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer ,persistedState, enhancers);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      user: store.getState().users.user
    }
  })
});

const app = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));