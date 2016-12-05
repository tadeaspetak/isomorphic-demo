import _ from 'lodash';
import bodyParser from 'body-parser';
import {Router} from 'express';
import db from '../db';

export default function() {
  let api = new Router();

  // json
  api.use(bodyParser.json());

  let getTranslations = () => db.Translation.findAll({order: [['createdAt', 'DESC']]});

  api.param('id', (req, res, next, id) => {
      db.Translation.findById(id).then(translation => {
        if (translation) {
          req.translation = translation;
          next();
        } else {
          res.status(404).send({
            message: 'No such translation!'
          });
        }
      });
  });

  api.get('/translations', (req, res) => {
    getTranslations().then(translations => res.send({translations}));
  });

  api.delete('/translations/:id', (req, res) => {
    req.translation.destroy()
      .then(() => getTranslations())
      .then(translations => res.send({translations}))
      .catch(db.Sequelize.ValidationError, error => {
        console.log(error);
        getTranslations().then(translations => res.send({translations}));
      });
  });

  api.post('/translations', (req, res) => {
    let translation = {
      language1Id: req.body.language1Id,
      language2Id: req.body.language2Id,
      expression1: req.body.expression1,
      expression2: req.body.expression2
    };
    db.Translation.create(translation)
      .then(translation => getTranslations())
      .then(translations => res.send({translations}))
      .catch(db.Sequelize.ValidationError, error => {
        console.log(error);
        getTranslations().then(translations => res.send({translations}));
      });
  });

  return api;
}
