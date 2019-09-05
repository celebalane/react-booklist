import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getBooksQuery } from '../queries/queries';

import BookDetails from './BookDetails';
import DeleteBook from './DeleteBook';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';


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
						<ListItem button onClick={ (e) => { this.setState({ selected: book.id })}}>
							<Icon color="primary">bookmark_border</Icon>
							<ListItemText primary={ book.name } />
							<DeleteBook bookId={ book.id } />
					</ListItem> 
					</div>
				)
			})
		} 
	}

	render() {
		return (
		    <Grid container spacing={3}>
			    <Grid item sm={8} xs={12}>
			    	<Paper className="paper">
			    		<List component="nav" aria-label="liste de livres">
					      { this.displayBooks() }
				      	</List>
				    </Paper>
			    </Grid>
			    <Grid item sm={4} xs={12}>
			    	<Paper className="paper"> 
			    		<h2 id="infos-titre">Infos</h2>
		      			<BookDetails bookId={ this.state.selected }/>
		      		</Paper>
		      	</Grid>
		    </Grid>
  		);
	}
}

export default graphql(getBooksQuery)(BookList);