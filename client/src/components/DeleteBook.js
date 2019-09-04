import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { getBooksQuery, deleteBookMutation } from '../queries/queries';

class DeleteBook extends Component {

	constructor(props){
		super(props);
		this.state = {
			selected: null
		}
	}

	deleteBook(e){
		e.preventDefault();
		const id = this.props.bookId;
		console.log(id)
		this.props.deleteBookMutation ({
			variables:{ id:id },
			refetchQueries: [{ query: getBooksQuery }]
		});
	}
 
	render() {
		return (
		    <button onClick={ this.deleteBook.bind(this) }>
		      Supprimer
		    </button>
  		);
	}
}

export default compose(
	graphql(getBooksQuery, { name: "getBooksQuery"}),
	graphql(deleteBookMutation, { name: "deleteBookMutation"})
)(DeleteBook);