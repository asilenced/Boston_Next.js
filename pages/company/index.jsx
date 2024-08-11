import PagesMetaHead from '../../components/PagesMetaHead';
import AppHeader from '../../components/shared/AppHeader';
import { motion } from 'framer-motion';
import MainPoint from '../../components/shared/MainPoint';
import team from '../../public/images/team.png';
import Profile from '../../components/shared/Profile';
import pro1 from '../../public/images/pro1.png';
import pro2 from '../../public/images/pro2.png';
import pro3 from '../../public/images/pro3.png';
import pro5 from '../../public/images/pro5.png';
import ProfileCard from '../../components/shared/ProfileCard';
import member1 from '../../public/images/member1.svg';
import member2 from '../../public/images/member2.svg';
import Footer from '../../components/shared/Footer';

function Index() {
  return (
    <>
      <PagesMetaHead title="Projects" />
      <div className='bg-primary-dark'>
        <div
          className="bg-local"
          style={{
            backgroundImage: `url(/images/back4.jpg)`,
            // paddingBottom: '80px',
            // background: `linear-gradient(89.81deg, rgba(2, 24, 35, 0) 0.15%, rgba(2, 24, 35, 0.27) 52.48%, rgba(2, 24, 35, 0.9) 70.92%, rgba(2, 24, 35, 0.9) 99.82%)`
          }}
        >
        <div
          className="bg-local"
          style={{
            // backgroundImage: `url(/images/back4.png)`,
            paddingBottom: '80px',
            // background: `linear-gradient(0.81deg, rgba(2, 24, 35, 0.9) 99%, rgba(2, 24, 35, 0.9) 99.82%)`
            background: 'rgba(2, 24, 35, 0.9)'
          }}      
        >
          <div className="container mx-auto">
            <AppHeader />
          </div>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            // className='-ml-50'
          >
            <div className='container px-5 mx-auto'>
              <div className='flex flex-wrap items-center justify-between mx-auto lg:mt-20' style={{ color: '#2596BE', textAlign: 'center'}}>
                <div className='flex justify-center flex-1 mt-5 mb-5 text-2xl lg:text-4xl'>
                  <span>6+ Founders</span>
                </div>
                <div className='flex justify-center flex-1 text-2xl lg:text-4xl'>
                  <span>25+ Innovators</span>
                </div>
              </div>
              <MainPoint 
                image={team}
                type={"image"}
                title={'The History Of'}
                subTitle={'Boston Innovations'}
                des1={'We began as a spark of inspiration among a group of students taking classes at Harvard Medical School. It was a perfect mix of youthful curiosity and cutting-edge technology. During one class, as our professors discussed the exorbitant medical costs burdening the healthcare system, we noticed a friend using AI to complete his class work. The idea struck us—why not harness the power of AI to reduce medical costs?'}
                des2={`From that moment, our journey began. We started brainstorming ways to connect AI with healthcare to make it more affordable and efficient. Since then, we've focused on involving bright minds from the Boston area in any innovations that could revolutionize medical sciences. Our mission is to drive forward projects that can make a real difference in the world, one innovative solution at a time.`}
              />
            </div>
          </motion.section>
        </div>
        <div
            style={{
              background: '#021723',
              position: 'relative',
            }}
        >
          <div
            className="container flex flex-col items-center justify-between mx-auto text-2xl md:flex-row lg:text-6xl"
            style={{
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <div className="flex flex-col justify-center flex-1 lg:mb-5 lg:mt-5">
              <span>Our current</span>
              <span style={{ color: '#2596BE' }}>leadership</span>
            </div>
          </div>
        </div>
        <div
          className="py-10 bg-local"
          style={{
            background: 'rgba(2, 24, 35, 0.9)'
            // background: `linear-gradient(89.81deg, rgba(2, 24, 35, 0) 0.15%, rgba(2, 24, 35, 0.27) 52.48%, rgba(2, 24, 35, 0.9) 70.92%, rgba(2, 24, 35, 0.9) 99.82%)`
          }}
        >
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
            // className='-ml-50'
          >
            <div className='container flex flex-col px-5 mx-auto'>
              <div className='grid justify-center grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2'>
                <Profile 
                  image={pro1}
                  linkedin={"https://www.linkedin.com/in/nicholas-irving-393787221/"}
                  mail={"Nicholasirving@bostoninnovations.org"}
                  role={"FOUNDER & CEO"}
                  name={"Nicholas Irving"}
                  des={"Nick has taken classes at both Harvard Medical School and MIT. He received the 2024 MIT Young Biotech Leaders Scholarship and is currently a Scientific Researcher at the Dana-Farber Cancer Institute and has previously worked at Beth Israel Deaconess Medical Center."}
                />
                <Profile 
                  image={pro2}
                  linkedin={"https://www.linkedin.com/in/angelina-nguyen-2a348a279/"}
                  mail={"AngelinaNguyen@bostoninnovations.org"}
                  role={"DIRECTOR OF HUMAN RESOURCES"}
                  name={"Angelian Nguyen"}
                  des={"Angelina is a mathematics student at UC Berkeley with a strong background in event coordination and leadership. An Event Coordinator for Hack Club, she organized her own hackathon and additionally won the HackMIT 2024 competition.  "}
                />
                <Profile 
                  image={pro3}
                  linkedin={"https://www.linkedin.com/in/emmetcharney/"}
                  role={"DIRECTOR OF FINANCE"}
                  name={"Emmet Charney"}
                  des={"Emmet is an undergraduate student at the University of Virginia's Darden School of Business. Emmet has served as a Financial Analyst Intern at Stonehaven Capital Management, and gained experience consulting through his internship at McKinsey & Company."}
                />
                <Profile 
                  image={pro5}
                  linkedin={"https://www.linkedin.com/in/piotr-kierner-4b8678172/"}
                  mail={"PiotrKierner@bostoninnovations.org"}
                  role={"CHIEF STRATEGY OFFICER"}
                  name={"Piotr Kierner"}
                  des={"Piotr is a neuroscience student with extensive experience in the intersection of healthcare and engineering. Over the past two years, he has worked at Harvard's MIND Neuroscience Lab, Massachusetts General Hospital, and currently, the Sinclair Lab at Harvard's Genetics Department."}
                />
              </div>
            </div>
            <div
                style={{
                  background: '#021723',
                  position: 'relative',
                }}
            >
              <div
                className="container flex flex-col items-center justify-between mx-auto mt-5 text-2xl lg:text-6xl md:flex-row"
                style={{
                  color: '#FFFFFF',
                  textAlign: 'center',
                }}
              >
                <div className="flex flex-col justify-center flex-1 lg:mt-5 lg:mb-5">
                  <span>Some of our</span>
                  <span style={{color: '#2596BE'}}>advisors</span>
                </div>
              </div>
            </div>
            <div className='container flex flex-col items-center justify-center mx-auto mt-10'>
              <div className='flex flex-row flex-wrap justify-center gap-10 mt-10'>
                <ProfileCard
                  image={member1}
                  link={"https://www.researchgate.net/profile/James-Hillis"}
                  name="Dr.James Hillis"
                  des="Doctorate from Oxford in Medicine and Director of Neurological Digital Clinical Research and Artificial Intelligence Organization at Mass General Brigham"
                />
                <ProfileCard
                  image={member2}
                  link={"https://www.healio.com/authors/drett"}
                  name="Dr.Doug Rett"
                  des="Chief of Optometry for the VA hospitals in the Greater Boston area with a staff of over a dozen doctors. One of the nation leads for Telemedicine roll-out throughout New England."
                />
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
