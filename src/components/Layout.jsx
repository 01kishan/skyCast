import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext }  from '../context/ThemeProvider';


const Layout = () => {
	const { theme } = useContext(ThemeContext);
	return (
		<div className={`${theme === 'light' ? "bg-gradient-to-r from-indigo-400 to-cyan-400" : "bg-gray-800"}  text-white`}>
			<NavBar />
			<div className="mt-12">
				<Outlet />
			</div>
			<Footer />
		</div>
	)
}

export default Layout;