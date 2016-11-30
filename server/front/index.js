import {Router} from 'express';
import {createMemoryHistory} from 'history';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import Helmet from 'react-helmet';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';

import {promiseMiddleware} from '../../shared/utils';
import routes from '../../shared/routes';
import reducer from '../../shared/reducers';

export default function(){
  let front = new Router();

  front.get('/*', (req, res) => {
    const history = createMemoryHistory(req.url);
    const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);
    process.env.HOST = req.get('host');

    match({routes, location: req.url, history}, (err, redirect, props) => {
      if (err) {
        console.error(err);
        return res.status(500).end('Internal server error');
      }

      if (!props) {
        return res.status(404).end('Not found');
      }

      fetchComponentData(props, store)
        .then(() => renderPage(props, store))
        .then(html => res.type('html').send(html))
        .catch(error => {
          console.log(error);
          res.end(`There has been an error, sorry 'bout that!`);
        });
    });
  });

  return front;
}


function renderPage(props, store){
  return new Promise((resolve, reject) => {
    let app = renderToString((<Provider store={store}><RouterContext {...props}/></Provider>));
    let helmet = Helmet.rewind();
    let html = `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <meta name="keywords" content="isomorphic, react, redux">
        <meta name="description" content="Demo of an isomorphic app using react, redux and webpack.">
        <meta name="author" content="Tadeáš Peták">
        <meta name="contact" content="tadeaspetak@gmail.com">

        ${helmet.meta.toString()}
        ${helmet.title.toString()}

        <link rel="icon" type="image/png" href="/media/favicon.ico">
        ${process.env.NODE_ENV === 'prod' ? '<link rel="stylesheet" type="text/css" href="/screen.css">' : ''}
      </head>
      <body>
        <div id="app"><div>${app}</div></div>
        <script src="/bundle.js"></script>
      </body>
  </html>`;

  resolve(html);
  });
}

function fetchComponentData(props, store) {
  const needs = props.components.reduce((previous, component) => {
    return (component.needs || []).map(need => need(props))
      .concat(((component.WrappedComponent ? component.WrappedComponent.needs : []) || []).map(need => need(props)))
      .concat(previous);
  }, []);

  return Promise.all(needs.map(need =>
    store.dispatch(need).catch(error => console.log(error))
  ));
}
