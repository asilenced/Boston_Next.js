import Link from 'next/link';
import logoLight from '../../public/images/logo-light.svg';
import { FiX, FiMenu } from 'react-icons/fi';
import Image from 'next/image';
import HeaderButton from './HeaderButton';

const MenuModal = ({ showMenu, toggleMenu }) => {
  return (
    <div>
      <div className={`flex items-center justify-between xl:px-0 ${showMenu ? 'hidden' : 'block'} xl:flex`}>
        <Link href="/">
          <div className="flex flex-row lg:w-[250px]">
            <Image
              src={logoLight}
              className="inline w-10 cursor-pointer"
              alt="Logo"
              width={150}
              height={120}
            />
            <span className="hidden float-right px-2 font-bold sm:block" style={{ color: "#FFFFFF", fontFamily: 'Helvetica, Arial, sans-serif' }} >
              Boston Innovations<br />Corporation
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
      </div>

      <div
        className={`absolute h-[100%] top-0 left-0 bg-[#061927] w-auto right-0 opacity-95 p-5 shadow-lg rounded-lg ${
          showMenu ? 'block' : 'hidden'
        } xl:hidden`}
         style = {{ boxShadow: "0 2px 4px #00000080"}}
      >
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex flex-row w-[250px]">
              <Image
                src={logoLight}
                className="inline w-10 cursor-pointer"
                alt="Logo"
                width={150}
                height={120}
              />
              <span className='hidden float-right px-2 font-bold sm:block' style={{ color: "#FFFFFF", fontFamily: 'Helvetica, Arial, sans-serif' }} >
                Boston Innovations<br />Corporation
              </span>
            </div>
          </Link>
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
              <FiX className="text-3xl" />
            </svg>
          </button>
        </div>
        {['Projects', 'Partners', 'Our Company', 'Opportunities', 'Log In', 'Book Meeting'].map((title, index) => (
            <>
            { 
              title === 'Projects' ? <Link href={'projects'} aria-label={title}><HeaderButton title={title} index={index} /></Link> : 
              title === 'Partners' ? <Link href={'partners'} aria-label={title}><HeaderButton title={title} index={index} /></Link> : 
              title === 'Our Company' ? <Link href={'company'} aria-label={title}><HeaderButton title={title} index={index} /></Link> : 
              title === 'Opportunities' ? <Link href={'opportunities'} aria-label={title}><HeaderButton title={title} index={index} /></Link> : 
              title === 'Log In' ? <Link href={''} aria-label={title}><HeaderButton title={title} index={index} /></Link> : 
              title === 'Book Meeting' ? <Link href={'https://calendly.com/outreach-bostoninnovations/30min'} aria-label={title} target='_blank' rel="noopener noreferrer"><HeaderButton title={title} index={index} /></Link> : ''
            }
            </>
        ))}
      </div>
    </div>
  );
};

export default MenuModal;
