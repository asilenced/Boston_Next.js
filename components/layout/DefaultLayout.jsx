import { useState, useEffect } from 'react';
import PagesMetaHead from '../PagesMetaHead';
import loading from '../../public/images/loading.svg';
import period from '../../data/const';
import Image from 'next/image';
import Footer from '../shared/Footer';

const DefaultLayout = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	  const timer = setTimeout(() => {
		setIsLoading(false);
	  }, period);
	  return () => clearTimeout(timer);
	}, []);
	
	return (
		<div className='min-h-screen bg-primary-dark' style={{padding: 0, margin: 0, fontFamily: 'Helvetica, Arial, sans-serif'}}>
			<PagesMetaHead />
				{isLoading ? (
					<div class="loading-container flex justify-center items-center h-screen">
						<Image src={loading} className='sm:w-[200px] sm:h-[200px] w-[100px] h-[100px]' alt="Loading" />
					</div>
					) : (
					<>
					<div>
						{children}
					</div>
					<Footer />
					</>
					)
				}
		</div>
	);
};

export default DefaultLayout;
