// 书签项基础类型
export interface BookmarkItem {
  type: 'bookmark';
  name: string;
  href?: string;
  add_date?: string;
  icon?: string;
}

// 文件夹类型（包含子项）
export interface FolderItem {
  type: 'folder';
  name: string;
  children: (BookmarkItem | FolderItem)[];
  add_date?: string;
  last_modified?: string;
}

// 解析结果类型
export interface ParseResult {
  fileName: string;
  data: string;
}

// 转换配置选项
export interface BookmarkConverterOptions {
  retainFolderStructure?: boolean;
  formatJSON?: boolean;
  includeIcons?: boolean;
  includeTimestamps?: boolean;
}