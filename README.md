# 我的自定義研究助手 非常厲害的NextJS前端頁面 ：）搭配深度搜索能力

這個專案是基於 YCM-Researcher 核心code的自定義版本，旨在提供更加便捷的研究體驗。

## 目錄結構

```
my-custom-researcher/
├── backend/           # 後端 API 服務
├── frontend/          # NextJS 前端界面
│   └── nextjs/        # NextJS 應用程序
├── gpt_researcher/    # 核心研究功能
├── logs/              # 日誌文件
├── outputs/           # 輸出報告
├── main.py            # 主程序入口
├── requirements.txt   # Python 依賴項
└── .env.example       # 環境變量示例
```

## 快速開始

### 1. 設置環境變量

複製 `.env.example` 文件並重命名為 `.env`，然後填寫必要的 API 密鑰：

```bash
cp .env.example .env
# 編輯 .env 文件，添加您的 API 密鑰
```

主要需要設置的 API 密鑰包括：
- `OPENAI_API_KEY`：用於 LLM 功能
- `TAVILY_API_KEY`：用於網絡搜索

### 2. 安裝依賴項

```bash
pip install -r requirements.txt
```

### 3. 啟動後端服務

```bash
python -m uvicorn main:app --reload
```

後端服務將在 http://localhost:8000 上運行。

### 4. 設置並啟動前端

進入 NextJS 目錄：

```bash
cd frontend/nextjs
```

安裝 Node.js 依賴項：

```bash
npm install
```

創建 `.env.local` 文件，設置 API URL：

```
# 在 frontend/nextjs/.env.local 中添加
NEXT_PUBLIC_API_URL=http://localhost:8000
```

啟動 NextJS 開發服務器：

```bash
npm run dev
```

前端將在 http://localhost:3000 上運行。

## 自定義指南

### 修改前端界面

NextJS 前端位於 `frontend/nextjs` 目錄中，您可以根據需要修改以下文件：

- `app/` - 主要的頁面組件
- `components/` - 可重用的 UI 組件
- `styles/` - CSS 樣式文件
- `public/` - 靜態資源（圖像、字體等）

### 修改後端功能

核心研究功能位於 `gpt_researcher/` 目錄中，您可以根據需要修改以下文件：

- `agent.py` - 主要的研究代理
- `prompts.py` - LLM 提示模板
- `actions/` - 研究操作
- `skills/` - 研究技能
- `retrievers/` - 搜索和檢索功能

API 服務位於 `backend/server/` 目錄中，主要的 API 端點定義在 `server.py` 文件中。

## 注意事項

- 請確保您已經設置了必要的 API 密鑰
- 如果您修改了核心功能，請確保相應地更新前端界面
- 對於生產環境，建議使用更安全的方式來管理環境變量和 API 密鑰

python -m uvicorn main:app --reload --port 8000
frontend/nextjs下面
PORT=3001 npm run dev (跑在3001端口)
