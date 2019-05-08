const express = require('express');

const router = express.Router();

const recipesRoute = require('./recipes');
const feedbackRoute = require('./feedback');

module.exports = (param) => {

    const { recipeService } = param;

    router.get('/', async (req, res, next) => {
        try {
            const promises = [];
            promises.push(recipeService.getListShort());
            promises.push(recipeService.getAllArtwork());

            const results = await Promise.all(promises);

            return res.render('index', {
                page: 'Home',
                recipeslist: results[0],
                artwork: results[1],
            });
        } catch (err) {
            return next(err);
        }
    });

    router.use('/recipes', recipesRoute(param));
    router.use('/feedback', feedbackRoute(param));

    return router;
};