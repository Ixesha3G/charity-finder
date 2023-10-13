import CharityDetail from './components/CharityDetail';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import FavoriteCharities from './components/FavoriteCharities';
import { useEffect, useState } from 'react';
import CharityList from './components/CharityList';
import { Charity } from './interfaces/Charity'

const NotFound = () => {
	const style = {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		color: 'red',
	};

	return (
		<div style={style}>
			<h1>404 - Not Found</h1>
		</div>
	);
};

function App() {
	const [favorites, setFavorites] = useState<Charity[]>([]);

	useEffect(() => {
		const storedFavorites = JSON.parse(
			localStorage.getItem('favorites') || '[]'
		);
		setFavorites(storedFavorites);
	}, []);

	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<Search />}>
						<Route index element={<Home />} />
						<Route
							path={`/charity/:id`}
							element={
								<CharityDetail
									favorites={favorites}
									setFavorites={setFavorites}
								/>
							}
						/>
						<Route
							path='/favorites'
							element={<FavoriteCharities favorites={favorites} />}
						/>
						<Route
							path={`/search/:cause`}
							element={<CharityList homePage={false} charityList={[]} />}
						/>
					</Route>
					<Route path='*' element={<NotFound />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
