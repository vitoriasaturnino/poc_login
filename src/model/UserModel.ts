import { DataTypes } from 'sequelize';
import { db } from '../database/db';

const UsuariosModel = db.define('usuarios', {
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
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default UsuariosModel;