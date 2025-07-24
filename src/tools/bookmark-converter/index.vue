<script setup lang="ts">
import { ref } from "vue";
import {
  UploadCloud,
  Trash2,
  Download,
  Info,
  Folder,
  Code,
  Image,
  Clock,
  Bookmark,
  Github,
  Logs
} from "lucide-vue-next";
import { toast } from 'vue-sonner';
import { parse } from './converter';

// 文件拖拽状态
const isDragging = ref(false);
// 上传文件
let file = ref<any>(null);

// 解析进度状态
const isParsing = ref(false);
const isParsed = ref(false);

// 拖放处理函数
const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;
  
  const droppedFile = event.dataTransfer?.files[0];
  if (!droppedFile) return;

  // 验证文件类型
  if (!validate(droppedFile)) return;
  file.value = droppedFile;
  isParsing.value = true;
  isParsed.value = false;

  // 用FileReader读取内容
  const reader = new FileReader();
  reader.onload = (e) => {
    const html = e.target?.result as string;
    try {
      parseResult.value = parse(html, { formatJSON: true });
      isParsed.value = true;
      toast.success('书签解析完成！');
    } catch (err: any) {
      toast.error(err.message || '解析失败');
    } finally {
      isParsing.value = false;
    }
  };
  reader.readAsText(droppedFile, 'utf-8');
};

// 处理文件拖拽进入
const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

// 处理文件拖拽离开
const handleDragLeave = () => {
  isDragging.value = false;
};

let fileInput = ref<HTMLInputElement | null>(null);
// 清空文件
const reset = () => {
  file.value = null;
  isParsing.value = false;
  isParsed.value = false;
  // 保留input引用，只重置值
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};


// 文件处理函数
const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const selectedFile = input.files[0];
    if (!validate(selectedFile)) return;
    file.value = selectedFile;
    isParsing.value = true;
    isParsed.value = false;

    // 用FileReader读取内容
    const reader = new FileReader();
    reader.onload = (e) => {
      const html = e.target?.result as string;
      try {
        parseResult.value = parse(html, { formatJSON: true });
        isParsed.value = true;
        toast.success('书签解析完成！');
      } catch (err: any) {
        toast.error(err.message || '解析失败');
      } finally {
        isParsing.value = false;
      }
    };
    reader.readAsText(selectedFile, 'utf-8');
  }
};

// 验证文件类型
const validate = (selectedFile: File) => {
  if (!selectedFile.type.includes('text/html') &&
      !selectedFile.name.endsWith('.html') &&
      !selectedFile.name.endsWith('.htm')) {
    toast.error('仅支持.html或.htm文件');
    return false;
  }
  return true;
}

// 解析结果
import type { ParseResult } from './types';

// 保持原有逻辑不变
const parseResult = ref<ParseResult | null>(null);

// 下载函数
const downloadFile = () => {
  if (!parseResult.value) return;
  
  const blob = new Blob([parseResult.value.data],
    { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = parseResult.value.fileName;
  link.click();
};

// 转换配置
const config = ref([{
  icon: Folder,
  label: '保留文件夹结构',
  tip: '保持原始书签的文件夹结构',
  value: true
}, {
  icon: Code,
  label: '格式化 JSON',
  tip: '将 JSON 数据格式化为易读的格式',
  value: true
}, {
  icon: Image,
  label: '包含图标数据',
  tip: '包含每个书签的图标数据',
  value: false
}, {
  icon: Clock,
  label: '包含时间信息',
  tip: '包含每个书签的创建时间和修改时间',
  value: false
}])
</script>

<template>
  <div class="flex min-h-screen justify-center bg-gray-100 p-6">
    <div class="w-full max-w-4xl space-y-6">
      <!-- 标题区域 -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800">书签转换器</h1>
        <p class="mt-2 text-lg text-gray-600">
          将浏览器书签文件转换为 JSON 格式，方便导入导出和数据处理
        </p>
      </div>

      <!-- 上传区域 -->
      <Card class="p-6">
        <CardContent
          class="flex flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-16 text-center transition-colors duration-200 cursor-pointer hover:border-blue-500"
          :class="{ 'border-blue-500 bg-blue-50': isDragging }"
          @dragover.prevent="handleDragOver" @dragleave="handleDragLeave" @drop.prevent="handleDrop"
          @click="fileInput?.click()">
          <UploadCloud class="h-16 w-16 text-gray-400" />
          <p class="text-lg font-medium text-gray-700">
            将书签文件拖放到此处，或点击选择
          </p>
          <p class="text-sm text-gray-500">
            支持从 Chrome、Firefox、Safari 等浏览器导出的书签文件
          </p>
          <input type="file" ref="fileInput" class="hidden" accept=".html,.htm" @change="handleFileChange" />
        </CardContent>

        <!-- 文件预览区域 -->
        <transition name="fade-height" mode="out-in">
          <div v-if="file" class="mt-6 space-y-3">
            <div
              class="flex items-center justify-between rounded-md bg-gray-100 p-3 shadow-sm"
            >
              <div class="flex items-center space-x-3">
                <Bookmark class="h-6 w-6 text-blue-500" />
                <div>
                  <p class="text-sm font-medium text-gray-800">
                    {{ file.name }}
                  </p>
                  <p class="text-xs text-gray-500">
                    {{ (file.size / 1024).toFixed(2) }} KB
                  </p>
                </div>
              </div>
              <div>
                <Button variant="ghost" size="icon" title="下载" class="box-content cursor-pointer hover:bg-neutral-200 p-1" @click="downloadFile">
                  <Download class="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" title="移除" class="box-content cursor-pointer hover:bg-neutral-200 p-1" @click="reset">
                  <Trash2 class="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        </transition>
      </Card>
      <div class="fixed right-4 top-4">
        <a href="https://github.com/tao1234567890/bookmark-converter" title="Github" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:text-accent-foreground dark:hover:bg-accent/50 size-9 box-content cursor-pointer hover:bg-neutral-200 p-1">
          <Github class="h-5 w-5 text-gray-600" />
        </a>
        <Popover v-if="false">
          <PopoverTrigger>
            <Button variant="ghost" size="icon" title="菜单" disabled class="box-content cursor-pointer hover:bg-neutral-200 p-1">
              <Logs class="h-5 w-5 text-gray-600" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <!-- 转换配置 -->
          <h3 class="text-2xl font-semibold text-gray-800">转换配置</h3>
          <div v-for="(item, index) in config" :key="index" class="flex basis-[48%] items-center rounded-md border p-4">
            <Component :is="item.icon" class="mr-2" />
            <div class="flex-1 flex items-center space-x-2">
              <Label for="retain-folder-structure" class="text-base text-gray-700">{{ item.label }}</Label>
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Info class="h-4 w-4 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{{ item.tip }}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch class="cursor-pointer" v-model="item.value" />
          </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
</template>
