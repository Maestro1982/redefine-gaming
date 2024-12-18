import {useRef, useState} from "react";
import {TiLocationArrow} from "react-icons/ti";

import Button from "./Button.jsx";

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 3;
    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVideoPlayerClick = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }

    const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                <div>
                    <div className='mask-clip-path absolute absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleMiniVideoPlayerClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            <video
                            ref={nextVideoRef}
                            src={getVideoSrc(upcomingVideoIndex)}
                            loop
                            muted
                            id='current-video'
                            className='size-64 origin-center scale-150 object-cover object-center'
                            onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    {/* Primary video player */}
                    <video
                    ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    id='next-video'
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoadedData={handleVideoLoad}
                    />

                    {/* Zoom in effect */}
                    <video
                    src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                    //autoPlay
                    loop
                    muted
                    className='absolute left-0 top-0 size-full object-cover object-center'
                    onLoadedData={handleVideoLoad}
                    />
                </div>

                {/* Text bottom right */}
                <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>

                {/* Text top left */}
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>Redefi<b>n</b>e</h1>
                        {/* Subtext */}
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter the Metagame Layer <br/> Unleash the Play Economy</p>
                        {/* Button */}
                        <Button id='watch-trailer' title='Watch Trailer' leftIcon={<TiLocationArrow />} containerClass='!bg-yellow-300 flex-center gap-1'/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Hero
