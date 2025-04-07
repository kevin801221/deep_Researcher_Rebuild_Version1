import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

// 假設我們從品牌配置文件導入
import brandConfig from '../brand_config.json';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    query: '',
    report_type: brandConfig.defaultSettings.reportType,
    tone: brandConfig.defaultSettings.tone,
    report_source: brandConfig.defaultSettings.reportSource,
    domains: ''
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // 檢查用戶偏好的主題
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSourceChange = (e) => {
    const { value, dataset } = e.target;
    const newFormData = {
      ...formData,
      report_source: value
    };

    // 如果有特定的檢索器或主題，也添加它們
    if (dataset.retrievers) {
      newFormData.retrievers = dataset.retrievers;
    }
    if (dataset.topic) {
      newFormData.topic = dataset.topic;
    }

    setFormData(newFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 構建查詢參數
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      // 重定向到研究頁面
      router.push(`/research?${params.toString()}`);
    } catch (error) {
      console.error('提交表單時出錯:', error);
      toast.error('啟動研究時出錯，請稍後再試');
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Head>
        <title>{brandConfig.appName}</title>
        <meta name="description" content="智能研究助手 - 讓研究變得更簡單" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <Toaster position="top-right" />

      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-3">
            <Image 
              src={brandConfig.logoPath} 
              alt={brandConfig.companyName} 
              width={50} 
              height={50} 
              className="rounded-lg"
            />
            <h1 className="text-3xl font-bold" style={{ color: brandConfig.primaryColor }}>
              {brandConfig.appName}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-opacity-10 hover:bg-gray-500">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span>用戶</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto">
          <div className={`p-8 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-semibold mb-6 text-center">開始您的研究</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="query" className="block text-sm font-medium mb-2">
                  您想研究什麼?
                </label>
                <input
                  type="text"
                  id="query"
                  name="query"
                  value={formData.query}
                  onChange={handleInputChange}
                  placeholder="輸入您的研究問題..."
                  className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-opacity-50`}
                  style={{ focusRing: brandConfig.primaryColor }}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="report_type" className="block text-sm font-medium mb-2">
                    報告類型
                  </label>
                  <select
                    id="report_type"
                    name="report_type"
                    value={formData.report_type}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-opacity-50`}
                  >
                    <option value="outline_report">大綱摘要 (1-2分鐘)</option>
                    <option value="research_report">標準報告 (3-5分鐘)</option>
                    {brandConfig.features.enableDeepResearch && (
                      <option value="deep">深度研究 (10+分鐘)</option>
                    )}
                    <option value="resource_report">資源列表</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="tone" className="block text-sm font-medium mb-2">
                    報告語調
                  </label>
                  <select
                    id="tone"
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-opacity-50`}
                  >
                    <option value="Objective">客觀中立</option>
                    <option value="Analytical">分析性</option>
                    <option value="Critical">批判性</option>
                    <option value="Formal">學術正式</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-3">
                  研究來源
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`relative rounded-lg border p-4 flex flex-col items-center cursor-pointer ${formData.report_source === 'web' && !formData.retrievers ? 'ring-2' : ''} ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                    style={{ ring: brandConfig.primaryColor }}
                  >
                    <input
                      type="radio"
                      name="source"
                      id="sourceWeb"
                      value="web"
                      checked={formData.report_source === 'web' && !formData.retrievers}
                      onChange={handleSourceChange}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <label htmlFor="sourceWeb" className="block text-sm font-medium">
                      網絡
                    </label>
                  </div>
                  
                  <div className={`relative rounded-lg border p-4 flex flex-col items-center cursor-pointer ${formData.retrievers === 'arxiv,semantic_scholar' ? 'ring-2' : ''} ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                    style={{ ring: brandConfig.primaryColor }}
                  >
                    <input
                      type="radio"
                      name="source"
                      id="sourceAcademic"
                      value="web"
                      data-retrievers="arxiv,semantic_scholar"
                      checked={formData.retrievers === 'arxiv,semantic_scholar'}
                      onChange={handleSourceChange}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <label htmlFor="sourceAcademic" className="block text-sm font-medium">
                      學術論文
                    </label>
                  </div>
                  
                  <div className={`relative rounded-lg border p-4 flex flex-col items-center cursor-pointer ${formData.retrievers === 'tavily' && formData.topic === 'news' ? 'ring-2' : ''} ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                    style={{ ring: brandConfig.primaryColor }}
                  >
                    <input
                      type="radio"
                      name="source"
                      id="sourceNews"
                      value="web"
                      data-retrievers="tavily"
                      data-topic="news"
                      checked={formData.retrievers === 'tavily' && formData.topic === 'news'}
                      onChange={handleSourceChange}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    <label htmlFor="sourceNews" className="block text-sm font-medium">
                      新聞
                    </label>
                  </div>
                  
                  {brandConfig.features.enableLocalDocuments && (
                    <div className={`relative rounded-lg border p-4 flex flex-col items-center cursor-pointer ${formData.report_source === 'local' ? 'ring-2' : ''} ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}
                      style={{ ring: brandConfig.primaryColor }}
                    >
                      <input
                        type="radio"
                        name="source"
                        id="sourceLocal"
                        value="local"
                        checked={formData.report_source === 'local'}
                        onChange={handleSourceChange}
                        className="sr-only"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                      </svg>
                      <label htmlFor="sourceLocal" className="block text-sm font-medium">
                        本地文件
                      </label>
                    </div>
                  )}
                </div>
              </div>
              
              {formData.report_source === 'web' && (
                <div>
                  <label htmlFor="domains" className="block text-sm font-medium mb-2">
                    指定網域 (可選)
                  </label>
                  <input
                    type="text"
                    id="domains"
                    name="domains"
                    value={formData.domains}
                    onChange={handleInputChange}
                    placeholder="輸入網域，用逗號分隔 (例如: nytimes.com, bbc.com)"
                    className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'} focus:ring-2 focus:ring-opacity-50`}
                  />
                </div>
              )}
              
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 rounded-lg font-medium text-white transition-colors flex items-center space-x-2"
                  style={{ backgroundColor: isLoading ? '#718096' : brandConfig.primaryColor, 
                           boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)` }}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>處理中...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>開始研究</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="rounded-full w-12 h-12 flex items-center justify-center mb-4" style={{ backgroundColor: brandConfig.primaryColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">快速研究</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                在幾分鐘內獲取全面的研究報告，節省您寶貴的時間。
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="rounded-full w-12 h-12 flex items-center justify-center mb-4" style={{ backgroundColor: brandConfig.primaryColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">可靠來源</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                從多個可靠來源收集資訊，確保研究結果的準確性和全面性。
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <div className="rounded-full w-12 h-12 flex items-center justify-center mb-4" style={{ backgroundColor: brandConfig.primaryColor }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">多種格式</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                支援多種報告格式，包括 PDF、Word 和 Markdown，滿足您的不同需求。
              </p>
            </div>
          </div>
        </main>
        
        <footer className="mt-16 text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
            {brandConfig.footerText}
          </p>
          <div className="flex justify-center space-x-4">
            {Object.entries(brandConfig.socialLinks).map(([platform, url]) => (
              <a 
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {platform === 'facebook' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                )}
                {platform === 'twitter' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                )}
                {platform === 'linkedin' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
