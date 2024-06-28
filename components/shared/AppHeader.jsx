import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import HireMeModal from '../HireMeModal';
import logoLight from '../../public/images/logo-light.svg';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';

function AppHeader() {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [activeTheme, setTheme] = useThemeSwitcher();

	function toggleMenu() {
		if (!showMenu) {
			setShowMenu(true);
		} else {
			setShowMenu(false);
		}
	}

	function showHireMeModal() {
		if (!showModal) {
			document
				.getElementsByTagName('html')[0]
				.classList.add('overflow-y-hidden');
			setShowModal(true);
		} else {
			document
				.getElementsByTagName('html')[0]
				.classList.remove('overflow-y-hidden');
			setShowModal(false);
		}
	}

	return (
		<motion.nav
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			id="nav"
			className="sm:container sm:mx-auto"
		>
			{/* Header */}
			<div className="z-10 block max-w-screen-lg py-6 xl:max-w-screen-xl sm:flex sm:justify-between sm:items-center">
				{/* Header menu links and small screen hamburger menu */}
				<div className="flex items-center justify-between px-4 sm:px-0">
					<div>
						<Link href="/">
							<Image
								src={logoLight}
								className="inline w-10 cursor-pointer"
								alt="Logo"
								width={150}
								height={120}
							/>
							<span className='float-right px-2 font-bold' style={{color: "#FFFFFF"}} >
								Boston Innovations<br/>Corporation
							</span>
						</Link>
					</div>
					<div className="sm:hidden">
						<button
							onClick={toggleMenu}
							type="button"
							className="focus:outline-none"
							aria-label="Hamburger Menu"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								className="fill-current h-7 w-7 text-secondary-dark dark:text-ternary-light"
							>
								{showMenu ? (
									<FiX className="text-3xl" />
								) : (
									<FiMenu className="text-3xl" />
								)}
							</svg>
						</button>
					</div>
				</div>

				{/* Header links small screen */}
				<div
					className={
						showMenu
							? 'block m-0 sm:ml-4 sm:mt-3 md:flex px-5 py-3 sm:p-0 justify-between items-center shadow-lg sm:shadow-none'
							: 'hidden'
					}
				>
					<div 
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block mb-2 text-lg font-medium text-left font-poppins text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2">
						<Link href="/projects" aria-label="Projects">
							Projects
						</Link>
					</div>
					<div 
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
						<Link href="/about" aria-label="About Me">
							Partners
						</Link>
					</div>
					<div 
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
						<Link href="/contact" aria-label="Contact">
							Our Company
						</Link>
					</div>
					<div 
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
						<Link href="/contact" aria-label="Contact">
							Log In
						</Link>
					</div>
					<div className="pt-3 border-t-0 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark">
						<button
							style={{fontFamily: "Poppins",
									fontWeight: 500,
									fontSize: "17px",
									color: "#F8F8F8",
									lineHeight: "20px",
									display: "flex",
									background: "#2596BE",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: "20px",
									border: "1px solid #2596BE",
									padding: "16px 41px",
									gap: "10px",
									width: "193px",
							}}
							className="block w-24 px-4 py-2 text-left text-white duration-300 bg-indigo-500 rounded-sm shadow-sm font-general-medium sm:hidden text-md hover:bg-indigo-600"
							aria-label="Book Meeting Button"
						>
							Book Meeting
						</button>
					</div>
				</div>

				{/* Header links large screen */}
				<div className="items-center justify-center hidden p-5 m-0 mt-5 shadow-lg font-general-medium sm:ml-4 sm:mt-3 sm:flex sm:p-0 sm:shadow-none">
					<div
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2"
						aria-label="Projects"
					>
						<Link href="/projects">Projects</Link>
					</div>
					<div
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2"
						aria-label="About Me"
					>
						<Link href="/about">Partners</Link>
					</div>

					<div
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2"
						aria-label="Contact"
					>
						<Link href="/contact">Our Company</Link>
					</div>

					<div
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2"
						aria-label="Contact"
					>
						<Link href="/contact">Opportunities</Link>
					</div>
				</div>
				<div className="items-center justify-center hidden p-5 m-0 mt-5 shadow-lg font-general-medium sm:ml-4 sm:mt-3 sm:flex sm:p-0 sm:shadow-none">
					<div
						style={{fontFamily: "Poppins", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2"
						aria-label="Contact"
					>
						<Link href="/login">Log In</Link>
					</div>
					<div className="pt-3 border-t-2 sm:pt-0 sm:border-t-0 border-primary-light dark:border-secondary-dark">
						<button
							style={{fontFamily: "Poppins",
									fontWeight: 500,
									fontSize: "17px",
									color: "#F8F8F8",
									lineHeight: "20px",
									display: "flex",
									background: "#2596BE",
									justifyContent: "center",
									alignItems: "center",
									borderRadius: "20px",
									border: "1px solid #2596BE",
									padding: "16px 41px",
									gap: "10px",
									width: "193px",
									top: "calc(50%-52px/2)"
							}}
							className="block w-24 px-4 py-2 text-left text-white duration-300 bg-indigo-500 rounded-sm shadow-sm font-general-medium sm:hidden text-md hover:bg-indigo-600"
							aria-label="Book Meeting Button"
						>
							Book Meeting
						</button>
					</div>
				</div>

				{/* Header right section buttons */}
				{/* <div className="flex-col items-center justify-between hidden sm:flex md:flex-row">
					<div className="hidden md:flex">
						<button
							onClick={showHireMeModal}
							className="text-md font-general-medium bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm rounded-md px-5 py-2.5 duration-300"
							aria-label="Book Meeting Button"
						>
							Book Meeting
						</button>
					</div>
				</div> */}
			</div>
			<div>
				{showModal ? (
					<HireMeModal
						onClose={showHireMeModal}
						onRequest={showHireMeModal}
					/>
				) : null}
				{showModal ? showHireMeModal : null}
			</div>
		</motion.nav>
	);
}

export default AppHeader;
