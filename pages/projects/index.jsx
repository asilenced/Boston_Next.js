import PagesMetaHead from '../../components/PagesMetaHead';
import AppHeader from '../../components/shared/AppHeader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import photo1 from '../../public/images/photo1.png';
import MainPoint from '../../components/shared/MainPoint';
import ProjectItem from '../../components/projects/ProjectItem';
import ProjectItem2 from '../../components/projects/ProjectItem2';
import project1 from '../../public/images/project1.png';
import project2 from '../../public/images/project2.png';
import project3 from '../../public/images/project3.png';
import project4 from '../../public/images/project4.png';

function index() {
  return (
	  <>
      <PagesMetaHead title="Projects" />
      <div
        className='bg-local'
        style={{
          backgroundImage: `url(/images/back2.png)`,
		  paddingBottom: '80px'
        }}
      >
		<div className='container mx-auto'>
			<AppHeader />
		</div>
		<motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className='-ml-10'
          >
			<div className='container mx-auto'>
				{/* <AppHeader /> */}
				<MainPoint type={"video"} videosrc={"/whycreate.mp4"} title={"Why Create"} subTitle={"Projects And Innovations?"} des1={"At Boston Innovations, we take innovation so seriously, it's literally in our name. Every individual harbors an intrinsic urge to create, innovate, and change the world around them. At Boston Innovations, we recognize and harness this universal drive, channeling it into the the development of advanced medical devices, cutting-edge pharmaceuticals, and comprehensive artificial intelligence healthcare systems."}/>
			</div>
			<div style={{ background: 'rgba(2, 23, 35, 0.8)', marginTop: '50px', width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
				<div className='container flex items-center justify-between mx-auto' style={{ color: '#2596BE', fontSize: '45px', lineHeight: '36px', textAlign: 'center' }}>
					<div className='flex justify-center flex-1 mt-5 mb-5'>
						<span>4+ Projects</span>
					</div>
					<div className='flex justify-center flex-1'>
						<span>25+ Innovators</span>
					</div>
				</div>
			</div>
			<div className='container mx-auto mt-10'>
				<div className='flex-row justify-center text-center'>
					<span style={{fontSize: '54px', lineHeight: '68px', textTransform: 'capitalize', alignItems: 'center', fontWeight: '600', color: '#2596BE'}}>Our Current</span><br />
					<span style={{fontSize: '54px', lineHeight: '68px', textTransform: 'capitalize', alignItems: 'center', fontWeight: '600', color: '#FFFFFF'}}>Projects</span>
				</div>
				<ProjectItem
					image={project1}
					title={"Artificial Intelligence Systems"}
					description={"Using machine learning and artificial intelligence models, we are invested in creating a custom machine learning system to replace large-scale bureaucratic tasks at healthcare institutions."}
					description1={"Boston Innovations is actively coordinating with small offices across the New England region to integrate our technology and bring these advancements to the forefront of community healthcare. By reducing administrative burdens and operational costs, we hope to make a significant dent in medical debt, allowing healthcare providers to offer more affordable services to their patients."}
				/>
				<ProjectItem2
					image={project2}
					title={"Medical Technology Development"}
					description={"In response to the dire shortage of medical supplies in Ukraine and other war-affected regions, Boston Innovations partnered with talented students from local hackathons to create an affordable and effective 3D-printed medical tourniquet."}
					description1={"We now aim to develop a next-generation tourniquet equipped with advanced technology. Imagine a tourniquet that not only automatically stops blood flow but also calls emergency medical services (EMS) at the same time. By integrating cutting-edge AI and IoT technologies, we aim to save even more lives in critical situations."}
				/>
				<ProjectItem
					image={project3}
					title={"Biomedical Technology Consulting"}
					description={"At Boston Innovations, we offer biomedical technology consulting on an on-demand basis. We're always eager to partner our brightest minds with other institutions and corporations, fostering collaboration and driving forward groundbreaking advancements in the biomedical field. Whether it's a short-term project or a long-term partnership, our experts are ready to contribute their expertise and innovative solutions."}
				/>
				<ProjectItem2
					image={project4}
					title={"Iron Man suit?!"}
					description1={"At Boston Innovations, some of our brightest minds are die-hard Iron Man fans and proud students and graduates of Tony Stark's alma mater. Although we have been dreaming of developing an Iron Man suit; we haven't quite started development. Rest assured, with enough Redbull and comic book inspiration, it's always subject to change! "}
				/>
			</div>
			<div className='container mx-auto mt-20'>
				<div style={{fontSize: '45px', lineHeight: '50px', alignItems: 'center', textAlign: 'center', color: '#FFFFFF', flexDirection: 'row'}}>
					<span>Want to </span>
					<span style={{color: '#2596BE'}}>invest </span>
					<span>into our projects?</span>
				</div>
				<div style={{fontSize: '17px', lineHeight: '30px', alignItems: 'center', textAlign: 'center', color: "#FFFFFF", width: '780px'}} className='mx-auto mt-5'>
					<span>Please reach out to the link below or text our company line! We would love to partner with others who are as passionate in science as we are! </span>
				</div>
				<div className="flex justify-center mx-auto mt-5" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<button
						style={{padding: '15px 111px', background: '#2596BE', border: '1px solid #2596BE', borderRadius: '15px'}}
						className="justify-items-center"
					>
						<span style={{fontSize: '25px', lineHeight: '30px', color: '#FFFFFF'}}>Info</span>
					</button>
				</div>
			</div>
		</motion.section>
	  </div>
	  </>
  );
}

export default index;
