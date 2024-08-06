import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import logoLight from '../../public/images/logo-light.svg';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import LinkButton from './ButtonLink';

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
			<div className="z-10 block max-w-screen-lg px-10 py-6 xl:max-w-screen-xl lg:flex lg:justify-between lg:items-center">
				<div className="flex items-center justify-between px-4 lg:px-0">
					<div>
						<Link href="/">
							<Image
								src={logoLight}
								className="inline w-10 cursor-pointer"
								alt="Logo"
								width={150}
								height={120}
							/>
							<span className='float-right px-2 font-bold' style={{color: "#FFFFFF", fontFamily: 'Helvetica, Arial, sans-serif'}} >
								Boston Innovations<br/>Corporation
							</span>
						</Link>
					</div>
					<div className="lg:hidden">
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
				</div>

				<div
					className={
						showMenu
							? 'block m-0 lg:ml-4 lg:mt-3 lg:flex px-5 py-3 lg:p-0 justify-between items-center shadow-lg lg:shadow-none'
							: 'hidden'
					}
				>
					<div 
						style={{fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light lg:mx-4 lg:py-2">
						<Link href="/projects" aria-label="Projects">
							Projects
						</Link>
					</div>
					<div 
						style={{fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light lg:mx-4 lg:py-2 lg:pt-2 lg:border-t-0 border-primary-light dark:border-secondary-dark">
						<Link href="/partners" aria-label="Partners">
							Partners
						</Link>
					</div>
					<div 
						style={{fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light lg:mx-4 lg:py-2 lg:pt-2 lg:border-t-0 border-primary-light dark:border-secondary-dark">
						<Link href="/company" aria-label="Our Company">
							Our Company
						</Link>
					</div>
					<div 
						style={{fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light lg:mx-4 lg:py-2 lg:pt-2 lg:border-t-0 border-primary-light dark:border-secondary-dark">
						<Link href="/opportunities" aria-label="Opportunities">
							Opportunities
						</Link>
					</div>
					<div 
						style={{fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 500, fontSize: "17px", color: "#FFFFFF", lineHeight: "20px"}}
						className="block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light lg:mx-4 lg:py-2 lg:pt-2 lg:border-t-0 border-primary-light dark:border-secondary-dark">
						<Link href="" aria-label="login">
							Log In
						</Link>
					</div>
					<div className="pt-3 border-t-0 lg:pt-0 lg:border-t-0 border-primary-light dark:border-secondary-dark">
						<button
							style={{fontFamily: "Helvetica, Arial, sans-serif",
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
									width: "auto",
							}}
							className="block w-24 px-4 py-2 text-left text-white duration-300 rounded-sm shadow-sm font-general-medium lg:hidden text-md"
							aria-label="Book Meeting Button"
						>
							Book Meeting
						</button>
					</div>
				</div>

				<div className="items-center justify-center hidden p-5 m-0 mt-5 shadow-lg font-general-medium lg:ml-4 lg:mt-3 lg:flex lg:p-0 lg:shadow-none">
					<LinkButton linkname={"/projects"} title={"Projects"} />
					<LinkButton linkname={"/partners"} title={"Partners"} />
					<LinkButton linkname={"/company"} title={"Our Company"} />
					<LinkButton linkname={"/opportunities"} title={"Opportunities"} />
					<LinkButton linkname={""} title={"Log In"} />
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
				</div>
			</div>
		</motion.nav>
	);
}

export default AppHeader;
