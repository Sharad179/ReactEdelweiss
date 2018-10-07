import React from 'react';
import { withRouter } from 'react-router-dom';
import config from 'config';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Row, Col, FormControl, FormGroup, ControlLabel, InputGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap';

// import { userActions } from '../_actions';
class EditModeHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'aggregator': '', 'city': '', 'country': '', 'companyName': '', 'loanAmount': '', 'salaryMode': '', 'netSalary': '', 'contactPerson': '', "otherLoan": '', "appointmentDate": '', 'companyExp': '', "dateOfBirth": '', 'emailId': '', 'mobileNumber': '', 'appointmentTime': '', "numberOfEmployees":'',"monthlyObligation":'','officeAddress': '', 'panNumber': '', 'pincode': '', 'state': '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

        document.body.style.background = "#f4f8fb";
        this.ListDetails();

    }
    ListDetails() {
        var pan_selected = localStorage.getItem('panInfo');
        
        const params = { "panNumber": pan_selected};
        var _this = this;
        fetch('/api/leaddetails?', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            console.log(body);
            _this.setState({ 'aggregator': body.result[0].AGGREGATOR_NAME, 'loanAmount': body.result[0].LOAN_AMOUNT, 'city': body.result[0].CITY, 'country': body.result[0].COUNTRY, 'companyName': body.result[0].COMPANY_NAME, 'salaryMode': body.result[0].MODE_OF_SALARY, 'contactPerson': body.result[0].CONTACT_PERSON,"numberOfEmployees":body.result[0].COMPANY_NUMBER_OF_EMPLOYEES?body.result[0].COMPANY_NUMBER_OF_EMPLOYEES:"NIL","monthlyObligation":body.result[0].CURRENT_MONTHLY_OBLIGATION?body.result[0].CURRENT_MONTHLY_OBLIGATION:"NIL", "otherLoan": body.result[0].OTHER_LOAN, "appointmentDate": body.result[0].APPOINTMENT_DATE.substring(0, 10), 'companyExp': body.result[0].CURRENT_COMPANY_EXPERIENCE, "netSalary": body.result[0].NET_SALARY, "dateOfBirth": body.result[0].DATE_OF_BIRTH.substring(0, 10), 'emailId': body.result[0].EMAIL, 'mobileNumber': body.result[0].MOBILE_NUMBER, 'appointmentTime': body.result[0].APPOINTMENT_TIME, 'officeAddress': body.result[0].OFFICE_ADDRESS, 'panNumber': body.result[0].PAN_CARD, 'pincode': body.result[0].PINCODE, 'state': body.result[0].STATE });
        });
        localStorage.removeItem('panInfo');
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }
    handleSubmit(event) {
        event.preventDefault();
        const customer = this.state;
        const { user, users } = this.props;
        if (event.target.value == 'Submit') {
            customer.applicationStatus = 'Approved';
        }
        else {
            customer.applicationStatus = 'Rejected';
        }
        fetch('/api/leadstatus?', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customer)
        }).then(function (response) {
            return response.json()
        }).then(function (body) {
            if (body.result == "success") {
                alert("Form "+customer.applicationStatus+" Successfully");
                window.location.href = '/admin';
            }
            else {
                alert("Form Has Errors");
            }
        });



    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-8 offset-md-2 col-xs-12">
                <div className="card card-signin my-5" style={{ backgroundColor: '#009edf' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center" style={{ fontWeight: 600, color: "white" }}><u>Salary Advance Leads</u></h5>

                        <Form>
                            <Row>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalAggregatorName">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Aggregator Name</b> </Col>
                                        <Col sm={12}>

                                            <FormControl readOnly type="text" name="aggregator" value={this.state.aggregator} />

                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalContactPerson">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Borrower's Name (as per PAN Card)</b></Col>
                                        <Col sm={12}>
                                            <FormControl readOnly type="text" name="contactPerson" value={this.state.contactPerson} onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalCompanyName">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Company Name</b> </Col>
                                        <Col sm={12}>
                                            <FormControl readOnly type="text" name="companyName" value={this.state.companyName} onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}> <FormGroup controlId="formHorizontalNumberOfEmployees">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Number of Employees</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="numberOfEmployees" value={this.state.numberOfEmployees} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup></Col>


                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalLoanAmount">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Loan Amount</b></Col>
                                        <Col sm={12}>
                                            <FormControl readOnly type="text" name="loanAmount" value={this.state.loanAmount} onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>  <FormGroup controlId="formHorizontalMonthlyObligation">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Current Monthly Obligations</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="monthlyObligation" value={this.state.monthlyObligation} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup></Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalMobileNum">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Mobile No.</b></Col>
                                        <Col sm={12}>
                                            <FormControl readOnly type="text" name="mobileNumber" maxLength="10" value={this.state.mobileNumber} onChange={this.handleChange}/>
                                        </Col>
                                    </FormGroup>


                                </Col>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Email ID</b></Col>
                                        <Col sm={12}>
                                            <FormControl readOnly type="email" name="emailId" value={this.state.emailId} onChange={this.handleChange} required />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>  <FormGroup controlId="formHorizontalPanCard">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>PAN Number:</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="panNumber" value={this.state.panNumber} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup></Col>
                                <Col md={6}>   <FormGroup controlId="formHorizontalDateOfBirth">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Date of Birth</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="date" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} required />
                                    </Col>
                                </FormGroup></Col>
                            </Row>

                            <Row>
                                <Col md={6}>  <FormGroup controlId="formHorizontalCompanyExp">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Current Company Exp (in months)</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="companyExp" value={this.state.companyExp} onChange={this.handleChange}/>
                                    </Col>
                                </FormGroup></Col>
                                <Col md={6}>   <FormGroup controlId="formHorizontalNetSalary">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Net Salary</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="netSalary" value={this.state.netSalary} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup></Col>
                            </Row>


                            <Row>
                                <Col md={6}> <FormGroup controlId="formHorizontalModeOfSalary">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}> Mode of Salary</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="salaryMode" value={this.state.salaryMode} onChange={this.handleChange} />
                                    </Col>
                                </FormGroup></Col>
                                <Col md={6}><FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}> Other Loan</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="otherLoan" onChange={this.handleChange} value={this.state.otherLoan}/>
                                    </Col>
                                </FormGroup></Col>
                            </Row>

                            <Row>
                                <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Office Address</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="officeAddress" value={this.state.officeAddress} onChange={this.handleChange} required />
                                    </Col>
                                </FormGroup></Col>
                                <Col sm={6}> <FormGroup controlId="formHorizontalCity">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>City</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="city" onChange={this.handleChange} value={this.state.city}/>
                                    </Col>
                                </FormGroup></Col>
                            </Row>
                            <Row>

                                <Col sm={6}>  <FormGroup controlId="formHorizontalState">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>State</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="officeState" onChange={this.handleChange} value={this.state.state} />
                                    </Col>
                                </FormGroup></Col>
                                <Col sm={6}> <FormGroup controlId="formHorizontalPincode">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Pincode</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="officePincode" onChange={this.handleChange} value={this.state.pincode} />
                                    </Col>
                                </FormGroup></Col>
                            </Row>
                            <Row>

                                <Col sm={6}>  <FormGroup controlId="formHorizontalCountry">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Country</b></Col>
                                    <Col sm={12}>
                                        <FormControl readOnly type="text" name="officeCountry" onChange={this.handleChange} value={this.state.country} pattern="[a-zA-Z. ]{1,50}" required />
                                    </Col>
                                </FormGroup></Col>
                                <Col sm={6}>
                                    <FormGroup controlId="formHorizontalApptDate">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}> Appointment Date</b></Col>
                                        <Col sm={12}>
                                            <FormControl readOnly type="Date" name="appointmentDate" value={this.state.appointmentDate} onChange={this.handleChange} required />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>


                            <Row>

                                <Col sm={6}>
                                    <FormGroup controlId="formHorizontalApptTime">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Appointment Time</b></Col>
                                        <Col sm={12}>
                                            <FormControl readOnly type="Time" name="appointmentTime" value={this.state.appointmentTime} onChange={this.handleChange} required />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup controlId="formHorizontalComment">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Comments</b></Col>
                                        <Col sm={12}>
                                            <FormControl type="text" name="comments" onChange={this.handleChange} pattern="[a-zA-Z. ]{1,50}" required />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>

                                <Col sm={6}>
                                    <input type="submit" name="status" value="Submit" onClick={this.handleSubmit} style={{ color: "black" }} className="btn btn-warning col-sm-12" />
                                </Col>
                                <Col sm={6}>
                                    <input type="submit" name="status" value="Reject" onClick={this.handleSubmit} style={{ color: "black" }} className="btn btn-danger col-sm-12" />
                                </Col>

                            </Row>


                        </Form>

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

export default withRouter(connect(mapStateToProps)(EditModeHomePage));