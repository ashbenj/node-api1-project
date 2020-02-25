// implement your API here
const express = require('express'); //install express (npm i express)

let Users = require('./data/db');

const server = express();

//middleware is way to teach express how to read JSON from the body
server.use(express.json()); //needed for POST and PUT/PATCH

//which methods you are going to handle and to which urls on the server
//if anyone comes to the '/' route we're going to send back a json object that says hello: "Web PT 10"
server.get('/', (req, res) => {
	res.json({ working: 'It Works!!' });
});

// view a list of users, get all users

//to view a list of users, use get when you want to view something
//what's the url?
//Everytime you need to manage something on the API, this time it's Users, that something is RESOURCES
//They are things in your system(nouns)
//Each resource is going to live at a particular url in your system
//Think of url as a place where your resources live in the server
//Where do the users live in my server(apartment)?
server.get('/api/users', (req, res) => {
	// go and get the users from the database
	Users.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'Cannot find user' });
		});
});

//getting users by id
server.get('/api/users/:id'),
	(req, res) => {
		Users.findById(id)
			.then(users => {
				res.status(200).json(users);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ errorMessage: 'Cannot find specific user' });
			});
	};

//add a new user
server.post('/api/users', (req, res) => {
	//axios.post(url, data, options); the data will be in the body of the request
	const newUser = req.body;
	//validate the data, and if the data is valid, save it
	Users.insert(newUser)
		.then(user => {
			res.status(201).json({ user, errorMessage: 'Cannot add user' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'oops' });
		});
});

//delete a user
server.delete('/api/users/:id', (req, res) => {
	const { id } = req.params;
	Users.remove(id)
		.then(removed => {
			res.status(200).json(removed);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'Cannot remove user' });
		});
});

//Updates user Information
server.put('api/users/:id', (req, res) => {
	const newUser = req.body;
	const { id } = req.params;
	Users.update(id, newUser)
		.then(edit => {
			res.status(201).json(edit);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'Cannot edit user' });
		});
});

const port = 5000;
server.listen(port, () => console.log('\n** API on port ${port} \n')); //turn on the server by listening on a port
