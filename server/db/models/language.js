export default function(sequelize, Sequelize) {
  let Language = sequelize.define('Language', {
    name: Sequelize.STRING,
  }, {
    classMethods:{
      associate(models){
        /*Language.hasMany(models.Translation, {
          foreignKey: 'commentable_id',
          constraints: false
        });*/
      }
    },
    tableName: 'languages'
  });

  return Language;
};
