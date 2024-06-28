import AppHeader from '../shared/AppHeader';
import AppFooter from '../shared/AppFooter';
import Footer from '../shared/Footer';
import PagesMetaHead from '../PagesMetaHead';
import back1 from '../../public/images/back1.png';

const DefaultLayout = ({ children }) => {
	return (
		<div  style={{background: "black"}}>
			<PagesMetaHead />
			<div className='bg-local' style={{backgroundImage: `url(/images/back1.png)`}}> 
				<AppHeader />
				<div>
					{children}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
