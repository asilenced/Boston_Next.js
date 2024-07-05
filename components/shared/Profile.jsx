import Image from "next/image";
import discordicon from '../../public/images/discordicon.svg';
import inicon from '../../public/images/inicon.svg';
import mailicon from '../../public/images/mailicon.svg';

const Profile = ({image, role, name, des, linkedin, mail}) => {
    return (
        <div className="flex flex-col mt-10 mb-10" style={{color: '#FFFFFF'}}>
            <div>
                <Image 
                    src={image}
                    className="mx-auto"
                    style={{borderRadius: '40px', width: '313px', height: '313px'}}
                />
            </div>
            <div className="flex flex-col justify-center px-10 py-5">
                <span style={{fontSize: '12px', lineHeight: '160%', textAlign: 'center'}}>{role}</span>
                <span style={{fontSize: '20px', lineHeight: '130%', textAlign: 'center'}}>{name}</span>
                <span style={{fontSize: '12px', lineHeight: '19.2px', textAlign: 'center', width: '300px', color: '#B8B8B8', marginTop: '10px'}}>{des}</span>
            </div>
            <div className="flex mx-auto space-x-3">
              <a><Image src={discordicon} className="inline" style={{width: '30px', height: '30px'}} alt="Discord" /></a>
              <a href={linkedin} target="_blank"><Image src={inicon} className="inline" style={{width: '27px', height: '27px'}} alt="LinkedIn" /></a>
              <a href={`mailto:${mail}`}><Image src={mailicon} className="inline" style={{width: '27px', height: '27px'}} alt="EMail" /></a>
            </div> 
        </div>
    )
}

export default Profile;