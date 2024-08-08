import Image from 'next/image';
import org1 from '../../public/images/org1.svg'
import org2 from '../../public/images/org2.svg';
import org3 from '../../public/images/org3.svg';
import org4 from '../../public/images/org4.svg';
import org5 from '../../public/images/org5.svg';
import org6 from '../../public/images/org6.svg';

const rotatingImages = [org1, org2, org3, org4, org5, org6];

const OrganizationImages = () => {
  return (
    <div className="mb-2 rotating-images-container">
      <div className="images-wrapper">
        {rotatingImages.concat(rotatingImages).map((src, index) => (
          <div key={index} className="image-container">
            <Image src={src} alt={`Logo ${index + 1}`} layout="responsive" objectFit="contain" />
          </div>
        ))}
      </div>
      <style jsx>{`
        .rotating-images-container {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: auto; /* Adjust this height to fit your images */
        }

        .images-wrapper {
          display: flex;
          animation: rotateImages 20s linear infinite;
        }

        .image-container {
          flex: 0 0 calc(100% / 6); /* Ensure 6 images fit within the container width */
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 15px; /* 30px total space between images (15px on each side) */
        }

        @keyframes rotateImages {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100%));
          }
        }
      `}</style>
    </div>
  );
};

export default OrganizationImages;
