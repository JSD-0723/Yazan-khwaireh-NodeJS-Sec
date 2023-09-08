// Imports
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import bookRoutes from "./routes/bookRoutes.js"


const app = express() ;

// defining the port for the application to listen
const port = 3000

// Added Application Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// defining the template engine for the application
app.set('view engine' , 'pug');

// defining the views file for the template engine
app.set('views' , path.resolve('./dist'));


app.get('/' , (req , res) => {

res.redirect('/books')
});


// Added Application Middleware
app.use(bookRoutes);

// return 404 for all unRegistered routes
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page not found!" });
});


app.listen(port ,() => {

console.log('Express app is listening to port 3000!');


})