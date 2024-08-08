import Image from "next/image";
import discordicon from '../../public/images/discordicon.svg';
import inicon from '../../public/images/inicon.svg';
import mailicon from '../../public/images/mailicon.svg';
import Link from "next/link";

const Profile = ({image, role, name, des, linkedin, mail}) => {
    return (
        <div className="flex flex-col mt-10 mb-10 lg:w-[1/4] mx-auto " style={{color: '#FFFFFF'}}>
            <div>
                <Image 
                    src={image}
                    className="w-full mx-auto"
                    style={{borderRadius: '40px'}}
                />
            </div>
            <div className="flex flex-col px-10 py-5">
                <span style={{fontSize: '12px', lineHeight: '160%', textAlign: 'center'}}>{role}</span>
                <span style={{fontSize: '20px', lineHeight: '130%', textAlign: 'center'}}>{name}</span>
                <span style={{fontSize: '12px', lineHeight: '19.2px', textAlign: 'center', width: '100%', color: '#B8B8B8', marginTop: '10px'}}>{des}</span>
            </div>
            <div className="flex mx-auto space-x-3">
              <Link href={""}><Image src={discordicon} className="inline" style={{width: '30px', height: '30px'}} alt="Discord" /></Link>
              <Link href={linkedin} target='_blank'><Image src={inicon} className="inline" style={{width: '27px', height: '27px'}} alt="LinkedIn" /></Link>
              <Link href={`mailto:${mail}`}><Image src={mailicon} className="inline" style={{width: '27px', height: '27px'}} alt="EMail" /></Link>
            </div> 
        </div>
    )
}

export default Profile;