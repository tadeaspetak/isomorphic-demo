import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app';
import Home from './pages/home';
import Translations from './pages/translations';

export default(
  <Route name="app" component={App} path ="/">
    <IndexRoute component={Home} name="home" />
    <Route component={Translations} name="translations" path="/translations" />
  </Route>
);
