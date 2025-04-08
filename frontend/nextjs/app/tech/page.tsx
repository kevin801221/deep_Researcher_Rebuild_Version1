"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';

// 技術部分的組件
interface TechSectionProps {
  title: string;
  children: React.ReactNode;
}

const TechSection = ({ title, children }: TechSectionProps) => (
  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
    <h3 className="text-2xl font-bold text-blue-900 mb-4">{title}</h3>
    <div className="text-gray-700">
      {children}
    </div>
  </div>
);

// Tab 組件
interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Tab = ({ active, onClick, children }: TabProps) => (
  <button 
    onClick={onClick} 
    className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
      active 
        ? "bg-blue-900 text-white" 
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`}
  >
    {children}
  </button>
);

export default function TechPage() {
  const [activeTab, setActiveTab] = useState<string>('architecture');
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">技術架構說明</h1>
          <p className="text-xl text-gray-600">YCM Deep Researcher 技術細節</p>
          <p className="text-sm text-blue-600 mt-2">基於 GPT Researcher 的自動化學術研究系統</p>
        </header>

        {/* 標籤欄 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Tab 
            active={activeTab === 'architecture'} 
            onClick={() => handleTabChange('architecture')}
          >
            系統架構
          </Tab>
          <Tab 
            active={activeTab === 'frontend'} 
            onClick={() => handleTabChange('frontend')}
          >
            前端技術
          </Tab>
          <Tab 
            active={activeTab === 'backend'} 
            onClick={() => handleTabChange('backend')}
          >
            後端技術
          </Tab>
          <Tab 
            active={activeTab === 'workflow'} 
            onClick={() => handleTabChange('workflow')}
          >
            研究工作流程
          </Tab>
          <Tab 
            active={activeTab === 'llm'} 
            onClick={() => handleTabChange('llm')}
          >
            AI 模型與整合
          </Tab>
        </div>

        {/* 架構總覽 */}
        {activeTab === 'architecture' && (
          <div className="space-y-8">
            <TechSection title="系統架構總覽">
              <p className="mb-4">
                YCM Deep Researcher 是一個建立在 GPT Researcher 開源專案基礎上的自動化學術研究系統。
                本系統採用現代化的前後端分離架構，結合了多種先進的人工智能和網頁技術，實現高效的自動化研究流程。
              </p>
              
              <div className="my-8">
                <h4 className="text-lg font-semibold mb-2">系統架構圖</h4>
                <div className="border rounded-lg p-2 bg-white">
                  <div className="mermaid">
                    {`
                    graph TD
                      subgraph Frontend["前端 (NextJS)"]
                        UI[用戶界面]
                        StateMgmt[狀態管理]
                        WSClient[WebSocket 客戶端]
                      end
                      
                      subgraph Backend["後端 (FastAPI)"]
                        API[REST API]
                        WebSock[WebSocket 服務]
                        ChatAgent[聊天代理]
                        Research[研究流程管理]
                        ReportGen[報告生成]
                      end
                      
                      subgraph AILayer["AI 層"]
                        LLM[大型語言模型]
                        VStore[向量存儲]
                        Embed[嵌入模型]
                      end
                      
                      subgraph DataSources["數據源"]
                        Web[網頁搜索]
                        Files[本地文件]
                      end
                      
                      UI --> StateMgmt
                      StateMgmt --> WSClient
                      WSClient <--> WebSock
                      
                      API --> Research
                      WebSock --> ChatAgent
                      WebSock --> Research
                      Research --> ReportGen
                      
                      ChatAgent --> LLM
                      Research --> LLM
                      Research --> VStore
                      ReportGen --> LLM
                      
                      VStore --> Embed
                      Research --> Web
                      Research --> Files
                    `}
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">核心技術堆疊</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>前端：Next.js, React, Tailwind CSS</li>
                    <li>後端：FastAPI, Python</li>
                    <li>AI模型：OpenAI GPT 模型系列</li>
                    <li>通訊：WebSocket, REST API</li>
                    <li>數據處理：LangChain, 向量搜索</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">系統亮點</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>多代理協作研究框架</li>
                    <li>實時研究流程反饋</li>
                    <li>混合數據源研究能力</li>
                    <li>智能化報告生成</li>
                    <li>研究記憶與持久化</li>
                  </ul>
                </div>
              </div>
            </TechSection>
          </div>
        )}
        
        {/* 前端技術 */}
        {activeTab === 'frontend' && (
          <div className="space-y-8">
            <TechSection title="前端技術架構">
              <p className="mb-4">
                YCM Deep Researcher 的前端採用 Next.js 框架構建，利用 React 的組件化特性和 Tailwind CSS 的靈活設計，
                打造了一個現代化、響應式的用戶界面。系統前端實現了與後端的無縫通訊、狀態管理和複雜數據的可視化呈現。
              </p>
              
              <div className="my-8">
                <h4 className="text-lg font-semibold mb-2">前端架構圖</h4>
                <div className="border rounded-lg p-2 bg-white">
                  <div className="mermaid">
                    {`
                    graph TD
                      subgraph Frontend["前端架構"]
                        NextApp[Next.js App]
                        
                        subgraph Components["組件層"]
                          Hero[Hero 組件]
                          Form[研究表單]
                          Result[研究結果顯示]
                          Sidebar[側邊欄]
                          History[歷史記錄]
                        end
                        
                        subgraph Hooks["鉤子層"]
                          UseWS[WebSocket 鉤子]
                          UseHistory[歷史記錄鉤子]
                          UseAnalytics[分析鉤子]
                        end
                        
                        subgraph Utils["工具層"]
                          Format[格式化工具]
                          Helpers[輔助函數]
                          DataProc[數據處理]
                        end
                        
                        NextApp --> Components
                        Components --> Hooks
                        Components --> Utils
                        
                        WebSocket[WebSocket 連接]
                        API[REST API 請求]
                        
                        UseWS --> WebSocket
                        UseHistory --> API
                      end
                      
                      WebSocket --> Backend[後端服務]
                      API --> Backend
                    `}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">核心前端技術</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">Next.js & React</h5>
                      <p className="text-sm mt-2">
                        採用 Next.js 框架提供的 App Router 架構，實現頁面路由、組件渲染和伺服器端組件功能。
                        使用 React 的函數式組件和 Hooks API 構建交互式用戶界面。
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">Tailwind CSS</h5>
                      <p className="text-sm mt-2">
                        採用 Tailwind 的原子化 CSS 框架，實現高度自定義的視覺設計和響應式佈局，
                        確保在桌面端和移動端都能提供良好的用戶體驗。
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">Framer Motion</h5>
                      <p className="text-sm mt-2">
                        整合 Framer Motion 動畫庫，實現流暢的頁面過渡和元素動畫效果，
                        提升整體用戶體驗和界面互動性。
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">通訊與數據流</h4>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <div className="mermaid">
                      {`
                      sequenceDiagram
                        participant U as 用戶
                        participant UI as 用戶界面
                        participant HK as 狀態鉤子
                        participant WS as WebSocket 客戶端
                        participant BE as 後端服務
                        
                        U->>UI: 提交研究查詢
                        UI->>HK: 更新查詢狀態
                        HK->>WS: 發送WebSocket消息
                        WS->>BE: 傳送研究請求
                        
                        BE-->>WS: 研究進度更新
                        WS-->>HK: 接收狀態更新
                        HK-->>UI: 更新界面
                        UI-->>U: 展示研究進度
                        
                        BE-->>WS: 返回完整研究報告
                        WS-->>HK: 更新報告狀態
                        HK-->>UI: 渲染研究報告
                        UI-->>U: 展示最終報告
                      `}
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">前端特色功能</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>實時研究進度展示</li>
                      <li>研究歷史記錄管理</li>
                      <li>多種數據可視化展現</li>
                      <li>響應式設計適配多設備</li>
                      <li>漸進式加載優化用戶體驗</li>
                      <li>多主題與語言支持</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">組件結構</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Page 組件</strong>：頁面級組件，如首頁、報告頁</li>
                      <li><strong>UI 組件</strong>：如 Header、Footer、Modal</li>
                      <li><strong>功能組件</strong>：如 ResearchForm、ResearchResults</li>
                      <li><strong>展示組件</strong>：如 SourceCard、ImageSection</li>
                      <li><strong>布局組件</strong>：控制頁面結構和排版</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TechSection>
          </div>
        )}
        
        {/* 後端技術 */}
        {activeTab === 'backend' && (
          <div className="space-y-8">
            <TechSection title="後端技術架構">
              <p className="mb-4">
                YCM Deep Researcher 的後端採用 FastAPI 框架構建，結合 Python 生態系統的強大功能，實現了高效的研究流程管理、
                數據處理和 AI 模型整合。後端架構設計著重於擴展性、穩定性和實時處理能力。
              </p>
              
              <div className="my-8">
                <h4 className="text-lg font-semibold mb-2">後端架構圖</h4>
                <div className="border rounded-lg p-2 bg-white">
                  <div className="mermaid">
                    {`
                    graph TD
                      subgraph BackendServices["後端服務架構"]
                        FastAPI[FastAPI 應用]
                        
                        subgraph ServerModules["服務器模組"]
                          WSManager[WebSocket 管理器]
                          ServerUtils[服務工具]
                          Routes[API 路由]
                          CustomAPI[自定義 API]
                        end
                        
                        subgraph ResearchCore["研究核心"]
                          GPTResearcher[GPT Researcher]
                          ChatAgent[聊天代理]
                          ReportGen[報告生成器]
                          MediaProcessing[媒體處理]
                        end
                        
                        subgraph AIComponents["AI 組件"]
                          LangChain[LangChain 整合]
                          Memory[記憶與向量存儲]
                          Retrievers[檢索器]
                          Agents[代理系統]
                        end
                        
                        subgraph DataHandling["數據處理"]
                          Document[文檔處理]
                          Context[上下文壓縮]
                          Embedding[嵌入處理]
                        end
                        
                        FastAPI --> ServerModules
                        FastAPI --> ResearchCore
                        ResearchCore --> AIComponents
                        ResearchCore --> DataHandling
                      end
                      
                      Client[客戶端] --> FastAPI
                      FastAPI --> ExternalAPIs[外部 API]
                      ResearchCore --> ExternalAPIs
                    `}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">核心後端技術</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">FastAPI</h5>
                      <p className="text-sm mt-2">
                        採用 FastAPI 框架提供高性能的 API 服務，支持異步處理、
                        自動生成 API 文檔，以及 WebSocket 通訊功能，實現實時數據流。
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">LangChain</h5>
                      <p className="text-sm mt-2">
                        整合 LangChain 框架，提供強大的語言模型應用能力，包括鏈式處理、
                        代理設計、記憶管理和文檔處理，打造靈活的研究流程。
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">向量存儲與檢索</h5>
                      <p className="text-sm mt-2">
                        實現基於向量的文本存儲和語義檢索系統，支持多種嵌入模型和檢索策略，
                        實現高效的相關性搜索和上下文識別。
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">研究流程管理</h4>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <div className="mermaid">
                      {`
                      flowchart TD
                        Start(開始研究) --> Init[初始化研究配置]
                        Init --> AgentSelect[選擇研究代理]
                        AgentSelect --> QueryProcess[處理查詢]
                        QueryProcess --> SubQGen[生成子查詢]
                        
                        SubQGen --> ParallelSearch{並行處理}
                        ParallelSearch --> Retrieval[檢索相關資料]
                        ParallelSearch --> WebScrape[網頁抓取]
                        ParallelSearch --> DocScan[文檔掃描]
                        
                        Retrieval --> Compress[內容壓縮]
                        WebScrape --> Compress
                        DocScan --> Compress
                        
                        Compress --> ContextBuild[構建研究上下文]
                        ContextBuild --> ReportGen[生成報告]
                        ReportGen --> Output[輸出最終結果]
                        
                        style Start fill:#d4f1f9,stroke:#05728f
                        style Output fill:#d4f9d4,stroke:#058f05
                      `}
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">後端特色功能</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>多代理協作研究系統</li>
                      <li>異步處理大規模數據</li>
                      <li>實時WebSocket通訊</li>
                      <li>自適應研究策略</li>
                      <li>多模型支持與切換</li>
                      <li>報告格式定制與轉換</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">數據流與處理</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>文檔處理</strong>：支持多種格式文檔解析</li>
                      <li><strong>網頁抓取</strong>：智能抓取與內容提取</li>
                      <li><strong>上下文壓縮</strong>：關鍵信息提取與整合</li>
                      <li><strong>報告生成</strong>：結構化文本生成</li>
                      <li><strong>記憶管理</strong>：研究上下文持久化</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow">
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">後端模組結構</h4>
                  <div className="mermaid">
                    {`
                    classDiagram
                      class FastAPI {
                        +WebSocketManager ws_manager
                        +startup()
                        +routes()
                      }
                      
                      class WebSocketManager {
                        +active_connections
                        +connect()
                        +disconnect()
                        +start_streaming()
                        +chat()
                      }
                      
                      class ChatAgent {
                        +report
                        +config
                        +vector_store
                        +create_agent()
                        +chat()
                      }
                      
                      class Researcher {
                        +query
                        +config
                        +conduct_research()
                        +write_report()
                      }
                      
                      class ReportGenerator {
                        +generate_introduction()
                        +generate_report()
                        +generate_conclusion()
                      }
                      
                      class DocumentLoader {
                        +load()
                        +process_document()
                      }
                      
                      FastAPI --> WebSocketManager
                      WebSocketManager --> ChatAgent
                      WebSocketManager --> Researcher
                      Researcher --> ReportGenerator
                      Researcher --> DocumentLoader
                    `}
                  </div>
                </div>
              </div>
            </TechSection>
          </div>
        )}
        
        {/* 研究工作流程 */}
        {activeTab === 'workflow' && (
          <div className="space-y-8">
            <TechSection title="研究工作流程">
              <p className="mb-4">
                YCM Deep Researcher 實現了一個完整的自動化研究流程，從查詢分析到最終報告生成。
                系統通過多個協作階段，實現對研究課題的深入探索和知識整合。
              </p>
              
              <div className="my-8">
                <h4 className="text-lg font-semibold mb-2">研究流程圖</h4>
                <div className="border rounded-lg p-2 bg-white">
                  <div className="mermaid">
                    {`
                    graph TD
                      Query[用戶查詢] --> Analysis[查詢分析]
                      Analysis --> Planning[研究計劃制定]
                      Planning --> QueryExpansion[查詢擴展]
                      
                      QueryExpansion --> Retrieval[信息檢索]
                      Retrieval --> Scraping[網頁抓取]
                      Scraping --> Filtering[信息過濾與篩選]
                      
                      Filtering --> Integration[信息整合]
                      Integration --> Synthesis[知識合成]
                      Synthesis --> StructureGen[報告結構生成]
                      
                      StructureGen --> ContentGen[內容生成]
                      ContentGen --> Revision[審核與修訂]
                      Revision --> FinalReport[最終報告]
                      
                      classDef start fill:#d4f1f9,stroke:#05728f;
                      classDef end fill:#d4f9d4,stroke:#05728f;
                      class Query start;
                      class FinalReport end;
                    `}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">研究階段詳解</h4>
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">階段</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">功能描述</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">技術實現</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">查詢分析</td>
                            <td className="px-6 py-4 text-sm text-gray-700">分析用戶查詢意圖、範圍和焦點</td>
                            <td className="px-6 py-4 text-sm text-gray-700">LLM 文本理解, 意圖識別</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">研究計劃制定</td>
                            <td className="px-6 py-4 text-sm text-gray-700">制定研究方向、子主題和資源分配</td>
                            <td className="px-6 py-4 text-sm text-gray-700">代理策略規劃, 研究方向定義</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">查詢擴展</td>
                            <td className="px-6 py-4 text-sm text-gray-700">生成相關子查詢以擴大研究範圍</td>
                            <td className="px-6 py-4 text-sm text-gray-700">Query planning, 語義擴展</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">信息檢索</td>
                            <td className="px-6 py-4 text-sm text-gray-700">從多種來源獲取相關信息</td>
                            <td className="px-6 py-4 text-sm text-gray-700">Web 檢索, 本地文檔掃描</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">信息整合</td>
                            <td className="px-6 py-4 text-sm text-gray-700">整合來自不同來源的信息</td>
                            <td className="px-6 py-4 text-sm text-gray-700">上下文壓縮, 向量相似度</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-900">報告生成</td>
                            <td className="px-6 py-4 text-sm text-gray-700">生成結構化的研究報告</td>
                            <td className="px-6 py-4 text-sm text-gray-700">LLM 長文本生成, Markdown 格式化</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">信息處理流</h4>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <div className="mermaid">
                      {`
                      sequenceDiagram
                        participant User as 用戶
                        participant System as 系統
                        participant Agent as 研究代理
                        participant Web as Web 資源
                        participant Files as 本地文件
                        participant LLM as 語言模型
                        
                        User->>System: 提交研究查詢
                        System->>Agent: 初始化研究
                        Agent->>LLM: 分析研究主題
                        
                        Agent->>Web: 檢索相關資源
                        Web-->>Agent: 返回網頁內容
                        Agent->>Files: 掃描本地文件
                        Files-->>Agent: 返回文件內容
                        
                        Agent->>LLM: 整合信息
                        LLM-->>Agent: 生成研究結論
                        Agent->>System: 提交研究報告
                        System-->>User: 返回研究結果
                      `}
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">工作流特點</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>多代理協作研究</li>
                      <li>深度上下文理解</li>
                      <li>自適應研究方向調整</li>
                      <li>持續學習與迭代優化</li>
                      <li>實時反饋與狀態更新</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">研究輸出格式</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>結構化 Markdown 報告</li>
                      <li>引用來源與參考文獻</li>
                      <li>PDF 與 Word 文檔輸出</li>
                      <li>研究日誌與過程記錄</li>
                      <li>相關圖片與媒體資源</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TechSection>
          </div>
        )}
        
        {/* AI 模型 */}
        {activeTab === 'llm' && (
          <div className="space-y-8">
            <TechSection title="AI 模型與整合技術">
              <p className="mb-4">
                YCM Deep Researcher 深度整合了多種人工智能模型和技術，實現高效的自動化研究能力。
                系統核心採用大型語言模型(LLM)，結合向量嵌入和語義搜索技術，進行複雜的知識處理和生成。
              </p>
              
              <div className="my-8">
                <h4 className="text-lg font-semibold mb-2">AI 整合架構</h4>
                <div className="border rounded-lg p-2 bg-white">
                  <div className="mermaid">
                    {`
                    graph TD
                      subgraph LLMLayer["LLM 層"]
                        GPT[OpenAI GPT 模型]
                        LangChain[LangChain 框架]
                        Prompts[提示工程]
                      end
                      
                      subgraph EmbeddingLayer["嵌入層"]
                        Embedding[嵌入模型]
                        VectorDB[向量數據庫]
                        Retrieval[相關性檢索]
                      end
                      
                      subgraph AgentLayer["代理層"]
                        AgentFramework[代理框架]
                        Reasoning[推理系統]
                        Planning[規劃系統]
                        Memory[記憶系統]
                      end
                      
                      subgraph IntegrationLayer["整合層"]
                        ChatAgent[聊天代理]
                        Research[研究系統]
                        RAG[檢索增強生成]
                      end
                      
                      LLMLayer --> IntegrationLayer
                      EmbeddingLayer --> IntegrationLayer
                      AgentLayer --> IntegrationLayer
                      
                      classDef primary fill:#d4f1f9,stroke:#05728f;
                      class GPT,Embedding,AgentFramework primary;
                    `}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">核心 AI 技術</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">大型語言模型</h5>
                      <p className="text-sm mt-2">
                        系統默認使用 OpenAI 的 GPT-4 系列模型，支持多種配置選項：
                        <ul className="list-disc pl-5 mt-1">
                          <li>快速模型(GPT-4o-mini)：用於初步分析</li>
                          <li>智能模型(GPT-4-2024)：用於深度研究</li>
                          <li>策略模型(O3-mini)：用於研究規劃</li>
                        </ul>
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">嵌入與向量檢索</h5>
                      <p className="text-sm mt-2">
                        使用 text-embedding-3-small 模型將文本轉換為向量表示，
                        實現基於語義的相似度匹配和相關性檢索，支持記憶管理和上下文壓縮。
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold">RAG 與知識整合</h5>
                      <p className="text-sm mt-2">
                        實現檢索增強生成(RAG)技術，將外部知識無縫整合到生成過程中，
                        確保研究內容的準確性、完整性和可追溯性。
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">代理系統設計</h4>
                  <div className="bg-white p-5 rounded-lg shadow">
                    <div className="mermaid">
                      {`
                      flowchart LR
                        subgraph AgentCollaboration["代理協作系統"]
                          direction TB
                          
                          Controller[控制代理]
                          
                          subgraph Specialized["專業代理"]
                            direction LR
                            Researcher[研究代理]
                            Writer[寫作代理]
                            Critic[評論代理]
                          end
                          
                          Controller <--> Specialized
                        end
                        
                        User[用戶] --> Controller
                        Controller --> Result[研究結果]
                        
                        classDef controller fill:#f9d4d4,stroke:#8f0505;
                        classDef agents fill:#d4f1f9,stroke:#05728f;
                        classDef external fill:#d4f9d4,stroke:#058f05;
                        
                        class Controller controller;
                        class Researcher,Writer,Critic agents;
                        class User,Result external;
                      `}
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">提示工程</h4>
                    <p className="text-sm mb-2">系統採用先進的提示工程技術，為不同研究階段設計專門的提示模板：</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>代理選擇提示</strong>：選擇最適合研究主題的代理類型</li>
                      <li><strong>查詢擴展提示</strong>：生成相關子查詢</li>
                      <li><strong>信息整合提示</strong>：從多種來源整合信息</li>
                      <li><strong>結構化報告提示</strong>：生成格式一致的報告</li>
                      <li><strong>專業評估提示</strong>：評估內容準確性和質量</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-900 mb-2">模型配置與優化</h4>
                    <p className="text-sm mb-2">系統能夠根據研究需求動態調整模型配置：</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>溫度設置</strong>：調整創造性與確定性平衡</li>
                      <li><strong>上下文窗口</strong>：靈活處理長文本</li>
                      <li><strong>篩選閾值</strong>：調整檢索相關性要求</li>
                      <li><strong>多模型協作</strong>：根據任務分配不同模型</li>
                      <li><strong>令牌優化</strong>：高效利用模型容量</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h4 className="text-xl font-semibold text-blue-900 mb-2">LangChain 整合</h4>
                  <p className="mb-4">YCM Deep Researcher 深度整合 LangChain 框架，實現以下關鍵功能：</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">代理與工具設計</h5>
                      <ul className="list-disc pl-5 text-sm">
                        <li>ReactAgent：實現思考-行動-反思循環</li>
                        <li>工具整合：搜索、文檔處理、記憶管理</li>
                        <li>自定義檢索器：靈活的信息獲取策略</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 mb-1">文檔處理與內存管理</h5>
                      <ul className="list-disc pl-5 text-sm">
                        <li>上下文壓縮：優化長文本處理</li>
                        <li>向量存儲：高效語義檢索</li>
                        <li>文檔加載器：支持多種文檔格式</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TechSection>
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-900 hover:underline">
            返回主頁
          </a>
        </div>
      </div>
      
      {/* Mermaid JS 整合 - 使用 Next.js Script 組件 */}
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.mermaid.initialize({
            startOnLoad: true,
            theme: 'neutral',
            securityLevel: 'loose',
            fontFamily: '"Montserrat", sans-serif',
          });
        }}
      />
    </div>
  );
}