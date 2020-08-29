import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { SnackbarProvider } from "notistack";

import { BrowserRouter } from "react-router-dom";
import { createStore, compose, applyMiddleware } from "redux";
// import createSagaMiddleware from "redux-saga";

import { icons } from "./assets/icons";
import Thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers";
// import rootSaga from './store/sagas';
import './index.css';



React.icons = icons;
// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  compose(applyMiddleware(Thunk))
);
// sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        maxSnack={3}
      >
          <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
