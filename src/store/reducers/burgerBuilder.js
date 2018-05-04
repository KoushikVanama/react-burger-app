import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingreds: null,
    priceTotal: 4,
    error: false
};

const INGREDIENT_PRICES = {
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7,
    salad: 0.5
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingreds: {
                    ...state.ingreds,
                    [action.ingredientName]: state.ingreds[action.ingredientName] + 1
                },
                priceTotal: state.priceTotal + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingreds: {
                    ...state.ingreds,
                    [action.ingredientName]: state.ingreds[action.ingredientName] - 1
                },
                priceTotal: state.priceTotal - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                // ingreds: action.ingredientss, //since we are not getting ingredients in order as expected, meat comes up becuase of alphabetiacl order from firebase
                ingreds: {
                    salad: action.ingredientss.salad,
                    bacon: action.ingredientss.bacon,
                    cheese: action.ingredientss.cheese,
                    meat: action.ingredientss.meat
                },
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;