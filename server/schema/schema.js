//Détail des objets, relations et actions via graphQL
const graphql = require('graphql');
const_= require ('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//Data test
var books = {
	{ name: "L'empire des anges", genre: 'S-F', id:'1'},
	{ name: "Nous les dieux", genre: 'S-F', id:'2'},
	{ name: "Une rose au paradis", genre: 'S-F', id:'3'}
}

const BookType = new GraphQLObjectType({
	name:'Book',
	fields: () => ({       //La fonction permet les relations entre les différents objets
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({ //Points d'entrée
	name: 'RootQueryType',
	fields:{
		book: { //Nom de la requête qui sera réutilisé pour le front
			type: BookType,
			args: { id: { type:GraphQLString } }
			resolve(parent,args){
				return _.find(books, { id: args.id })
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});