import Image from "next/image";
import markstart from '../../public/images/mark_start.svg';
import markend from '../../public/images/mark_end.svg';
import nextbut from '../../public/images/nextbut.svg'

const ProfileCard = ({image, name, des }) => {
    return (
        <div className="flex flex-col w-full p-10 md:w-1/3" style={{background: 'rgba(28, 28, 28, 0.9)', alignItems: 'flex-start', borderRadius: '30px'}}>
            <Image 
                src={image}
                style={{width: '121px', height: 'auto', alignSelf: 'center'}}
            />
            <span style={{fontSize: '20px', lineHeight: '130%', color: '#FFFFFF', alignSelf: 'center'}}>
                {name}
            </span>
            <Image
                src={markstart}
                style={{width: '37px', height: 'auto', marginTop: '25px'}}
            />
            <span style={{fontSize: '17px', lineHeight: '40px', color: '#E5E5E5', fontStyle: 'italic', marginTop: '25px', alignSelf: 'center'}}>{des}</span>
            <Image
                src={markend}
                style={{width: '37px', height: 'auto', marginTop: '25px'}}
            />
            <span style={{color: 'rgba(2, 23, 35, 0.8)', fontSize: '16px', lineHeight: '20px', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '25px'}}>
                KB Nimo
            </span>
            <span style={{fontSize: '13px', color: '#8B8B8B', lineHeight: '20px'}}>
                Head of Operatons, Loyal
            </span>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '17px' }}>
                <span style={{lineHeight: '20px', color: '#2596BE', textDecoration: 'underline', cursor: 'pointer' }}>
                    View Case Study
                </span>
                <Image 
                    src={nextbut}
                    style={{ width: '17px', marginLeft: '8px' }}  // Add some left margin to create space between the text and the image
                />
            </div>
        </div>
    )
}

export default ProfileCard;