// parse-bookmarks.js
import type { BookmarkItem, FolderItem, BookmarkConverterOptions, ParseResult } from './types';

/**
 * 递归解析一个 <DL>，返回文件夹和书签节点数组
 */
function parseDL(dlNode: Element, options: BookmarkConverterOptions = {}): (BookmarkItem | FolderItem)[] {
  const children: (BookmarkItem | FolderItem)[] = [];
  const nodes = Array.from(dlNode.children);

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.tagName !== 'DT') continue;
    const dt = node;

    // 尝试在 DT 内部找子 DL
    let nestedDL = dt.querySelector(':scope > DL');
    // 如果没在内部，看看下一个兄弟节点是否是 DL
    if (!nestedDL) {
      const next = dt.nextElementSibling;
      if (next && next.tagName === 'DL') nestedDL = next;
    }

    // 处理文件夹 <H3>
    const h3 = dt.querySelector(':scope > H3');
    if (h3) {
      const folder: FolderItem = {
        type: 'folder',
        name: h3.textContent || '',
        children: []
      };
      // 直接提取属性到外层
      for (const attr of Array.from(h3.attributes)) {
        (folder as any)[attr.name.toLowerCase()] = attr.value;
      }
      if (nestedDL) {
        folder.children = parseDL(nestedDL, options);
      }
      children.push(folder);
      continue;
    }

    // 处理书签 <A>
    const a = dt.querySelector(':scope > A');
    if (a) {
      const bookmark: BookmarkItem = {
        type: 'bookmark',
        name: a.textContent || ''
      };
      // 直接提取属性到外层
      for (const attr of Array.from(a.attributes)) {
        (bookmark as any)[attr.name.toLowerCase()] = attr.value;
      }
      children.push(bookmark);
    }
  }

  return children;
}

/**
 * 脚本入口（前端可用）
 */
export function parse(html: string, options: BookmarkConverterOptions = {}): ParseResult {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const topDL = doc.querySelector('DL');
  if (!topDL) {
    throw new Error('未找到顶层 <DL> 元素');
  }

  const fileName = `bookmarks_${Math.floor(Date.now() / 1000)}.json`;
  const tree = parseDL(topDL, options);

  return {
    fileName,
    data: JSON.stringify(tree, null, options.formatJSON ? 2 : 0)
  };
}
