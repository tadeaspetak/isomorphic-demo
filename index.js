'use strict';
require('babel-core/register')({});

// make sure the working directory is correct
process.chdir(__dirname);

const db = require('./server/db');

//this is the server side, delete the `BROWSER` variable (set in webpack configuration)
//necessary in order for the stylesheets not to be loaded in the `./client/index.jsx`
delete process.env.BROWSER;

// ensure that English and Swedish exist
let ensureLanguages = () => {
  return db.Language.findAll().then(languages => {
    if(languages.length) return;
    return db.Language.create({id: 1, name: 'English'})
      .then(() => db.Language.create({id: 2, name: 'Swedish'}));
  });
};

db.sequelize.sync().then(() => {
  ensureLanguages().then(() => {
    let port = process.env.PORT || 3600;
    let server = require('./server').listen(port, () => {
      let address = server.address().address;
      let port = server.address().port;
      console.log(`Isomorphic Demo listening at http://${address}:${port}`);
    });
  });
}, error => {
  console.log(`Unable to sync the database: ${error}.`);
});
