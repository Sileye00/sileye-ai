import React from "react"
import {
  AiOutlineFacebook,
  AiOutlineLinkedin,
  AiOutlineYoutube,
} from "react-icons/ai"
import { RiTwitterXLine } from "react-icons/ri"

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
      <hr className="w-full h-0.5 mx-auto mt-8 bg-gradient-to-r from-pink-400 to-purple-400 border-0"></hr>
      <div className="mx-auto p-4 flex flex-col text-center text-neutral-900 md:flex-row md:justify-between bg-gradient-to-r from-pink-50 via-purple-50 to-violet-50 rounded-lg mt-4">
        <div className="flex flex-row items-center justify-center space-x-1 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 font-semibold">
          © {currentYear} SilEyeAI | All Rights Reserved<a href="/" className="hover:underline"></a>
        </div>
        <div className="flex flex-row items-center justify-center space-x-2 mb-1">
          <a href="" rel="noreferrer" target="_blank">
            <AiOutlineFacebook
              className="hover:-translate-y-1 transition-transform cursor-pointer text-pink-600 hover:text-purple-600"
              size={30}
            />
          </a>
          <a
            href=""
            rel="noreferrer"
            target="_blank"
          >
            <RiTwitterXLine
              className="hover:-translate-y-1 transition-transform cursor-pointer text-pink-600 hover:text-purple-600"
              size={30}
            />
          </a>

          <a
            href=""
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineLinkedin
              className="hover:-translate-y-1 transition-transform cursor-pointer text-pink-600 hover:text-purple-600"
              size={30}
            />
          </a>
          <a
            href=""
            rel="noreferrer"
            target="_blank"
          >
            <AiOutlineYoutube
              className="hover:-translate-y-1 transition-transform cursor-pointer text-pink-600 hover:text-purple-600"
              size={30}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer