import Link from 'next/link';

const LinkButton = ({linkname, title, title1, footer}) => {
    let fontSize = footer === "1" ? "14px" : "17px";
    let fontWeight = footer === "1" ? 400 : 500; // Adjust as needed

  // Conditionally define className based on footer value

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
      className={`block mb-2 text-lg font-medium text-left text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light ${footer === "1" ? "" : "sm:mx-4 sm:py-2"}`}
      aria-label="Projects"
    >
        <Link href={linkname}>
        <span style={{ display: 'block' }}>
          {title}
        </span>
        {title1 && (
          <span style={{ display: 'block' }}>
            {title1}
          </span>
        )}
    </Link>
      <style jsx>{`
        div {
          position: relative;
          display: inline-block; /* Ensure the element is inline-block for the pseudo-element to align properly */
        }
        div::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #FFFFFF; /* Change to your desired color */
          transition: width 0.2s ease;
        }
        div:hover::after {
          width: 100%;
        }
        div::after {
          transition: width 0.5s ease, opacity 0.5s ease;
        }
        div:hover::after {
          width: 100%;
          opacity: 1;
        }
        div:not(:hover)::after {
          width: 0;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default LinkButton;
