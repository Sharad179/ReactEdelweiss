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
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditModeHomePage from '../EditModeHomePage/EditModeHomePage';
import RetraManagerHomePage from '../RetraManagerHomePage/RetraManagerHomePage';
import AnalystPage from '../AnalystPage/AnalystPage';

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
                <Route path="/rmpage" component = {RetraManagerHomePage} />
                <Route path="/analyst" component = {AnalystPage} />
            </div>
        )
        return (
            
                <div>
                    <PrivateRoute path="/home" component={DefaultContainer} />
                    <PrivateRoute path="/admin" component={DefaultContainer} />
                    <PrivateRoute path="/edithome" component={DefaultContainer} />
                    <PrivateRoute path="/analyst" component={DefaultContainer} />
                    <PrivateRoute path="/rmpage" component = {DefaultContainer} />
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