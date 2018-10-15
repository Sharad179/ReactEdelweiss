var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var httpProxy = require('http-proxy');


var multer = require('multer'); // v1.0.5
var upload = multer();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');



var app = express();

const apiProxy = httpProxy.createProxyServer({
  target:'http://localhost:8000'
})

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth()+1;
  var day = today.getDate();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  return(year+"-"+month+"-"+day+" "+h + ":" + m + ":" + s);
}
startTime();

app.use('/api',function(req,res){
  apiProxy.web(req,res);
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Authorization');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
// app.set('view engine','ejs')

var mysql = require('mysql')
var connection = mysql.createConnection({
  host: '',
  port: '3306',
  user: '',
  password: '',
  database: 'retrafinancedb'
});
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

var mailOptions = {
  from: '',
  to: '',
  subject: 'New Lead Entry'
};



app.all('/authenticate', upload.array(), function (req, res, next) {
  var querystring = "SELECT * FROM USERLIST WHERE USERNAME = '" + req.body.username + "' AND PASSWORD = '" + req.body.password + "'";
  connection.query(querystring, function (err, result) {
    if (err) {
      throw err
    }
    else {
      if (result[0]) {
        if (result[0].TOKEN) {
          res.json({
            "status": "Active",
            "username": result[0].USERNAME,
            "token": result[0].TOKEN,
            "role":result[0].ROLE
          })
        }
        else {
          res.json({
            "status": "Inactive",
            "username": result[0].USERNAME,
            "token": result[0].TOKEN,
            "role":result[0].ROLE
          })

        }
      }
      else {
        res.json({
          "status": "User Does not Exist",
        })
      }
    }
  })
})
app.all('/userlist?', upload.array(), function (req, res, next) {

  var querystring = "select USERNAME from USERLIST where ROLE = 'user'";
  connection.query(querystring, function (err, result) {
    if (err) {
      res.json({ "result": "failure" });
      throw err
    } else {
      var userlist = [];
      for(var i in result){
          userlist.push(result[i].USERNAME);
      }
      res.json({ "result": userlist });
    }
  })
});
app.all('/leadinfo', upload.array(), function (req, res, next) {

  var querystring = "INSERT INTO Edelweissdata (AGGREGATOR_NAME,CONTACT_PERSON,COMPANY_NAME,CITY,MOBILE_NUMBER,EMAIL,CURRENT_COMPANY_EXPERIENCE,NET_SALARY,MODE_OF_SALARY,OTHER_LOAN,OFFICE_ADDRESS,COMPANY_NUMBER_OF_EMPLOYEES,APPOINTMENT_DATE,APPOINTMENT_TIME,CREATED_BY,LOAN_AMOUNT,CURRENT_MONTHLY_OBLIGATION,STATE,PINCODE,COUNTRY,PAN_CARD,DATE_OF_BIRTH,ENTRY_DATE,STATUS,COMMENTS) VALUES ('" + req.body.aggregator + "','" + req.body.contactPerson + "','" + req.body.companyName + "','" + req.body.city + "','" + req.body.mobileNumber + "','" + req.body.emailId + "','" + req.body.companyExp + "','" + req.body.netSalary + "','" + req.body.salaryMode + "','" + req.body.otherLoan + "','" + req.body.officeAddress1 + " " + req.body.officeAddress2 + "','" + req.body.numberOfEmployees + "','" + req.body.appointmentDate + "','"  + req.body.appointmentTime + "','"+req.body.created_by+ "','"+req.body.loanAmount + "','"+req.body.monthlyObligation + "','"+ req.body.officeState + "','" + req.body.officePincode + "','" + req.body.officeCountry + "','" +req.body.panNumber + "','"+req.body.dateOfBirth + "','"+startTime()+ "','"+''+"','" +''+ "')";
  connection.query(querystring, function (err, result) {
    if (err) {
      res.json({ "result": "failure" });
      throw err
    } else {
      res.json({ "result": "success" });
      mailOptions.html = "<table style='width:100%;border: 1px solid black'><tr><th style='border: 1px solid black'>Pan Number</th><th style='border: 1px solid black'>Borrower's Name</th><th style='border: 1px solid black'>Mobile Number</th><th style='border: 1px solid black'>Email</th></tr><tr><td style='border: 1px solid black'>"+req.body.panNumber+"</td><td style='border: 1px solid black'>"+req.body.contactPerson+"</td><td style='border: 1px solid black'>"+req.body.mobileNumber+"</td><td style='border: 1px solid black'>"+req.body.emailId+"</td></tr></table>";
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          
        }
      });
    }
  })
});
app.all('/listleads', upload.array(), function (req, res, next) {

  var querystring = "SELECT * FROM Edelweissdata WHERE STATUS = ''";
  connection.query(querystring, function (err, result) {
    if (err) {
      res.json({ "result": "failed" });
      throw err
    } else {
      res.json({ "result": result });
    }
  })
});
app.all('/leadStatusDetails', upload.array(), function (req, res, next) {

  var querystring = "SELECT COUNT(ID) as Count,STATUS FROM Edelweissdata GROUP BY STATUS";
  connection.query(querystring, function (err, result) {
    if (err) {
      res.json({ "result": "failed" });
      throw err
    } else {
      res.json({ "result": result });
    }
  })
});
app.all('/leaddetails', upload.array(), function (req, res, next) {

  var querystring = "Select * from Edelweissdata WHERE PAN_CARD = '" + req.body.panNumber + "'";
  connection.query(querystring, function (err, result) {
    if (err) {
      res.json({ "result": "failed" });
      throw err
    } else {
      res.json({ "result": result });
    }
  })
});
app.all('/leadstatus', upload.array(), function (req, res, next) {

  // var querystring = "Update Edelweissdata SET STATUS = '" + req.body.applicationStatus + "' , COMMENTS = '"+ req.body.comments +"' , ADMIN_ACTION_DATE = '"+ startTime() +"' WHERE PAN_CARD = '" + req.body.panNumber + "'";
  var querystring = "Update Edelweissdata SET STATUS = '" + req.body.applicationStatus + "' , COMMENTS = '"+ req.body.comments+ "' , DATE_OF_BIRTH = '"+ req.body.dateOfBirth+ "' , PAN_CARD = '"+ req.body.panNumber+ "' , COUNTRY = '"+ req.body.country+ "' , PINCODE = '"+ req.body.pincode+ "' , STATE = '"+ req.body.state+ "' , CURRENT_MONTHLY_OBLIGATION = '"+ req.body.monthlyObligation+ "' , LOAN_AMOUNT = '"+ req.body.loanAmount+ "' , APPOINTMENT_TIME = '"+ req.body.appointmentTime+ "' , APPOINTMENT_DATE = '"+ req.body.appointmentDate+ "' , COMPANY_NUMBER_OF_EMPLOYEES = '"+ req.body.numberOfEmployees+ "' , OFFICE_ADDRESS = '"+ req.body.officeAddress+ "' , OTHER_LOAN = '"+ req.body.otherLoan+ "' , MODE_OF_SALARY = '"+ req.body.salaryMode+ "' , NET_SALARY = '"+ req.body.netSalary+ "' , CURRENT_COMPANY_EXPERIENCE = '"+ req.body.companyExp+ "' , EMAIL = '"+ req.body.emailId+ "' , MOBILE_NUMBER = '"+ req.body.mobileNumber+ "' , CITY = '"+ req.body.city+ "' , COMPANY_NAME = '"+ req.body.companyName+ "' , CONTACT_PERSON = '"+ req.body.contactPerson+ "' , AGGREGATOR_NAME = '"+ req.body.aggregator +"' , ADMIN_ACTION_DATE = '"+ startTime() +"' WHERE PAN_CARD = '" + req.body.panNumber + "'";
  console.log(querystring);
  connection.query(querystring, function (err, result) {
    if (err) {
      res.json({ "result": "failed" });
      throw err
    } else {
      res.json({ "result": "success" , "values":result });
    }
  })
});
app.listen(8000,function(err){
  if(err){
      return console.log(err);
  }
  console.log('API Server is listening to http://localhost:8000');
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
