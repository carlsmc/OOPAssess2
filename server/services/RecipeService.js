const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

class RecipeService {
  constructor(datafile) {
    this.datafile = datafile;
  }

  async getNames() {
    const data = await this.getData();

    return data.map((recipe) => {
      return { name: recipe.name, shortname: recipe.shortname };
    });
  }

  async getListShort() {
    const data = await this.getData();
    return data.map((recipe) => {
      return { name: recipe.name, shortname: recipe.shortname, title: recipe.title };
    });
  }

  async getList() {
    const data = await this.getData();
    return data.map((recipe) => {
      return { name: recipe.name, shortname: recipe.shortname, title: recipe.title, summary: recipe.summary };
    });
  }

  async getAllArtwork() {
    const data = await this.getData();
    const artwork = data.reduce((acc, elm) => {
      if (elm.artwork) {
        acc = [...acc, ...elm.artwork];
      }
      return acc;
    }, []);
    return artwork;
  }

  async getRecipe(shortname) {
    const data = await this.getData();
    const recipe = data.find((recipe) => {
      return recipe.shortname === shortname;
    });
    if (!recipe) return null;
    return {
      title: recipe.title,
      name: recipe.name,
      shortname: recipe.shortname,
      description: recipe.description,
    }
  }

  async getArtworkForRecipe(shortname) {
    const data = await this.getData();
    const recipe = data.find((recipe) => {
      return recipe.shortname === shortname;
    });
    if (!recipe || !recipe.artwork) return null;
    return recipe.artwork;
  }

  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    if (!data) return [];
    return JSON.parse(data).recipes;
  }
}

module.exports = RecipeService;