import { DataTypes } from 'sequelize'
import sequelize from '../config/database.js'

const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING,
    defaultValue: 'D\'CHIC'
  },
  overlayTitle: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
})

export default Blog
