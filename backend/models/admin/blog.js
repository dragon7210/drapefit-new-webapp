/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import { sequelize } from '../../config/db.js';
import { DataTypes } from 'sequelize';
import BlogCategory from './blogCategory.js';

const Blog = sequelize.define(
  'blogs',
  {
    auther_name: {
      type: DataTypes.STRING
    },
    auther_image: {
      type: DataTypes.STRING
    },
    auther_descriptions: {
      type: DataTypes.STRING
    },
    blog_title: {
      type: DataTypes.STRING
    },
    blog_shotdesc: {
      type: DataTypes.STRING
    },
    blog_description: {
      type: DataTypes.STRING
    },
    blog_category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: BlogCategory,
        key: 'id'
      }
    },
    blog_image: {
      type: DataTypes.STRING
    },
    is_active: {
      type: DataTypes.NUMBER
    },
    created: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: false
  }
);

Blog.belongsTo(BlogCategory, {
  foreignKey: 'blog_category_id'
});
export default Blog;
