import CharityCard from './CharityCard';

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

interface FavoritesCharitiesProps {
	favorites: Array<Charity>;
}

const FavoriteCharities = ({
	favorites,
}: FavoritesCharitiesProps): JSX.Element => {
	return (
		<>
			<div className='container mx-auto'>
				<h1 className='text-3xl pt-10 pl-6 tracking-wide font-semibold text-gray-800'>
					Favorites:
				</h1>
				<div className='w-full flex justify-center'>
					{favorites.length > 0 ? (
						<div className='px-4 mt-5 grid justify-items-center grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-3 md:px-20'>
							{favorites.map((charity, idx) => {
								return <CharityCard key={idx} charity={charity} />;
							})}
						</div>
					) : (
						<span className='text-xl font-semibold text-gray-400'>
							No favorites yet
						</span>
					)}
				</div>
			</div>
		</>
	);
};

export default FavoriteCharities;
