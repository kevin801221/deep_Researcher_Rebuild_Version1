import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  loading?: boolean;      // Indicates if research is currently in progress
  isStopped?: boolean;    // Indicates if research was manually stopped
  showResult?: boolean;   // Controls if research results are being displayed
  onStop?: () => void;    // Handler for stopping ongoing research
  onNewResearch?: () => void;  // Handler for starting fresh research
}

const Header = ({ loading, isStopped, showResult, onStop, onNewResearch }: HeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Pure transparent blur background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-transparent"></div>
      
      {/* Header container */}
      <div className="container relative h-[60px] px-4 lg:h-[80px] lg:px-0 pt-4 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          {/* Logo/Home link */}
          <Link href="/">
            <div className="flex items-center">
              <div className="mr-4">
                <Image src="/ycm_logo2.png" alt="YCM Logo" width={70} height={70} className="rounded-lg shadow-md" />
              </div>
              <div className="flex flex-col">
                <span className="text-blue-900 font-semibold text-lg hidden md:block">研究助理</span>
                <span className="text-blue-600 text-xs hidden md:block">Deep Researcher Version 2.0</span>
              </div>
            </div>
          </Link>
          
          </div>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 mr-6">
            <Link href="/" className="text-blue-900 hover:text-blue-700 font-medium">
              首頁
            </Link>
            <Link href="/presentation" className="text-blue-900 hover:text-blue-700 font-medium">
              系統簡介
            </Link>
          </div>
          
          {/* Action buttons container */}
          <div className="flex gap-2 transition-all duration-300 ease-in-out">
            {/* Stop button - shown only during active research */}
            {loading && !isStopped && (
              <button
                onClick={onStop}
                className="flex items-center justify-center px-4 sm:px-6 h-9 sm:h-10 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg whitespace-nowrap min-w-[80px]"
              >
                停止
              </button>
            )}
            {/* New Research button - shown after stopping or completing research */}
            {(isStopped || !loading) && showResult && (
              <button
                onClick={onNewResearch}
                className="flex items-center justify-center px-4 sm:px-6 h-9 sm:h-10 text-sm text-white bg-blue-900 rounded-lg hover:bg-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg whitespace-nowrap min-w-[120px]"
              >
                新研究
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
