import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import '../App.css';
import {Mutation} from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';

const initialState = {
	username: "",
	email: "",
	password: "",
	confirmpassword: ""
};

class SignUp extends Component {
	

	state = {...initialState};

	constructor(props) {
		super(props);
	}

	componentWillMount() {
	
	}

	componentWillUnmount() {
	}

	clearState = () => {
		this.setState({...initialState});
	}

	validateForm = () => {
		const  {username, email, password, confirmpassword} = this.state;

		const isInvalid = !username || !email || !password  || password !== confirmpassword;
		return isInvalid;
	}

	handleChange = e => {
		e.preventDefault();
		const { name, value } = e.target;
		console.log("Name: " + name  + " Value : " + value);
		this.setState({
			[name]: value
		});
	};

	handleSubmit = (e, signUpUser) => {
		e.preventDefault();
		signUpUser().then(async ({data}) => {
			console.log(data);
			localStorage.setItem('token', data.signUpUser.token);
			await this.props.refetch();
			this.clearState();
			this.props.history.push('/')
		});
	};

	render() {

		const {username, email, password, confirmpassword} = this.state;

		return (
			<div className="App">
				<h2 className="App">Sign up</h2>
				<Mutation mutation={SIGNUP_USER} variables={{
					username: username,
					email: email,
					password: password
				}}> 
				{
					(signUpUser, {data, loading, error}) => {
					return (
						<form className="form" onSubmit={e => this.handleSubmit(e, signUpUser)}>
							<input type="text" name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
							<input type="email" name="email" placeholder="Email" value={email} onChange={this.handleChange} />
							<input type="password" name="password" placeholder="Password" value={password} onChange={this.handleChange} />
							<input type="password" name="confirmpassword" placeholder="Confirm Password" value={confirmpassword} onChange={this.handleChange} />
							<button type="submit" disabled={loading | this.validateForm()} className="button-primary">Submit</button>
							{error && <Error error={error}/>}
						</form>
						);
					}
				}
				</Mutation>
			</div>
		);
	}
}
export default withRouter(SignUp);
