import { API_URL } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: []
    }
}
export const loadRecipe = async function (recipeId) {
    try {
        // fetch recipes
        const data = await getJSON(`${API_URL}${recipeId}`);

        const { recipe } = data.data;
        state.recipe = {
            cookingTime: recipe.cooking_time,
            id: recipe.id,
            imageUrl: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title
        }
    } catch (error) {
        throw error;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query;
        const results = await getJSON(`${API_URL}?search=${query}`);
        state.search.results = results.data.recipes.map(rec => {
            return {
                id: rec.id,
                imageUrl: rec.image_url,
                publisher: rec.publisher,
                title: rec.title
            }
        });
    } catch (error) {
        throw error;
    }
}