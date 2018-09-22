"use strict"

import React from 'react';
import {
    BrowserRouter,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import LoginPage from '../LoginPage/LoginPage';
import AdminPage from '../AdminPage/AdminPage';
import HomePage from '../HomePage/HomePage';
import TopNav from '../TopNav/TopNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModeHomePage from '../EditModeHomePage/EditModeHomePage';

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
                <Route path="/admin" component={AdminPage} />
                <Route path="/edithome" component={EditModeHomePage} />
            </div>
        )
        return (
            
                <div>
                    <PrivateRoute path="/home" component={DefaultContainer} />
                    <PrivateRoute path="/admin" component={DefaultContainer} />
                    <PrivateRoute path="/edithome" component={DefaultContainer} />
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