import React from 'react';
import { withRouter } from 'react-router-dom';
import config from 'config';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, ButtonToolbar, Button } from 'react-bootstrap';
import EditModeHomePage from '../EditModeHomePage/EditModeHomePage';

// import { userActions } from '../_actions';
function clickEventId(e) {
    localStorage.setItem('panInfo', e.target.innerHTML);
}
function ResultItem(props) {
    var camper = props.user;
    return (
        <tr>
            <td><a href='/edithome' onClick={clickEventId}>{camper.PAN_CARD}</a></td>
            <td>{camper.CONTACT_PERSON}</td>
            <td>{camper.LOAN_AMOUNT}</td>
            <td>{camper.MOBILE_NUMBER}</td>
            <td>{camper.EMAIL}</td>
        </tr>
    );
}


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { resultset: [], 'noOfApprovedCases': 0, 'noOfRejectedCases': 0, 'noOfActionPendingCases': 0, 'noOfSentCases': 0 };
    }

    componentDidMount() {
        document.body.style.background = "#f4f8fb";
        this.LeadsList();
        this.ListStatusDetails();
    }
    LeadsList() {
        var _this = this;
        var resultbody;
        fetch('/api/listleads?', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            _this.setState({ resultset: body.result });
        })
    }
    ListStatusDetails() {
        var _this = this;
        var resultbody;
        fetch('/api/leadStatusDetails?', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            for (var i in body.result) {
                if (body.result[i].STATUS == "Sent") {
                    _this.setState({ 'noOfSentCases': body.result[i].Count ? body.result[i].Count : 0 })
                }
                else if (body.result[i].STATUS == "Rejected") {
                    _this.setState({ 'noOfRejectedCases': body.result[i].Count ? body.result[i].Count : 0 })
                } else if (body.result[i].STATUS == "") {
                    _this.setState({ 'noOfActionPendingCases': body.result[i].Count ? body.result[i].Count : 0 })
                }
                else if (body.result[i].STATUS == "Approved") {
                    _this.setState({ 'noOfApprovedCases': body.result[i].Count ? body.result[i].Count : 0 })
                }
            }
        })
    }

    render() {
        const leadslist = this.state.resultset.map(function (leadslist, index) {
            return <ResultItem key={index} user={leadslist} />
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card-counter success">
                            <i className="fa fa-thumbs-up"></i>
                            <span className="count-numbers">{this.state.noOfApprovedCases + this.state.noOfSentCases}</span>
                            <span className="count-name">Approved Leads</span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-counter danger">
                            <i className="fa fa-ban"></i>
                            <span className="count-numbers">{this.state.noOfRejectedCases}</span>
                            <span className="count-name">Rejected Leads</span>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-counter info">
                            <i className="fa fa-pause"></i>
                            <span className="count-numbers">{this.state.noOfActionPendingCases}</span>
                            <span className="count-name">Action Pending</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        <div className="card card-signin my-5" style={{ backgroundColor: 'white' }}>
                            <div className="card-body">
                                <h5 className="card-title text-center" style={{ fontWeight: 600 }}><u>Leads List</u></h5>

                                <Table striped bordered condensed hover>
                                    <thead style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        <tr>
                                            <th>PAN Number</th>
                                            <th>Contact Person</th>
                                            <th>Loan Amount</th>
                                            <th>Mobile Number</th>
                                            <th>Email</th>

                                        </tr>
                                    </thead>
                                    <tbody style={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
                                        {leadslist}
                                    </tbody>
                                </Table>

                            </div>
                        </div>
                    </div>
                </div>
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

export default withRouter(connect(mapStateToProps)(HomePage));