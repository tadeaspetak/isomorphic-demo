function createConstants(...constants) {
  return constants.reduce((combined, constant) => {
    combined[constant] = constant;
    return combined;
  }, {});
}

export default createConstants(
  'TRANSLATIONS_GET',
  'TRANSLATION_ADD',
  'TRANSLATION_DELETE'
);
