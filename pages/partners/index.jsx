import PagesMetaHead from '../../components/PagesMetaHead';
import AppHeader from '../../components/shared/AppHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import mark1 from '../../public/images/mark2.png';
import mark from '../../public/images/mark.svg';
import mark2 from '../../public/images/mark2.svg';
import res1 from '../../public/images/res1.svg';
import res2 from '../../public/images/res2.svg';
import res3 from '../../public/images/res3.svg';
import res4 from '../../public/images/res4.svg';
import res5 from '../../public/images/res5.svg';
import res6 from '../../public/images/res6.svg';
import res7 from '../../public/images/res7.svg';
import OrganizationImages from '../../components/shared/OrginzationImages';
import Footer from '../../components/shared/Footer';

function Index() {
  return (
    <>
      <PagesMetaHead title="Projects" />
      <div className='bg-primary-dark'>
          <div
            className="bg-local"
            style={{
              backgroundImage: `url(/images/back3.svg)`,
              // paddingBottom: '80px',
            }}
          >
            <div
            className="bg-local"
            style={{
              // backgroundImage: `url(/images/back4.png)`,
              // paddingBottom: '80px',
              background: `linear-gradient(89.81deg, rgba(2, 24, 35, 0.5) 0.15%, rgba(2, 24, 35, 1) 99.82%)`
              // background: 'rgba(2, 24, 35, 0.9)'
            }}      
          >
            <div className="container mx-auto">
              <AppHeader />
            </div>
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            >
              <div className="container px-5 mx-auto mt-10">
                <div className="flex flex-col items-center text-center">
                  <span
                    className='text-2xl lg:text-6xl'
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: '600',
                      color: '#2596BE',
                    }}
                  >
                    Boston Innovations
                  </span>
                  <span
                    className='text-2xl lg:text-6xl'
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: '600',
                      color: '#FFFFFF',
                    }}
                  >
                    Partners
                  </span>
                </div>
                <div className="flex flex-col items-center justify-between mt-10 md:flex-row">
                  <div className="flex justify-center w-full md:w-1/3">
                    <Image
                      src={mark}
                      className="self-start inline w-30"
                      alt="Logo"
                    />
                  </div>
                  <div className="flex items-center justify-center w-full my-5 md:w-1/3 md:my-0">
                    <Image
                      src={mark2}
                      className="self-start inline my-auto w-30"
                      alt="Logo"
                    />
                  </div>
                  <div className="flex justify-center w-full md:w-1/3 lg:mb-5">
                    <Image
                      src={mark1}
                      className="self-start inline w-30"
                      alt="Logo"
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: '#021823',
                  marginTop: '50px',
                  position: 'relative',
                }}
              >
                <div
                  className="container flex flex-col items-center justify-between mx-auto md:flex-row"
                  style={{
                    color: '#FFFFFF',
                    fontSize: '57px',
                    lineHeight: '70px',
                    textAlign: 'center',
                  }}
                >
                  <div className="flex flex-wrap justify-center flex-1 mt-5 mb-5 text-2xl lg:text-6xl">
                    <span style={{ color: '#2596BE' }}>Sponsored&nbsp;</span>
                    <span>&&nbsp;</span>
                    <span style={{ color: '#2596BE' }}>Related&nbsp;</span>
                    <span>Organizations</span>
                  </div>
                </div>
                <div className="w-full overflow-hidden">
                  {/* <div className="flex items-stretch justify-between mx-auto" style={{ padding: '0 10px' }}>
                    {[org1, org2, org3, org4, org5, org6].map((src, index) => (
                      <div key={index} className="flex justify-center flex-1 p-2 align-middle">
                        <Image
                          src={src}
                          alt={`Logo ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div> */}
                  <OrganizationImages />
                </div>
              </div>
          <div className='container mx-auto mt-20'>
          <div className='flex flex-col justify-center mx-auto text-2xl md:w-1/2 lg:text-5xl' style={{color:'#FFFFFF', flexDirection: 'col', alignItems: 'center', textAlign: 'center'}}>
            <span>
              Colleges with involved
            </span>
            <span style={{color: '#2596BE'}}>
              student researchers:
            </span>
            <span style={{fontSize: '24px', lineHeight: '35px'}}>
              This list consists of various schools that we have students who contribute to research and innovation at our company!
            </span>
          </div>
          <div className='flex flex-row flex-wrap justify-center mx-auto space-y-5 md:mt-15'>
            <div className='flex flex-row flex-wrap justify-center mx-auto space-y-5'>
              <Image 
                src={res1}
                className='mt-5 mr-2 sm:mr-5'
                style={{width: '235px', height: '234px'}}
              />
              <Image 
                src={res2}
                style={{width: '235px', height: '234px', marginRight: '10px'}}
              />
              <Image 
                src={res3}
                style={{width: '262px', height: '234px', marginRight: '10px'}}
              />
              <Image 
                src={res4}
                style={{width: '235px', height: '234px', marginRight: '10px'}}
              />
            </div>
            <div className='flex flex-row flex-wrap justify-center mx-auto mt-5 space-y-5'>
              <Image 
                src={res5}
                className='mt-5 mr-2 sm:mr-5'
                style={{width: '235px', height: '234px'}}
              />
              <Image 
                src={res6}
                style={{width: '235px', height: '234px', marginRight: '10px'}}
              />
              <Image 
                src={res7}
                style={{width: '262px', height: '234px', marginRight: '10px'}}
              />
            </div>
          </div>
          </div>
              <div className="container mx-auto text-center md:mt-20">
                <div
                  style={{
                    alignItems: 'center',
                    color: '#FFFFFF',
                    flexDirection: 'row',
                  }}
                  className='text-2xl lg:text-5xl'
                >
                  <span>Want to </span>
                  <span style={{ color: '#2596BE' }}>partner </span>
                  <span>with us??</span>
                </div>
                <div
                  style={{
                    fontSize: '17px',
                    lineHeight: '30px',
                    alignItems: 'center',
                    color: '#FFFFFF',
                    width: '90%',
                    maxWidth: '780px',
                  }}
                  className="mx-auto mt-5"
                >
                  <span>
                    Please reach out to the link below or text our company line! We
                    would love to partner with others who are as passionate in
                    science as we are!
                  </span>
                </div>
                <div
                  className="flex justify-center mx-auto mt-5"
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                  {/* <button
                    style={{
                      padding: '15px 111px',
                      background: '#2596BE',
                      border: '1px solid #2596BE',
                      borderRadius: '15px',
                    }}
                    className="justify-items-center"
                  >
                    <span
                      style={{
                        fontSize: '25px',
                        lineHeight: '30px',
                        color: '#FFFFFF',
                      }}
                    >
                      Info
                    </span>
                  </button> */}
                  
              <button
              className="
                w-[50%]
                lg:w-[200px]
                py-2
                bg-[#2596BE]
                rounded-[15px]
                justify-items-center
                hover:bg-[#1E7BA7]
                transition
                duration-300
                sm:mb-15
                mb-5
              "
              >
                <a className="text-[25px] leading-[30px] text-white">
                    Info
                </a>
              </button>
                </div>
              </div>
            </motion.section>
            </div>
          </div>
      </div>
    </>
  );
}

export default Index;
