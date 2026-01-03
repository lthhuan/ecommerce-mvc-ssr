const express = require('express')
var methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')


var flash = require('express-flash')

require('dotenv').config()

const databse =  require("./config/database")

const systemConfig = require("./config/system")

databse.connect();

const app = express()
const port = process.env.PORT

app.use(methodOverride('_method'))


app.use(bodyParser.urlencoded())

app.set("views", "./views");
app.set('view engine', 'pug');


app.use(cookieParser('UEWKLJOPIERJM'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//App local
app.locals.prefixAdmin = systemConfig.prefixAdmin;

const route = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")

app.use(express.static('public'))


route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});