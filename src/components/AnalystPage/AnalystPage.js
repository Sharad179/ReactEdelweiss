import React from 'react';
import { withRouter } from 'react-router-dom';
import config from 'config';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, ButtonToolbar, Button } from 'react-bootstrap';

// import { userActions } from '../_actions';
function formatDateMySQL(inputdate){
    var myDate = new Date(inputdate);
    return ((myDate.getMonth() + 1) + '/' + myDate.getDate() + '/' + myDate.getFullYear());
}
function ResultItem(props) {
    var camper = props.user;
    return (
        <tr>
            <td>{camper.PAN_CARD}</td>
            <td>{camper.CONTACT_PERSON}</td>
            <td>{camper.LOAN_AMOUNT}</td>
            <td>{camper.COMPANY_NAME}</td>
            <td>{camper.MOBILE_NUMBER}</td>
            <td>{camper.EMAIL}</td>
            <td>{camper.CITY}</td>
            <td>{camper.CREATED_BY}</td>
            <td>{formatDateMySQL(camper.ENTRY_DATE)}</td>
            <td>{camper.NET_SALARY}</td>
            <td>{camper.CURRENT_COMPANY_EXPERIENCE}</td>
            <td>{camper.MODE_OF_SALARY}</td>
            <td>{camper.OFFICE_ADDRESS}</td>
            <td>{camper.COMPANY_NUMBER_OF_EMPLOYEES}</td>
            <td>{formatDateMySQL(camper.APPOINTMENT_DATE)}</td>
            <td>{camper.APPOINTMENT_TIME}</td>
           
            <td>{formatDateMySQL(camper.DATE_OF_BIRTH)}</td>
        </tr>
    );
}


class AnalystPage extends React.Component {
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
                    <div className="col-lg-12 col-md-12 col-xs-12">
                        <div className="card card-signin my-5" style={{ backgroundColor: 'white'}}>
                         <div className = "card-heading"> <br/><p className="card-title text-center" style={{ fontWeight: 600 }}><u>Leads List</u></p></div>
                            <div className="card-body" style={{overflowX: "scroll"}}>
                               

                                <table className="table table-striped table-bordered table-condensed table-hover">
                                    <thead style={{ whiteSpace: 'nowrap', textAlign: 'center',overflowX: "scroll" }}>
                                        <tr>
                                            <th>PAN NUMBER</th>
                                            <th>CONTACT PERSON</th>
                                            <th>LOAN AMOUNT</th>
                                            <th>COMPANY NAME</th>
                                            <th>MOBILE NUMBER</th>
                                            <th>EMAIL</th>
                                            <th>CITY</th>
                                            <th>CREATED BY</th>
                                            <th>ENTRY DATE</th>
                                            <th>NET SALARY</th>
                                            <th>CURRENT COMPANY EXPERIENCE</th>
                                            <th>MODE OF SALARY</th>
                                            <th>OFFICE ADDRESS</th>
                                            <th>COMPANY NUMBER OF EMPLOYEES</th>
                                            <th>APPOINTMENT DATE</th>
                                            <th>APPOINTMENT TIME</th>
                                            <th>DATE OF BIRTH</th>

                                        </tr>
                                    </thead>
                                    <tbody style={{ whiteSpace: 'nowrap', textAlign: 'center',overflowX: "scroll" }}>
                                        {leadslist}
                                    </tbody>
                                </table>

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

export default withRouter(connect(mapStateToProps)(AnalystPage));