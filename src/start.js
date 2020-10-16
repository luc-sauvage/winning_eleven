import React from "react";
import ReactDOM from "react-dom";
import Players from "./players.js";

// redux

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./reducer.js";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

elem = (
    <Provider store={store}>
        <Players />
    </Provider>
);

ReactDOM.render(elem, document.querySelector("main"));
