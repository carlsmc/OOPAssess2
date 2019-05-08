const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { recipeService } = param;

    router.get('/', async (req, res, next) => {
        try {
            const promises = [];
            promises.push(recipeService.getList());
            promises.push(recipeService.getAllArtwork());

            const results = await Promise.all(promises);

            return res.render('recipes', {
                page: 'All Recipes',
                recipeslist: results[0],
                artwork: results[1],
            });
        } catch (err) {
            return err;
        }
    });

    router.get('/:name', async (req, res, next) => {
        try {
            const promises = [];
            promises.push(recipeService.getRecipe(req.params.name));
            promises.push(recipeService.getArtworkForRecipe(req.params.name));
            const results = await Promise.all(promises);

            if (!results[0]) {
                return next();
            }

            return res.render('recipes/detail', {
                page: req.params.name,
                recipe: results[0],
                artwork: results[1],
            });
        } catch (err) {
            return next(err);
        }

    });

    return router;
};