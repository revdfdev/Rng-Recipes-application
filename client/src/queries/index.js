import {gql} from 'apollo-boost';



/* Recipes queries */
export const GET_ALL_RECIPES  = gql`
query {
	getAllRecipes {
		name

		description

		instructions

		category

		likes

		createdDate

	}
}`;



/* Recipes Mutation */

/* User mutation */

export const SIGNUP_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		signUpUser(username: $username, email: $email, password: $password) {
			token
		}
	}`;

export const SIGNIN_USER = gql`
	mutation($username: String!, $password: String!){
		signInUser(username: $username, password: $password) {
			token
		}
	}`;


/* User queries */
export const GET_CURRENT_USER = gql`
	query{
		getCurrentUser {
			username
			joinDate
			email
		}
	}
`;
