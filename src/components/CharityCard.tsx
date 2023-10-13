import { Link } from 'react-router-dom';
import charityLogo from '../assets/charitylogo.svg';
import locaionLogo from '../assets/location.svg';

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

interface CharityCardProps {
	charity: Charity;
}

const CharityCard = ({ charity }: CharityCardProps) => {
	return (
		<Link
			className='mt-5 px-5 py-5 w-full rounded-md bg-white shadow-lg hover:bg-[#a3a3a3]'
			to={`/charity/${charity.name}`}
		>
			<span className='flex items-center text-lg font-semibold'>
				<img
					className='mr-3 w-12 h-12 rounded-full'
					src={charity.logoUrl || charityLogo}
				/>
				{charity.name}
			</span>
			<div className='w-full my-3 border-b border-gray-300'></div>
			<span className='flex items-center'>
				<img className='mr-2 w-5 h-5' src={locaionLogo} />
				<div>{charity.location || 'No location provided'}</div>
			</span>
		</Link>
	);
};

export default CharityCard;
