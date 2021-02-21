import './App.scss';
import { useContext, Fragment } from 'react';
import Main from './components/Main';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import Alert from './components/Alert';
import AlertContext from './context/alert/alertContext';
import AuthState from './context/auth/AuthState';
import MessageState from './context/message/MessageState';
import DynamicRoute from './util/DynamicRoute';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

function App() {

  let httpLink = createHttpLink({
    uri: 'http://localhost:4000',
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });

  httpLink = authLink.concat(httpLink);

  const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    link: splitLink
  });

  const alertContext = useContext(AlertContext);
  const { msg } = alertContext;

  return (
    <ApolloProvider client={client}>
      <AuthState>
        <MessageState>
          <BrowserRouter>
            <Fragment>
              {msg && <Alert message={msg} /> }
              <Switch>
                <DynamicRoute exact path="/" component={Home} authenticated></DynamicRoute>
                <DynamicRoute path="/" component={Main} guest></DynamicRoute>
              </Switch>
            </Fragment>
          </BrowserRouter>
        </MessageState>
      </AuthState>
    </ApolloProvider>
  );
}

export default App;
