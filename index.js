const app = require('express')();

//This is used for every layer of middleware that wants to be created
//All incoming request are are executing this middleware first
//To use the middleware it can be used like this and it will handle all the incoming request,
//or it can be used for only specific request.
app.use(auth);

//app.get() accepts the route and a list of middlewares, whose a executed in order of appeareance
app.get('/', (req, res) => {
  console.log('Login page');
  res.send('Login page');
});

//This is for specific request, but it also calls out the auth
app.get('/home', printMessage, (req, res) => {
  console.log('Home page');
  res.send('Bienvenido caballero!, Home page');
});

//Middleware
//This also handlex req,res and can acces to these variables.
//The next is used to continue and give permit the user to continue with the request. E.g
function auth(req, res, next) {
  console.log('before next of auth');
  //Next makes the request to continue their execution to the route,
  //E.G if the users request /, it first comes to this middleware, console logs "before", then the next() makes the program execution to to go to the app.get('/')... function and execute it, and when its done there it comes bakc to this funciton and console logs "after".
  //You wanna be careful with next because it DOESNT work like a return statement, if you wanna make sure that you exit you app after the next you must write "return" or make conditionals to avoid sending responses after the next has been called. if doing so this may results in a error of headers.
  next(); //Run the next layer of middle ware and then come back

  console.log('after next of auth');
}

//this is for specific
function printMessage(req, res, next) {
  if (req.query.age && req.query.age >= '18') {
    console.log('puedes pasar');
    next();
  } else {
    console.log('tas chikito todavia');
    res.send('Debes ser mayor de edad para pasar');
  }
}
//listen to a specific port
app.listen(1510);
