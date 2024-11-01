import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import markLogo from '../../public/images/mark.svg';
import AppHeader from './AppHeader';
import Link from 'next/link';

const AppBanner = () => {
  const [phone, setPhone] = useState(0);
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

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if(window.innerWidth < 1024) setPhone(1);
    return () => {
      window.removeEventListener('resize', handleResize, true);
    }
  }, []);

  const handleResize = (event) => {
    if(event.target.innerWidth < 1024) {
      setPhone(1);
    }
    else setPhone(0);
  }

  return (
    <div className='bg-primary-dark'>
        <div
        className='bg-local'
        style={{
          backgroundImage: `url(/images/back1.jpg)`,
        }}
      >
        <div className='container mx-auto'>
          <AppHeader />
        </div>
        <>
        { !phone ? <div className='container mx-auto'>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            className="flex flex-col items-center lg:mt-20 sm:justify-between lg:flex-row"
          >
          <div
            className="flex flex-col items-center lg:mt-20 sm:justify-between lg:flex-row"
          >
            <div className="w-full lg:pl-15 lg:w-3/5">
              <span
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  textTransform: 'capitalize',
                  color: '#2596BE',
                }}
                className='text-2xl lg:text-6xl'
              >
                We Help Create
              </span>
              <div className='h-[40px] lg:h-[110px]'>
                <motion.span
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                  }}
                  animate={{ opacity: 1 }}
                  className='text-2xl lg:text-6xl'
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
                className='my-5 w-full lg:w-[90%]'
              >
                Founded by a group of ambitious Boston area engineering students and faculty, Boston Innovations Corporation stands at the forefront of biomedical technology and innovation.
              </span>
              <Link href='/company'>
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
                  mb-5
                "
                aria-label="Book Meeting Button"
              >
                Learn More
              </button>
              </Link>
              <span
                className='lg:mb-[150px] mb-10'
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: '275',
                  fontSize: '24px',
                  lineHeight: '150%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#FFFFFF',
                }}
              >
                2024 MIT & Harvard Biotech<br />Group scholarship winner
              </span>
            </div>
            <div className="self-start mx-auto mt-0 mb-10 lg:mb-0">
              <Image
                src={markLogo}
                className="self-start inline w-30"
                alt="Logo"
                width={400}
                height={400}
              />
            </div>
          </div>
          </motion.section>
        </div>
        :
        <div>
          <div className='container mx-auto'>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            className="flex flex-col items-center lg:mt-20 sm:justify-between lg:flex-row"
          >
            <div className="w-full lg:pl-15 lg:w-3/5">
              <span
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  textTransform: 'capitalize',
                  color: '#2596BE',
                }}
                className='text-2xl lg:text-6xl'
              >
                We Help Create
              </span>
              <div className='h-[40px] lg:h-[110px]'>
                <motion.span
                  style={{
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    textTransform: 'capitalize',
                    color: '#FFFFFF',
                  }}
                  animate={{ opacity: 1 }}
                  className='text-2xl lg:text-6xl'
                >
                  {displayText}
                </motion.span>
              </div>
              
            <div className="flex justify-center mt-5 mb-10">
              <Image
                src={markLogo}
                alt="Logo"
                width={400}
                height={400}
              />
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
                className='my-5 w-full lg:w-[90%]'
              >
                Founded by a group of ambitious Boston area engineering students and faculty, Boston Innovations Corporation stands at the forefront of biomedical technology and innovation.
              </span>
              <Link href='/company'>
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
                  mb-5
                "
                aria-label="Book Meeting Button"
              >
                Learn More
              </button>
              </Link>
              <span
                className='lg:mb-[150px] mb-10'
                style={{
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: '275',
                  fontSize: '24px',
                  lineHeight: '150%',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#FFFFFF',
                }}
              >
                2024 MIT & Harvard Biotech<br />Group scholarship winner
              </span>
            </div>
          </motion.section>
        </div>
        </div>
        }
        </>
        </div>
    </div>
  );
}

export default AppBanner;
