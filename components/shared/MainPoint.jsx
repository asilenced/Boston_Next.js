import Image from 'next/image';

const MainPoint = ({title, subTitle, image, des1, des2, videosrc, type}) => {
    return (
        <div>
            <div className="flex flex-col items-center lg:mt-20 gap-x-5 lg:justify-between lg:flex-row">
                <div className="w-full mx-auto text-left align-middle lg:w-1/2">
                    <span
                    style={{
                        left: "10px",
                        top: "86px",
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontStyle: "normal",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        textTransform: "capitalize",
                        color: "#2596BE",
                    }}
                    className='text-2xl lg:text-6xl'
                    >
                    {title}
                    </span>
                    <span
                    style={{
                        left: "10px",
                        top: "145px",
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontStyle: "normal",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        textTransform: "capitalize",
                        color: "#FFFFFF",
                    }}
                    className='text-2xl lg:text-6xl'
                    >
                    {subTitle}
                    </span>
                    {type === 'video' ? 
                        <span
                            style={{
                                left: "13px",
                                top: "226px",
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: '20px',
                                lineHeight: "30px",
                                display: "flex",
                                alignItems: "center",
                                color: "#F8F8F8",
                            }}
                            className='my-5 lg:w-[80%]'
                        >
                            {des1}
                        </span>
                        :
                        <span
                            style={{
                                left: "13px",
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: '17px',
                                lineHeight: "150%",
                                display: "flex",
                                alignItems: "center",
                                color: "#F8F8F8",
                            }}
                            className='my-5'
                        >
                            {des1}
                        </span>
                    }
                    {type === 'video' ? 
                        <span
                            style={{
                                left: "13px",
                                top: "226px",
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: '20px',
                                lineHeight: "30px",
                                display: "flex",
                                alignItems: "center",
                                color: "#F8F8F8",
                            }}
                            className='my-5'
                        >
                            {des2}
                        </span>
                        :
                        <span
                            style={{
                                left: "13px",
                                top: "226px",
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontStyle: "normal",
                                fontWeight: "500",
                                fontSize: '17px',
                                lineHeight: "150%",
                                display: "flex",
                                alignItems: "center",
                                color: "#F8F8F8",
                            }}
                            className='my-5'
                        >
                            {des2}
                        </span>
                    }
                </div>
                <div className='self-start mx-auto' style={{ borderRadius: '50px', overflow: 'hidden' }}>
                    { type === 'image' ? 
                        <Image
                            src={image}
                            className="self-start inline align-baseline w-30"
                            alt="Logo"
                            style={{width: '600px', height: 'auto'}}
                        />
                        : 
                        <video
                            className="w-full rounded-lg shadow-lg"
                            controls
                            style={{width: '600px', height: 'auto'}}
                            autoPlay
                            muted
                            loop
                        >
                            <source src={videosrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainPoint;