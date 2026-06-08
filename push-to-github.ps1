Set-Location $PSScriptRoot

Write-Host "=== Git Status ===" -ForegroundColor Cyan
git status

Write-Host "`n=== Staging changed files (no .env) ===" -ForegroundColor Cyan
git add backend/controller/shop.js `
        backend/controller/user.js `
        backend/server.js `
        backend/utils/sendMail.js `
        frontend/src/components/Shop/ShopCreate.jsx `
        frontend/src/components/Signup/Signup.jsx `
        frontend/src/components/Layout/Header.jsx `
        frontend/src/components/Profile/ProfileContent.jsx `
        frontend/src/pages/ActivationPage.jsx `
        frontend/src/pages/SellerActivationPage.jsx `
        frontend/src/utils/avatar.js `
        frontend/src/redux/actions/user.js `
        frontend/src/server.js

Write-Host "`n=== Commit ===" -ForegroundColor Cyan
git commit -m "Fix signup, seller upload, profile avatar, and activation links"

Write-Host "`n=== Push to GitHub ===" -ForegroundColor Cyan
git push origin main

Write-Host "`n=== Done ===" -ForegroundColor Green
git status

Read-Host "Press Enter to close"
