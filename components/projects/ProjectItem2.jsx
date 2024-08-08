import { useState, useEffect } from 'react';
import Image from 'next/image';

const ProjectItem2 = ({ title, description, description1, image }) => {
  const [phone, setPhone] = useState(0);
  
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    if(window.innerWidth < 768) setPhone(1);
    return () => {
      window.removeEventListener('resize', handleResize, true);
    }
  }, []);

  const handleResize = (event) => {
    if(event.target.innerWidth < 768) {
      setPhone(1);
    }
    else setPhone(0);
  }

  return (
    <>
    { !phone ? <div className="flex flex-col overflow-hidden text-white rounded-lg shadow-lg md:flex-row px-50" style={{marginTop: '64px'}}>
      <div className="flex flex-col justify-between w-full p-6 md:w-1/2">
        <div className='my-auto'>
          <div>
            <h3 className="mb-4 text-2xl lg:text-3xl" style={{alignItems: 'center', color: '#F8F8F8'}}>{title}</h3>
            <p className="mb-5" style={{fontSize: '17px', lineHeight: '26px', color: '#F8F8F8'}}>{description}</p>
            <p className="mb-5" style={{fontSize: '17px', lineHeight: '26px', color: '#F8F8F8'}}>{description1}</p>
          </div>
          <div className='flex justify-center lg:block'>
            {/* <button
              style={{boxSizing: 'border-box', background: '#0B556F', border: '1px solid #0B556F', borderRadius: '20px', width: '262.75px', height: '52px', fontSize: '17px', lineHeight: '20px'}}
            >
              View this project
            </button> */}
            <button
              className="
                
                box-border
                bg-[#0B556F]
                border
                border-[#0B556F]
                rounded-[20px]
                w-[50%]
                h-[52px]
                text-[17px]
                leading-[20px]
                text-white
                transition
                duration-300
                hover:bg-[#083A48]
                hover:border-[#083A48]
              "
            >
              View this project
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <Image 
          src={image}
          alt={title}
          style={{borderRadius: title==="Iron Man suit?!" ? '75px' : '30px', height: '100%'}}
          className="object-cover"
        />
      </div>
    </div>
    :
    <div className="flex flex-col mx-auto mt-8 mb-4 overflow-hidden text-center text-white rounded-lg shadow-lg md:flex-row px-50 md:mt-16">
      <h3 className="mb-5 text-2xl lg:text-3xl title" style={{alignItems: 'center', color: '#F8F8F8'}}>{title}</h3>
      <div className="w-full image">
        <Image 
          src={image}
          alt={title}
          style={{borderRadius: '30px', height: '100%'}}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-6 my-auto md:w-1/2 information">
        <div>
            <div className='description'>
            <p className="mb-5" style={{fontSize: '17px', lineHeight: '26px', color: '#F8F8F8'}}>{description}</p>
            <p className="mb-5" style={{fontSize: '17px', lineHeight: '26px', color: '#F8F8F8'}}>{description1}</p>
            </div>
        </div>
        <div className='flex justify-center lg:block button'>
            <button
              className='
                box-border
                bg-[#0B556F]
                border
                border-[#0B556F]
                rounded-[20px]
                w-[50%]
                h-[52px]
                text-[17px]
                leading-[20px]
                text-white
                transition
                duration-300
                hover:bg-[#083A48]
                hover:border-[#083A48]
              '
            >
              View this project
            </button>
        </div>
      </div>
    </div>
  }
  </>
  );
};

export default ProjectItem2;
