'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const slides = [
  {
    title: '學術知識蒐集系統',
    subtitle: '智能化學術研究的新時代',
    content: '本系統整合先進的人工智能技術，為研究人員提供全方位的學術知識蒐集與分析服務，大幅提升研究效率與質量。',
    image: '/presentation/slide1.png'
  },
  {
    title: '系統核心功能',
    subtitle: '全面提升研究效率',
    content: '• 智能文獻檢索：自動從多個學術數據庫中檢索相關文獻\n• 深度內容分析：提取關鍵信息，生成研究摘要\n• 跨語言資源整合：支持多語言文獻的檢索與翻譯\n• 研究趨勢分析：識別研究領域的熱點與發展方向',
    image: '/presentation/slide2.png'
  },
  {
    title: '先進的檢索技術',
    subtitle: '精準定位研究資源',
    content: '系統採用語義理解技術，能夠理解研究問題的核心概念與關聯性，從而提供更加精準的檢索結果。支持複雜查詢語法，允許研究者精確定義檢索範圍與條件。',
    image: '/presentation/slide3.png'
  },
  {
    title: '深度內容分析',
    subtitle: '從海量信息中提取價值',
    content: '運用自然語言處理技術，系統能夠自動分析文獻內容，提取關鍵概念、方法論、研究結果等核心信息，並生成結構化的研究摘要，幫助研究者快速把握文獻要點。',
    image: '/presentation/slide4.png'
  },
  {
    title: '知識整合與可視化',
    subtitle: '構建研究知識網絡',
    content: '系統將檢索到的信息進行智能整合，構建研究領域的知識網絡，通過可視化方式展現概念間的關聯性，幫助研究者發現潛在的研究方向與創新點。',
    image: '/presentation/slide5.png'
  },
  {
    title: '研究報告生成',
    subtitle: '高效產出研究成果',
    content: '基於收集的資料，系統能夠自動生成結構完整、內容豐富的研究報告，包括文獻綜述、研究現狀分析、未來發展趨勢等，為研究者提供堅實的理論基礎。',
    image: '/presentation/slide6.png'
  },
  {
    title: '系統優勢',
    subtitle: '引領學術研究新範式',
    content: '• 時間效率：將傳統文獻檢索時間縮短80%\n• 全面性：覆蓋全球主要學術數據庫資源\n• 深度分析：提供比傳統檢索更深入的內容理解\n• 個性化：根據研究者興趣與需求調整檢索策略\n• 協作性：支持團隊協作與知識共享',
    image: '/presentation/slide7.png'
  },
  {
    title: '開始使用',
    subtitle: '踏上智能研究之旅',
    content: '立即體驗學術知識蒐集系統，開啟您的智能研究之旅。我們提供全面的技術支持與培訓服務，確保您能夠充分利用系統的強大功能，提升研究效率與質量。',
    image: '/presentation/slide8.png'
  }
];

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">學術知識蒐集系統</h1>
          <p className="text-xl text-gray-600">簡報介紹</p>
          <p className="text-sm text-blue-600 mt-2">YCM Deep Researcher Version 2.0</p>
        </header>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="relative h-[500px] md:h-[600px]">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 p-8 md:p-12 flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  x: currentSlide === index ? 0 : 100,
                  display: currentSlide === index ? 'flex' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                  <h2 className="text-3xl font-bold text-blue-900 mb-2">{slide.title}</h2>
                  <h3 className="text-xl text-blue-700 mb-4">{slide.subtitle}</h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {slide.content}
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-center">
                  <div className="w-full h-64 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">圖片展示區域</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <button 
              onClick={prevSlide}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
            >
              上一頁
            </button>
            
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? 'bg-blue-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800 transition"
            >
              下一頁
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-900 hover:underline">
            返回主頁
          </Link>
        </div>
      </div>
    </div>
  );
}
