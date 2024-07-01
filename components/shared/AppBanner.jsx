import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import markLogo from '../../public/images/mark.svg';
import AppHeader from './AppHeader';

const AppBanner = () => {
  const texts = ["Artificial Intelligence", "Medical Devices", "New Technologies"];
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      setDisplayText((prev) => isDeleting ? prev.slice(0, -1) : texts[index].slice(0, subIndex + 1));
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));

      if (!isDeleting && subIndex === texts[index].length) {
        setIsDeleting(true);
        setSpeed(150);
      } else if (isDeleting && subIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
        setSpeed(150);
      }
    };

    const typingInterval = setInterval(handleTyping, speed);
    return () => clearInterval(typingInterval);
  }, [subIndex, isDeleting, speed, index, texts]);

  return (
    <div
      className='bg-local'
      style={{
        backgroundImage: `url(/images/back1.png)`,
      }}
    >
      <div className='container mx-auto'>
        <AppHeader />
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
          className="flex flex-col items-center mt-20 sm:justify-between sm:flex-row"
        >
          <div className="w-full text-left md:w-3/5">
            <span
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                fontSize: '54px',
                lineHeight: '68px',
                display: 'flex',
                alignItems: 'center',
                textTransform: 'capitalize',
                color: '#2596BE',
              }}
            >
              We Help Create
            </span>
			<div style={{height: '50px'}}>
				<motion.span
					style={{
						fontFamily: 'Helvetica, Arial, sans-serif',
						fontWeight: 600,
						fontSize: '54px',
						lineHeight: '68px',
						display: 'flex',
						alignItems: 'center',
						textTransform: 'capitalize',
						color: '#FFFFFF',
					}}
					animate={{ opacity: 1 }}
				>
					{displayText}
				</motion.span>
			</div>
            <span
              style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontSize: '20px',
                lineHeight: '150%',
                display: 'flex',
                alignItems: 'center',
                color: '#F8F8F8',
              }}
              className='my-5'
            >
              Founded by a group of ambitious Boston area engineering students and faculty, Boston Innovations Corporation stands at the forefront of biomedical technology and innovation.
            </span>
            <button
              style={{
                fontFamily: "Helvetica, Arial, sans-serif",
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
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: '275',
                fontSize: '24px',
                lineHeight: '150%',
                display: 'flex',
                alignItems: 'center',
                marginBottom: '150px',
                color: '#FFFFFF',
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
      </div>
    </div>
  );
}

export default AppBanner;
