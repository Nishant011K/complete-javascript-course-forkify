import * as model from './model';
import recipeView from './views/recipeView';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView';

// https://forkify-api.herokuapp.com/v2

// f3408f50-97f3-4dac-ad72-e4ed3f24599c

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const recipeId = window.location.hash.slice(1);
    if (!recipeId) return;
    //spinner
    recipeView.renderSpinner();

    // load recipe
    await model.loadRecipe(recipeId);

    // render recipes
    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError();
  }

}

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
  } catch (error) {
    throw error;
  }
}

const init = function () {
  recipeView.addHandlerRenderer(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();