import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';

import { getBooksQuery, deleteBookMutation } from '../queries/queries';

import BookDetails from './BookDetails'
import DeleteBook from './DeleteBook'


class BookList extends Component {

	constructor(props){
		super(props);
		this.state = {
			selected: null
		} 
	}

	displayBooks(){
		var data = this.props.data;
		if(data.loading){
			return (<div>Chargement en cours</div>);
		} else {
			return data.books.map(book => { //map permet d'avoir chacun des éléments du tableau
				return(
					<div key={ book.id }>
						<li  onClick={ (e) => { this.setState({ selected: book.id })}}>{ book.name } </li> 
						<DeleteBook bookId={ book.id } />
					</div>
				)
			})
		} 
	}



	render() {
		return (
		    <div>
		      <ul id="book-list">
		      	{ this.displayBooks() }
		      </ul>
		      <BookDetails bookId={ this.state.selected }/>
		    </div>
  		);
	}
}

export default graphql(getBooksQuery)(BookList);