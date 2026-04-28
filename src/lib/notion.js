import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.NOTION_TOKEN });

const PRODUCT_DB_ID  = import.meta.env.NOTION_PRODUCT_DB_ID;
const BRAND_DB_ID    = import.meta.env.NOTION_BRAND_DB_ID;

/* ── 通用：取得 rich_text 純文字 ── */
function richText(prop) {
  return prop?.rich_text?.map((r) => r.plain_text).join('') ?? '';
}

/* ── 通用：取得 title 純文字 ── */
function titleText(prop) {
  return prop?.title?.map((r) => r.plain_text).join('') ?? '';
}

/* ── 通用：取得第一張封面圖 URL ── */
function coverImage(page) {
  const cover = page.cover;
  if (!cover) return null;
  return cover.type === 'external' ? cover.external.url : cover.file.url;
}

/* ── 產品列表 ── */
export async function getProducts() {
  if (!PRODUCT_DB_ID) return [];

  const response = await notion.databases.query({
    database_id: PRODUCT_DB_ID,
    filter: {
      property: '狀態',
      select: { equals: '上架' },
    },
    sorts: [{ property: '排序', direction: 'ascending' }],
  });

  return response.results.map((page) => ({
    id: page.id,
    name: titleText(page.properties['名稱']),
    description: richText(page.properties['說明']),
    category: page.properties['分類']?.select?.name ?? '',
    price: page.properties['售價']?.number ?? null,
    image: coverImage(page) ?? page.properties['圖片']?.url ?? null,
  }));
}

/* ── 品牌大事記 ── */
export async function getBrandTimeline() {
  if (!BRAND_DB_ID) return [];

  const response = await notion.databases.query({
    database_id: BRAND_DB_ID,
    sorts: [{ property: '日期', direction: 'ascending' }],
  });

  return response.results.map((page) => {
    const dateStr = page.properties['日期']?.date?.start ?? null;
    return {
      id: page.id,
      title: titleText(page.properties['事件']),
      description: richText(page.properties['說明']),
      date: dateStr,
      year: dateStr ? new Date(dateStr).getFullYear() : null,
      image: coverImage(page) ?? null,
    };
  });
}
