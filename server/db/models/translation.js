export default function(sequelize, Sequelize) {
  let Translation = sequelize.define('Translation', {
    language1Id: Sequelize.INTEGER,
    language2Id: Sequelize.INTEGER,
    expression1: Sequelize.STRING,
    expression2: Sequelize.STRING
  }, {
    classMethods: {
      associate(models) {
        Translation.belongsTo(models.Language, {
          as: 'language1',
          foreignKey: 'language1Id'
        });

        Translation.belongsTo(models.Language, {
          as: 'language2',
          foreignKey: 'language2Id'
        });
      }
    },
    tableName: 'translations'
  });

  return Translation;
};
