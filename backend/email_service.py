"""
簡化的電子郵件服務模組

這個模組提供了簡化的 Gmail API 認證和郵件發送功能，
解決了每次都需要進行認證的問題，使郵件發送更加方便。
"""

import os
import base64
import pickle
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from pathlib import Path
from typing import Optional, List, Dict, Any

# 設置日誌
logger = logging.getLogger(__name__)

# 嘗試導入 Gmail API 相關模組
try:
    from google.auth.transport.requests import Request
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build
    from googleapiclient.errors import HttpError
    GMAIL_API_AVAILABLE = True
except ImportError:
    logger.warning("Gmail API 相關模組未安裝，將使用模擬發送功能")
    GMAIL_API_AVAILABLE = False

# 常量定義
TOKEN_DIR = Path("./tokens")
TOKEN_FILE = TOKEN_DIR / "gmail_token.pickle"
CREDENTIALS_FILE = Path("./credentials.json")
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

class EmailService:
    """電子郵件服務類"""
    
    def __init__(self, use_real_email: bool = False):
        """
        初始化電子郵件服務
        
        Args:
            use_real_email: 是否使用真實的 Gmail API 發送郵件
        """
        self.use_real_email = use_real_email and GMAIL_API_AVAILABLE
        self.service = None
        self.token_valid = False
        
        # 如果使用真實郵件，嘗試初始化 Gmail 服務
        if self.use_real_email:
            self._initialize_gmail_service()
    
    def _initialize_gmail_service(self) -> None:
        """初始化 Gmail 服務"""
        try:
            # 確保 token 目錄存在
            TOKEN_DIR.mkdir(exist_ok=True, parents=True)
            
            creds = None
            # 嘗試從 token 文件加載憑證
            if TOKEN_FILE.exists():
                with open(TOKEN_FILE, 'rb') as token:
                    creds = pickle.load(token)
            
            # 如果沒有有效的憑證，或憑證已過期，則獲取新的憑證
            if not creds or not creds.valid:
                if creds and creds.expired and creds.refresh_token:
                    creds.refresh(Request())
                elif CREDENTIALS_FILE.exists():
                    flow = InstalledAppFlow.from_client_secrets_file(
                        CREDENTIALS_FILE, SCOPES)
                    # 使用本地伺服器進行認證，只需要在首次使用時進行
                    creds = flow.run_local_server(port=0)
                else:
                    logger.error("未找到 credentials.json 文件")
                    self.use_real_email = False
                    return
                
                # 保存憑證以供下次使用
                with open(TOKEN_FILE, 'wb') as token:
                    pickle.dump(creds, token)
            
            # 建立 Gmail 服務
            self.service = build('gmail', 'v1', credentials=creds)
            self.token_valid = True
            logger.info("Gmail 服務初始化成功")
            
        except Exception as e:
            logger.error(f"初始化 Gmail 服務時出錯: {e}")
            self.use_real_email = False
    
    def send_email(self, 
                  subject: str, 
                  body: str, 
                  recipient_email: str, 
                  sender_email: str = "me", 
                  attachments: Optional[List[str]] = None) -> Dict[str, Any]:
        """
        發送電子郵件
        
        Args:
            subject: 郵件主題
            body: 郵件正文
            recipient_email: 收件人郵箱
            sender_email: 發件人郵箱，默認為 'me'（使用 OAuth 認證的郵箱）
            attachments: 附件文件路徑列表
            
        Returns:
            包含發送狀態的字典
        """
        if self.use_real_email and self.token_valid:
            return self._send_with_gmail(subject, body, recipient_email, sender_email, attachments)
        else:
            return self._mock_send_email(subject, body, recipient_email, sender_email, attachments)
    
    def _send_with_gmail(self, 
                        subject: str, 
                        body: str, 
                        recipient_email: str, 
                        sender_email: str = "me", 
                        attachments: Optional[List[str]] = None) -> Dict[str, Any]:
        """使用 Gmail API 發送郵件"""
        try:
            # 創建郵件
            message = MIMEMultipart()
            message['to'] = recipient_email
            message['subject'] = subject
            
            # 添加正文
            message.attach(MIMEText(body, 'plain'))
            
            # 添加附件
            if attachments:
                for file_path in attachments:
                    if os.path.exists(file_path):
                        with open(file_path, 'rb') as file:
                            part = MIMEApplication(file.read(), Name=os.path.basename(file_path))
                        part['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
                        message.attach(part)
            
            # 編碼郵件
            encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
            
            # 發送郵件
            sent_message = self.service.users().messages().send(
                userId=sender_email, body={'raw': encoded_message}).execute()
            
            logger.info(f"郵件已發送，ID: {sent_message['id']}")
            return {
                "success": True,
                "message": "郵件發送成功",
                "message_id": sent_message['id']
            }
            
        except HttpError as error:
            logger.error(f"發送郵件時出錯: {error}")
            return {
                "success": False,
                "message": f"發送郵件時出錯: {error}",
                "error": str(error)
            }
    
    def _mock_send_email(self, 
                        subject: str, 
                        body: str, 
                        recipient_email: str, 
                        sender_email: str = "me", 
                        attachments: Optional[List[str]] = None) -> Dict[str, Any]:
        """模擬發送郵件（不實際發送）"""
        try:
            # 創建模擬郵件目錄
            mock_email_dir = Path("./mock_emails")
            mock_email_dir.mkdir(exist_ok=True)
            
            # 創建唯一的文件名
            timestamp = int(os.path.getmtime(__file__)) if os.path.exists(__file__) else int(time.time())
            email_file = mock_email_dir / f"email_{timestamp}.txt"
            
            # 寫入郵件內容
            with open(email_file, 'w', encoding='utf-8') as f:
                f.write(f"To: {recipient_email}\n")
                f.write(f"From: {sender_email}\n")
                f.write(f"Subject: {subject}\n")
                f.write(f"\n{body}\n\n")
                
                if attachments:
                    f.write("Attachments:\n")
                    for file_path in attachments:
                        f.write(f"- {file_path}\n")
            
            logger.info(f"模擬郵件已保存到: {email_file}")
            return {
                "success": True,
                "message": "模擬郵件已保存",
                "file_path": str(email_file)
            }
            
        except Exception as e:
            logger.error(f"保存模擬郵件時出錯: {e}")
            return {
                "success": False,
                "message": f"保存模擬郵件時出錯: {e}",
                "error": str(e)
            }

# 創建一個郵件服務實例
email_service = EmailService(use_real_email=False)

def send_research_report_email(
    recipient_email: str,
    subject: str,
    report_content: str,
    report_file_path: Optional[str] = None
) -> Dict[str, Any]:
    """
    發送研究報告郵件
    
    Args:
        recipient_email: 收件人郵箱
        subject: 郵件主題
        report_content: 報告摘要內容
        report_file_path: 報告文件路徑（可選）
        
    Returns:
        包含發送狀態的字典
    """
    body = f"""親愛的用戶，

您請求的研究報告已準備好。

報告摘要:
{report_content[:500]}...

{'' if report_file_path else '完整報告請查看附件。'}

此致，
您的研究助手
"""
    
    attachments = [report_file_path] if report_file_path else None
    return email_service.send_email(subject, body, recipient_email, attachments=attachments)

# 使用示例
if __name__ == "__main__":
    result = send_research_report_email(
        "user@example.com",
        "您請求的研究報告：人工智能的發展趨勢",
        "人工智能正在快速發展，影響著各個行業...",
        "outputs/report_123456.pdf"
    )
    print(result)
