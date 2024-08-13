import { useState } from 'react';
import { motion } from 'framer-motion';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import LinkButton from './ButtonLink';
import MenuModal from './MenuModal';
import Link from 'next/link';

function AppHeader() {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeTheme, setTheme] = useThemeSwitcher();

	function toggleMenu() {
		setShowMenu(!showMenu);
	}

	return (
		<motion.nav
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			id="nav"
		>
			<div className="z-10 block px-5 py-6 xl:max-w-screen-xl xl:flex lg:justify-between lg:items-center">
				<MenuModal toggleMenu={toggleMenu} showMenu={showMenu} />
				<div className="items-center justify-center hidden p-5 m-0 mt-5 shadow-lg font-general-medium lg:ml-4 lg:mt-3 xl:flex lg:p-0 lg:shadow-none">
					<LinkButton linkname={"/projects"} title={"Projects"} />
					<LinkButton linkname={"/partners"} title={"Partners"}  />
					<LinkButton linkname={"/company"} title={"Our Company"}/>
					<LinkButton linkname={"/opportunities"} title={"Opportunities"}  />
				</div>
				
				<div className='items-center justify-center hidden p-5 m-0 mt-5 shadow-lg font-general-medium lg:ml-4 lg:mt-3 xl:flex lg:p-0 lg:shadow-none'>
					<LinkButton linkname={""} title={"Log In"} width={70}  />
					<Link href="https://calendly.com/outreach-bostoninnovations/30min" target='_blank' rel="noopener noreferrer">
						<button
							style={{fontFamily: "Helvetica, Arial, sans-serif"}}
							className="
								font-medium
								text-[17px]
								text-[#F8F8F8]
								leading-[20px]
								flex
								justify-center
								items-center
								bg-[#2596BE]
								rounded-[20px]
								px-[41px]
								py-[16px]
								gap-[10px]
								w-auto
								hover:bg-[#1E7BA7] /* Slightly darker shade */
								transition
								duration-300
							"
							aria-label="Book Meeting Button"
						>
							Book Meeting
						</button>
					</Link>
				</div>
			</div>
		</motion.nav>
	);
}

export default AppHeader;
