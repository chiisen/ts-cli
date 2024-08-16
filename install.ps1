# 設定 PowerShell 編碼為 UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "正在編譯 TypeScript 程式碼..." -ForegroundColor Cyan
tsc
if ($LASTEXITCODE -ne 0) {
    Write-Host "TypeScript 編譯失敗！" -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "TypeScript 編譯完成。" -ForegroundColor Green

Write-Host "正在解除 ts-cli 的全域連結..." -ForegroundColor Cyan
npm unlink ts-cli
if ($LASTEXITCODE -ne 0) {
    Write-Host "解除 ts-cli 全域連結失敗！" -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "解除 ts-cli 全域連結完成。" -ForegroundColor Green

Write-Host "正在建立 ts-cli 的全域連結..." -ForegroundColor Cyan
npm link
if ($LASTEXITCODE -ne 0) {
    Write-Host "建立 ts-cli 全域連結失敗！" -ForegroundColor Red
    exit $LASTEXITCODE
}
Write-Host "建立 ts-cli 全域連結完成。" -ForegroundColor Green

Write-Host "所有步驟完成。" -ForegroundColor Green