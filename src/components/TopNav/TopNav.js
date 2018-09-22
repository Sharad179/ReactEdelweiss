import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class TopNav extends React.Component {

    render() {
        const { user, users } = this.props;
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ fontWeight: 600, backgroundColor: '#f4f8fb' }}>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="/">
                        <img src="./images/retra-fin-logo.png" style={{ height: 50 + 'px' }} />
                    </a>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="">Hi {user.username}</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Logout</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

export default connect(mapStateToProps)(TopNav);;