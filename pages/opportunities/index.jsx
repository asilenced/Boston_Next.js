import PagesMetaHead from '../../components/PagesMetaHead';
import AppHeader from '../../components/shared/AppHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import qrmark from '../../public/images/qrmark.svg';
import Opportunity from '../../components/shared/opportunity';

function Index() {
  return (
    <>
      <PagesMetaHead title="Projects" />
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
          <div className="container mx-auto mt-10">
            <div className="flex flex-col items-center text-center">
              <span className="text-6xl font-semibold text-blue-500" style={{color: '#2596BE'}}>Boston Innovations</span>
              <span className="text-6xl font-semibold text-white">Opportunities</span>
              <button
                style=
                {{  
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
                    gap: "10px",
                    width: 'auto'
                }}
                className="block w-24 px-4 py-2 text-left text-white duration-300 bg-indigo-500 rounded-sm shadow-sm mt-15 font-general-medium sm:hidden text-md hover:bg-indigo-600"
                aria-label="Book Meeting Button"
            >
                Scan to learn more!
            </button>
              <div className="p-5 mt-7 md:w-2/5">
                <Image src={qrmark} alt="QR Code" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 mt-15 md:grid-cols-2 md:gap-10">
                <Opportunity
                    open={1}
                    titlesize={7}
                    title={"Summer Intern"}
                    des={"As an intern, you'll immerse yourself in a stimulating environment, dedicating 3 hours per week to collaborative projects that revolve around pioneering technologies. Our dynamic projects encompass AI integration, machine learning, and various other groundbreaking initiatives."}
                    months={"2"}
                />
                <Opportunity
                    open={0}
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
    </>
  );
}

export default Index;
