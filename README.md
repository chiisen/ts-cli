# 🚀 ts-cli
這是一個使用 **TypeScript** 打造的強大命令行工具 (CLI)。  
參考 [ts-test](https://github.com/chiisen/ts-test) 專案結構，為您提供最佳的 TypeScript 開發體驗。

## 📦 初始安裝 (Initialization)
首先，請安裝專案所需的依賴套件：
```shell
npm ci
```

## 🛠️ 開發環境設定 (Development Setup)

### 1. 安裝 ts-node
`ts-node` 是開發的神器，讓您無需編譯即可直接運行 TypeScript 代碼，大幅提升開發與測試效率。
```shell
npm install -g ts-node
```

### 2. 環境變數設定 (.env)
本專案支援 `.env` 配置，請安裝 `dotenv`：
```shell
npm install dotenv
```

### 3. 自定義 CLI 命令名稱
想要改個更有個性的命令名稱嗎？請開啟 `package.json` 並修改 `bin` 欄位：
```json
"bin": {
    "tscli": "./dist/src/index.js"
  },
```
將 `"tscli"` 修改為您喜歡的指令名稱即可！

---

## � 編譯與監聽 (Building & Watching)

### �🔅 編譯專案 (.ts -> .js)
將 TypeScript 原始碼編譯至 `dist` 目錄：
```shell
tsc
```

### 👀 自動監聽編譯 (Watch Mode)
開啟監聽模式，檔案更動時會自動重新編譯，開發更流暢：
```shell
tsc -w
```

---

## 🔗 本地連結與測試 (Local Linking)

### 🟢 建立連結 (npm link)
將此專案連結到全域 node_modules，讓您不需發佈到 npm 也能直接在終端機呼叫指令：
```shell
npm link
```
> ⭐ **注意**：若程式碼有異動，雖然 `npm link` 通常會即時反映，但在某些情況下（如 bin 映射變更），可能需要重新連結。

### 🔴 移除連結 (npm unlink)
若需移除全域連結 (其中 `ts-cli` 為 `package.json` 中的 `name` 欄位)：
```shell
npm unlink ts-cli
```

---

## 📂 專案結構說明 (Project Structure)
以下是專案中主要檔案與目錄的用途說明，協助您快速上手：

### 核心目錄
- **`src/`**：TypeScript 原始碼目錄，所有的 CLI 邏輯與功能實作都在這裡。
- **`dist/`**：編譯後的 JavaScript 檔案輸出目錄 (執行 `npm run build` 或 `tsc` 後產生)。
- **`test/`**：單元測試檔案存放處 (使用 Jest 框架)。

### 設定檔案
- **`package.json`**：專案核心，定義了專案依賴 (dependencies)、腳本 (scripts) 與 CLI 設定 (bin)。
- **`tsconfig.json`**：TypeScript 編譯器設定檔，定義編譯選項與路徑映射。
- **`jest.config.js`**：Jest 測試框架設定檔。
- **`.env`**：環境變數設定檔，用於存放敏感資訊或環境參數。

### 輔助工具
- **`install.ps1`**：PowerShell 腳本，方便 Windows 使用者快速全域安裝此 CLI。
- **`reinstall.bat`**：批次檔，用於快速清理並重新安裝專案依賴。

---

## 🚀 CLI 使用範例 (Usage)
假設您的 CLI 指令名稱為 `tscli` (對應 `package.json` 的 `bin` 設定)：

### 測試指令
```shell
tscli -d 1234
```

### AST (Abstract Syntax Tree) 測試
若需使用 AST 功能，請先安裝 `ts-morph`：
```shell
npm install ts-morph
```
執行測試：
```shell
tscli -a 1
```

### Redis 支援
安裝 Redis 套件以啟用 `-u` 參數查詢功能：
```shell
npm install redis @types/redis
```

---

## 🌏 一鍵全域安裝 (Global Install Script)
我們提供了一個 PowerShell 腳本，協助您快速將 `ts-cli` 安裝至全域環境：
```powershell
.\install.ps1
```
