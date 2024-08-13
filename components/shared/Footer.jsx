import Image from 'next/image';
import React from 'react';
import logoLight from "../../public/images/logo-light.svg"
import logox from "../../public/images/x.svg";
import logodiscord from "../../public/images/discord.svg";
import logolink from "../../public/images/linkedin.svg";
import logoinsta from "../../public/images/insta.svg";
import logoyou from "../../public/images/youtube.svg";
import contactphone from '../../public/images/contactphone.svg';
import contactemail from '../../public/images/contactemail.svg';
import contactnum from '../../public/images/contactnum.svg';
import contactweb from '../../public/images/contactweb.svg';
import hearticon from '../../public/images/hearticon.svg';
import LinkButton1 from './ButtonLink1';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-12 text-white" style={{background: '#021723', fontFamily: 'Helvetica, Arial, sans-serif'}}>
      <div className="container px-6 mx-auto">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex flex-row flex-wrap justify-between lg:justify-start lg:flex-col w-full mb-6 lg:w-1/4 basis-[30%]"> {/* mainpart */}
            <div className="flex items-center mb-4 lg:mr-0">
              <Image
                src={logoLight}
                className="inline w-10"
                alt="Logo"
                width={150}
                height={120}
              />
              <span className='ml-4 font-bold' style={{color: "#FFFFFF"}}>
                Boston Innovations<br/>Corporation
              </span>
            </div>
            <div className="flex flex-row items-center justify-end space-x-3 lg:justify-start">
              <div className='flex w-[30px]'>
                <Link target='_blank' href="https://discord.gg/6Z73xt5fWJ">
                  <Image src={logodiscord} className="inline w-[30px]" alt="Discord" />
                </Link>
              </div>
              <div className='flex w-[30px]'>
                <Link href="">
                  <Image src={logox} className="inline w-[30px]" alt="Twitter" />
                </Link>
              </div>
              <div className='flex w-[30px]'>
                <Link target='_blank' href="https://www.linkedin.com/company/boston-innovations/">
                  <Image src={logolink} className="inline w-[30px]" alt="LinkedIn" />
                </Link>
              </div>
              <div className='flex w-[30px]'>
                <Link href="">
                  <Image src={logoinsta} className="inline w-[30px]" alt="Instagram" />
                </Link>
              </div>
              <div className='flex w-[30px]'>
                <Link href="">
                  <Image src={logoyou} className="inline w-[30px]" alt="YouTube" />
                </Link>
              </div>
            </div>
            <div className='flex'>
              <span
                className='mt-4'
                style={{fontSize: "16px", lineHeight: "26px"}}
              >
                Designed by Boston Innovations with love
                <Image src={hearticon} className="inline w-8" alt="Heart" width="24px" height="24px" />
              </span>
            </div>
          </div>
          <div className="flex flex-wrap justify-between w-full lg:basis-[40%] md:grid-cols-4 grid-cols-2" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
            <div className="w-1/2 mb-6 md:w-1/4">
              <h3 className="mb-3 text-lg font-semibold" style={{ fontSize: "17px" }}>Overview</h3>
              <ul style={{ fontSize: "14px" }}>
                <li className='my-5'><LinkButton1 title={"Projects"} footer={"1"} linkname={"\projects"} newop={1} /></li>
                <li className='my-5'><LinkButton1 title={"Partner"} footer={"1"} linkname={"\partners"} newop={1} /></li>
                <li className='my-5'><LinkButton1 title={"Our Company"} footer={"1"} linkname={"\company"} newop={1} /></li>
                <li className='my-5'><LinkButton1 title={"Opportunities"} footer={"1"} linkname={"\opportunities"}  newop={1} /></li>
              </ul>
            </div>
            <div className="w-1/2 mb-6 md:w-1/4">
              <h3 className="mb-3 text-lg font-semibold" style={{ fontSize: "17px" }}>Company</h3>
              <ul style={{ fontSize: "14px", lineHeight: "20px" }}>
                <li className='my-5'><LinkButton1 title={"About Us"} footer={"1"} linkname={""} /></li>
                <li className='my-5'><LinkButton1 title={"Blogs"} footer={"1"} linkname={""} /></li>
                <li className='my-5'><LinkButton1 title={"Testimonials"} footer={"1"} linkname={""} /></li>
                <li className='my-5'><LinkButton1 title={"Careers"} footer={"1"} linkname={"/opportunities"} newop={1} /></li>
              </ul>
            </div>
            <div className="w-1/2 mb-6 md:w-1/4">
              <h3 className="mb-3 text-lg font-semibold" style={{ fontSize: "17px" }}>Services</h3>
              <ul style={{ fontSize: "14px", lineHeight: "20px" }}>
                <li className='my-5'><LinkButton1 title={"Our AI Model"} footer={"1"} linkname={"https://platform.openai.com/docs/models/continuous-model-upgrades"} /></li>
                <li className='my-5'><LinkButton1 title={"3PL Fulfillment"} footer={"1"} linkname={""} /></li>
                <li className='my-5'><LinkButton1 title={"Freight & Shipping"} footer={"1"} linkname={""} /></li>
                <li className='my-5'><LinkButton1 title={"Custom Packaging"} footer={"1"} linkname={""} /></li>
                <li className='my-5'><LinkButton1 title={"Returns & Reverse Logistics"} footer={"1"} linkname={""} /></li>
              </ul>
            </div>
            <div className="w-1/2 mb-6 md:w-1/4">
              <h3 className="mb-3 text-lg font-semibold" style={{ fontSize: "17px" }}>Legal</h3>
              <ul style={{ fontSize: "14px", lineHeight: "20px" }}>
                <li className='my-5'><LinkButton1 title={"Privacy"} title1={"Policy"} footer={"1"} linkname={"/privacy.html"} /></li>
                <li className='my-5'><LinkButton1 title={"Terms &"} title1={"Conditions"} footer={"1"} linkname={"/policy.html"} /></li>
                <li className='my-5'><LinkButton1 title={"Help"} footer={"1"} linkname={""} /></li>
              </ul>
            </div>
          </div>

          <div className="w-full mb-6 lg:w-1/4 basis-[25%] lg:ml-auto" style={{fontSize: "17px", fontFamily: "Helvetica, Arial, sans-serif"}}>
            <h3 className="mb-3 text-lg font-semibold">Contact Info</h3>
            <div style={{fontSize: "14px"}} className='grid lg:gap-y-0 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xs:grid-cols-1'>
              <div style={{fontSize: "21px", color: "#2596BE"}} className='flex lg:my-2 lg:w-full'>
                <Image src={contactphone}
                  className='inline mr-2'
                  alt="Phone"
                />
                <Link href="https://calendly.com/outreach-bostoninnovations/30min" className="hover:underline" target='_blank'>Schedule a Demo Today</Link>
              </div>
              <div style={{fontSize: "17px"}} className='flex lg:my-5 lg:w-full'>
                <Image src={contactemail}
                  className='inline mr-2'
                  alt="Email"
                  width="27px"
                  height="28px"
                />
                <a href="mailto:info@bostoninnovations.org" className="underline">info@bostoninnovations.org</a>
              </div>
              <div style={{fontSize: "17px"}} className='flex items-center lg:my-5 lg:w-full'>
                <Image src={contactnum}
                  className='inline mr-2'
                  alt="Phone Number"
                />
                +1 (617) 396-0766
              </div>
              <div style={{fontSize: "17px"}} className='lg:my-5 lg:w-full'>
                <div className='flex items-center'>
                  <Image src={contactweb}
                    className='inline mr-2'
                    alt="Address"
                    width="27px"
                    height="28px"
                  />
                  <span>251 Devonshire St, Boston, MA 02110</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-6 mt-6 text-center border-t border-gray-700">
          <Link target='_blank' href='https://www.linkedin.com/company/boston-innovations/'><p className="text-sm">&copy; 2024 Boston Innovations. All Rights Reserved.</p></Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
