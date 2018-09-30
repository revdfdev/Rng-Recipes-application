import React, {Component} from 'react';
import '../App.css';
import {Mutation} from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import {withRouter} from 'react-router-dom';
import Error from '../Error';


const initialState = {
	username: "",
	password: ""
}

class SignIn extends Component {

	state = {...initialState}

	clearState = () => {
		this.setState({...initialState});
	}

	validateForm = () => {
		const {username, password} = this.state;
		const isInvalid = !username || !password;
		return isInvalid;
	}

	handleChange = e => {
		e.preventDefault();
		const {name, value} = e.target;
		console.log("Name:  " + name + "Value: " + value);
		this.setState({
			[name]: value
		})
	};

	handleSubmit = (e, signInUser) => {
		e.preventDefault();
		signInUser().then(async ({data}) => {
			localStorage.setItem('token', data.signInUser.token);
			await this.props.refetch();
			this.clearState();
			this.props.history.push('/');
		});
	};

	constructor(props){
		super(props);
	}


	componentWillMount() {
	}

	componentWillUnMount() {
	}


	render() {
		const {username, password} = this.state;
		return (
			<div className="App">
				<h2 className="App">Sign In</h2>
				<Mutation mutation={SIGNIN_USER} variables={{
					username: username,
					password: password
				}}>
					{
						(signInUser, {data, loading, error}) => {
							return (
								<form className="form" onSubmit={e => this.handleSubmit(e, signInUser)}>
									<input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange} />
									<input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
									<button type="submit" disabled={loading | this.validateForm()} className="button-primary">Login In</button>
									{error && <Error error={error} />}
								</form>
							);
						}
					}
				</Mutation>
			</div>
		);
	}
}

export default withRouter(SignIn);
