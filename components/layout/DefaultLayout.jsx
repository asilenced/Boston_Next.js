import Footer from '../shared/Footer';
import PagesMetaHead from '../PagesMetaHead';
import loading from '../../public/images/loading.svg';

const DefaultLayout = ({ children }) => {
	return (
		<div className='dark:bg-primary-dark' style={{padding: 0, margin: 0, fontFamily: 'Helvetica, Arial, sans-serif'}}>
			<PagesMetaHead />
				<div>
					{children}
				</div>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
