import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import DefaultLayout from '../components/layout/DefaultLayout';
import UseScrollToTop from '../hooks/useScrollToTop';

function MyApp({ Component, pageProps }) {
	return (
		<AnimatePresence>
			<div className="transition duration-300 bg-secondary-light dark:bg-primary-dark">
				<DefaultLayout>
					<Component {...pageProps} />
				</DefaultLayout>
				<UseScrollToTop />
			</div>
		</AnimatePresence>
	);
}

export default MyApp;