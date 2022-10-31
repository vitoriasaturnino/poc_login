import { DataTypes, Model, Optional } from 'sequelize';
// s
import { db } from '../database/db';

interface UserAttributes {
  id: Number;
  role: String;
  email: String;
  password: String;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const UserModel = db.define<UserInstance>(
  'usuarios', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  role: {
    type: DataTypes.ENUM({values: ['administrador', 'gestor', 'colaborador']}),
    allowNull: false,
    defaultValue: 'colaborador'
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UserModel;