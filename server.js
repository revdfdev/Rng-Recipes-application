const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
const Recipe = require('./models/recipe');
const User = require('./models/user');
const cors = require('cors');
const jwt = require('jsonwebtoken');



mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('DB connected'))
	.catch(err => console.error(err));

// Bring in graphql express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');


// create schema
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});




const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true
};

app.use(cors(corsOptions));

// set up jwt authentication middlewar
app.use(async(req, res, next) => {
	const token = req.headers['authorization'];
	if (token !== null) {
		try {
			const currentUser = await jwt.verify(token, process.env.SECRET);
			req.currentUser = currentUser;
			console.log("current user on fetch", req.currentUser);
		}catch(err) {
			console.error(err);
		}
	}
	next();
});

// Create graphiql application
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql' }));

// Connect schema with graphql.

app.use('/graphql',  bodyParser.json(), graphqlExpress(({currentUser}) => ({
	schema,
	context: {
		Recipe,
		User,
		currentUser
	}
})));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
	console.log(`listening to port ${PORT}`);
});
