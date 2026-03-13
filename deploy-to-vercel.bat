@echo off
REM JITConnect - Vercel Deployment Script for Windows
REM This script automates the deployment process

echo.
echo ========================================
echo   JITConnect Deployment to Vercel
echo ========================================
echo.

REM Check if git is initialized
if not exist .git (
    echo [ERROR] Git repository not found!
    echo Please initialize git first:
    echo   git init
    echo   git add .
    echo   git commit -m "Initial commit"
    pause
    exit /b 1
)

REM Commit changes
echo [INFO] Checking for uncommitted changes...
git status --short > nul 2>&1
if %errorlevel% equ 0 (
    echo [INFO] Committing changes...
    git add .
    set /p commit_msg="Enter commit message (or press Enter for default): "
    if "%commit_msg%"=="" set commit_msg=Update: %date% %time%
    git commit -m "%commit_msg%"
    echo [SUCCESS] Changes committed!
) else (
    echo [INFO] No uncommitted changes
)

REM Push to GitHub
echo.
echo [INFO] Pushing to GitHub...
git push origin main
if %errorlevel% neq 0 (
    git push origin master
)

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Vercel CLI not found!
    echo Install it with: npm install -g vercel
    echo.
    set /p install_vercel="Do you want to install it now? (y/n): "
    if /i "%install_vercel%"=="y" (
        npm install -g vercel
    ) else (
        echo Please install Vercel CLI and run this script again.
        pause
        exit /b 1
    )
)

REM Deploy to Vercel
echo.
echo [INFO] Deploying to Vercel...
vercel --prod

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your site is live at:
echo https://jitconnect.vercel.app
echo.
pause
