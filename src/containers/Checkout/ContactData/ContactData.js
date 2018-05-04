import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
// import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        name: '',
        mobile: '',
        address: '',
        email: '',
        // loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({ loading: true });
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: {
                name: 'koushik sai',
                address: 'Bengaluru',
                email: 'test@test.com'
            },
            deliveryMethod: 'COD'
        }
        this.props.onOrderBurger(order);
        console.log(this.props);
        // axios.post('/orders.json',order)
        //     .then((response) => {
        //         console.log(response);
        //         this.setState({loading: false});
        //         this.props.history.push('/');
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         this.setState({loading: false});
        //     });
    }
    render(){
        let form = (
            <form>
                <input className={classes.Input} type="email" name="email" placeholder="Enter your email"/>
                <input className={classes.Input} type="text" name="address" placeholder="Address"/>
                <input className={classes.Input} type="text" name="mobile" placeholder="Mobile Number"/>                    
                <input className={classes.Input} type="text" name="name" placeholder="Enter your name"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Details</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingreds,
        price: state.priceTotal,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurger(orderData))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);