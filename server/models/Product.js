import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  sizes: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  colors: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  lookbook: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
})

export default Product
