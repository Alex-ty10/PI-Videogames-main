/* import rootReducer from "./reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//poder usar redux-thunk por los funciones asincronas ademas de poder usar redux devtools en el navegador
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer,
  composeEnhancer(applyMiddleware(thunk)));

export default store; */
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const store =  createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;