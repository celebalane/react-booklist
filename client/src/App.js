import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import BookList from './components/BookList';
import AddBook from './components/AddBook';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

//Apollo config
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0097a7',
    },
    secondary: {
      main: '#26a7b4',
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <ApolloProvider client={ client }>
          <Typography variant="h1" color="primary" className="titre-h1">Liste de lecture</Typography>
          <BookList />
          <AddBook />
        </ApolloProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
