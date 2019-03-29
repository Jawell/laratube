import React from 'react';
import {Switch, Route} from 'react-router-dom';

import App from './components/Worker';
import Error404 from './components/Error404';

class RouteController extends React.Component {
    render() {
        return(
            <Switch>
                <Route exact path='/' component={App}/>
                <Route component={Error404}/>
            </Switch>
        )
    }
}

export default RouteController;
