import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Aux from './../../hoc/_Aux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls' ;
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
// import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.purchaseHandler= this.purchaseHandler.bind(this);
    // }
    state = {
        // ingredients: null,
        // totalPrice: 4,
        // purchasable: false,
        purchasing: false,
        loading: false
    }
    componentDidMount(){
        // axios.get('/ingredients.json')
        // .then((response) => {
        //     console.log(response,"###################");
        //     this.setState({ingredients: response.data});
        // })
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            },0);
        // this.setState({purchasable: sum > 0});
        return sum > 0;
            // console.log(sum);
    }
    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // }
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});        
    }
    purchaseContinueHandler = () => {
        // this.setState({ loading: true });
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'koushik sai',
        //         address: 'Bengaluru',
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'COD'
        // }
        // axios.post('/orders.json',order)
        //     .then((response) => {
        //         console.log(response);
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         this.setState({loading: false, purchasing: false});
        //     });
        /*const queryParams = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join('&');*/
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disable={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings}
                cancelled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler} 
                price={this.props.price} />;
        }
        if(this.state.loading){
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    { orderSummary }
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingreds,
        price: state.priceTotal, // price from application state
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        // onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);