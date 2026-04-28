# 小牧人羊奶 — 官方網站

溫馨風 Astro 靜態網站，串接 Notion API 管理產品與品牌大事記。

## 技術架構

- **前端框架**：Astro 6.x（Static 模式）
- **樣式**：Tailwind CSS v4
- **內容管理**：Notion API（@notionhq/client）
- **佈署平台**：Zeabur

## 本地開發

```bash
# 安裝依賴
npm install

# 複製環境變數範本
cp .env.example .env
# 填入您的 Notion Token 與資料庫 ID

# 啟動開發伺服器
npm run dev
```

## Zeabur 佈署必填環境變數

請至 Zeabur 專案 → **Variables** 頁面設定以下三個環境變數：

| 變數名稱 | 說明 |
|---|---|
| `NOTION_TOKEN` | Notion 整合金鑰（`secret_...`） |
| `NOTION_PRODUCT_DB_ID` | 「產品」Notion 資料庫 ID |
| `NOTION_BRAND_DB_ID` | 「品牌大事記」Notion 資料庫 ID |

### 如何取得 Notion Token

1. 前往 [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. 建立新整合，複製 **內部整合金鑰**
3. 在您的 Notion 資料庫頁面，點選右上角「⋯」→「新增連線」→ 選擇剛建立的整合

### 如何取得資料庫 ID

在 Notion 資料庫頁面的 URL 中，找到以下格式的 ID：
```
https://www.notion.so/{workspace-name}/{DATABASE_ID}?v=...
```

## Notion 資料庫欄位規範

### 產品資料庫（NOTION_PRODUCT_DB_ID）

| 欄位名稱 | 類型 | 必填 | 說明 |
|---|---|---|---|
| 名稱 | Title | ✓ | 產品名稱 |
| 說明 | Rich Text | | 產品說明文字 |
| 分類 | Select | | 產品分類標籤 |
| 售價 | Number | | 售價（NTD） |
| 狀態 | Select | ✓ | 填「上架」才會顯示 |
| 排序 | Number | | 數字越小越前面 |
| 圖片 | URL | | 產品圖片網址（或使用封面圖） |

### 品牌大事記資料庫（NOTION_BRAND_DB_ID）

| 欄位名稱 | 類型 | 必填 | 說明 |
|---|---|---|---|
| 事件 | Title | ✓ | 事件標題 |
| 說明 | Rich Text | | 事件說明 |
| 日期 | Date | ✓ | 事件日期（用於排序） |

## 專案成員

佈署後請至 Zeabur → **Settings → Members** 邀請管理員：
- **信箱**：chen.uvtai12@gmail.com
- **權限**：Admin
