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
  var month = today.getMonth();
  var day = today.getDay();
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
  host: 'retrainfo.cl2xcsug0xte.ap-south-1.rds.amazonaws.com',
  port: '3306',
  user: 'retrauserdata',
  password: 's3cr3tretra',
  database: 'retrafinancedb'
});

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
app.all('/leadinfo', upload.array(), function (req, res, next) {

  var querystring = "INSERT INTO Edelweissdata (AGGREGATOR_NAME,CONTACT_PERSON,COMPANY_NAME,CITY,MOBILE_NUMBER,EMAIL,CURRENT_COMPANY_EXPERIENCE,NET_SALARY,MODE_OF_SALARY,OTHER_LOAN,OFFICE_ADDRESS,APPOINTMENT_DATE,APPOINTMENT_TIME,CREATED_BY,LOAN_AMOUNT,STATE,PINCODE,COUNTRY,PAN_CARD,DATE_OF_BIRTH,ENTRY_DATE,STATUS,COMMENTS) VALUES ('" + req.body.aggregator + "','" + req.body.contactPerson + "','" + req.body.companyName + "','" + req.body.city + "','" + req.body.mobileNumber + "','" + req.body.emailId + "','" + req.body.companyExp + "','" + req.body.netSalary + "','" + req.body.salaryMode + "','" + req.body.otherLoan + "','" + req.body.officeAddress1 + " " + req.body.officeAddress2 + "','" + req.body.appointmentDate + "','"  + req.body.appointmentTime + "','"+req.body.created_by+ "','"+req.body.loanAmount + "','"+ req.body.officeState + "','" + req.body.officePincode + "','" + req.body.officeCountry + "','" +req.body.panNumber + "','"+req.body.dateOfBirth + "','"+startTime(new Date())+ "','"+''+"','" +''+ "')";
  console.log(querystring);
  connection.query(querystring, function (err, result) {
    if (err) {
      res.json({ "result": "failure" });
      throw err
    } else {
      res.json({ "result": "success" });
    }
  })
});
app.all('/listleads', upload.array(), function (req, res, next) {

  var querystring = "SELECT * FROM Edelweissdata WHERE STATUS = ''";
  console.log(querystring)
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

  var querystring = "Update Edelweissdata SET STATUS = '" + req.body.applicationStatus + "' , COMMENTS = '"+ req.body.comments +"' , ADMIN_ACTION_DATE = '"+ startTime(new Date()) +"' WHERE PAN_CARD = '" + req.body.panNumber + "'";
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
