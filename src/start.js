import React from "react";
import ReactDOM from "react-dom";
import Players from "./players.js";
import Overview from "./overview.js";
import Registration from "./registration.js";
import Login from "./login.js";

// redux

import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./reducer.js";

// routing

import { BrowserRouter, Route, Link } from "react-router-dom";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;

elem = (
    <Provider store={store}>
        <BrowserRouter>
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Players} />
            <Route exact path="/overview" component={Overview} />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(elem, document.querySelector("main"));
