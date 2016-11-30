import { Map, OrderedMap } from 'immutable';
import Constants from '../constants';

const setTranslations = (state, action) => {
  action.res.data.translations.forEach(translation => {
    state = state.set(translation.id, translation);
  });
  return state;
}

const handlers = new Map()
  .set(Constants.TRANSLATIONS_GET, (state, action) => {
    return setTranslations(state, action);
  })
  .set(Constants.TRANSLATION_ADD, (state, action) => {
    return setTranslations(new OrderedMap(), action);
  })
  .set(Constants.TRANSLATION_DELETE, (state, action) => {
    return setTranslations(new OrderedMap(), action);
  });

const empty = new OrderedMap();
module.exports = (state = empty, action) => {
  return handlers.has(action.type) ? handlers.get(action.type)(state, action) : state;
}
