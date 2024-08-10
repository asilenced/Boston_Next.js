import PagesMetaHead from '../../components/PagesMetaHead';
import AppHeader from '../../components/shared/AppHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import qrmark from '../../public/images/qrmark.svg';
import Opportunity from '../../components/shared/opportunity';
import Footer from '../../components/shared/Footer';

function Index() {
  return (
    <>
      <PagesMetaHead title="Projects" />
      <div className='bg-primary-dark'>
        <div
          className="bg-local bg-cover"
          style={{ backgroundImage: `url(/images/back5.svg)`, paddingBottom: '40px' }}
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
                <span className="text-2xl font-semibold text-blue-500 lg:text-6xl" style={{color: '#2596BE'}}>Boston Innovations</span>
                <span className="text-2xl font-semibold text-white lg:text-6xl">Opportunities</span>
                <button
                  className='w-[50%] px-4 py-2 sm:w-auto sm:px-[55px] sm:py-[16px] mt-15 custom-button'
                  style={{fontFamily: 'Helvetica, Arial, sans-serif'}}
                >
                  Scan to learn more!
                </button>              
                <div className="p-5 mt-7 md:w-2/5">
                  <Image src={qrmark} alt="QR Code" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10 mt-15 lg:grid-cols-2">
                  <Opportunity
                      open={0}
                      titlesize={7}
                      title={"Summer Intern"}
                      des={"As an intern, you'll immerse yourself in a stimulating environment, dedicating 3 hours per week to collaborative projects that revolve around pioneering technologies. Our dynamic projects encompass AI integration, machine learning, and various other groundbreaking initiatives."}
                      months={"2"}
                  />
                  <Opportunity
                      open={1}
                      titlesize={7}
                      title={"Winter Intern"}
                      des={"As an intern, you'll immerse yourself in a stimulating environment, dedicating 3 hours per week to collaborative projects that revolve around pioneering technologies. Our dynamic projects encompass AI integration, machine learning, and various other groundbreaking initiatives."}
                      months={"2"}
                  />
                  <Opportunity
                      open={0}
                      titlesize={5}
                      title={"Full Stack Developer"}
                      des={"As a full-time full stack developer, you will be involved in projects encompassing AI integration, machine learning, and various other initiatives. You'll work on both the front-end and back-end development of applications, ensuring seamless functionality, user-friendly interfaces, and robust performance. You'll engage in hands-on coding, debugging, and implementation of full stack solutions."}
                      months={"2"}
                  />
                  <Opportunity
                      open={0}
                      titlesize={5}
                      title={"Mechanical Engineer"}
                      des={"As a full-time engineer you will engage in hands-on problem-solving, prototyping, and implementation of physical hardware, contributing to the advancement of our cutting-edge technologies. Join our team and play a crucial role in shaping the future of technology through your expertise in various engineering disciplines."}
                      months={"2"}
                  />
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}

export default Index;
