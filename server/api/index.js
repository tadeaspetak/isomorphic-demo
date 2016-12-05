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

  let formParser = bodyParser.urlencoded({ extended: false })
  api.post('/translations-form', formParser, (req, res) => {
    saveTranslation(req.body.language1Id, req.body.language2Id, req.body.expression1, req.body.expression2)
      .then(() => res.redirect(req.header('Referer')));
  });

  api.post('/translations', (req, res) => {
    saveTranslation(req.body.language1Id, req.body.language2Id, req.body.expression1, req.body.expression2)
      .then(translation => getTranslations())
      .then(translations => res.send({translations}))
      .catch(db.Sequelize.ValidationError, error => {
        console.log(error);
        getTranslations().then(translations => res.send({translations}));
      });
  });

  let saveTranslation = (l1, l2, e1, e2) => {
    return db.Translation.create({
      language1Id: l1,
      language2Id: l2,
      expression1: e1,
      expression2: e2
    });
  }

  return api;
}
