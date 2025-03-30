import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
const NotFound = () => {
	return (
		<div className="error-container">
		{/* Chap tomondagi matn */}
		<div className="error-text">
			<p className="error-code">404</p>
			<h1 className="error-title">Page not found</h1>
			<p className="error-message">
				We couldn't find the page you were looking for.
			</p>
		</div>

		{/* O'ng tomondagi 404 animatsiya (buttonlar o‘rnida) */}
		<div className="error-animation">
			<h1 className="glitch-text">404</h1>
		</div>
	</div>
	)
}

export default NotFound
