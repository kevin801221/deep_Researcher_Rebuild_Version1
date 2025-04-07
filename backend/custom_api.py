"""
自定義 API 服務
這個模組提供了擴展 GPT-Researcher 後端功能的自定義 API 端點。
"""

from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
import time
import json
import logging
from datetime import datetime

# 創建路由器
router = APIRouter(prefix="/custom", tags=["custom"])

# 設置日誌
logger = logging.getLogger(__name__)

# 模型定義
class EmailSettings(BaseModel):
    """電子郵件設置模型"""
    enable_email: bool = False
    recipient_email: str = ""
    email_subject: str = "研究報告"
    email_body_template: str = "您好，\n\n請查收附件中的研究報告。\n\n此致，\n研究助手"

class UserPreferences(BaseModel):
    """用戶偏好設置模型"""
    default_report_type: str = "research_report"
    default_tone: str = "Objective"
    default_report_source: str = "web"
    email_settings: EmailSettings = EmailSettings()
    theme: str = "light"
    language: str = "zh-TW"

class ResearchHistory(BaseModel):
    """研究歷史記錄模型"""
    id: str
    query: str
    timestamp: str
    report_type: str
    status: str
    report_url: Optional[str] = None

# 內存存儲（在生產環境中應替換為數據庫）
user_preferences = UserPreferences()
research_history: List[ResearchHistory] = []

# API 端點

@router.get("/health")
async def health_check():
    """健康檢查端點"""
    return {"status": "ok", "timestamp": datetime.now().isoformat()}

@router.get("/preferences")
async def get_preferences():
    """獲取用戶偏好設置"""
    return user_preferences

@router.post("/preferences")
async def update_preferences(preferences: UserPreferences):
    """更新用戶偏好設置"""
    global user_preferences
    user_preferences = preferences
    return {"status": "success", "message": "偏好設置已更新"}

@router.get("/history")
async def get_research_history():
    """獲取研究歷史記錄"""
    return research_history

@router.delete("/history/{research_id}")
async def delete_research_history(research_id: str):
    """刪除研究歷史記錄"""
    global research_history
    original_length = len(research_history)
    research_history = [item for item in research_history if item.id != research_id]
    
    if len(research_history) == original_length:
        raise HTTPException(status_code=404, detail="未找到指定的研究記錄")
    
    return {"status": "success", "message": "研究記錄已刪除"}

@router.post("/email-report/{research_id}")
async def email_report(research_id: str, email_settings: EmailSettings):
    """通過電子郵件發送研究報告"""
    # 這裡可以集成您的電子郵件發送功能
    # 例如使用您之前的 terminal_researcher_email.py 中的功能
    
    # 模擬發送電子郵件
    logger.info(f"正在發送研究報告 {research_id} 到 {email_settings.recipient_email}")
    time.sleep(1)  # 模擬處理時間
    
    return {
        "status": "success", 
        "message": f"研究報告已發送到 {email_settings.recipient_email}",
        "details": {
            "research_id": research_id,
            "recipient": email_settings.recipient_email,
            "timestamp": datetime.now().isoformat()
        }
    }

@router.post("/save-report-feedback")
async def save_report_feedback(research_id: str, feedback: Dict[str, Any]):
    """保存用戶對研究報告的反饋"""
    # 在實際應用中，這應該保存到數據庫
    feedback_file = os.path.join("outputs", f"{research_id}_feedback.json")
    
    with open(feedback_file, "w", encoding="utf-8") as f:
        json.dump(feedback, f, ensure_ascii=False, indent=2)
    
    return {"status": "success", "message": "感謝您的反饋"}

@router.post("/upload-custom-source")
async def upload_custom_source(file: UploadFile = File(...)):
    """上傳自定義研究源文件"""
    # 確保目錄存在
    custom_sources_dir = os.path.join("my-docs", "custom_sources")
    os.makedirs(custom_sources_dir, exist_ok=True)
    
    # 保存文件
    file_path = os.path.join(custom_sources_dir, file.filename)
    with open(file_path, "wb") as f:
        content = await file.read()
        f.write(content)
    
    return {
        "status": "success", 
        "message": "文件上傳成功",
        "file_info": {
            "filename": file.filename,
            "size": len(content),
            "path": file_path
        }
    }

# 添加到主應用程序的方法
def add_custom_routes(app):
    """將自定義路由添加到主應用程序"""
    app.include_router(router)
    logger.info("自定義 API 路由已添加到應用程序")
