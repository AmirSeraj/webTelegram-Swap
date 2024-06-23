import React from "react";
import { AuroraBackground } from "./ui/aurora-background";
import { SparklesPreview } from "./SparklesPreview";
import Loading from "./loadingCircle/Loading";
import { LiaTelegramPlane } from "react-icons/lia";
import { RiTwitterXFill } from "react-icons/ri";
import { PiYoutubeLogoLight } from "react-icons/pi";

const LoadingComponent = () => {
  return (
      <div className="w-full h-full">
        <AuroraBackground>
          <div className="bg-black w-full h-full flex flex-col">
            <SparklesPreview/>
            <div className={'relative w-full h-[100px] bottom-[32%] z-10 flex items-center justify-evenly'}>
              <img src={"/bnb.png"} className={"w-28 opacity-50 right-10 "}/>
              <img src={"/ton.png"} className={"w-28 opacity-50 left-10"}/>
            </div>
            <div className="absolute w-full h-full flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center relative top-[2%]">
                <Loading/>
                <div className="text-center mt-8">
                <span className="text-[#f0f0f0] md:text-3xl sm:text-2xl text-xl text-center">
                  trying to make it perfect{" "}
                  <span className="text-slate-400"> for You</span>
                </span>
                </div>
              </div>

              <div className="flex flex-col items-center relative top-[25vh] md:gap-5 sm:gap-3 gap-2">
              <span className="text-slate-500 md:text-2xl sm:text-xl text-lg">
                Stay tuned
              </span>
                <span className="text-slate-100 md:text-3xl sm:text-2xl text-xl">
                More info in official channels
              </span>
                <div className="flex justify-center gap-2">
                  <LiaTelegramPlane color="#fff" size="2rem"/>
                  <RiTwitterXFill color="#fff" size="2rem"/>
                  <PiYoutubeLogoLight color="#fff" size="2rem"/>
                </div>
              </div>
            </div>
            <div className="w-full absolute left-0 top-0 h-full z-50">
              <img src="/footer-grid.svg" alt="grid" className="w-full h-full opacity-100"/>
            </div>
          </div>
        </AuroraBackground>
      </div>
  );
};

export default LoadingComponent;
