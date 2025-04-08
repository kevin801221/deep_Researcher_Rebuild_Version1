# 構建階段
FROM node:18-alpine AS builder
WORKDIR /app

# 複製 package.json
COPY package.json ./

# 安裝依賴
RUN npm install

# 複製源代碼
COPY . .

# 創建 .env.local 文件
RUN echo "NEXT_PUBLIC_API_URL=http://backend:8000" > .env.local

# 構建應用
RUN npm run build

# 運行階段
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 複製構建產物和必要文件
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env.local ./.env.local

# 暴露端口
EXPOSE 3000

# 啟動應用
CMD ["npm", "start"]
