import {Router} from 'express';

export default function(){
  let front = new Router();

  front.get('/*', (req, res) => {
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

        <link rel="icon" type="image/png" href="/media/favicon.ico">
        <title>Isomorphic Demo</title>
        ${process.env.NODE_ENV === 'production' ? '<link rel="stylesheet" type="text/css" href="/screen.css">' : ''}
      </head>
      <body>
        <div id="app"><div></div></div>
        <script src="/bundle.js"></script>
      </body>
    </html>`;

    res.type('html').send(html);
  });

  return front;
}
