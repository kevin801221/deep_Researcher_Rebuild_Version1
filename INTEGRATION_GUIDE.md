# 自定義研究助手整合指南

本指南將幫助您了解如何將自定義功能與 GPT-Researcher 的核心組件整合，特別是簡化的電子郵件服務和前端自定義。

## 目錄

1. [專案結構](#專案結構)
2. [後端整合](#後端整合)
3. [前端整合](#前端整合)
4. [簡化的電子郵件服務](#簡化的電子郵件服務)
5. [自定義品牌](#自定義品牌)
6. [部署建議](#部署建議)

## 專案結構

```
my-custom-researcher/
├── backend/
│   ├── custom_api.py       # 自定義 API 端點
│   ├── email_service.py    # 簡化的電子郵件服務
│   └── server/             # 原始後端服務
├── frontend/
│   ├── brand_config.json   # 品牌配置
│   ├── custom_index.jsx    # 自定義首頁模板
│   └── nextjs/             # NextJS 前端
├── gpt_researcher/         # 核心研究功能
├── logs/                   # 日誌文件
├── outputs/                # 輸出報告
├── my-docs/                # 本地文檔
├── custom_main.py          # 自定義主程序
├── main.py                 # 原始主程序
├── requirements.txt        # Python 依賴項
└── .env                    # 環境變量
```

## 後端整合

### 啟動自定義後端

使用自定義主程序啟動後端服務：

```bash
python custom_main.py
```

這將啟動包含原始功能和自定義功能的後端服務。

### 自定義 API 端點

`backend/custom_api.py` 文件提供了多個自定義 API 端點：

- `/custom/health` - 健康檢查
- `/custom/preferences` - 獲取/更新用戶偏好
- `/custom/history` - 管理研究歷史
- `/custom/email-report/{research_id}` - 發送研究報告郵件
- `/custom/save-report-feedback` - 保存用戶反饋
- `/custom/upload-custom-source` - 上傳自定義研究源

您可以根據需要擴展這些端點或添加新的端點。

## 前端整合

### 將自定義首頁整合到 NextJS

1. 複製 `custom_index.jsx` 到 NextJS 應用程序：

```bash
cp frontend/custom_index.jsx frontend/nextjs/app/page.tsx
```

2. 複製品牌配置文件：

```bash
cp frontend/brand_config.json frontend/nextjs/public/brand_config.json
```

3. 在 NextJS 應用程序中更新引用路徑：

```jsx
// 在 page.tsx 中
import brandConfig from '../public/brand_config.json';
```

### 啟動 NextJS 前端

```bash
cd frontend/nextjs
npm install
npm run dev
```

## 簡化的電子郵件服務

`backend/email_service.py` 提供了一個簡化的電子郵件服務，解決了 Gmail API 認證流程的問題。

### 主要特點

1. **持久化令牌**：只需要在首次使用時進行認證，之後會保存令牌。
2. **自動刷新**：令牌過期時自動刷新，無需用戶干預。
3. **降級模式**：如果認證失敗，自動降級到模擬發送模式。

### 設置步驟

1. 在 [Google Cloud Console](https://console.cloud.google.com/) 創建一個專案。
2. 啟用 Gmail API。
3. 創建 OAuth 2.0 憑證，下載為 `credentials.json`。
4. 將 `credentials.json` 放在專案根目錄。
5. 首次運行時，會打開瀏覽器進行認證，之後不再需要。

### 在代碼中使用

```python
from backend.email_service import send_research_report_email

# 發送研究報告
result = send_research_report_email(
    "user@example.com",
    "研究報告：人工智能趨勢",
    "報告摘要...",
    "outputs/report.pdf"
)
```

### 在前端添加電子郵件功能

在 NextJS 前端添加發送電子郵件的功能：

```jsx
// 在報告頁面添加發送郵件按鈕
const sendReportByEmail = async () => {
  const response = await fetch(`/api/custom/email-report/${reportId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipient_email: userEmail,
      email_subject: `研究報告：${reportTitle}`,
    }),
  });
  
  const result = await response.json();
  if (result.status === 'success') {
    toast.success('報告已發送到您的郵箱');
  } else {
    toast.error('發送報告時出錯');
  }
};
```

## 自定義品牌

`frontend/brand_config.json` 文件允許您自定義應用程序的品牌和外觀：

```json
{
  "appName": "您的應用名稱",
  "companyName": "您的公司名稱",
  "logoPath": "/your-logo.png",
  "primaryColor": "#your-color-code",
  "secondaryColor": "#your-color-code"
}
```

將您的品牌資產（如標誌）放在 `frontend/nextjs/public/` 目錄中。

## 部署建議

### 開發環境

按照 README.md 中的說明在本地運行應用程序。

### 生產環境

1. **後端**：
   - 使用 Gunicorn 和 Uvicorn 作為 ASGI 服務器
   - 使用 Nginx 作為反向代理
   - 使用 Docker 容器化應用程序

2. **前端**：
   - 使用 `npm run build` 構建靜態文件
   - 使用 Vercel 或 Netlify 部署
   - 或者使用 Nginx 提供靜態文件

3. **數據庫**：
   - 對於生產環境，建議使用 PostgreSQL 或 MongoDB 替代內存存儲
   - 實現 `backend/custom_api.py` 中的數據庫連接

4. **安全性**：
   - 使用 HTTPS
   - 實現適當的用戶認證和授權
   - 保護 API 密鑰和敏感信息

---

通過遵循本指南，您可以將自定義功能與 GPT-Researcher 的核心組件無縫整合，創建一個功能豐富、品牌獨特的研究助手應用程序。
