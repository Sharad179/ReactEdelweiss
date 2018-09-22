import React from 'react';
import { withRouter } from 'react-router-dom';
import config from 'config';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, ButtonToolbar, Button } from 'react-bootstrap';
import EditModeHomePage from '../EditModeHomePage/EditModeHomePage';

// import { userActions } from '../_actions';
function clickEventId(props){
return(<EditModeHomePage value={val}></EditModeHomePage>)
}
function ResultItem(props) {
    var camper = props.user;
    return (
        <tr >
            <td><a href="/edithome" onClick={clickEventId}>{camper.ID}</a></td>
            <td>{camper.CONTACT_PERSON}</td>
            <td>{camper.LOAN_AMOUNT}</td>
            <td>{camper.MOBILE_NUMBER}</td>
            <td>{camper.EMAIL}</td>
            <td>{camper.PAN_CARD}</td>
        </tr>
    );
}


class ThankYouPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.style.background = "#f4f8fb";
        
    }

    render() {
        const leadslist = this.state.resultset.map(function (leadslist, index) {
            return <ResultItem key={index} user={leadslist} />
        });
        return (

            <div className="col-md-8 offset-md-2 col-xs-12">
               <p>Your Form has been Successfully Submitted</p>
               <a href = "/admin">Back to user list</a>
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

export default withRouter(connect(mapStateToProps)(ThankYouPage));