import Link from 'next/link';
import logoLight from '../../public/images/logo-light.svg';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import Image from 'next/image';

const MenuModal = ({ showMenu, toggleMenu }) => {
  return (
    <div>
        {
            <div className={`flex items-center justify-between xl:px-0 ${!showMenu ? 'block' : 'hidden'} xl:flex`}>
            <Link href="/">
                <div className="flex flex-row lg:w-[250px]">
                    <Image
                        src={logoLight}
                        className="inline w-10 cursor-pointer"
                        alt="Logo"
                        width={150}
                        height={120}
                    />
                    <span className="hidden float-right px-2 font-bold sm:block" style={{color: "#FFFFFF", fontFamily: 'Helvetica, Arial, sans-serif'}} >
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
        
        }   
        <div
        className={
            showMenu
            ? 'block m-0 xl:ml-4 mt-3 xl:hidden px-5 py-3 xl:p-0 justify-between items-center shadow-lg xl:shadow-none rounded-lg'
            : 'hidden'
        }
        style={{ backgroundColor: 'rgba(55, 65, 81, 0.4)' }}
        >
            <div className="flex items-center justify-between xl:px-0">
                <Link href="/">
                <div className="flex flex-row xl:w-[250px]">
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
            </div>
        {['Projects', 'Partners', 'Our Company', 'Opportunities', 'Log In', 'Book Meeting'].map((title, index) => (
            <div
            key={index}
            style={{
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 500,
                fontSize: '17px',
                color: '#FFFFFF',
                lineHeight: '20px',
            }}
            className={`block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light xl:mx-4 xl:py-2 xl:pt-2 xl:border-t-0 border-gray-400 dark:border-secondary-dark ${
                index === 0 ? 'lg:border-t-0 border-t-0' : ''
            }`}
            >
            { 
                title === 'Projects' ? <Link href={'projects'} aria-label={title}>{title}</Link> : 
                title === 'Partners' ? <Link href={'partners'} aria-label={title}>{title}</Link> : 
                title === 'Our Company' ? <Link href={'company'} aria-label={title}>{title}</Link> : 
                title === 'Opportunities' ? <Link href={'opportunities'} aria-label={title}>{title}</Link> : 
                title === 'Log In' ? <Link href={''} aria-label={title}>{title}</Link> : 
                title === 'Book Meeting' ? <Link href={''} aria-label={title}>{title}</Link> : ''
            }
            </div>
        ))}
        </div>
    </div>
  );
};

export default MenuModal;
