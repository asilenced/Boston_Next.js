import { useState, useEffect } from 'react';
import Footer from '../shared/Footer';
import PagesMetaHead from '../PagesMetaHead';
import Image from 'next/image';
import loading from '../../public/images/loading.svg';

const DefaultLayout = ({ children, pageKey }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Start loading when the pageKey changes

    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [pageKey]); // Dependency array includes pageKey

  return (
    <div className={`transition duration-300 min-h-screen ${isLoading ? 'bg-primary-dark' : 'bg-white'}`} style={{ padding: 0, margin: 0, fontFamily: 'Helvetica, Arial, sans-serif' }}>
      <PagesMetaHead />
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Image src={loading} alt="Loading..." />
        </div>
      ) : (
        <div>
          {children}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
