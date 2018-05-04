import React, { Component } from 'react';

import Aux from './../../hoc/_Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    };
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
        /*this.setState({showSideDrawer: !this.state.showSideDrawer}); This is not correct way of 
            mutating state in setState. We always have to use prevState.*/
    };
    render(){
        return(
            <Aux>
                <div>Toolbar, SideDrawer, Backdrop</div>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;