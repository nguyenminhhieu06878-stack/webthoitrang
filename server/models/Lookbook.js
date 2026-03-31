import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Lookbook = sequelize.define('Lookbook', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  season: {
    type: DataTypes.STRING // e.g., "Spring 2026", "Summer 2026"
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
})

export default Lookbook
