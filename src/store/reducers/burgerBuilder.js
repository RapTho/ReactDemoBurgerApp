import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    meat: 1.6,
    cheese: 0.7,
    bacon: 0.9    
}

const  addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientType]: state.ingredients[action.ingredientType] + 1 }
    const updatedIngredietns = updateObject(state.ingredients, updatedIngredient)
    return updateObject(state, {
        ingredients: updatedIngredietns,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
    });
};

const  removeIngredient = (state, action) => {
    let newPrice = state.totalPrice;
    let number = 0;
    if (state.ingredients[action.ingredientType] > 0) {
        number = state.ingredients[action.ingredientType] - 1;
        newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientType];
    }

    const updatedIng = { [action.ingredientType]: number }
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    return updateObject(state, {
        ingredients: updatedIngs,
        totalPrice: newPrice
    }); 
};

const  setIngredient = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        totalPrice: initialState.totalPrice
    });
};

const  fetchIngredientsFailed = (state) => {
    return updateObject(state, {error: true});
};

const burgerBuilderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionType.SET_INGREDIENTS: return setIngredient(state, action);
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state); 
        default: return state;
    }
};

export default burgerBuilderReducer;