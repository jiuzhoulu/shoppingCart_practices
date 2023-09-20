//express js
const express = require('express');
const app = express();

//cookie and session
const session = require('express-session');
const cookieParser = require('cookie-parser');

//bodyParser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//handlebars view engine
const handlebars = require('express-handlebars');
app.engine('handlebars', 
	handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

//use the user authorization module
const userAuth = require('./userAuth.js');

//cookie-parser and session middleware
app.use(cookieParser());
app.use(session({
	secret:'secretabc123',
	saveUninitialized: true,
	resave:false
}));

// Routing
var routes = require('./routes/index');
app.use(routes);

app.get('/',(req,res)=>{
	if(req.session.userid == undefined){
		res.render('loginView',{message:""});
		
	}
	else{
		res.render('homeView',{message:''});
	}
});

app.get('/home',(req,res)=>{
	res.redirect("/");
});

app.post('/login',(req,res)=>{
	userAuth.lookUpUser(req.body.userid,req.body.pwd).then(myUser =>{
		//console.log(myUser);
		if(myUser == null){
			//console.log('yi');
			res.render('loginView',
				{message:"Invalid userID or password"
		});
		}else if(myUser){
			//console.log('er');
			req.session.userid = myUser.userID;
			req.session.userIsAdmin = myUser.isAdmin;
			req.session.cart=[];
			res.redirect("/");
		}else{
			res.render('404')
		}
	});	
	
});

app.get('/logout',(req,res)=>{
	req.session.destroy();
	res.redirect('/');
})

app.get('/admin',(req,res)=>{
	if(req.session.userid == undefined){
		res.redirect("/");
	}
	else if(req.session.userIsAdmin){
		res.render("adminView");
	}else{
		res.render("homeView",
			{message:'Not admin user is not allowed'
		});
	}
	
});

//404
app.use((req, res) => {
	res.status(404);
	res.render('404');
});

//set up port
app.listen(3000, () => {
  console.log('http://localhost:3000');
});