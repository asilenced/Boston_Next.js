import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDownCircle } from 'react-icons/fi';
import useThemeSwitcher from '../../hooks/useThemeSwitcher';
import markLogo from '../../public/images/mark.svg'

function AppBanner() {

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="flex flex-col items-center mt-20 sm:justify-between sm:flex-row"
		>
			<div className="w-full text-left md:w-3/5">
				{/* <motion.h1
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{
						ease: 'easeInOut',
						duration: 0.9,
						delay: 0.1,
					}}

					className="text-2xl text-center font-general-semibold lg:text-3xl xl:text-4xl sm:text-left text-ternary-dark dark:text-primary-light"
				>
					We Help Create
				</motion.h1> */}
				<span
					style={{
						left: "10px",
						top: "86px",

						fontFamily: 'Poppins',
						fontStyle: "normal",
						fontWeight: "600",
						fontSize: "54px",
						lineHeight: "68px",
						display: "flex",
						alignItems: "center",
						textTransform: "capitalize",
						color: "#2596BE",
					}}
				>
					We Help Create
				</span>
				<span
					style={{
						left: "10px",
						top: "145px",
						fontFamily: 'Poppins',
						fontStyle: "normal",
						fontWeight: "600",
						fontSize: "54px",
						lineHeight: "68px",
						display: "flex",
						alignItems: "center",
						textTransform: "capitalize",
						color: "#FFFFFF",
					}}
				>
					Artificial Intelligence
				</span>
				<span
					style={{
						left: "13px",
						top: "226px",

						fontFamily: 'Poppins',
						fontStyle: "normal",
						fontWeight: "500",
						fontSize: "20px",
						lineHeight: "150%",
						display: "flex",
						alignItems: "center",
						color: "#F8F8F8",
					}}
					className='my-5'
				>
					Founded by a group of ambitious Boston area engineering students and faculty, Boston Innovations Corporation stands at the forefront of biomedical technology and innovation.
				</span>
				<button
					style={{
						fontFamily: "Poppins",
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
						width: "193px",
						top: "calc(50%-52px/2)"
					}}
					className="px-4 py-2 my-5 text-left text-white duration-300 bg-indigo-500 rounded-sm shadow-sm 24 myblock font-general-medium sm:hidden text-md hover:bg-indigo-600"
					aria-label="Learn More Button"
				>
					Learn More
				</button>
				<span
					style={{
						fontFamily: 'Poppins',
						fontStyle: "normal",
						fontWeight: "275",
						fontSize: "24px",
						lineHeight: "150%",
						/* or 36px */
						display: "flex",
						alignItems: "center",
						marginBottom: "150px",
						color: "#FFFFFF",
					}}
				>
					2024 MIT & Harvard Biotech<br />Group scholarship winner
				</span>
			</div>
			<div className='self-start'>
				<Image
					src={markLogo}
					className="self-start inline w-30"
					alt="Logo"
					width={400}
					height={400}
				/>
			</div>
		</motion.section>
	);
}

export default AppBanner;
