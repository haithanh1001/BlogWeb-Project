const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const ejs = require('ejs');
app.set('view engine','ejs');

const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/blog_database',{useNewUrlParser: true});

const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');



const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'));
const fileUpload = require('express-fileupload');
app.use(fileUpload());

const expressSession = require('express-session');
app.use(expressSession({
    secret: 'keyboard cat'
}))

global.loggedIn = null;
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId;
    next();
})

const validateMiddleWare = require('./middleware/validationMiddleware');
app.use('/posts/store',validateMiddleWare)

const homeController = require('./controllers/home');
app.get('/',homeController);

const aboutController = require('./controllers/about');
app.get('/about',aboutController);

const contactController = require('./controllers/contact');
app.get('/contact',contactController);

const newestPostController = require('./controllers/newestPost');
app.get('/posts/newest',newestPostController);  

const newUserController = require('./controllers/newUser');
app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController);

const storeUserController = require('./controllers/storeUser');
app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController);

const getPostController = require('./controllers/getPost');
app.get('/post/:id',getPostController)

const newPostController = require('./controllers/newPost');
app.get('/posts/new',authMiddleware,newPostController);

const storePostController = require('./controllers/storePost');
app.post('/posts/store',authMiddleware,storePostController);

const loginController = require('./controllers/login');
app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController);

const loginUserController = require('./controllers/loginUser');
app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController);

const logoutController = require('./controllers/logout');
app.get('/auth/logout',logoutController);

app.use((req,res)=>{
    res.render('pages/notfound');
})
app.listen(port,()=>{
    console.log(`Listening on port ${3000}`)
})