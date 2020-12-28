import * as actionType from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        cheese: 0,
        bacon: 0
    },
    totalPrice: 4
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
        default:
            return state;
    }
};

export default reducer;