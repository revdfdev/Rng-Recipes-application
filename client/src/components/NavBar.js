import React, {Fragment} from 'react';
import {NavLink} from 'react-router-dom';

const NavBar = ({session}) => (
	<nav>
		{session && session.getCurrentUser ? <NavBarAuth session={session} /> : <NavBarUnAuth />}
	</nav>
);

const NavBarAuth = ({session}) => (
	<Fragment>
	<ul>
		<li>
			<NavLink to="/" exact>Home</NavLink>
		</li>
		<li>
			<NavLink to="/search">Search</NavLink>
		</li>
		<li>
			<NavLink to="/recipe/add">Add Recipe</NavLink>
		</li>
		<li>
			<NavLink to="/profile">Profile</NavLink>
		</li>
		<li>
			<button>Sign out</button>
		</li>
	</ul>
	<h4>Welcome, <strong>{session.getCurrentUser.username}</strong></h4>
	</Fragment>
);

const NavBarUnAuth = () => (
	<ul>
		<li>
			<NavLink to="/" exact>Home</NavLink>
		</li>
		<li>
			<NavLink to="/search">Search</NavLink>
		</li>
		<li>
			<NavLink to="/signin">Sign In</NavLink>
		</li>
		<li>
			<NavLink to="/signup">Sign Up</NavLink>
		</li>
	</ul>
);



export default NavBar;
