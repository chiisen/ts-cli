# ts-cli
ts-cli 用 TypeScript 打造的第一个命令行工具

參考 [ts-test](https://github.com/chiisen/ts-test) 建立 TypeScript 專案

# 初始安裝
```bash=
npm ci
```

# CLI 名稱修改
打開 package.json 檔案
```
"bin": {
    "tscli": "./dist/src/index.js"
  },
```
修改 tscli 成為你想要的名稱

# 編譯專案內的 .ts 檔案
會更新到 dist 目錄內
```bash=
tsc
```

# 開啟監聽 ts 文件自動編譯
```bash=
tsc -w
```

# 原始程式碼連結安裝
```
npm link
```
這個指令將會幫助你把這個資料夾放進你的全域node module 中，
這樣你就不用部署到 npm 上就能直接使用。

# 原始程式碼連結解安裝
ts-cli 是 package.json 檔案 name 的欄位內容
```
npm unlink ts-cli
```

# CLI 範例測試
tscli 是 package.json 檔案 bin 的欄位內容
```
tscli -n 1234
```