import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import './index.css';
import App from './components/App';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Search from './components/recipes/Search';
import AddRecipe from './components/recipes/AddRecipe';
import Profile from './components/profile/Profile';
import withSession from './components/withSession';
import NavBar from './components/NavBar';

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


const Root = ({refetch, session}) => (
	<Router>
		<Fragment>
		<NavBar session={session}/>
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/signin" render={() => <SignIn refetch={refetch}/>} />
				<Route path="/signup" render={() => <SignUp refetch={refetch}/>} />
				<Route path="/search" render={() => <Search refetch={refetch}/>} />
				<Route path="/recipe/add" render={() => <AddRecipe refetch={refetch}/>} />
				<Route path="/profile" render={() => <Profile refetch={refetch}/>} />
				<Redirect to="/" />
			</Switch>
		</Fragment>	
	</Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSession />
	</ApolloProvider>, document.getElementById('root'));
