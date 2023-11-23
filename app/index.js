const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require ('dotenv')
dotenv.config();


const {errorHandler} = require ('./middlewares/errorhandler.middleware');
const {notfound} = require ('./middlewares/notfound.middleware');

const userRouter = require ('./routes/users.routes')

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(jsonParser);
app.use(urlencodedParser);

//routers
app.use('/u', userRouter);

app.use(notfound);
app.use(errorHandler);

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});