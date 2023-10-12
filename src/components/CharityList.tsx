import { useParams } from 'react-router-dom';
import CharityCard from './CharityCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImg from '../assets/background.jpeg'

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

interface CharityListProps {
	homePage: boolean;
	charityList: Array<Charity>;
}

const CauseList = [
	'aapi-led',
	'adoption',
	'afghanistan',
	'animals',
	'art',
	'athletics',
	'autism',
	'black-led',
	'buddhism',
	'cancer',
	'cats',
	'christianity',
	'climate',
	'conservation',
	'coronavirus',
	'culture',
	'dance',
	'disabilities',
	'disease',
	'dogs',
	'education',
	'environment',
	'filmandtv',
	'food-security',
	'freepress',
	'gender-equality',
	'health',
	'hinduism',
	'housing',
	'humans',
	'hurricane-ian',
	'immigrants',
	'indigenous-led',
	'indigenous-peoples',
	'islam',
	'judaism',
	'justice',
	'latine-led',
	'legal',
	'lgbt',
	'libraries',
	'mental-health',
	'museums',
	'music',
	'oceans',
	'parks',
	'poverty',
	'racial-justice',
	'radio',
	'refugees',
	'religion',
	'research',
	'science',
	'seniors',
	'space',
	'theater',
	'transgender',
	'ukraine',
	'veterans',
	'votingrights',
	'water',
	'wildfires',
	'wildlife',
	'women-led',
	'womens-health',
	'youth',
];

const CharityList = ({ homePage, charityList }: CharityListProps) => {
	const { cause } = useParams();
	const [charityListState, setcharityListState] = useState(charityList);
	const url = `https://partners.every.org/v0.2/search/${
		cause || CauseList[Math.floor(Math.random() * CauseList.length)]
	}?take=${homePage ? 9 : 30}&apiKey=pk_live_48b0d769994acd5e4f7ae3a0761acd58`;

	useEffect(() => {
		axios.get(url).then((res) => {
			setcharityListState(res.data.nonprofits);
		});
	}, []);
	return (
		<>
			{homePage && (
				<div className='pb-4'>
					<div
						className='flex items-center justify-center w-full h-96 bg-cover bg-center'
						style={{ backgroundImage: `url(${backgroundImg})` }}
					>
						<span className='text-center font-prompt tracking-wider text-rose-500 font-bold text-2xl sm:text-5xl'>
							Changing The World Through Kindness
						</span>
					</div>
				</div>
			)}
			<div className='mb-14'>
				<h1 className='pt-8 text-3xl mt-2 font-semibold flex justify-center text-gray-700'>
					{homePage ? 'You May Interest' : 'Search results for: '}
				</h1>
				<div className='px-4 mt-5 grid justify-items-center grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-3 md:px-20'>
					{charityListState.map((charity, idx) => {
						return <CharityCard key={idx} charity={charity} />;
					})}
				</div>
			</div>
		</>
	);
};

export default CharityList;
