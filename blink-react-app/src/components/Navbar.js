import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Navbar() {
	return (
		<div className="navbar">
			<div className="navbar-container">
				<Link to="/drugs/search" className="take-home">Blink Takehome</Link>
			</div>
		</div>
	);
}

export default Navbar; 