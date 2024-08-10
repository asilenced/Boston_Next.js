import PagesMetaHead from '../PagesMetaHead';

const DefaultLayout = ({ children }) => {
	return (
		<div className='min-h-screen bg-primary-dark' style={{background: "black", padding: 0, margin: 0, fontFamily: 'Helvetica, Arial, sans-serif'}}>
			<PagesMetaHead />
				<div>
					{children}
				</div>
		</div>
	);
};

export default DefaultLayout;
