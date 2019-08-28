const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

//connexion DB
mongoose.connect("mongodb+srv://celebalane:password@cluster0-r41ji.mongodb.net/test?retryWrites=true&w=majority");
mongoose.connection.once('open', () =>{
	console.log('Connecté à la DB')
});

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql:true
}));

app.listen(4000,() => {
	console.log('Surveillance des requêtes sur le port 4000');
});
