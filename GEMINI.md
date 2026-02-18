# 專案規則 (Project Rules)

## 📁 專案結構與職責 (Project Structure & Responsibilities)

本專案遵循以下目錄結構與職責劃分，所有開發行為必須遵守此規範。

### 核心目錄 (Core Directories)
- **`src/` (Source Root)**
    - **職責**：專案的核心邏輯、CLI 命令定義與功能實作的唯一入口。
    - **規範**：所有 TypeScript 原始碼必須存放於此，禁止在根目錄散落 `.ts` 檔案。
- **`dist/` (Build Artifacts)**
    - **職責**：存放編譯後的 JavaScript 執行檔。
    - **規範**：此目錄由 `npm run build` 或 `tsc` 自動生成，**嚴禁** 手動修改或提交至 Git。
- **`test/` (Testing)**
    - **職責**：存放單元測試與整合測試代碼。
    - **規範**：本專案使用 **Jest** 框架，測試檔案應以 `.test.ts` 結尾。

### 設定檔案 (Configuration)
- **`package.json`**：定義專案依賴 (Dependencies)、CLI 入口 (`bin`) 與執行腳本 (Scripts)。
- **`tsconfig.json`**：TypeScript 編譯器設定，控制編譯輸出與型別檢查規則。
- **`jest.config.js`**：Jest 測試框架設定檔。
- **`.env`**：環境變數設定，存放敏感資訊。**嚴禁** 提交至版本控制系統。

### Windows 開發輔助 (Windows Helpers)
- **`install.ps1`**：用於將 CLI 快速安裝/連結至 Windows 全域環境的 PowerShell 腳本。
- **`reinstall.bat`**：用於快速清理 `node_modules` 與 `package-lock.json` 並重新安裝依賴的批次檔。
