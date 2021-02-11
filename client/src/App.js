import './App.scss';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Main from './components/Main';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Alert from './components/Alert';
import AlertContext from './context/alert/alertContext';

function App() {

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache()
  });

  const alertContext = useContext(AlertContext);
  const { msg } = alertContext;

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Container className="position-relative">
          {msg && <Alert message={msg} /> }
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/" component={Main}></Route>
          </Switch>
        </Container>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
