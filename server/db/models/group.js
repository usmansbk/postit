module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
     set(val) {
        this.setDataValue('name', val);
      },
      get() {
        return this.getDataValue('name');
      }
    },
    purpose: {
      type: DataTypes.STRING,
      validate: {
        len: [0, 50]
      },
      set(val) {
        this.setDataValue('purpose', val);
      },
      get() {
        return this.getDataValue('purpose');
      }
    },
  });

  Group.associate = function associate(models) {
    const { User, Post } = models;
    Group.hasMany(Post, { as: 'Posts', foreignKey: 'groupId' });
    Group.belongsTo(User, { as: 'Creator' });
    Group.belongsToMany(User, { as: 'Members', through: 'UserGroup' });
  }
  return Group;
};
