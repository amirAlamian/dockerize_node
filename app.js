const express=require("express");
const mongoose=require("mongoose");
const app =express();
const createError = require('http-errors');
const path=require("path")
const companyRouter = require('./routes/company');
const Response = require("./tools/Response");
mongoose.connect("mongodb://mongo:27017/company",//mongoose connect
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(express.static("public"))

app.use('/company', companyRouter);


app.use(function(req, res, next) {
    next(createError(404));
  });
  

//error handler
app.use(function (err, req, res, next) {

    if(err.status===404){//url errors

      console.log(err.message ,"error");
      res.locals.message = err.message;
      
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
      // render the error page
      res.status(err.status || 500);
      return res.render('error');
    }

    if (!res.headersSent) {
      console.log(err);
      return res.send(new Response(false, err));
    }

  });




app.listen(8080,function(){
    console.log("up and runnig on 8080");
})