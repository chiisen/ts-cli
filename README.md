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
    "ts-cli": "dist/index.js"
  },
```
修改 ts-cli 成為你想要的名稱