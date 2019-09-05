import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { getBooksQuery, deleteBookMutation } from '../queries/queries';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteBook extends Component {

	constructor(props){
		super(props);
		this.state = {
			delete: false
		}
	}

	deleteBook(e){
		e.preventDefault();
		const id = this.props.bookId;
		this.props.deleteBookMutation ({
			variables:{ id:id },
			refetchQueries: [{ query: getBooksQuery }]
		});
		this.setState({delete: true});
	}
 
	render() {
		return (
			<IconButton aria-label="delete" onClick={ this.deleteBook.bind(this) }>
		      <DeleteIcon color="secondary"/>
		    </IconButton>    
  		);
	}
}

export default compose(
	graphql(getBooksQuery, { name: "getBooksQuery"}),
	graphql(deleteBookMutation, { name: "deleteBookMutation"})
)(DeleteBook);