module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
      set(val) {
        this.setDataValue('firstname', val);
      },
      get() {
        return this.getDataValue('firstname');
      }
    },
    surname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
      set(val) {
        this.setDataValue('surname', val);
      },
      get() {
        return this.getDataValue('surname');
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
      allowNull: false,
      set(val) {
        this.setDataValue('username', val);
      },
      get() {
        return this.getDataValue('username');
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: true,
        len: [8, 16],
      },
      allowNull: false,
      set(val) {
        this.setDataValue('email', val);
      },
      get() {
        return this.getDataValue('email');
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('password', val);
      },
      get() {
        return this.getDataValue('password');
      }
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isBefore: `${(new Date()).getFullYear()}-${((new Date()).getMonth()}-${(new Date()).getDate()}`
      }
      set(val) {
        this.setDataValue('birthday', val);
      },
      get() {
        return this.getDataValue('birthday');
      }
    }
    gender: {
      type: DataTypes.ENUM,
      values: ['male', 'female'],
      set(val) {
        this.setDataValue('gender', val);
      },
      get() {
        return this.getDataValue('gender');
      }
    }
  }, {
    getterMethods: {
      fullName() {
        return `${this.firstname} ${this.surname}`;
      }
    }
  });
  return User;
};
