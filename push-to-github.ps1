Set-Location $PSScriptRoot

Write-Host "=== Git Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Staging changed files (no .env) ===" -ForegroundColor Cyan
git add backend/controller/shop.js `
        backend/server.js `
        backend/utils/sendMail.js `
        frontend/src/components/Shop/ShopCreate.jsx `
        frontend/src/redux/actions/user.js `
        frontend/src/server.js

Write-Host "`n=== Commit ===" -ForegroundColor Cyan
git commit -m "Fix shop registration form validation, silent 401 handling, and resilient create-shop email flow"

Write-Host "`n=== Push to GitHub ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== Done ===" -ForegroundColor Green
git status

Read-Host "Press Enter to close"
