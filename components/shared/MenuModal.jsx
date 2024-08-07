import Link from 'next/link';

const MenuModal = ({ showMenu }) => {
  return (
    <div
      className={
        showMenu
          ? 'block m-0 lg:ml-4 mt-3 lg:hidden px-5 py-3 lg:p-0 justify-between items-center shadow-lg lg:shadow-none rounded-lg'
          : 'hidden'
      }
      style={{ backgroundColor: 'rgba(55, 65, 81, 0.8)' }}
    >
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
          className={`block pt-3 mb-2 text-lg text-left border-t-2 text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light lg:mx-4 lg:py-2 lg:pt-2 lg:border-t-0 border-gray-400 dark:border-secondary-dark ${
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
  );
};

export default MenuModal;
