import { LogIn, Menu, UserPlus } from 'lucide-react'
import React from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Error from './page/error'
import Menyu from './page/menu'
import Kurslar from './page/Kurs/index'
import Register from './page/login/index.jsx'

function App() {
	return (
		<>
			<Router>
				<header className='site-header'>
					<div className='container'>
						<Link className='link' to='/'>
							{' '}
							<a className='animated-title' href='#' data-text='Awesome'>
								<span className='default-text'>&nbsp;Online_Academy&nbsp;</span>
								<span aria-hidden='true' className='hover-effect'>
									&nbsp;Online&nbsp;
								</span>
							</a>
						</Link>

						<nav className='nav'>
							<Link to='/'>Home</Link>
							<Link to='/kurslar'>Kurslar</Link>
							<a href='#'>Aloqa</a>
						</nav>

						<div className='auth-buttons'>
							<Link className='link' to='/register'>
								<button className='login-btn'>
									<LogIn className='icon' /> Kirish
								</button>
							</Link>

							<Link className='link' to='/register'>
								<button className='signup-btn'>
									<UserPlus className='icon' /> Ro‘yxatdan o‘tish
								</button>
							</Link>
						</div>
					</div>
				</header>
				<main>
					<Routes>
						<Route path='/' element={<Menyu />} />
						<Route path='/kurslar' element={<Kurslar />} />
						<Route path='/register' element={<Register />} />
						<Route path='*' element={<Error />} />
					</Routes>
				</main>
			</Router>
		</>
	)
}

export default App
