#!/usr/bin/env python3
"""
自定義研究助手 - 主應用程序

這個文件是自定義研究助手的主入口點，整合了 GPT-Researcher 的核心功能
並添加了自定義功能，如簡化的電子郵件服務和自定義 API 端點。
"""

import os
import logging
from pathlib import Path
from dotenv import load_dotenv

# 創建日誌目錄
logs_dir = Path("logs")
logs_dir.mkdir(exist_ok=True)

# 配置日誌
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        # 文件處理器用於一般應用程序日誌
        logging.FileHandler('logs/app.log'),
        # 流處理器用於控制台輸出
        logging.StreamHandler()
    ]
)

# 抑制詳細的 fontTools 日誌
logging.getLogger('fontTools').setLevel(logging.WARNING)
logging.getLogger('fontTools.subset').setLevel(logging.WARNING)
logging.getLogger('fontTools.ttLib').setLevel(logging.WARNING)

# 創建日誌實例
logger = logging.getLogger(__name__)

# 加載環境變量
load_dotenv()

# 導入原始服務器
from backend.server.server import app

# 導入自定義 API
from backend.custom_api import add_custom_routes

# 添加自定義路由
add_custom_routes(app)

# 創建輸出目錄
os.makedirs("outputs", exist_ok=True)
os.makedirs("my-docs", exist_ok=True)

# 添加自定義中間件或設置
@app.middleware("http")
async def add_custom_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Custom-Header"] = "My Custom Research Assistant"
    return response

# 記錄應用程序啟動
logger.info("自定義研究助手應用程序已初始化")

if __name__ == "__main__":
    import uvicorn
    
    # 獲取端口配置，默認為 8000
    port = int(os.getenv("PORT", 8000))
    
    logger.info(f"啟動服務器在端口 {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
