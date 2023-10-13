import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import logoImg from '../assets/logo.png'
import searchImg from '../assets/search.svg'
import favoritesImg from '../assets/favorites.svg'
import CauseList from '../assets/CauseList.json'

const Search = (): JSX.Element => {
	const [searchInput, setSearchInput] = useState('');
	return (
		<>
			<header>
				<nav className='py-6 bg-slate-700 font-ubuntu'>
					<div className='container mx-auto items-center justify-around md:flex md:flex-wrap'>
						<Link to='/'>
							<div className='flex justify-center w-full items-center lg:w-14'>
								<span className='self-center text-2xl text-white font-bold whitespace-nowrap'>
									Charity Finder
								</span>
								<img className='w-10 h-10 mr-3' src={logoImg} />
							</div>
						</Link>
						<div className='drop-shadow-md mt-4 px-4 md:my-auto'>
							<div className='relative'>
								<button
									type='button'
									className='absolute inset-y-0 right-0 flex items-center pr-3.5'
									onClick={() => {
										console.log(searchInput);
									}}
								>
									<img className='w-5 h-5' src={searchImg} />
								</button>
								<input
									type='text'
									list='searchInput'
									className='px-4 py-3 border border-gray-300 rounded-md w-full lg:w-[28rem] hover:outline outline-1 outline-[#32C8BB] focus:outline outline-offset-0'
									placeholder='Find a charity'
									onChange={(e) => {
										if(e.nativeEvent instanceof InputEvent){
											setSearchInput(e.target.value);
										} else {
											location.href=`/search/${e.target.value}`
										}
									}}
								/>
								<datalist id='searchInput'>
									{CauseList.causes.map((cause) => {
										return (
											<option key={cause} value={cause}>
												{cause}
											</option>
										);
									})}
								</datalist>
							</div>
						</div>
						<div className='flex mt-6 justify-center md:my-auto'>
							<Link to='/favorites'>
								<button
									type='button'
									className='space-x-2 items-center border-0 rounded-full p-3 bg-white hover:bg-[#E2E2E2] duration-300'
								>
									<img src={favoritesImg} />
								</button>
							</Link>
						</div>
					</div>
				</nav>
			</header>
			<Outlet />
		</>
	);
};

export default Search;
