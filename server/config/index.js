const path = require('path');

module.exports = {
  development: {
    sitename: 'Eat Me! [Development]',
    data: {
      recipes: path.join(__dirname, '../data/recipes.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
    }
  },
  production: {
    sitename: 'Eat Me!',
    data: {
      recipes: path.join(__dirname, '../data/recipes.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
    }
  },
}