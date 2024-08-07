import Footer from '../shared/Footer';
import PagesMetaHead from '../PagesMetaHead';

const DefaultLayout = ({ children }) => {
	return (
		<div style={{background: "black", padding: 0, margin: 0, fontFamily: 'Helvetica, Arial, sans-serif'}}>
			<PagesMetaHead />
				<div>
					{children}
				</div>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
