import Link from 'next/link';

const LinkButton = ({ linkname, title, title1, footer, newop }) => {
  let fontSize = footer === "1" ? "14px" : "17px";
  let fontWeight = footer === "1" ? 400 : 500; // Adjust as needed

  return (
    <div
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: fontWeight,
        fontSize: fontSize,
        color: "#FFFFFF",
        lineHeight: "20px",
        position: "relative", // Necessary for pseudo-element positioning
      }}
      className={`block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light ${footer === "1" ? "" : "sm:mx-4 sm:py-2"}`}
      aria-label="Projects"
    >
      <style jsx>{`
        a {
          text-decoration: none;
          color: #FFFFFF;
          position: relative;
        }
        a::after {
          content: '';
          position: absolute;
          width: 0%;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #FFFFFF; /* Change to your desired underline color */
          transition: width 0.2s ease;
        }
        a:hover::after {
          width: ${footer === "0" ? "100%" : "0%"}; /* Show underline on hover based on footer value */
        }
        a:hover {
          color: ${footer === "0" ? "#FFFFFF" : "#999999"}; /* Adjust hover color based on footer value */
        }
      `}</style>
      
      {/* <Link href={linkname}> */}
        <Link href={linkname} target={`${linkname!='' && !newop ? '_blank' : ''}`}>
          <span style={{ display: 'block' }}>
            {title}
          </span>
          {title1 && (
            <span style={{ display: 'block' }}>
              {title1}
            </span>
          )}
        </Link>
      {/* </Link> */}
    </div>
  );
};

export default LinkButton;
