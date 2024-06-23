@echo off
cd /d %~dp0
git add .
git commit -m "vercel please"
git push -u origin master
pause