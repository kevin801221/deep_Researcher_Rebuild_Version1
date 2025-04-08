# 使用官方 Python 基礎鏡像
FROM python:3.10-slim

# 設置工作目錄
WORKDIR /app

# 安裝系統依賴
RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    software-properties-common \
    git \
    && rm -rf /var/lib/apt/lists/*

# 複製 Python 依賴文件
COPY requirements.txt .

# 安裝 Python 依賴
RUN pip install --no-cache-dir -r requirements.txt

# 複製後端代碼
COPY . .

# 暴露後端端口
EXPOSE 8000

# 啟動後端服務
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
