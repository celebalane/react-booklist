import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBookQuery } from '../queries/queries';

import Typography from '@material-ui/core/Typography';

class BookDetails extends Component {

	displayBookDetails(){
		const { book } = this.props.data;
		if(book){
			return(
				<div>
					<Typography variant="h5" gutterBottom>{ book.name }</Typography>
					<p><strong>Auteur:</strong> { book.author.name }</p>
					<p><strong>Genre:</strong> { book.genre }</p>
					<p><strong>Autres livres de l'auteur:</strong></p>
					<ul className="other-books">
						{ book.author.books.map(item => {
							return <li key={ item.id }>{ item.name }</li>
						})}
					</ul>
				</div>
			)
		} else {
			return(
				<div>Aucun livre sélectionné</div>
			)
		}
	}

	render() {

		return (
		    <div id="book-details">
		      { this.displayBookDetails() }
		    </div>
  		);
	}
}

export default graphql(getBookQuery, {
	options: (props) => {
		return {
			variables: {
				id: props.bookId
			}
		}
	}
})(BookDetails);