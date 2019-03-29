import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import Router from './RouteController';

render(
    <BrowserRouter>
        <Router/>
    </BrowserRouter>, document.getElementById('root')
);