# ts-cli
ts-cli 用 TypeScript 打造的第一个命令行工具

參考 [ts-test](https://github.com/chiisen/ts-test) 建立 TypeScript 專案

# 初始安裝
```shell
npm ci
```

# 安裝 ts-node
ts-node 是一個工具，它允許您直接運行 TypeScript 代碼而無需事先將其編譯為 JavaScript。這樣可以加快開發速度並簡化工作流程，特別是在開發和測試時。
```shell
npm install -g ts-node
```

# 安裝 .env 設定檔案
```shell
npm install dotenv
```

# CLI 名稱修改
打開 package.json 檔案
```json
"bin": {
    "tscli": "./dist/src/index.js"
  },
```
修改 tscli 成為你想要的名稱

# 🔅編譯專案內的 .ts 檔案
🔅會更新到 dist 目錄內
```shell
tsc
```

# 開啟監聽 ts 文件自動編譯
```shell
tsc -w
```

# 原始程式碼連結安裝
```shell
npm link
```
這個指令將會幫助你把這個資料夾放進你的全域node module 中，
這樣你就不用部署到 npm 上就能直接使用。

# 原始程式碼連結解安裝
ts-cli 是 package.json 檔案 name 的欄位內容
```shell
npm unlink ts-cli
```

# CLI 範例測試
tscli 是 package.json 檔案 bin 的欄位內容
```shell
tscli -d 1234
```

# abstract syntax tree
```shell
npm install ts-morph
```
```shell
tscli -a 1
```

# git commit message
- 常用描述
```
✨ feat: 需求功能描述
🐛 fix: 修正 bug 的問題描述
💄 optimize: 最佳化程式碼或功能流程
🔧 chore: 雜事，例如: 調整設定檔案等等 
```
