import './App.scss';
import { useContext, Fragment } from 'react';
import Main from './components/Main';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import Alert from './components/Alert';
import AlertContext from './context/alert/alertContext';
import AuthState from './context/auth/AuthState';
import MessageState from './context/message/MessageState';
import DynamicRoute from './util/DynamicRoute';
import { setContext } from '@apollo/client/link/context';

function App() {

  const httpLink = createHttpLink({
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

  const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
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
