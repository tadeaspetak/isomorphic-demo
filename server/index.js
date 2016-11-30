import express from 'express';
import path from 'path';

import api from './api';
import front from './front';

const app = express();

console.log(`Security running in ${process.env.NODE_ENV} environment.`);
if (process.env.NODE_ENV !== 'prod') {
  require('../webpack.dev').default(app);
}
app.use('/', express.static(path.join(__dirname, '../dist')));

app.use('/api/v1', api());
app.use(front());

module.exports = app;
