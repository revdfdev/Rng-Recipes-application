import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './index.css';
import App from './components/App';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import withSession from './components/withSession';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
	uri: 'http://localhost:4444/graphql',
	fetchOptions: {
		credentials: 'include'
	},

	request: operation => {
		const token = localStorage.getItem('token');
		operation.setContext({
			headers: {
				authorization: token
			}
		})
	},

	onError: ({ networkError }) => {
		if (networkError) console.log("Network Error", networkError);
		if (networkError.statusCode === 401) localStorage.removeItem('token');
	}
});


const Root = ({refetch}) => (
	<Router>
		<Switch>
			<Route path="/" exact component={App} />
			<Route path="/signin" render={() => <SignIn refetch={refetch}/>} />
			<Route path="/signup" render={() => <SignUp refetch={refetch}/>} />
			<Redirect to="/" />
		</Switch>
	</Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSession />
	</ApolloProvider>, document.getElementById('root'));
