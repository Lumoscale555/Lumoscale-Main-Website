@echo off
cd /d "%~dp0"
title Push to GitHub - Select Account
node scripts/git-push.js
pause
