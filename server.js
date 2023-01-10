var express = require("express");
var app = express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var methodOverride= require('method-override');
var articleRouter = require('./routs/articles');
var Article = require('./models/article');

var session = require('express-session');
var cookieParser  =require('cookie-parser');
var flash = require('connect-flash');



const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/bloguser');

app.use(cookieParser());

app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
     
    })
  );



 app.use(flash()); 

 app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next();

 });

app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));




app.use('/', require("./routs/indeex"));
app.use('/users', require("./routs/users"));
app.use("/articles", articleRouter);



app.get('/a',async(req,res)=>{
  var articles  = await Article.find().sort({createdAt: 'desc' })

  res.render('articles/index',{articles: articles})
});

const port = 6002;

app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:$(port)`));