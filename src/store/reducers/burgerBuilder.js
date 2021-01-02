import * as actionType from '../actions/actionTypes';

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: state.ingredients[action.ingredientType] +1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType]
            };
        case actionType.REMOVE_INGREDIENT:
            let newPrice = state.totalPrice;
            let number = 0;
            if (state.ingredients[action.ingredientType] > 0) {
                number = state.ingredients[action.ingredientType] - 1;
                newPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientType];
            }    
            
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientType]: number
                },
                totalPrice: newPrice
            };
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;