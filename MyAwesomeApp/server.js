const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/hawaiii/build`));
var usersRouter = require('./routes/users');

app.get('/api/hello', function (req, res){
	res.json({message: "Hello World"});
});

app.use(require("body-parser").json())

app.use('/users', usersRouter);

const port = process.env.PORT || 3001;

app.listen(port, function() {
	console.log("Server listening on port " + port);
})
