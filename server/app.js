const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();

//Autorise les requêtes sur des serveurs distincts
app.use(cors());

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
