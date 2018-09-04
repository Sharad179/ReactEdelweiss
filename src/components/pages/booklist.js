"use strict"

import React from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import LoginPage from '../LoginPage/LoginPage';

import HomePage from '../HomePage/HomePage';
import TopNav from '../TopNav/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';

class BookList extends React.Component {
    render() {
        const LoginContainer = () => (
            <div>

                <Route exact path="/" render={() => <Redirect to="/login" />} />
                <Route path="/login" component={LoginPage} />

            </div>
        )
        const DefaultContainer = () => (
            <div>
                <TopNav></TopNav>
                <Route path="/home" component={HomePage} />
            </div>
        )
        return (
            
                <div>
                    <PrivateRoute path="/home" component={DefaultContainer} />
                    <Route path="/login" component={LoginContainer} />
                </div>
        )
    }
}
function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(BookList);