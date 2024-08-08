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
				{/* <div className="flex items-center justify-between xl:px-0">
					<Link href="/">
					<div className="flex flex-row lg:w-[250px]">
						<Image
							src={logoLight}
							className="inline w-10 cursor-pointer"
							alt="Logo"
							width={150}
							height={120}
						/>
						<span className='hidden float-right px-2 font-bold sm:block' style={{color: "#FFFFFF", fontFamily: 'Helvetica, Arial, sans-serif'}} >
							Boston Innovations<br/>Corporation
						</span>
					</div>
					</Link>
					<div className="xl:hidden">
						<button
							onClick={toggleMenu}
							type="button"
							className="focus:outline-none"
							aria-label="Hamburger Menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="fill-current h-7 w-7 text-secondary-light dark:text-ternary-light"
							>
								{showMenu ? (
									<FiX className="text-3xl" />
								) : (
									<FiMenu className="text-3xl" />
								)}
							</svg>
						</button>
					</div>
				</div> */}

				<MenuModal toggleMenu={toggleMenu} showMenu={showMenu} />
				<div className="items-center justify-center hidden p-5 m-0 mt-5 shadow-lg font-general-medium lg:ml-4 lg:mt-3 xl:flex lg:p-0 lg:shadow-none">
					<LinkButton linkname={"/projects"} title={"Projects"} />
					<LinkButton linkname={"/partners"} title={"Partners"}  />
					<LinkButton linkname={"/company"} title={"Our Company"}/>
					<LinkButton linkname={"/opportunities"} title={"Opportunities"}  />
				</div>
				
				<div className='items-center justify-center hidden p-5 m-0 mt-5 shadow-lg font-general-medium lg:ml-4 lg:mt-3 xl:flex lg:p-0 lg:shadow-none'>
					<LinkButton linkname={""} title={"Log In"} width={70}  />
					<Link href="https://calendly.com/nicholasirving-v_v1/30min" target='_blank' rel="noopener noreferrer">
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
