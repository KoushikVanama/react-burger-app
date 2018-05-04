import React, { Component } from 'react';

import Aux from '../../../hoc/_Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // This could be a functional component. Doesn't have to be class
    componentDidUpdate(){
        console.log('[orderSummary] WillUpdate');
    }
    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map((igKey => {
            return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}>{igKey}</span>:{this.props.ingredients[igKey]}
                    </li>
                    )       
        }));
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Desired Ingredients for your delicious burger</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:</strong> {this.props.price.toFixed(2)}</p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.cancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;