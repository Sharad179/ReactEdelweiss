import React from 'react';
import { withRouter } from 'react-router-dom';
import config from 'config';
// import ReactDOM, { render } from 'react-dom';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Row, Col, FormControl, FormGroup, ControlLabel, InputGroup, DropdownButton, MenuItem, Button } from 'react-bootstrap';

// import { userActions } from '../_actions';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'salaryMode': 'Bank Credit',"otherLoan":"yes", "appointmentDate": this.formatDate(new Date()), 'appointmentTime': this.formatTime(new Date()) }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {

        document.body.style.background = "#f4f8fb"

    }
    formatTime(Date) {
        let newdate
        let newtime
        console.log(Date.getHours());
        if (Date.getHours() > 9) {
            newdate = Date.getHours();
        }
        else {
            newdate = "0" + Date.getHours();
        }
        if (Date.getMinutes() > 9) {
            newtime = Date.getMinutes();
        }
        else {
            newtime = "0" + Date.getMinutes();
        }
        return newdate + ":" + newtime;
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    handleTextValidation(customerObj) {
        var Textregex = /^[a-zA-Z]+$/;
        if ((customerObj.aggregator.match(Textregex)) && (customerObj.contactPerson.match(Textregex)) && (customerObj.companyName.match(Textregex)) && (customerObj.city.match(Textregex))) {
            return true;
        }
        else {

            return false;
        }

    }
    handleEmailValidation(emailField) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!reg.test(String(emailField).toLowerCase())) {

            return false;
        }

        return true;

    }
    handleMobileValidation(inputtxt) {
        var phoneno = /^\d{10}$/;
        if ((inputtxt.match(phoneno))) {
            return true;
        }
        else {

            return false;
        }
    }
    handleExpValidation(inputtxt) {
        var phoneno = /^\d{1,3}$/;
        if ((inputtxt.match(phoneno))) {
            return true;
        }
        else {

            return false;
        }

    }
    handleNumericValidation(inputtxt) {
        var phoneno = /^\d{1,8}$/;
        if ((inputtxt.match(phoneno))) {
            return true;
        }
        else {

            return false;
        }

    }
    handleChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }
    handleSubmit(event) {
        console.log(this.state);

        event.preventDefault();
        const customer = this.state;
        if (this.handleMobileValidation(customer.mobileNumber) && this.handleEmailValidation(customer.emailId) && this.handleNumericValidation(customer.netSalary) && this.handleTextValidation(customer)) {
            fetch('/api/leadinfo?', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(customer)
            }).then(function (response) {
                return response.json()
            }).then(function (body) {
                if (body.result == "success") {
                    alert("Form Submitted Successfully");
                    location.reload();
                }
                else {
                    alert("Form Has Errors");
                }
            });
        }


    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-8 offset-md-2 col-xs-12">
                <div className="card card-signin my-5" style={{ backgroundColor: '#009edf' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center" style={{ fontWeight: 600, color: "white" }}><u>Salary Advance Leads: Edelweiss</u></h5>

                        <Form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalAggregatorName">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Aggregator Name</b> </Col>
                                        <Col sm={12}>

                                            <FormControl type="text" name="aggregator" onChange={this.handleChange} pattern="[a-zA-Z. ]{1,50}" required />

                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalContactPerson">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Contact Person</b></Col>
                                        <Col sm={12}>
                                            <FormControl type="text" name="contactPerson" onChange={this.handleChange} pattern="[a-zA-Z. ]{1,50}" required />
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
                                            <FormControl type="text" name="companyName" onChange={this.handleChange} pattern="[a-zA-Z. ]{1,50}" required />
                                        </Col>
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalCity">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>City</b></Col>
                                        <Col sm={12}>
                                            <FormControl type="text" name="city" onChange={this.handleChange} pattern="[a-zA-Z. ]{1,50}" required />
                                        </Col>
                                    </FormGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalMobileNum">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Mobile No.</b></Col>
                                        <Col sm={12}>
                                            <FormControl type="text" name="mobileNumber" maxLength="10" onChange={this.handleChange} pattern="[0-9]{10}" required />
                                        </Col>
                                    </FormGroup>


                                </Col>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalEmail">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Email ID</b></Col>
                                        <Col sm={12}>
                                            <FormControl type="email" name="emailId" onChange={this.handleChange} required />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>  <FormGroup controlId="formHorizontalCompanyExp">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Current Company Exp (in months)</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="companyExp" onChange={this.handleChange} pattern="\d{1,3}" required />
                                    </Col>
                                </FormGroup></Col>
                                <Col md={6}>   <FormGroup controlId="formHorizontalNetSalary">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Net Salary</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="netSalary" onChange={this.handleChange} pattern="\d{1,8}" required />
                                    </Col>
                                </FormGroup></Col>
                            </Row>


                            <Row>
                                <Col md={6}> <FormGroup controlId="formHorizontalModeOfSalary">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}> Mode of Salary</b></Col>
                                    <Col sm={12}>
                                        <select value={this.state.salaryMode} className="col-sm-12 form-control" title="Select Mode of Salary" name="salaryMode" onChange={this.handleChange} required>
                                            <option value="Cheque">Cheque</option>
                                            <option value="Bank Credit">Bank Credit</option>
                                            <option value="Cash">Cash</option>


                                        </select>
                                    </Col>
                                </FormGroup></Col>
                                <Col md={6}><FormGroup controlId="formHorizontalPassword">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}> Other Loan</b></Col>
                                    <Col sm={12}>
                                    <select value={this.state.otherLoan} className="col-sm-12 form-control" title="Other Loan" name="otherLoan" onChange={this.handleChange} required>
                                            <option value="yes">Yes</option>
                                            <option value="No">No</option>
                


                                        </select>
                                        {/* <FormControl type="text" name="otherLoan" onChange={this.handleChange} pattern="[a-zA-Z. ]{3}" required /> */}
                                    </Col>
                                </FormGroup></Col>
                            </Row>

                            <Row>
                                <Col sm={6}> <FormGroup controlId="formHorizontalOfficeAddress1">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Office Address Line 1</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="officeAddress1" onChange={this.handleChange} required />
                                    </Col>
                                </FormGroup></Col>
                                <Col sm={6}>  <FormGroup controlId="formHorizontalOfficeAddress2">
                                    <Col componentClass={ControlLabel} sm={12}>
                                        <b style={{ fontWeight: 600, color: "white" }}>Office Address Line 2</b></Col>
                                    <Col sm={12}>
                                        <FormControl type="text" name="officeAddress2" onChange={this.handleChange} />
                                    </Col>
                                </FormGroup></Col>
                            </Row>


                            <Row>
                                <Col sm={6}>
                                    <FormGroup controlId="formHorizontalApptDate">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}> Appointment Date</b></Col>
                                        <Col sm={12}>
                                            <FormControl type="Date" name="appointmentDate" min={this.formatDate(new Date())} value={this.state.appointmentDate} onChange={this.handleChange} required />
                                        </Col>
                                    </FormGroup>
                                </Col>
                                <Col sm={6}>
                                    <FormGroup controlId="formHorizontalApptTime">
                                        <Col componentClass={ControlLabel} sm={12}>
                                            <b style={{ fontWeight: 600, color: "white" }}>Appointment Time</b></Col>
                                        <Col sm={12}>
                                            <FormControl type="Time" name="appointmentTime" value={this.state.appointmentTime} onChange={this.handleChange} required />
                                        </Col>
                                    </FormGroup>
                                </Col>
                            </Row>



                            <FormGroup>
                                <Col sm={10}>
                                    <input type="submit" value="Submit" className="btn btn-warning col-sm-10 offset-sm-2" />
                                </Col>
                            </FormGroup>
                        </Form>

                    </div>
                </div>
            </div>

           
        );
    }
}

function mapStateToProps(state) {
    // const { users, authentication } = state;
    // const { user } = authentication;
    return {
        // user,
        // users
    };
}

export default withRouter(connect(mapStateToProps)(HomePage));