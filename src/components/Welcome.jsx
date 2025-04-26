// src/pages/Welcome.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Welcome = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate("/chat");
  };

  return (
    <div className="main-container w-[406px] h-[567px] text-[0px] bg-[#202020] rounded-[18.389px] border-solid border-[1.379px] border-[#FCC201] relative overflow-hidden mx-auto my-0">
      <span className="flex w-[269px] h-[29px] justify-center items-center font-['Montserrat'] text-[24px] font-bold leading-[29px] text-[#fff] relative text-center whitespace-nowrap z-[1] mt-[60px] mr-0 mb-0 ml-[63px]">
        Unleash the power of
      </span>
      <div className="flex w-[176px] h-[4px] justify-between items-center relative z-[13] mt-[6.379px] mr-0 mb-0 ml-[110px]">
        <div className="w-[4px] h-[4px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-21/c4cd665c-8a58-4d1d-8aca-401b0b05ac4d.svg)] bg-cover bg-no-repeat rounded-[50%] relative z-[13]" />
        <div className="w-[4px] h-[4px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-21/f3831950-ec6c-4d0e-a942-bd3f3a1dd329.svg)] bg-cover bg-no-repeat rounded-[50%] relative z-10" />
      </div>
      <div className="flex w-[172px] h-[39px] justify-center items-center bg-[#000] border-solid border-[0.5px] border-[#645a5a] relative shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] z-[9] mt-[-0.62px] mr-0 mb-0 ml-[112px]">
        <span className="flex w-[132px] h-[29px] justify-center items-center shrink-0 font-['Montserrat'] text-[24px] font-bold leading-[29px] text-[#FCC201] relative text-center whitespace-nowrap z-[9]">
          Prince Bot
        </span>
      </div>
      <div className="flex w-[176px] h-[4px] justify-between items-center relative z-[12] mt-[-0.62px] mr-0 mb-0 ml-[110px]">
        <div className="w-[4px] h-[4px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-21/439eb4e2-8e4d-4235-bf12-0771ae98e728.svg)] bg-cover bg-no-repeat rounded-[50%] relative z-[12]" />
        <div className="w-[4px] h-[4px] shrink-0 bg-[url(https://static.codia.ai/image/2025-03-21/a0941826-3e34-4dcf-af70-4f98bbb64169.svg)] bg-cover bg-no-repeat rounded-[50%] relative z-[11]" />
      </div>
      <span className="flex w-[307px] h-[18px] justify-center items-center font-['Lexend'] text-[14.777778625488281px] font-extralight leading-[18px] text-[#fff] relative text-center whitespace-nowrap z-[2] mt-[6.379px] mr-0 mb-0 ml-[38px]">
        AI powered expertise for Real Estate Success
      </span>
      <div className="w-[83.514px] h-[83.514px] text-[0px] relative z-[6] mt-[45.379px] mr-0 mb-0 ml-[161px]">
        <span className="flex w-[83.514px] h-[83.514px] justify-center items-center font-['League_Spartan'] text-[48px] font-bold leading-[44px] text-[#FCC201] relative text-center whitespace-nowrap z-[6]">
          P
        </span>
        <div className="w-[83.514px] h-[83.514px] bg-[url(https://static.codia.ai/image/2025-03-21/6377570e-5f28-4759-911f-69e7bc64da2d.svg)] bg-cover bg-no-repeat rounded-[50%] absolute top-0 left-0 z-[5]" />
      </div>
      <span
        onClick={handleStartChat}
        className="cursor-pointer flex w-[108px] h-[25px] justify-center items-center font-['Lexend'] text-[20px] font-extralight leading-[25px] text-[#fff] relative text-center whitespace-nowrap z-[25] mt-[29.865px] mr-0 mb-0 ml-[148px]"
      >
        Get Started
      </span>
      <div className="w-[204.475px] h-[48.475px] bg-[#242222] rounded-[44.068px] border-solid border-[0.88px] border-[#FCC201] relative z-[16] mt-[18.379px] mr-0 mb-0 ml-[101px] glow-effect">
        <div className="w-[41.424px] h-[41.424px] bg-[url(https://static.codia.ai/image/2025-03-21/10dee7d1-01f3-43cb-9b7d-52affc4e5eea.svg)] bg-cover bg-no-repeat rounded-[50%] absolute top-[2.644px] left-[2.644px] z-[18]" />
        <div className="w-[25.559px] h-[25.559px] bg-[url(https://static.codia.ai/image/2025-03-21/ddcbe2da-e9dd-4c54-939d-cbd49c930b2d.png)] bg-cover bg-no-repeat absolute top-[10.576px] left-[10.576px] z-[19]" />
        <span className="flex w-[51px] h-[20px] justify-center items-center font-['Montserrat'] text-[16px] font-medium leading-[19.504px] text-[#fff] absolute top-[13.576px] left-[89.085px] text-center whitespace-nowrap z-[17]">
          Ask AI
        </span>
      </div>
      <div className="w-[204.475px] h-[48.475px] bg-[#242222] rounded-[44.068px] border-solid border-[0.88px] border-[#FCC201] relative z-[21] mt-[8.379px] mr-0 mb-0 ml-[101px] glow-effect">
        <div className="w-[41.424px] h-[41.424px] bg-[url(https://static.codia.ai/image/2025-03-21/0431395c-6e2d-4f72-a6c7-280288b07880.svg)] bg-cover bg-no-repeat rounded-[50%] absolute top-[2.644px] left-[2.644px] z-[23]" />
        <div className="w-[22.915px] h-[22.915px] bg-[url(https://static.codia.ai/image/2025-03-21/45a91602-2248-4267-8f99-17444f869f90.png)] bg-cover bg-no-repeat absolute top-[12.339px] left-[10.576px] z-[24]" />
        <span className="flex w-[108px] h-[20px] justify-center items-center font-['Montserrat'] text-[16px] font-medium leading-[19.504px] text-[#fff] absolute top-[12.593px] left-[66.119px] text-center whitespace-nowrap z-[22]">
          Talk to Agent
        </span>
      </div>
      <span className="flex w-[179px] h-[14px] justify-center items-center font-['Lexend'] text-[11px] font-extralight leading-[13.75px] text-[#fff] relative text-center whitespace-nowrap z-[26] mt-[71.43px] mr-0 mb-0 ml-[113px]">
        Powered by Kingsmen Technologies
      </span>
     
    </div>
  );
};

export default Welcome;