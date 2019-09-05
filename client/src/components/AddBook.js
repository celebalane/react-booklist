import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

import Typography from '@material-ui/core/Typography';

class AddBook extends Component {

	constructor(props){
		super(props);
		this.state = {
			name: "",
			genre: "",
			authorId: ""
		};
	}

	displayAuthors(){
		var data = this.props.getAuthorsQuery;
		if(data.loading){
			return (<option disabled>Chargement en cours</option>)
		} else {
			return data.authors.map(author =>{
				return(<option key={ author.id } value={ author.id }>{ author.name }</option>)
			})
		}
	}

	submitForm(e){
		e.preventDefault();
		this.props.addBookMutation({
			variables: {                                //déclaration de variables pour la requête
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId
			},
			refetchQueries: [{ query: getBooksQuery }]  //Relance la query en argument lorsque addbookMutation est lancée
		});
	}

	render() {
		return (
		    <form id="add-book" onSubmit={ this.submitForm.bind(this) }>
		    	<Typography variant="h4" color="primary" gutterBottom>Ajouter un livre</Typography>
		    	<div className="field">
		    		<label>Titre:</label>
		    		<input type="text" onChange={ (e) => this.setState({ name: e.target.value })} />
		    	</div>
		    	<div className="field">
		    		<label>Genre:</label>
		    		<input type="text" onChange={ (e) => this.setState({ genre: e.target.value })} />
		    	</div>
		    	<div className="field">
		    		<label>Auteur</label>
		    		<select onChange={ (e) => this.setState({ authorId: e.target.value })}>
		    			<option>Veuillez choisir un auteur</option>
		    			{ this.displayAuthors() }
		    		</select>
		    	</div>

		    	<button>+</button>
		    </form>
  		);
	}
}

export default compose(   //Permet de bind les différentes queries au component
	graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
	graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook);