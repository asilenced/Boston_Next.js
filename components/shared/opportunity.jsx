import Image from "next/image";

const Opportunity = ({ open, title, des, months, titlesize }) => {
  return (
    <div className="flex flex-col space-y-8 md:p-[44px] p-[20px] text-white bg-[#4d4c4c] md:w-3/7 bg-opacity-40 rounded-2xl">
      <div
        className={`flex self-center justify-center px-2 py-2 rounded-lg text-lg ${
          open === 1 ? 'bg-green-800' : 'bg-red-800 bg-opacity-90'
        }`}
      >
        <span className='justify-center text-center'>{open === 1 ? "OPEN OPPORTUNITY:" : "CLOSED OPPORTUNITY:"}</span>
      </div>
      {
        titlesize == 7 ? <span className={`lg:text-7xl text-2xl leading-tight text-center text-white`}>{title}</span>
        : <span className={`lg:text-6xl text-2xl leading-tight text-center text-white`}>{title}</span>
      }
      <span className="text-lg leading-loose text-center text-gray-400 custom-scrollbar" style={{height: '16rem', overflowY: 'auto'}}>
        {des || "As an intern, you'll immerse yourself in a stimulating environment, dedicating 3 hours per week to collaborative projects that revolve around pioneering technologies. Our dynamic projects encompass AI integration, machine learning, and various other groundbreaking initiatives."}
      </span>

      <div className="flex flex-row text-2xl te xt-white">
        <div className="flex items-center justify-center w-1/2 text-center">
          <span>{months}+ Months</span>
        </div>
        <div className="flex items-center justify-center w-1/2 text-center">
          <span>Virtual Options</span>
        </div>
      </div>
      {/* <button
        className="self-center py-4 rounded-lg justify-items-center px-28"
        style={{background: '#2596BE'}}
      >
        <span className="text-2xl leading-tight text-center text-white">
          Apply now
        </span>
      </button> */}
      <button
        className="
          self-center
          sm:py-4
          py-1
          justify-items-center
          w-auto
          px-4
          lg:w-[200px]
          rounded-2xl
          bg-[#2596BE]
          hover:bg-[#1E7BA7]
          transition
          duration-300
        "
      >
        <span className="text-2xl leading-tight text-center text-white">
          Apply now
        </span>
      </button>
    </div>
  );
};

export default Opportunity;
