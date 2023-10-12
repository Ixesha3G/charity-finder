import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import locaionLogo from '../assets/location.svg'

interface Charity {
	coverImageUrl: string;
	description: string;
	ein: number;
	location: string;
	logoCloudinaryId: string;
	logoUrl: string;
	matchedTerms: Array<string>;
	name: string;
	profileUrl: string;
	slug: string;
	tags: Array<string>;
}

interface CharityDetailProps {
	favorites: Array<Charity>;
	setFavorites: (charity: Array<Charity>) => void;
}

const CharityDetail = ({
	favorites,
	setFavorites,
}: CharityDetailProps): JSX.Element => {
	const { id } = useParams();
	const [charityDetail, setCharityDetail] = useState<Charity[]>([]);
	const [favoriteFlag, setFavoritesFlag] = useState(false);

	function handleFavorites() {
		if (favoriteFlag) {
			setFavorites(
				favorites.filter((favorite) => {
					return favorite.ein !== charityDetail[0].ein;
				})
			);
			localStorage.setItem(
				'favorites',
				JSON.stringify(
					favorites.filter((favorite) => {
						return favorite.ein !== charityDetail[0].ein;
					})
				)
			);
		} else {
			setFavorites([...favorites, charityDetail[0]]);
			localStorage.setItem(
				'favorites',
				JSON.stringify([...favorites, charityDetail[0]])
			);
		}
		setFavoritesFlag(!favoriteFlag);
	}

	useEffect(() => {
		axios
			.get(
				`https://partners.every.org/v0.2/search/${id}?take=1&apiKey=pk_live_48b0d769994acd5e4f7ae3a0761acd58`
			)
			.then((res) => {
				setCharityDetail(res.data.nonprofits);
				const storedFavorites = JSON.parse(
					localStorage.getItem('favorites') || '[]'
				);
				if (
					storedFavorites.find((favorite: Charity) => {
						return favorite.ein === res.data.nonprofits[0].ein;
					}) !== undefined
				) {
					setFavoritesFlag(true);
				}
			});
	}, [id]);

	return (
		<div className='justify-center mb-8 px-4 mt-10'>
			<div className='rounded-md shadow-md p-3'>
				<div className='flex justify-center items-center'>
					<img
						className='rounded-t-lg'
						src={
							(charityDetail.length && charityDetail[0].coverImageUrl) ||
							undefined
						}
					/>
				</div>
				<div className='p-8'>
					<div className='flex justify-between'>
						<div>
							<h1 className='flex items-center text-3xl tracking-wide font-semibold text-gray-800'>
								<img
									className='mr-3 mb-3 rounded-full md:mb-0'
									src={
										(charityDetail.length && charityDetail[0].logoUrl) ||
										undefined
									}
								/>
								{charityDetail.length && charityDetail[0].name}
							</h1>
						</div>
						<div className='flex items-center'>
							<a
								className='px-2'
								href={
									(charityDetail.length && charityDetail[0].profileUrl) ||
									undefined
								}
							>
								<button className='px-4 py-3 w-full bg-emerald-800 rounded-3xl text-white font-bold hover:bg-emerald-950 duration-300'>
									Check it in Every.org
								</button>
							</a>
							<a className='pl-2'>
								{favoriteFlag ? (
									<button
										className='px-4 py-3 w-full bg-[#F14040] rounded-3xl text-white font-bold hover:bg-[#D31616] duration-300'
										onClick={() => {
											handleFavorites();
										}}
									>
										Remove from favorites
									</button>
								) : (
									<button
										className='px-4 py-3 w-full bg-[#4081f1] rounded-3xl text-white font-bold hover:bg-[#2873f3] duration-300'
										onClick={() => {
											handleFavorites();
										}}
									>
										Add to favorites
									</button>
								)}
							</a>
						</div>
					</div>
					<div className='flex items-center my-6'>
						<img className='mr-2 w-5 h-5' src={locaionLogo} />
						<div>{charityDetail.length && charityDetail[0].location}</div>
					</div>
					<div className='w-full'>
						<p className='text-fit'>
							{charityDetail.length && charityDetail[0].description}
						</p>
					</div>
					<div className='pt-6 flex items-center'>
						<span className='font-semibold text-lg pr-3'>Tags:</span>
						<div className='flex'>
							{charityDetail.length &&
								charityDetail[0].tags.map((tag, idx) => {
									return (
										<a
											key={idx}
											className='bg-slate-500 text-white px-2 py-2 m-2 rounded-3xl shadow-md hover:bg-slate-600 duration-300'
											href={
												(charityDetail.length &&
													`/search/${charityDetail[0].tags[idx]}`) ||
												undefined
											}
										>
											{tag}
										</a>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CharityDetail;
