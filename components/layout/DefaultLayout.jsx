import { useState, useEffect } from 'react';
import Footer from '../shared/Footer';
import PagesMetaHead from '../PagesMetaHead';
import period from '../../data/const';

const DefaultLayout = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true);
	
	useEffect(() => {
		const timer = setTimeout(() => {
		  setIsLoading(false);
		}, period);
		return () => clearTimeout(timer);
	}, []);
	
	return (
		<div className='dark:bg-primary-dark' style={{padding: 0, margin: 0, fontFamily: 'Helvetica, Arial, sans-serif'}}>
			<PagesMetaHead />
				<div>
					{children}
				</div>
			{ !isLoading ? <Footer /> : '' }
		</div>
	);
};

export default DefaultLayout;
