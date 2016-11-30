import axios from 'axios';
import {normalizeUrl} from '../utils';
import Constants from '../constants';

export function getTranslations() {
  return {
    type: Constants.TRANSLATIONS_GET,
    promise: axios.get(normalizeUrl(`/api/v1/translations`))
  }
}

export function addTranslation(translation) {
  translation.language1Id = 2;
  translation.language2Id = 1;
  return {
    type: Constants.TRANSLATION_ADD,
    promise: axios.post(normalizeUrl(`/api/v1/translations`), translation)
  }
}

export function deleteTranslation(id) {
  return {
    type: Constants.TRANSLATION_DELETE,
    promise: axios.delete(normalizeUrl(`/api/v1/translations/${id}`))
  }
}
