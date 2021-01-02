import * as actionTypes from './actionTypes';
import axios from '../../axios-burger';

export const addIngredient = (ingredientType) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientType
    }
};

export const removeIngredient = (ingredientType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType
    }
};

const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-4a2cc-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
            .then(response => dispatch(setIngredients(response.data)))
            .catch(error => dispatch(fetchIngredientsFailed()));
    }
};